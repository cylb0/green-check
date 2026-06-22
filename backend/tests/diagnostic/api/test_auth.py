import pytest
import jwt
from django.contrib.auth import get_user_model
from django.conf import settings
from unittest.mock import MagicMock
from auth import CookieJWTAuth, create_access_token, create_refresh_token, decode_token, get_user_from_payload, get_user_from_token
from datetime import datetime, timedelta, timezone

User = get_user_model()

@pytest.fixture
def user():
    return User.objects.create_user(email='test@example.com', password='password')

@pytest.fixture
def auth():
    return CookieJWTAuth()

def make_request(cookie_value: str | None) -> MagicMock:
    request = MagicMock()
    request.COOKIES = {'access_token': cookie_value} if cookie_value else {}
    return request

def make_expired_token(user, token_type='access') -> str:
    payload = {
        'user_id': str(user.id),
        'version': user.token_version,
        'exp': datetime.now(timezone.utc) - timedelta(seconds=1),
        'type': token_type
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

@pytest.mark.django_db
class TestCreateAccessToken:
    def test_returns_string(self, user):
        token = create_access_token(user)
        assert isinstance(token, str)

    def test_payload_contains_user_id(self, user):
        token = create_access_token(user)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
        assert payload['user_id'] == str(user.id)

    def test_payload_contains_version(self, user):
        token = create_access_token(user)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
        assert payload['version'] == user.token_version

    def test_payload_type_is_access(self, user):
        token = create_access_token(user)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
        assert payload['type'] == 'access'

    def test_token_expires_in_15_minutes(self, user):
        token = create_access_token(user)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
        exp = datetime.fromtimestamp(payload['exp'], tz=timezone.utc)
        now = datetime.now(timezone.utc)
        delta = exp - now
        assert delta.total_seconds() == pytest.approx(15 * 60, abs=10)

@pytest.mark.django_db
class TestCreateRefreshToken:
    def test_payload_type_is_refresh(self, user):
        token = create_refresh_token(user)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
        assert payload['type'] == 'refresh'

    def test_token_expires_in_7_days(self, user):
        token = create_refresh_token(user)
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
        exp = datetime.fromtimestamp(payload['exp'], tz=timezone.utc)
        now = datetime.now(timezone.utc)
        delta = exp - now
        assert delta.total_seconds() == pytest.approx(7 * 24 * 3600, abs=10)

@pytest.mark.django_db
class TestDecodeToken:
    def test_valid_token(self, user):
        token = create_access_token(user)
        payload = decode_token(token, 'access')
        assert payload['user_id'] == str(user.id)
        assert payload['type'] == 'access'

    def test_wrong_type_raises(self, user):
        token = create_access_token(user)
        with pytest.raises(jwt.InvalidTokenError):
            decode_token(token, 'refresh')
    
    def test_expired_token_raises(self, user):
        token = make_expired_token(user, 'access')
        with pytest.raises(jwt.ExpiredSignatureError):
            decode_token(token, 'access')

    def test_invalid_token_raises(self, user):
        with pytest.raises(jwt.InvalidTokenError):
            decode_token("no_token", "access")

@pytest.mark.django_db
class TestGetUserFromPayload:
    def test_valid_payload_returns_user(self, user):
        payload = {
            'user_id': str(user.id),
            'version': user.token_version,
        }
        result = get_user_from_payload(payload)
        assert result == user

    def test_wrong_version_raises(self, user):
        payload = {
            'user_id': str(user.id),
            'version': user.token_version + 1,
        }
        with pytest.raises(jwt.InvalidTokenError):
            get_user_from_payload(payload)

    def test_unknown_user_raises(self, user):
        payload = {
            'user_id': 9999,
            'version': 1
        }
        with pytest.raises(User.DoesNotExist):
            get_user_from_payload(payload)

@pytest.mark.django_db
class TestGetUserFromToken:
    def test_valid_token_returns_user(self, user):
        token = create_access_token(user)
        result = get_user_from_token(token, 'access')
        assert result == user

    def test_expired_token_raises(self, user):
        token = make_expired_token(user, 'access')
        with pytest.raises(jwt.ExpiredSignatureError):
            get_user_from_token(token, 'access')

    def test_invalid_token_raises(self):
        with pytest.raises(jwt.InvalidTokenError):
            get_user_from_token('invalid token', 'access')

    def test_wrong_type_raises(self, user):
        token = create_refresh_token(user)
        with pytest.raises(jwt.InvalidTokenError):
            get_user_from_token(token, 'access')

    def test_wrong_versio_raises(self, user):
        token = create_access_token(user)
        user.token_version += 1
        user.save()
        with pytest.raises(jwt.InvalidTokenError):
            get_user_from_token(token, 'access')

@pytest.mark.django_db
class TestCookieJWTAuth:
    def test_returns_user_with_valid_token(self, user, auth):
        token = create_access_token(user)
        request = make_request(token)
        assert auth.authenticate(request, token) == user

    def test_returns_none_without_cookie(self, auth):
        request = make_request(None)
        assert auth.authenticate(request, '') is None

    def test_returns_none_with_expired_token(self, user, auth):
        payload = {
            'user_id': str(user.id),
            'version': user.token_version,
            'exp': datetime(2000, 1, 1, tzinfo=timezone.utc),
            'type': 'access'
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        request = make_request(token)
        assert auth.authenticate(request, token) is None

    def test_returns_none_with_wrong_type(self, user, auth):
        token = create_refresh_token(user)
        request = make_request(token)
        assert auth.authenticate(request, token) is None

    def test_returns_none_with_invalid_version(self, user, auth):
        token = create_refresh_token(user)
        user.token_version += 1
        user.save()
        request = make_request(token)
        assert auth.authenticate(request, token) is None

    def test_returns_none_with_unknown_user(self, auth):
        payload = {
            'user_id': '00000000-0000-0000-0000-000000000000',
            'version': 0,
            'exp': datetime(2999, 1, 1, tzinfo=timezone.utc),
            'type': 'access'
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        request = make_request(token)
        assert auth.authenticate(request, token) is None

    def test_returns_none_with_tampered_token(self, auth):
        request = make_request('tampered-token')
        assert auth.authenticate(request, 'tampered-token') is None
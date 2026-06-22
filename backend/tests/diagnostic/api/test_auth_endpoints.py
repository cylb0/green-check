from tests.diagnostic.api.test_auth import make_expired_token
from diagnostic.api.schemas.auth import ChangePasswordSchema
import pytest
from django.contrib.auth import get_user_model
from ninja.testing import TestClient
from api import api
from auth import create_access_token, create_refresh_token

User = get_user_model()
client = TestClient(api)

@pytest.fixture
def clientdjango():
    from django.test import Client
    return Client()

@pytest.fixture
def user():
    return User.objects.create_user(email='test@example.com', password='password')

@pytest.mark.django_db
class TestRegister:
    def test_register_creates_user(self):
        response = client.post('/register', json={'email': 'new@example.com', 'password': 'password'})
        assert response.status_code == 201
        assert User.objects.filter(email='new@example.com').exists()

    def test_register_returns_user(self):
        response = client.post('/register', json={'email': 'new@example.com', 'password': 'password'})
        assert response.json()['email'] == 'new@example.com'

    def test_register_duplicate_email(self, user):
        response = client.post('/register', json={'email': 'test@example.com', 'password': 'password'})
        assert response.status_code == 400

@pytest.mark.django_db
class TestLogin:
    def test_login_returns_200(self, user):
        response = client.post('/login', json={'email': 'test@example.com', 'password': 'password'})
        assert response.status_code == 200

    def test_login_invalid_credentials(self):
        response = client.post('/login', json={'email': 'wrong@example.com', 'password': 'wrong'})
        assert response.status_code == 401

@pytest.mark.django_db
class TestLogout:
    def test_logout_increments_token_version(self, clientdjango, user):
        initial_version = user.token_version
        token = create_access_token(user)
        clientdjango.cookies['access_token'] = token
        response = clientdjango.post('/api/logout')
        assert response.status_code == 204
        user.refresh_from_db()
        assert user.token_version == initial_version + 1

    def test_logout_deletes_cookies(self, clientdjango, user):
        token = create_access_token(user)
        clientdjango.cookies['access_token'] = token
        response = clientdjango.post('/api/logout')
        assert response.cookies['access_token']['max-age'] == 0
        assert response.cookies['refresh_token']['max-age'] == 0

@pytest.mark.django_db
class TestMe:
    def test_me_returns_user(self, clientdjango, user):
        token = create_access_token(user)
        clientdjango.cookies['access_token'] = token
        response = clientdjango.get('/api/me')
        assert response.status_code == 200
        assert response.json()['email'] == user.email

    def test_me_unauthenticated(self, clientdjango):
        response = clientdjango.get('/api/me')
        assert response.status_code == 401

@pytest.mark.django_db
class TestChangePassword:
    def test_change_password_success(self, clientdjango, user):
        token = create_access_token(user)
        clientdjango.cookies['access_token'] = token

        payload: ChangePasswordSchema = {
            'old_password': 'password',
            'new_password': 'newpassword',
            'new_password_confirm': 'newpassword'
        }

        response = clientdjango.post('/api/change-password', data=payload, content_type='application/json')
        
        assert response.status_code == 204
        user.refresh_from_db()
        assert user.check_password('newpassword')

    def test_change_password_wrong_old(self, clientdjango, user):
        token = create_access_token(user)
        clientdjango.cookies['access_token'] = token

        payload: ChangePasswordSchema = {
            'old_password': 'wrongpassword',
            'new_password': 'newpassword',
            'new_password_confirm': 'newpassword'
        }

        response = clientdjango.post('/api/change-password', data=payload, content_type='application/json')
        
        assert response.status_code == 400

    def test_change_password_mismatch(self, clientdjango, user):
        token = create_access_token(user)
        clientdjango.cookies['access_token'] = token

        payload: ChangePasswordSchema = {
            'old_password': 'password',
            'new_password': 'newpassword',
            'new_password_confirm': 'nomatchpassword'
        }

        response = clientdjango.post('/api/change-password', data=payload, content_type='application/json')
        
        assert response.status_code == 422

@pytest.mark.django_db
class TestRefresh:
    def test_missing_refresh_token_returns_401(self, clientdjango):
        response = clientdjango.post('/api/refresh')
        assert response.status_code == 401

    def test_valid_refresh_token_returns_204(self, clientdjango, user):
        token = create_refresh_token(user)
        clientdjango.cookies['refresh_token'] = token
        response = clientdjango.post('/api/refresh')
        assert response.status_code == 204
        assert 'access_token' in response.cookies

    def test_expired_refresh_token_returns_401(self, clientdjango, user):
        token = make_expired_token(user, 'refresh')
        clientdjango.cookies['refresh_token'] = token
        response = clientdjango.post('/api/refresh')
        assert response.status_code == 401

    def test_invalid_refresh_token_returns_401(self, clientdjango):
        clientdjango.cookies['refresh_token'] = 'invalid_token'
        response = clientdjango.post('/api/refresh')
        assert response.status_code == 401

    def test_wrong_token_type_returns_401(self, clientdjango, user):
        token = create_access_token(user)
        clientdjango.cookies['refresh_token'] = token
        response = clientdjango.post('/api/refresh')
        assert response.status_code == 401

    def test_wrong_version_returns_401(self, clientdjango, user):
        token = create_refresh_token(user)
        user.token_version += 1
        user.save()
        clientdjango.cookies['refresh_token'] = token
        response = clientdjango.post('/api/refresh')
        assert response.status_code == 401

    def test_new_access_token_is_httponly(self, clientdjango, user):
        token = create_refresh_token(user)
        clientdjango.cookies['refresh_token'] = token
        response = clientdjango.post('/api/refresh')
        assert response.cookies['access_token']['httponly']

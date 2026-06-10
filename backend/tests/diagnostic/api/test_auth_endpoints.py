import pytest
from django.contrib.auth import get_user_model
from ninja.testing import TestClient
from diagnostic.api.endpoints.auth import router

User = get_user_model()
client = TestClient(router)

@pytest.fixture
def user():
    return User.objects.create_user(email='test@example.com', password='password')

@pytest.mark.django_db
class TestRegister:
    def test_register_creates_user(self):
        response = client.post('/register', json={'email': 'new@example.com', 'password': 'password'})
        assert response.status_code == 200
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

    def test_login_sets_access_cookie(self, user):
        response = client.post('/login', json={'email': 'test@example.com', 'password': 'password'})
        assert 'access_token' in response.cookies

    def test_login_sets_refresh_cookie(self, user):
        response = client.post('/login', json={'email': 'test@example.com', 'password': 'password'})
        assert 'refresh_token' in response.cookies

    def test_login_invalid_credentials(self):
        response = client.post('/login', json={'email': 'wrong@example.com', 'password': 'wrong'})
        assert response.status_code == 401

@pytest.mark.django_db
class TestLogout:
    def test_logout_increments_token_version(self, user):
        initial_version = user.token_version
        client.post('/logout', user=user, auth=user)
        user.refresh_from_db()
        assert user.token_version == initial_version + 1

    def test_logout_deletes_cookies(self, user):
        response = client.post('/logout', user=user, auth=user)
        assert response.cookies['access_token']['max-age'] == 0
        assert response.cookies['refresh_token']['max-age'] == 0

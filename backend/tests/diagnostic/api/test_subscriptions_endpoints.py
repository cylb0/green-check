import pytest
from ninja.testing import TestClient
from diagnostic.api.endpoints.subscriptions import router
from diagnostic.models import Plan, Subscription
from django.contrib.auth import get_user_model

User = get_user_model()
client = TestClient(router)

@pytest.fixture
def user():
    return User.objects.create_user(email='test@example.com', password='password')

@pytest.fixture
def plan_free():
    return Plan.objects.create(name='Freemium', quota_limit=10, price_in_cents=0, duration_days=30)

@pytest.fixture
def plan_pro():
    return Plan.objects.create(name='Pro', quota_limit=100, price_in_cents=999, duration_days=30)

@pytest.fixture
def active_subscription(user, plan_free):
    return Subscription.objects.subscribe(user=user, plan=plan_free)

@pytest.mark.django_db
class TestGetMySubscription:
    def test_returns_active_subscription(self, active_subscription, user):
        response = client.get('/me', auth=user)
        assert response.status_code == 200
        assert response.json()['status'] == Subscription.StatusChoice.ACTIVE

    def test_returns_404_when_no_active_subscription(self, user):
        response = client.get('/me', auth=user)
        assert response.status_code == 404

@pytest.mark.django_db
class TestSubscribe:
    def test_subscribe_creates_subscription(self, user, plan_free):
        response = client.post('', json={'plan_id': plan_free.id}, auth=user)
        assert response.status_code == 201
        assert Subscription.objects.active().filter(user=user).exists()

    def test_subscribe_returns_subscription(self, user, plan_free):
        response = client.post('', json={'plan_id': plan_free.id}, auth=user)
        assert response.json()['status'] == Subscription.StatusChoice.ACTIVE

    def test_subscribe_returns_400_if_already_active(self, active_subscription, user, plan_free):
        response = client.post('', json={'plan_id': plan_free.id}, auth=user)
        assert response.status_code == 400

@pytest.mark.django_db
class TestUpgrade:
    def test_upgrade_returns_200(self, active_subscription, user, plan_pro):
        response = client.post('/upgrade', json={'new_plan_id': plan_pro.id}, auth=user)
        assert response.status_code == 200

    def test_upgrade_returns_new_plan(self, active_subscription, user, plan_pro):
        response = client.post('/upgrade', json={'new_plan_id': plan_pro.id}, auth=user)
        assert response.json()['plan']['name'] == plan_pro.name

    def test_upgrade_returns_400_if_no_active_subscription(self, user, plan_pro):
        response = client.post('/upgrade', json={'new_plan_id': plan_pro.id}, auth=user)
        assert response.status_code == 400

    def test_upgrade_returns_400_if_same_plan(self, active_subscription, user, plan_free):
        response = client.post('/upgrade', json={'new_plan_id': plan_free.id}, auth=user)
        assert response.status_code == 400

@pytest.mark.django_db
class TestCancel:
    def test_cancel_returns_200(self, active_subscription, user):
        response = client.post('/cancel', auth=user)
        assert response.status_code == 200

    def test_cancel_returns_canceled_status(self, active_subscription, user):
        response = client.post('/cancel', auth=user)
        assert response.json()['status'] == Subscription.StatusChoice.CANCELED

    def test_cancel_returns_400_if_no_active_subscription(self, user):
        response = client.post('/cancel', auth=user)
        assert response.status_code == 400
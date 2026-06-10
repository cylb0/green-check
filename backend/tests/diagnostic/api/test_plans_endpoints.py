import pytest
from ninja.testing import TestClient
from diagnostic.api.endpoints.plans import router
from diagnostic.models import Plan
from django.contrib.auth import get_user_model

User = get_user_model()
client = TestClient(router)

@pytest.fixture
def user():
    return User.objects.create_user(email='test@example.com', password='password')

@pytest.fixture
def plan():
    return Plan.objects.create(
        name='Freemium',
        quota_limit=10,
        price_in_cents=0,
        duration_days=30
    )

@pytest.fixture
def plans():
    return [
        Plan.objects.create(name='Freemium', quota_limit=10, price_in_cents=0, duration_days=30),
        Plan.objects.create(name='Pro', quota_limit=100, price_in_cents=999, duration_days=30),
    ]

@pytest.mark.django_db
class TestListPlans:
    def test_returns_200(self, plans):
        response = client.get('')
        assert response.status_code == 200

    def test_returns_all_plans(self, plans):
        response = client.get('')
        assert len(response.json()) == 2

    def test_returns_empty_list(self):
        response = client.get('')
        assert response.json() == []

    def test_no_auth_required(self, plans):
        response = client.get('')
        assert response.status_code != 401

@pytest.mark.django_db
class TestGetPlan:
    def test_returns_200(self, plan, user):
        response = client.get(f'/{plan.id}', auth=user)
        assert response.status_code == 200

    def test_returns_correct_plan(self, plan, user):
        response = client.get(f'/{plan.id}', auth=user)
        assert response.json()['name'] == plan.name

    def test_returns_404_for_unknown_plan(self, user):
        response = client.get('/9999', auth=user)
        assert response.status_code == 404

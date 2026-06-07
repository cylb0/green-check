import pytest
from django.contrib.auth import get_user_model
from diagnostic.models.user import User
from diagnostic.models.plan import Plan

User = get_user_model()

@pytest.fixture
def user():
    return User.objects.create_user(email="test@example.com", password="testpassword")

@pytest.fixture
def admin():
    return User.objects.create_superuser(email="admin@example.com", password="adminpassword")

@pytest.fixture
def plan_free():
    return Plan.objects.create(name="Freemium", quota_limit=10, price_in_cents=0, duration_days=30)

@pytest.mark.django_db
class TestUserManager:
    def test_create_user(self, user):
        assert user.email == "test@example.com"
        assert user.is_active
        assert not user.is_staff
        assert not user.is_superuser
        assert user.created_at is not None

    def test_create_superuser(self, admin):
        assert admin.email == "admin@example.com"
        assert admin.is_active
        assert admin.is_staff
        assert admin.is_superuser
        assert admin.created_at is not None

    def test_password_is_hashed(self, user):
        assert user.password != "testpassword"
        assert user.password.startswith('pbkdf2_sha256')

    def test_create_user_without_email(self):
        with pytest.raises(ValueError, match="Email required"):
            User.objects.create_superuser(email=None, password='testpassword')
            

    def test_create_user_without_password(self):
        with pytest.raises(ValueError, match = "Password required"):
            User.objects.create_superuser(email='test@example.com', password=None)

@pytest.mark.django_db
class TestUserModel:
    def test_user_str(self, user):
        assert str(user) == 'test@example.com'

    def test_user_permissions(self, user, admin):
        assert not user.has_perm('random.permission')
        assert admin.has_perm('random.permission')

@pytest.mark.django_db
class TestUserMethods:
    def test_subscribe(self, user, plan_free):
        sub = user.subscribe(plan_free)
        assert sub.user == user
        assert sub.plan == plan_free

    def test_active_subscriptions(self, user, plan_free):
        user.subscribe(plan_free)
        assert user.active_subscriptions().count() == 1

    def test_active_subscriptions_exclude_expired(self, user, plan_free):
        sub = user.subscribe(plan_free)
        sub.expire()
        assert user.active_subscriptions().count() == 0

    def test_active_plans(self, user, plan_free):
        user.subscribe(plan_free)
        assert plan_free in user.active_plans()

    def test_active_plans_exclude_expired(self, user, plan_free):
        sub = user.subscribe(plan_free)
        sub.expire()
        assert plan_free not in user.active_plans()

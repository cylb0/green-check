from datetime import timedelta
import pytest
from django.utils import timezone
from diagnostic.models import Plan, Subscription
from django.contrib.auth import get_user_model
from django.db import IntegrityError

User = get_user_model()

@pytest.fixture
def plan_free():
    return Plan.objects.create(name="Freemium", quota_limit=10, price_in_cents=0, duration_days=30)

@pytest.fixture
def plan_pro():
    return Plan.objects.create(name="Pro", quota_limit=100, price_in_cents=999, duration_days=30)

@pytest.fixture
def user():
    return User.objects.create_user(email="test@example.com", password="password")

@pytest.fixture
def active_subscription(user, plan_free):
    return Subscription.objects.subscribe(user=user, plan=plan_free)

@pytest.mark.django_db
class TestSubscriptionManager:
    def test_subscribe_creates_subscription(self, user, plan_free):
        sub = Subscription.objects.subscribe(user, plan_free)
        assert sub.pk is not None
        assert sub.status == Subscription.StatusChoice.ACTIVE
        assert sub.user == user
        assert sub.plan == plan_free

    def test_subscribe_sets_period_dates(self, user, plan_free):
        today = timezone.now().date()
        sub = Subscription.objects.subscribe(user, plan_free)
        assert sub.current_period_start == today
        assert sub.current_period_end == today + timedelta(days=plan_free.duration_days)

    def test_subscribe_raises_if_already_active(slef, active_subscription, user, plan_free):
        with pytest.raises(ValueError, match=f"already has an active subscription to '{plan_free}'"):
            Subscription.objects.subscribe(user, plan_free)

    def test_subscribe_allow_new_after_expired(self, user, plan_free):
        sub = Subscription.objects.subscribe(user, plan_free)
        sub.expire()
        new_sub = Subscription.objects.subscribe(user, plan_free)
        assert new_sub.pk != sub.pk
        assert new_sub.status == Subscription.StatusChoice.ACTIVE

    def test_upgrade_expires_old_subscription_creates_new_subscription(self, active_subscription, user, plan_pro):
        old_sub = active_subscription
        new_sub = Subscription.objects.upgrade(user, plan_pro)
        old_sub.refresh_from_db()
        assert old_sub.status == Subscription.StatusChoice.EXPIRED
        assert new_sub.plan == plan_pro
        assert new_sub.status == Subscription.StatusChoice.ACTIVE

    def test_upgrade_raises_if_no_active_subscription(self, user, plan_pro):
        with pytest.raises(ValueError, match="No active subscription"):
            Subscription.objects.upgrade(user, plan_pro)

    def test_upgrade_raises_if_same_plan(self, active_subscription, user, plan_free):
        with pytest.raises(ValueError, match="User is already on this plan."):
            Subscription.objects.upgrade(user, plan_free)

    def test_renew_expires_old_subscription_creates_new_subscription(self, active_subscription, user):
        old_sub = active_subscription
        new_sub = Subscription.objects.renew(user)
        old_sub.refresh_from_db()
        assert old_sub.status == Subscription.StatusChoice.EXPIRED
        assert new_sub.status == Subscription.StatusChoice.ACTIVE
        assert new_sub.plan == old_sub.plan

    def test_renew_raises_if_no_active_subscription(self, user):
        with pytest.raises(ValueError, match="No active subscription to renew."):
            Subscription.objects.renew(user)

@pytest.mark.django_db
class TestSubscriptionQuerySets:
    def test_active_queryset(self, active_subscription):
        assert Subscription.objects.active().filter(pk=active_subscription.pk).exists()

    def test_expired_queryset(self, active_subscription):
        active_subscription.expire()
        assert Subscription.objects.expired().filter(pk=active_subscription.pk).exists()
        assert not Subscription.objects.active().filter(pk=active_subscription.pk).exists()

    def test_stale_queryset(self, active_subscription):
        active_subscription.current_period_end = timezone.now().date() - timedelta(days=1)
        active_subscription.save(update_fields=['current_period_end'])
        assert Subscription.objects.stale().filter(pk=active_subscription.pk).exists()

@pytest.mark.django_db
class TestSubscriptionMethods:
    def test_expire(self, active_subscription):
        active_subscription.expire()
        active_subscription.refresh_from_db()
        assert active_subscription.status == Subscription.StatusChoice.EXPIRED

    def test_cancel(self, active_subscription):
        active_subscription.cancel()
        active_subscription.refresh_from_db()
        assert active_subscription.status == Subscription.StatusChoice.CANCELED
        assert active_subscription.canceled_at == timezone.now().date()

    def test_increment_quota(self, active_subscription):
        active_subscription.increment_quota()
        assert active_subscription.quota_used == 1

        active_subscription.increment_quota(amount=2)
        assert active_subscription.quota_used == 3

    def test_quota_remaining(self, active_subscription):
        assert active_subscription.quota_remaining == active_subscription.plan.quota_limit
        active_subscription.increment_quota(amount=3)
        assert active_subscription.quota_remaining == active_subscription.plan.quota_limit - 3

    def test_quota_remaining_never_negative(self, active_subscription):
        active_subscription.quota_used = active_subscription.plan.quota_limit + 10
        active_subscription.save()
        assert active_subscription.quota_remaining == 0

    def test_is_expired_property(self, active_subscription):
        assert not active_subscription.is_expired
        active_subscription.current_period_end = timezone.now().date() - timedelta(days=1)
        active_subscription.save()
        assert active_subscription.is_expired

    def test_has_quota(self, active_subscription):
        assert active_subscription.has_quota
        active_subscription.quota_used = active_subscription.plan.quota_limit
        active_subscription.save()
        assert not active_subscription.has_quota

    def test_reset_quota(self, active_subscription):
        active_subscription.quota_used = active_subscription.plan.quota_limit
        active_subscription.reset_quota()
        assert active_subscription.has_quota

@pytest.mark.django_db
class TestSubscriptionConstraints:
    def test_unique_active_subscription_per_plan(self, user, plan_free):
        today = timezone.now().date()
        Subscription.objects.create(user=user, plan=plan_free, current_period_start=today, current_period_end=today + timedelta(days=30))
        with pytest.raises(IntegrityError):
            Subscription.objects.create(user=user, plan=plan_free, current_period_start=today, current_period_end=today + timedelta(days=30))

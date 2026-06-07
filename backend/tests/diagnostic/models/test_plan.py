import pytest
from django.db import IntegrityError
from diagnostic.models import Plan

@pytest.fixture
def plan_free():
    return Plan.objects.create(
        name="Freemium",
        description="10 diagnostics per month",
        quota_limit=10,
        price_in_cents=0,
        duration_days=30
    )

@pytest.mark.django_db
class TestPlanModel:
    def test_plan_creation(self, plan_free):
        assert plan_free.name == "Freemium"
        assert plan_free.description == "10 diagnostics per month"
        assert plan_free.quota_limit == 10
        assert plan_free.price_in_cents == 0
        assert plan_free.duration_days == 30
        assert plan_free.is_active

    def test_price_display_formatting(self, plan_free):
        assert plan_free.price_display == "0.00"

        plan_premium = Plan.objects.create(name="Premium", quota_limit=100, price_in_cents=999)
        assert plan_premium.price_display == "9.99"

        plan_pro = Plan.objects.create(name="Pro", quota_limit=1000, price_in_cents=2000)
        assert plan_pro.price_display == "20.00"
    
    def test_name_unicity(self, plan_free):
        with pytest.raises(IntegrityError):
            Plan.objects.create(name="Freemium", quota_limit=50, price_in_cents=0)
    
    def test_description_can_be_blank_or_null(self):
        plan = Plan.objects.create(name="Entreprise", quota_limit=999, price_in_cents=9999)
        assert plan.description is None

    def test_can_deactivate_plan(self, plan_free):
        plan_free.is_active = False
        plan_free.save()
        assert Plan.objects.get(pk=plan_free.pk).is_active is False
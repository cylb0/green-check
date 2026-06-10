from ninja import ModelSchema
from diagnostic.models import Plan

class PlanOut(ModelSchema):
    price_display: str

    class Meta:
        model = Plan
        fields = ['id', 'name', 'description', 'quota_limit', 'price_in_cents', 'is_active', 'duration_days']

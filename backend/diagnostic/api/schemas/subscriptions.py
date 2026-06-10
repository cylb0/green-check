from ninja import Schema, ModelSchema
from diagnostic.models import Subscription
from diagnostic.api.schemas.plans import PlanOut

class SubscriptionOut(ModelSchema):
    is_expired: bool
    quota_remaining: int
    has_quota: bool
    plan: PlanOut

    class Meta:
        model = Subscription
        fields = ['id', 'status', 'quota_used', 'current_period_end']

class SubscriptionIn(Schema):
    plan_id: int

class UpgradeIn(Schema):
    new_plan_id: int
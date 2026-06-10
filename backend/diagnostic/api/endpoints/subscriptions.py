from ninja import Router, Status
from diagnostic.api.schemas.subscriptions import SubscriptionIn, SubscriptionOut, UpgradeIn
from diagnostic.models import Plan, Subscription
from ninja.errors import HttpError
from django.shortcuts import get_object_or_404

router = Router()

@router.get('/me', response={200: SubscriptionOut})
def get_my_subscription(request):
    sub = Subscription.objects.active().filter(user=request.auth).first()
    if not sub:
        raise HttpError(404, 'No active subscription')
    return sub

@router.post('', response={201: SubscriptionOut})
def subscribe(request, payload: SubscriptionIn):
    plan = get_object_or_404(Plan, id=payload.plan_id)
    try:
        return Status(201, Subscription.objects.subscribe(user=request.auth, plan=plan))
    except ValueError as e:
        raise HttpError(400, str(e))

@router.post('/upgrade', response={200: SubscriptionOut})
def upgrade(request, payload: UpgradeIn):
    plan = get_object_or_404(Plan, id=payload.new_plan_id)
    try:
        return Subscription.objects.upgrade(user=request.auth, new_plan=plan)
    except ValueError as e:
        raise HttpError(400, str(e))

@router.post('/cancel', response={200: SubscriptionOut})
def cancel(request):
    try:
        return Subscription.objects.cancel(user=request.auth)
    except ValueError as e:
        raise HttpError(400, str(e))

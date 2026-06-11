from ninja import Router
from django.shortcuts import get_object_or_404
from diagnostic.models import Plan
from diagnostic.api.schemas.plans import PlanOut

router = Router()

@router.get('', response={200: list[PlanOut]}, auth=None)
def list_plans(request):
    return Plan.objects.all()

@router.get('/{plan_id}', response={200: PlanOut}, auth=None)
def get_plan(request, plan_id: int):
    return get_object_or_404(Plan, id=plan_id)

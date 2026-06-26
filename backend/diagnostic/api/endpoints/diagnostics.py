from diagnostic.api.schemas.advice_rules import AdviceRuleOut
from diagnostic.api.schemas.diagnostics import DiagnosticOut
from ninja import Router, Status
from diagnostic.models import Diagnostic
import uuid
from django.shortcuts import get_object_or_404
from django.http import Http404

router = Router()

@router.get('', response={200: list[DiagnosticOut]})
def list_diagnostics(request):
    return Diagnostic.objects.filter(submission__user=request.auth).order_by('-created_at')

@router.get('/{diagnostic_id}', response={200: DiagnosticOut})
def get_diagnostic(request, diagnostic_id: uuid.UUID):
    return get_object_or_404(Diagnostic, id=diagnostic_id, submission__user=request.auth)

@router.delete('/{diagnostic_id}', response={204: None})
def delete_diagnostic(request, diagnostic_id: uuid.UUID):
    diagnostic = get_object_or_404(Diagnostic, id=diagnostic_id, submission__user=request.auth)
    diagnostic.delete()
    return Status(204, None)

@router.get('/{diagnostic_id}/advice', response={200: AdviceRuleOut})
def get_diagnostic_advice(request, diagnostic_id: uuid.UUID):
    diagnostic = get_object_or_404(Diagnostic, id=diagnostic_id, submission__user=request.auth)
    if not diagnostic.advice_rule:
        raise Http404("Advice rule not found")
        
    return diagnostic.advice_rule

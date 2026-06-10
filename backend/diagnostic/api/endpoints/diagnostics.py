from diagnostic.api.schemas.diagnostics import DiagnosticOut
from ninja import Router, Status
from diagnostic.models import Diagnostic
import uuid
from django.shortcuts import get_object_or_404

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
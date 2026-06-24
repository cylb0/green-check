from config.tasks import run_ai_prediction
from ninja import Router, File, Status
from ninja.errors import HttpError
from diagnostic.api.schemas.plant_submissions import PlantSubmissionCreatedOut, PlantSubmissionIn, PlantSubmissionOut
from diagnostic.models import Diagnostic, PlantSubmission
from django.shortcuts import get_object_or_404
import uuid
from ninja.files import UploadedFile
from django.db import transaction

router = Router()

@router.get('', response={200: list[PlantSubmissionOut]})
def list_submissions(request):
    return PlantSubmission.objects.filter(user=request.auth).order_by('-submitted_at')

@router.get('/{submission_id}', response={200: PlantSubmissionOut, 404: None})
def get_submission(request, submission_id: uuid.UUID):
    return get_object_or_404(PlantSubmission, id=submission_id, user=request.auth)

@router.post('', response={201: PlantSubmissionCreatedOut})
def create_submission(request, payload: PlantSubmissionIn, image: UploadedFile=File(...)):
    if not image.content_type.startswith('image/'):
        raise HttpError(400, "Invalid file type. Only images are allowed.")
    sub = PlantSubmission.objects.create_with_image(
        user=request.auth,
        image=image,
        **payload.dict()
    )

    diagnostic = Diagnostic.objects.create(submission=sub)

    transaction.on_commit(lambda: run_ai_prediction.delay(
        str(diagnostic.id), sub.image.name
    ))

    return Status(201, {
        "submission": sub,
        "diagnostic_id": str(diagnostic.id)
    })

@router.delete('/{submission_id}', response={204: None})
def delete_submission(request, submission_id: uuid.UUID):
    submission = get_object_or_404(PlantSubmission, id=submission_id, user=request.auth)
    submission.delete()
    return Status(204, None)

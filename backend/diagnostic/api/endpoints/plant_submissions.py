from ninja import Router, File, Status
from ninja.errors import HttpError
from diagnostic.api.schemas.plant_submissions import PlantSubmissionIn, PlantSubmissionOut
from diagnostic.models import PlantSubmission
from django.shortcuts import get_object_or_404
import uuid
from ninja.files import UploadedFile

router = Router()

@router.get('', response={200: list[PlantSubmissionOut]})
def list_submissions(request):
    return PlantSubmission.objects.filter(user=request.auth).order_by('-submitted_at')

@router.get('/{submission_id}', response={200: PlantSubmissionOut, 404: None})
def get_submission(request, submission_id: uuid.UUID):
    return get_object_or_404(PlantSubmission, id=submission_id, user=request.auth)

@router.post('', response={201: PlantSubmissionOut})
def create_submission(request, payload: PlantSubmissionIn, image: UploadedFile=File(...)):
    if not image.content_type.startswith('image/'):
        raise HttpError(400, "Invalid file type. Only images are allowed.")
    return Status(201, PlantSubmission.objects.create_with_image(
        user=request.auth,
        image=image,
        **payload.dict()
    ))

@router.delete('/{submission_id}', response={204: None})
def delete_submission(request, submission_id: uuid.UUID):
    submission = get_object_or_404(PlantSubmission, id=submission_id, user=request.auth)
    submission.delete()
    return Status(204, None)
from unittest.mock import MagicMock, mock_open, patch
import pytest
from django.contrib.auth import get_user_model
from config.tasks import run_ai_prediction
from diagnostic.models import (
    Diagnostic,
    DiagnosticStatusChoice,
    ExposureChoice,
    PlantSubmission,
    PlantTypeChoice,
    SoilTypeChoice
)

User = get_user_model()

@pytest.fixture
def user():
    return User.objects.create_user(email="test@example.com", password="password")

@pytest.fixture
def submission(user):
    return PlantSubmission.objects.create(
        user=user,
        plant_type=PlantTypeChoice.TOMATO,
        exposure=ExposureChoice.FULL_SUN,
        soil_type=SoilTypeChoice.CLAY,
        image="path/to/image.jpg",
    )

@pytest.fixture
def diagnostic(submission):
    return Diagnostic.objects.create(submission=submission)

@pytest.mark.django_db
class TestRunAiPrediction:
    @patch("config.tasks.requests.post")
    @patch(
        "django.core.files.storage.default_storage.open",
        new_callable=mock_open,
        read_data=b"image bytes",
    )
    def test_sets_ai_error_when_ai_service_response_is_malformed(
        self, _mock_open, mock_post, diagnostic
    ):
        response = MagicMock()
        response.raise_for_status.return_value = None
        response.json.return_value = {}
        mock_post.return_value = response

        run_ai_prediction.apply(
            args=(str(diagnostic.id), diagnostic.submission.image.name)
        )

        diagnostic.refresh_from_db()
        assert diagnostic.status == DiagnosticStatusChoice.AI_ERROR

import pytest
from django.contrib.auth import get_user_model
from diagnostic.models import AdviceRule, Diagnostic, DiseaseLabelChoice, ExposureChoice, PlantSubmission, PlantTypeChoice, SoilTypeChoice

User = get_user_model()

@pytest.fixture
def user():
    return User.objects.create_user(email='test@example.com', password='password')

@pytest.fixture
def submission(user):
    return PlantSubmission.objects.create(
        user=user,
        plant_type=PlantTypeChoice.TOMATO,
        latitude=34.052235,
        longitude=-118.243724,
        exposure=ExposureChoice.FULL_SUN,
        soil_type=SoilTypeChoice.CLAY,
        image='path/to/image.jpg'
    )

@pytest.fixture
def rule():
    return AdviceRule.objects.create(
        plant_type=PlantTypeChoice.TOMATO,
        disease_label=DiseaseLabelChoice.EARLY_BLIGHT,
        advice_text='Advice text'
    )

@pytest.fixture
def diagnostic(submission):
    return Diagnostic.objects.create(
        submission=submission,
        detected_plant=PlantTypeChoice.TOMATO,
        plant_confidence=0.85,
        detected_disease=DiseaseLabelChoice.EARLY_BLIGHT,
        disease_confidence=0.95
    )

@pytest.mark.django_db
class TestDiagnostic:
    def test_create_diagnostic(self, diagnostic, submission, rule):
        assert diagnostic.pk is not None
        assert diagnostic.submission is submission
        assert diagnostic.advice_rule is None
        assert diagnostic.status == Diagnostic.StatusChoice.PENDING
        assert diagnostic.detected_plant == PlantTypeChoice.TOMATO
        assert diagnostic.plant_confidence == 0.85
        assert diagnostic.detected_disease == DiseaseLabelChoice.EARLY_BLIGHT
        assert diagnostic.disease_confidence == 0.95
        assert diagnostic.advice_text is None

    def test_apply_advice(self, diagnostic, rule):
        diagnostic.advice_rule = rule
        diagnostic.save()
        diagnostic.apply_advice()

        assert diagnostic.advice_text == rule.advice_text

    def test_diagnostic_state_success(self, diagnostic, rule):
        assert diagnostic.status == Diagnostic.StatusChoice.PENDING

        diagnostic.advice_rule = rule
        diagnostic.save()
        diagnostic.apply_advice()

        assert diagnostic.status == Diagnostic.StatusChoice.SUCCESS

    def test_diagnostic_state_failed_no_rule(self, diagnostic):
        diagnostic.detected_disease = DiseaseLabelChoice.LATE_BLIGHT
        diagnostic.save()
        diagnostic.apply_advice()

        assert diagnostic.status == Diagnostic.StatusChoice.FAILED

    def test_apply_advice_low_confidence_plant(self, diagnostic):
        diagnostic.plant_confidence = 0.01
        diagnostic.save()
        diagnostic.apply_advice()
        assert diagnostic.status == Diagnostic.StatusChoice.LOW_CONFIDENCE

    def test_apply_advice_low_confidence_disease(self, diagnostic):
        diagnostic.disease_confidence = 0.01
        diagnostic.save()
        diagnostic.apply_advice()
        assert diagnostic.status == Diagnostic.StatusChoice.LOW_CONFIDENCE

    def test_advice_text_not_set_on_failure(self, diagnostic):
        diagnostic.detected_disease = DiseaseLabelChoice.LATE_BLIGHT
        diagnostic.save()
        diagnostic.apply_advice()
        assert diagnostic.advice_text is None

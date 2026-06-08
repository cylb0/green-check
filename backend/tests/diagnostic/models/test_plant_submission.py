import pytest
from diagnostic.models import PlantSubmission, ExposureChoice, SoilTypeChoice
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

User = get_user_model()

@pytest.fixture
def user():
    return User.objects.create_user(email="test@example.com", password="testpassword")

@pytest.fixture
def image():
    image_bytes = (
        b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x00\x00\x00\x21\xf9\x04'
        b'\x01\x00\x00\x00\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02'
        b'\x02\x44\x01\x00\x3b'
    )
    return SimpleUploadedFile(name='test.jpg', content=image_bytes, content_type='image/gif')

@pytest.mark.django_db
class TestPlantSubmission:
    def test_create_plant_submission(self, user, image):
        submission = PlantSubmission.objects.create(
            user=user,
            plant_type='Tomato',
            latitude=34.052235,
            longitude=-118.243724,
            exposure=ExposureChoice.PARTIAL_SHADE,
            soil_type=SoilTypeChoice.CLAY,
            image=image
        )

        assert PlantSubmission.objects.count() == 1
        assert submission.user == user
        assert submission.plant_type == 'Tomato'
        assert submission.latitude == 34.052235
        assert submission.longitude == -118.243724
        assert submission.exposure == ExposureChoice.PARTIAL_SHADE
        assert submission.soil_type == SoilTypeChoice.CLAY
        assert submission.image.name.startswith('plant_submissions/')
        assert submission.image.path.endswith('.jpg')

    def test_create_plant_submission_without_image(self, user):
        submission = PlantSubmission(
            user=user,
            plant_type='Tomato',
        )
        with pytest.raises(ValidationError) as excinfo:
            submission.full_clean()

        errors = excinfo.value.error_dict

        assert 'image' in errors
        assert 'This field cannot be blank.' in str(errors['image'])

    def test_invalid_choice(self, user, image):
        submission = PlantSubmission(
            user=user,
            plant_type='Tomato',
            image=image,
            soil_type='invalid_soil'
        )

        with pytest.raises(ValidationError):
            submission.full_clean()

    def test_latitude_precision_validation(self, user, image):
        submission = PlantSubmission(
            user=user,
            plant_type='Tomato',
            image=image,
            latitude=1234567.123456
        )

        with pytest.raises(ValidationError):
            submission.full_clean()

    def test_cascade_delete(self, user, image):
        PlantSubmission.objects.create(
            user=user,
            plant_type='Tomato',
            image=image
        )

        assert PlantSubmission.objects.count() == 1

        user.delete()

        assert PlantSubmission.objects.count() == 0

    def test_str_method(self, user, image):
        submission = PlantSubmission(
            user=user,
            plant_type='Tomato',
            image=image,
        )
        assert 'Tomato - test@example.com' in str(submission)

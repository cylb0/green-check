import pytest
from ninja.testing import TestClient
from diagnostic.api.endpoints.plant_submissions import router
from diagnostic.models import PlantSubmission
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
import uuid

User = get_user_model()
client = TestClient(router)

@pytest.fixture
def user():
    return User.objects.create_user(email='test@example.com', password='password')

@pytest.fixture
def other_user():
    return User.objects.create_user(email='other@example.com', password='password')

@pytest.fixture
def image():
    return SimpleUploadedFile('image.jpg', b'filecontent', content_type='image/jpeg')

@pytest.fixture
def submission(user):
    return PlantSubmission.objects.create_with_image(user=user, image=SimpleUploadedFile('image.jpg', b'filecontent', content_type='image/jpeg'))

@pytest.mark.django_db
class TestListSubmissions:
    def test_returns_200(self, submission, user):
        response = client.get('', auth=user)
        assert response.status_code == 200

    def test_returns_only_user_submissions(self, submission, user, other_user):
        PlantSubmission.objects.create_with_image(
            user=other_user,
            image=SimpleUploadedFile('image.jpg', b'filecontent', content_type='image/jpeg')
        )
        response = client.get('', auth=user)
        assert len(response.json()) == 1

    def test_returns_empty_list(self, user):
        response = client.get('', auth=user)
        assert response.json() == []

    def test_ordered_by_submitted_at_desc(self, user):
        img1 = SimpleUploadedFile('a.jpg', b'x', content_type='image/jpeg')
        img2 = SimpleUploadedFile('b.jpg', b'x', content_type='image/jpeg')
        sub1 = PlantSubmission.objects.create_with_image(user=user, image=img1)
        sub2 = PlantSubmission.objects.create_with_image(user=user, image=img2)
        response = client.get('', auth=user)
        ids = [item['id'] for item in response.json()]
        assert ids[0] == str(sub2.id)
        assert ids[1] == str(sub1.id)

@pytest.mark.django_db
class TestGetSubmission:
    def test_returns_200(self, submission, user):
        response = client.get(f'/{submission.id}', auth=user)
        assert response.status_code == 200

    def test_returns_correct_submission(self, submission, user):
        response = client.get(f'/{submission.id}', auth=user)
        assert response.json()['id'] == str(submission.id)

    def test_returns_404_for_unknown_submission(self, user):
        response = client.get(f'/{uuid.uuid4()}', auth=user)
        assert response.status_code == 404

    def test_returns_404_for_other_user_submission(self, submission, other_user):
        response = client.get(f'/{submission.id}', auth=other_user)
        assert response.status_code == 404

@pytest.mark.django_db
class TestCreateSubmission:
    def test_returns_201(self, user, image):
        response = client.post(
            '',
            data={'payload': '{}'},
            FILES={'image': image},
            auth=user
        )
        print(response.json())
        assert response.status_code == 201

    def test_creates_submission(self, user, image):
        client.post('', data={'payload': '{}'}, FILES={'image': image}, auth=user)
        assert PlantSubmission.objects.filter(user=user).count() == 1

    def test_returns_400_for_invalid_file_type(self, user):
        pdf = SimpleUploadedFile('doc.pdf', b'content', content_type='application/pdf')
        response = client.post('', data={'payload': '{}'}, FILES={'image': pdf}, auth=user)
        assert response.status_code == 400

    def test_with_optional_fields(self, user, image):
        response = client.post(
            '',
            FILES={'image': image},
            data={'payload': '{"plant_type":"tomato","exposure":"full_sun"}'},
            auth=user
        )
        assert response.status_code == 201
        assert response.json()['plant_type'] == 'tomato'

@pytest.mark.django_db
class TestDeleteSubmission:
    def test_returns_204(self, submission, user):
        response = client.delete(f'/{submission.id}', auth=user)
        assert response.status_code == 204

    def test_deletes_submission(self, submission, user):
        client.delete(f'/{submission.id}', auth=user)
        assert not PlantSubmission.objects.filter(id=submission.id).exists()

    def test_returns_404_for_unknown_submission(self, user):
        response = client.delete(f'/{uuid.uuid4()}', auth=user)
        assert response.status_code == 404

    def test_returns_404_for_other_user_submission(self, submission, other_user):
        response = client.delete(f'/{submission.id}', auth=other_user)
        assert response.status_code == 404
        assert PlantSubmission.objects.filter(id=submission.id).exists()
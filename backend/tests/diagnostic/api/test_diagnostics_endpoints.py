import pytest
import uuid
from ninja.testing import TestClient
from diagnostic.api.endpoints.diagnostics import router
from diagnostic.models import Diagnostic, PlantSubmission
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile

User = get_user_model()
client = TestClient(router)

@pytest.fixture
def user():
    return User.objects.create_user(email='test@example.com', password='password')

@pytest.fixture
def other_user():
    return User.objects.create_user(email='other@example.com', password='password')

@pytest.fixture
def submission(user):
    return PlantSubmission.objects.create_with_image(
        user=user,
        image=SimpleUploadedFile('image.jpg', b'filecontent', content_type='image/jpeg')
    )

@pytest.fixture
def other_submission(other_user):
    return PlantSubmission.objects.create_with_image(
        user=other_user,
        image=SimpleUploadedFile('image.jpg', b'filecontent', content_type='image/jpeg')
    )

@pytest.fixture
def diagnostic(submission):
    return Diagnostic.objects.create(submission=submission)

@pytest.mark.django_db
class TestListDiagnostics:
    def test_returns_200(self, diagnostic, user):
        response = client.get('', auth=user)
        assert response.status_code == 200

    def test_returns_only_user_diagnostics(self, diagnostic, user, other_submission):
        Diagnostic.objects.create(submission=other_submission)
        response = client.get('', auth=user)
        assert len(response.json()) == 1

    def test_returns_empty_list(self, user):
        response = client.get('', auth=user)
        assert response.json() == []

    def test_ordered_by_created_at_desc(self, user, submission):
        sub2 = PlantSubmission.objects.create_with_image(
            user=user,
            image=SimpleUploadedFile('image.jpg', b'filecontent', content_type='image/jpeg')
        )
        d1 = Diagnostic.objects.create(submission=submission)
        d2 = Diagnostic.objects.create(submission=sub2)
        response = client.get('', auth=user)
        ids = [item['id'] for item in response.json()]
        assert ids[0] == str(d2.id)
        assert ids[1] == str(d1.id)

@pytest.mark.django_db
class TestGetDiagnostic:
    def test_returns_200(self, diagnostic, user):
        response = client.get(f'/{diagnostic.id}', auth=user)
        assert response.status_code == 200

    def test_returns_correct_diagnostic(self, diagnostic, user):
        response = client.get(f'/{diagnostic.id}', auth=user)
        assert response.json()['id'] == str(diagnostic.id)

    def test_returns_404_for_unknown_diagnostic(self, user):
        response = client.get(f'/{uuid.uuid4()}', auth=user)
        assert response.status_code == 404

    def test_returns_404_for_other_user_diagnostic(self, diagnostic, other_user):
        response = client.get(f'/{diagnostic.id}', auth=other_user)
        assert response.status_code == 404

@pytest.mark.django_db
class TestDeleteDiagnostic:
    def test_returns_204(self, diagnostic, user):
        response = client.delete(f'/{diagnostic.id}', auth=user)
        assert response.status_code == 204

    def test_deletes_diagnostic(self, diagnostic, user):
        client.delete(f'/{diagnostic.id}', auth=user)
        assert not Diagnostic.objects.filter(id=diagnostic.id).exists()

    def test_returns_404_for_unknown_diagnostic(self, user):
        response = client.delete(f'/{uuid.uuid4()}', auth=user)
        assert response.status_code == 404

    def test_returns_404_for_other_user_diagnostic(self, diagnostic, other_user):
        response = client.delete(f'/{diagnostic.id}', auth=other_user)
        assert response.status_code == 404
        assert Diagnostic.objects.filter(id=diagnostic.id).exists()
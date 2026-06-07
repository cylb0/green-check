import pytest
from django.contrib.auth import get_user_model
from diagnostic.models.user import User, UserManager

User = get_user_model()

@pytest.mark.django_db
def test_create_user():
    email = 'test@example.com'
    password = 'testpassword'
    user = User.objects.create_user(email=email, password=password)
    assert user.email == email
    assert user.is_active
    assert not user.is_staff
    assert not user.is_superuser
    assert user.created_at is not None
    assert user.quota_used is 0

@pytest.mark.django_db
def test_create_superuser():
    email = 'admin@example.com'
    password = 'adminpassword'
    user = User.objects.create_superuser(email=email, password=password)
    assert user.email == email
    assert user.is_active
    assert user.is_staff
    assert user.is_superuser
    assert user.created_at is not None
    assert user.quota_used is 0

@pytest.mark.django_db
def test_password_is_hashed():
    password = 'testpassword'
    user = User.objects.create_user(email='test@example.com', password=password)
    assert user.password != password
    assert user.password.startswith('pbkdf2_sha256')

@pytest.mark.django_db
def test_user_permissions():
    user = User.objects.create_user(email='test@example.com', password='testpassword')
    admin = User.objects.create_superuser(email='admin@example.com', password='adminpassword')

    assert not user.has_perm('random.permission')
    assert admin.has_perm('random.permission')

@pytest.mark.django_db
def test_create_user_without_email():
    with pytest.raises(ValueError, match="Email required"):
        User.objects.create_superuser(email=None, password='testpassword')
        

@pytest.mark.django_db
def test_create_user_without_password():
    with pytest.raises(ValueError, match = "Password required"):
        User.objects.create_superuser(email='test@example.com', password=None)

@pytest.mark.django_db
def test_user_str():
    user = User.objects.create_user(email='test@example.com', password='testpassword')
    assert str(user) == 'test@example.com'
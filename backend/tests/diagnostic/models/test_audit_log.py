import pytest
from django.utils import timezone
from django.contrib.auth import get_user_model
from diagnostic.models.audit_log import AuditLog

User = get_user_model()

@pytest.fixture
def user():
    return User.objects.create_user(email='test@example.com', password='password')

@pytest.fixture
def audit_log(user):
    return AuditLog.objects.create(
        user=user,
        action=AuditLog.ActionChoice.SUBSCRIPTION_CREATED,
        ip_hash='1234567890abcdef'
    )

@pytest.mark.django_db
class TestAuditLogModel:
    def test_create(self, audit_log, user):
        assert audit_log.pk is not None
        assert audit_log.user == user
        assert audit_log.action == AuditLog.ActionChoice.SUBSCRIPTION_CREATED
        assert audit_log.ip_hash == '1234567890abcdef'
        assert audit_log.created_at is not None

    def test_str(self, audit_log, user):
        assert str(user) in str(audit_log)
        assert AuditLog.ActionChoice.SUBSCRIPTION_CREATED in str(audit_log)

    def test_ordering(self, user):
        first = AuditLog.objects.create(user=user, action=AuditLog.ActionChoice.SUBMISSION_CREATED, ip_hash='a' * 64)
        second = AuditLog.objects.create(user=user, action=AuditLog.ActionChoice.DIAGNOSTIC_SUCCESS, ip_hash='b' * 64)
        logs = AuditLog.objects.all()
        assert logs[0] == second
        assert logs[1] == first

    def test_user_set_null_on_delete(self, audit_log, user):
        user.delete()
        audit_log.refresh_from_db()
        assert audit_log.user is None
    
    def test_created_at_not_editable(self, audit_log):
        original = audit_log.created_at
        audit_log.save()
        audit_log.refresh_from_db()
        assert audit_log.created_at == original
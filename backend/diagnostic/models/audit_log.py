import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings

class AuditLog(models.Model):
    class ActionChoice(models.TextChoices):
        SUBMISSION_CREATED = 'submission_created', _('Submission created')
        DIAGNOSTIC_SUCCESS = 'diagnostic_success', _('Diagnostic success')
        DIAGNOSTIC_FAILED = 'diagnostic_failed', _('Diagnostic failed')
        SUBSCRIPTION_CREATED = 'subscription_created', _('Subscription created')
        SUBSCRIPTION_EXPIRED = 'subscription_expired', _('Subscription expired')
        SUBSCRIPTION_CANCELED = 'subscription_canceled', _('Subscription canceled')

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='audit_logs')
    action = models.CharField(max_length=50, choices=ActionChoice.choices)
    ip_hash = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} - {self.action} ({self.created_at})"

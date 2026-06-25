import uuid
from django.db import models
from diagnostic.models.choices import DiseaseLabelChoice, PlantTypeChoice, DiagnosticStatusChoice

class DiagnosticQuerySet(models.QuerySet):
    def pending(self):
        return self.filter(status=DiagnosticStatusChoice.PENDING)
    
    def failed(self):
        return self.filter(status=DiagnosticStatusChoice.FAILED)
    
    def success(self):
        return self.filter(status=DiagnosticStatusChoice.SUCCESS)
    
class DiagnosticManager(models.Manager):
    def get_queryset(self):
        return DiagnosticQuerySet(self.model, using=self._db)
    
    def pending(self):
        return self.get_queryset().pending()
    
    def failed(self):
        return self.get_queryset().failed()
    
    def success(self):
        return self.get_queryset().success()

class Diagnostic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    submission = models.OneToOneField('diagnostic.PlantSubmission', on_delete=models.CASCADE, related_name="diagnostic")
    advice_rule = models.ForeignKey('diagnostic.AdviceRule', on_delete=models.SET_NULL, null=True, blank=True, related_name="diagnostics")

    status = models.CharField(max_length=50, choices=DiagnosticStatusChoice.choices, default=DiagnosticStatusChoice.PENDING)

    detected_plant = models.CharField(max_length=255, choices=PlantTypeChoice.choices, null=True, blank=True)
    detected_disease = models.CharField(max_length=255, choices=DiseaseLabelChoice.choices, null=True, blank=True)
    confidence = models.FloatField(null=True, blank=True)

    advice_text = models.TextField(null=True, blank=True)
    raw_model_response = models.JSONField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    objects = DiagnosticManager()

    def apply_advice(self):
        from diagnostic.models.advice_rule import AdviceRule
        from diagnostic import config

        if (self.confidence or 0) < config.CONFIDENCE_THRESHOLD:
            self.status = DiagnosticStatusChoice.LOW_CONFIDENCE
            self.save(update_fields=['status'])
            return

        if self.detected_disease == DiseaseLabelChoice.HEALTHY:
            self.status = DiagnosticStatusChoice.SUCCESS
            self.save(update_fields=['status'])
            return
        
        rule = AdviceRule.objects.best_match(
            disease_label=self.detected_disease,
            plant_type=self.detected_plant,
            soil_type=self.submission.soil_type,
            exposure=self.submission.exposure,
        )

        if not rule:
            self.status = DiagnosticStatusChoice.FAILED
            self.save(update_fields=['status'])
            return
        
        self.advice_rule = rule
        self.advice_text = rule.advice_text
        self.status = DiagnosticStatusChoice.SUCCESS
        self.save(update_fields=['advice_rule', 'advice_text', 'status'])

    def __str__(self):
        return f"{self.detected_plant} — {self.detected_disease} ({self.status})"

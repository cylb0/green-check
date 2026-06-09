import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from diagnostic.models.choices import DiseaseLabelChoice, PlantTypeChoice

class DiagnosticQuerySet(models.QuerySet):
    def pending(self):
        return self.filter(status=Diagnostic.StatusChoice.PENDING)
    
    def failed(self):
        return self.filter(status=Diagnostic.StatusChoice.FAILED)
    
    def success(self):
        return self.filter(status=Diagnostic.StatusChoice.SUCCESS)
    
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
    class StatusChoice(models.TextChoices):
        PENDING = 'pending', _('Pending')
        PROCESSING = 'processing', _('Processing')
        SUCCESS = 'success', _('Success')
        LOW_CONFIDENCE = 'low_confidence', _('Low confidence')
        FAILED = 'failed', _('Failed')

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    submission = models.OneToOneField('diagnostic.PlantSubmission', on_delete=models.CASCADE, related_name="diagnostic")
    advice_rule = models.ForeignKey('diagnostic.AdviceRule', on_delete=models.SET_NULL, null=True, blank=True, related_name="diagnostics")

    status = models.CharField(max_length=50, choices=StatusChoice.choices, default=StatusChoice.PENDING)

    detected_plant = models.CharField(max_length=255, choices=PlantTypeChoice.choices, null=True, blank=True)
    plant_confidence = models.FloatField(null=True, blank=True)
    detected_disease = models.CharField(max_length=255, choices=DiseaseLabelChoice.choices, null=True, blank=True)
    disease_confidence = models.FloatField(null=True, blank=True)

    advice_text = models.TextField(null=True, blank=True)
    raw_model_response = models.JSONField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    objects = DiagnosticManager()

    def apply_advice(self):
        from diagnostic.models.advice_rule import AdviceRule
        from django.db.models import Case, When, IntegerField, Value
        from diagnostic import config

        plant_ok = (self.plant_confidence or 0) >= config.PLANT_CONFIDENCE_THRESHOLD
        disease_ok = (self.disease_confidence or 0) >= config.DISEASE_CONFIDENCE_THRESHOLD

        if not plant_ok:
            self.status = self.StatusChoice.LOW_CONFIDENCE
            self.save(update_fields=['status'])
            return

        if not disease_ok:
            self.status = self.StatusChoice.LOW_CONFIDENCE
            self.save(update_fields=['status'])
            return

        soil = self.submission.soil_type
        exposure = self.submission.exposure
        plant = self.detected_plant

        rule = (
            AdviceRule.objects.filter(disease_label=self.detected_disease)
            .filter(
                models.Q(plant_type=plant) | models.Q(plant_type=None),
                models.Q(soil_type=soil) | models.Q(soil_type=None),
                models.Q(exposure=exposure) | models.Q(exposure=None),
            )
            .annotate(
                specificity=Case(
                    When(plant_type=plant, soil_type=soil, exposure=exposure, then=Value(4)),
                    When(plant_type=plant, soil_type=soil, exposure=None, then=Value(3)),
                    When(plant_type=plant, soil_type=None, exposure=None, then=Value(2)),
                    When(plant_type=None, soil_type=None, exposure=None, then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                )
            )
            .order_by('-specificity')
            .first()
        )

        if not rule:
            self.status = self.StatusChoice.FAILED
            self.save(update_fields=['status'])
            return
        
        self.advice_rule = rule
        self.advice_text = rule.advice_text
        self.status = self.StatusChoice.SUCCESS
        self.save(update_fields=['advice_rule', 'advice_text', 'status'])

    def __str__(self):
        return f"{self.detected_plant} — {self.detected_disease} ({self.status})"

import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
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
        from django.db.models import Case, When, IntegerField, Value
        from diagnostic import config

        ok = (self.confidence or 0) >= config.CONFIDENCE_TRESHOLD

        if not ok:
            self.status = DiagnosticStatusChoice.LOW_CONFIDENCE
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
            self.status = DiagnosticStatusChoice.FAILED
            self.save(update_fields=['status'])
            return
        
        self.advice_rule = rule
        self.advice_text = rule.advice_text
        self.status = DiagnosticStatusChoice.SUCCESS
        self.save(update_fields=['advice_rule', 'advice_text', 'status'])

    def __str__(self):
        return f"{self.detected_plant} — {self.detected_disease} ({self.status})"

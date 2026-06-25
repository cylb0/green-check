from django.db import models
from django.utils.translation import gettext_lazy as _
from diagnostic.models.choices import DiseaseLabelChoice, ExposureChoice, PlantTypeChoice, SoilTypeChoice
from django.db.models import Case, When, IntegerField, Value

class AdviceRuleQuerySet(models.QuerySet):
    def best_match(self, disease_label, plant_type, soil_type, exposure):
        return (
            self.filter(disease_label=disease_label)
            .filter(
                models.Q(plant_type=plant_type) | models.Q(plant_type=None),
                models.Q(soil_type=soil_type) | models.Q(soil_type=None),
                models.Q(exposure=exposure) | models.Q(exposure=None),
            )
            .annotate(
                specificity=Case(
                    When(plant_type=plant_type, soil_type=soil_type, exposure=exposure, then=Value(4)),
                    When(plant_type=plant_type, soil_type=soil_type, exposure=None, then=Value(3)),
                    When(plant_type=plant_type, soil_type=None, exposure=None, then=Value(2)),
                    When(plant_type=None, soil_type=None, exposure=None, then=Value(1)),
                    default=Value(0),
                    output_field=IntegerField()
                )
            )
            .order_by('-specificity')
            .first()
        )

class AdviceRule(models.Model):
    class SeverityChoice(models.TextChoices):
        LOW = 'low', _('Low')
        MEDIUM = 'medium', _('Medium')
        HIGH = 'high', _('High')

    plant_type = models.CharField(max_length=255, choices=PlantTypeChoice.choices, null=True, blank=True)
    disease_label = models.CharField(max_length=255, choices=DiseaseLabelChoice.choices, null=False, blank=False)
    severity = models.CharField(max_length=50, choices=SeverityChoice.choices, default='low')
    exposure = models.CharField(max_length=20, choices=ExposureChoice.choices, null=True, blank=True)
    soil_type = models.CharField(max_length=20, choices=SoilTypeChoice.choices, null=True, blank=True)

    advice_text = models.TextField(null=False, blank=False)
    
    objects = AdviceRuleQuerySet.as_manager()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['plant_type', 'disease_label', 'severity', 'soil_type', 'exposure'],
                name='unique_advice_rule'
            )
        ]

    def __str__(self):
        return f"{self.plant_type or '*'} - {self.disease_label} ({self.severity or '*'})"
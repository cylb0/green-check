from django.db import models
from django.utils.translation import gettext_lazy as _, get_language
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

    treatments = models.ManyToManyField('diagnostic.Treatment', related_name='advice_rules', blank=True)

    advice_text_en = models.TextField()
    advice_text_fr = models.TextField(blank=True)
    
    objects = AdviceRuleQuerySet.as_manager()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['plant_type', 'disease_label', 'severity', 'soil_type', 'exposure'],
                name='unique_advice_rule'
            )
        ]

    @property
    def advice_text(self):
        if get_language() == 'fr':
            return self.advice_text_fr or self.advice_text_en
        return self.advice_text_en

    def __str__(self):
        return f"{self.plant_type or '*'} - {self.disease_label} ({self.severity or '*'})"
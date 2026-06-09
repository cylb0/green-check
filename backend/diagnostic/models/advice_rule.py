from django.db import models
from django.utils.translation import gettext_lazy as _
from diagnostic.models.choices import DiseaseLabelChoice, ExposureChoice, PlantTypeChoice, SoilTypeChoice

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

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['plant_type', 'disease_label', 'severity', 'soil_type', 'exposure'],
                name='unique_advice_rule'
            )
        ]

    def __str__(self):
        return f"{self.plant_type or '*'} - {self.disease_label} ({self.severity or '*'})"
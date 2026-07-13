from django.db import models
from django.utils.translation import gettext_lazy as _ 

class Treatment(models.Model):
    class IconChoice(models.TextChoices):
        WATERING = 'watering', _('Watering')
        FUNGICIDE = 'fungicide', _('Fungicide')
        PRUNING = 'pruning', _('Pruning')
        SOIL = 'soil', _('Soil')
        SUNLIGHT = 'sunlight', _('Sunlight')

    icon = models.CharField(max_length=50, choices=IconChoice.choices, null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

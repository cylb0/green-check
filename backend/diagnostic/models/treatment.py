from django.db import models
from django.utils.translation import gettext_lazy as _ 
from django.utils.translation import get_language

class Treatment(models.Model):
    class IconChoice(models.TextChoices):
        WATERING = 'watering', _('Watering')
        FUNGICIDE = 'fungicide', _('Fungicide')
        PRUNING = 'pruning', _('Pruning')
        SOIL = 'soil', _('Soil')
        SUNLIGHT = 'sunlight', _('Sunlight')

    icon = models.CharField(max_length=50, choices=IconChoice.choices, null=True, blank=True)
    title_en = models.CharField(max_length=255)
    title_fr = models.CharField(max_length=255)
    description_en = models.TextField()
    description_fr = models.TextField()

    @property
    def title(self):
        return self.title_fr if get_language() == 'fr' else self.title_en
    
    @property
    def description(self):
        return self.description_fr if get_language() == 'fr' else self.description_en

    def __str__(self):
        return self.title

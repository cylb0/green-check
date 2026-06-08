from django.db import models
from django.utils.translation import gettext_lazy as _

class ExposureChoice(models.TextChoices):
    FULL_SUN = 'full_sun', 'Full sun'
    PARTIAL_SHADE = 'partial_shade', 'Partial shade'
    FULL_SHADE = 'full_shade', 'Full shade'

class SoilTypeChoice(models.TextChoices):
    CLAY = 'clay', 'clay'
    SANDY = 'sandy', 'sandy'
    LOAMY = 'loamy', 'loamy'
    CHALKY = 'chalky', 'chalky'

class PlantTypeChoice(models.TextChoices):
    APPLE = 'apple', _('Apple')
    POTATO = 'potato', _('Potato')
    TOMATO = 'tomato', _('Tomato')
    # TO DO: Complete with PlantVillage Dataset labels

class DiseaseLabelChoice(models.TextChoices):
    HEALTHY = 'healthy', _('Healthy')
    EARLY_BLIGHT = 'early_blight', _('Early Blight')
    # TO DO: Complete with PlantVillage Dataset labels

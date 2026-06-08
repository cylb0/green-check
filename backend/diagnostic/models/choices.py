from django.db import models
from django.utils.translation import gettext_lazy as _

class PlantTypeChoice(models.TextChoices):
    APPLE = 'apple', _('Apple')
    POTATO = 'potato', _('Potato')
    TOMATO = 'tomato', _('Tomato')
    # TO DO: Complete with PlantVillage Dataset labels

class DiseaseLabelChoice(models.TextChoices):
    HEALTHY = 'healthy', _('Healthy')
    EARLY_BLIGHT = 'early_blight', _('Early Blight')
    # TO DO: Complete with PlantVillage Dataset labels

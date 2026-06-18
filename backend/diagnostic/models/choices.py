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
    BLUEBERRY = 'blueberry', _('Blueberry')
    CHERRY = 'cherry', _('Cherry')
    CORN = 'corn', _('Corn')
    GRAPE = 'grape', _('Grape')
    ORANGE = 'orange', _('Orange')
    PEACH = 'peach', _('Peach')
    PEPPER = 'pepper', _('Bell Pepper')
    POTATO = 'potato', _('Potato')
    RASPBERRY = 'raspberry', _('Raspberry')
    SOYBEAN = 'soybean', _('Soybean')
    SQUASH = 'squash', _('Squash')
    STRAWBERRY = 'strawberry', _('Strawberry')
    TOMATO = 'tomato', _('Tomato')

class DiseaseLabelChoice(models.TextChoices):
    HEALTHY = 'healthy', _('Healthy')
    BACTERIAL_SPOT = 'bacterial_spot', _('Bacterial spot')
    BLACK_ROT = 'black_rot', _('Black rot')

    # TO DO: Complete with PlantVillage Dataset labels

class DiagnosticStatusChoice(models.TextChoices):
    PENDING = 'pending', _('Pending')
    PROCESSING = 'processing', _('Processing')
    SUCCESS = 'success', _('Success')
    LOW_CONFIDENCE = 'low_confidence', _('Low confidence')
    FAILED = 'failed', _('Failed')
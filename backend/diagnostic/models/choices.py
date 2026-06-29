from django.db import models
from django.utils.translation import gettext_lazy as _

class ExposureChoice(models.TextChoices):
    FULL_SUN = 'full_sun', _('Full sun')
    PARTIAL_SHADE = 'partial_shade', _('Partial shade')
    FULL_SHADE = 'full_shade', _('Full shade')

class SoilTypeChoice(models.TextChoices):
    CLAY = 'clay', _('Clay')
    SANDY = 'sandy', _('Sandy')
    LOAMY = 'loamy', _('Loamy')
    CHALKY = 'chalky', _('Chalky')

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
    APPLE_SCAB = 'apple_scab', _('Apple scab')
    BLACK_ROT = 'black_rot', _('Black rot')
    CEDAR_APPLE_RUST = 'cedar_apple_rust', _('Cedar apple rust')
    POWDERY_MILDEW = 'powdery_mildew', _('Powdery mildew')
    CERCOSPORA_LEAF_SPOT = 'cercospora_leaf_spot', _('Cercospora leaf spot / Gray leaf spot')
    COMMON_RUST = 'common_rust', _('Common rust')
    NORTHERN_LEAF_BLIGHT = 'northern_leaf_blight', _('Northern leaf blight')
    ESCA = 'esca', _('Esca (Black Measles)')
    LEAF_BLIGHT = 'leaf_blight', _('Leaf blight (Isariopsis)')
    HAUNGLONGBING = 'haunglongbing', _('Haunglongbing (Citrus greening)')
    BACTERIAL_SPOT = 'bacterial_spot', _('Bacterial spot')
    EARLY_BLIGHT = 'early_blight', _('Early blight')
    LATE_BLIGHT = 'late_blight', _('Late blight')
    LEAF_MOLD = 'leaf_mold', _('Leaf mold')
    SEPTORIA_LEAF_SPOT = 'septoria_leaf_spot', _('Septoria leaf spot')
    SPIDER_MITES = 'spider_mites', _('Spider mites')
    TARGET_SPOT = 'target_spot', _('Target spot')
    MOSAIC_VIRUS = 'mosaic_virus', _('Mosaic virus')
    YELLOW_LEAF_CURL_VIRUS = 'yellow_leaf_curl_virus', _('Yellow leaf curl virus')
    LEAF_SCORCH = 'leaf_scorch', _('Leaf scorch')

class DiagnosticStatusChoice(models.TextChoices):
    PENDING = 'pending', _('Pending')
    PROCESSING = 'processing', _('Processing')
    SUCCESS = 'success', _('Success')
    LOW_CONFIDENCE = 'low_confidence', _('Low confidence')
    FAILED = 'failed', _('Failed')
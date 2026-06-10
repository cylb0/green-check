import uuid
from django.db import models, transaction
from django.conf import settings
from diagnostic.models.choices import ExposureChoice, PlantTypeChoice, SoilTypeChoice
import os

class PlantSubmissionManager(models.Manager):
    def create_with_image(self, user, image, **kwargs):
        with transaction.atomic():
            ext = os.path.splitext(image.name)[-1]
            filename = f"{uuid.uuid4()}{ext}"

            submission = self.create(user=user, **kwargs)
            submission.image.save(filename, image, save=True)
        return submission

class PlantSubmission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="plant_submissions")

    plant_type = models.CharField(max_length=255, choices=PlantTypeChoice.choices, null=True, blank=True)

    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    exposure = models.CharField(max_length=20, choices=ExposureChoice.choices, null=True, blank=True)
    soil_type = models.CharField(max_length=20, choices=SoilTypeChoice.choices, null=True, blank=True)
    
    image = models.ImageField(upload_to='plant_submissions/')

    submitted_at = models.DateTimeField(auto_now_add=True)

    objects = PlantSubmissionManager()

    def __str__(self):
        return f"{self.plant_type or 'Unknown'} - {self.user} ({self.submitted_at})"

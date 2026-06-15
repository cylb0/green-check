from ninja import ModelSchema, Schema
from diagnostic.models import PlantSubmission
from typing import Optional
from diagnostic.models import PlantTypeChoice, SoilTypeChoice, ExposureChoice

class PlantSubmissionOut(ModelSchema):
    class Meta:
        model = PlantSubmission
        fields = ['id', 'plant_type', 'latitude', 'longitude', 'exposure', 'soil_type', 'image', 'submitted_at']

class PlantSubmissionCreatedOut(Schema):
    submission: PlantSubmissionOut
    diagnostic_id: str
    
class PlantSubmissionIn(Schema):
    plant_type: Optional[PlantTypeChoice] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    exposure: Optional[ExposureChoice] = None
    soil_type: Optional[SoilTypeChoice] = None
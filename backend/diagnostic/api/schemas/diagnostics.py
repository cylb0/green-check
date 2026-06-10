from ninja import ModelSchema
from diagnostic.models import Diagnostic

class DiagnosticOut(ModelSchema):
    class Meta:
        model = Diagnostic
        fields = ['id', 'status', 'detected_plant', 'plant_confidence', 'detected_disease', 'disease_confidence', 'advice_text', 'created_at']

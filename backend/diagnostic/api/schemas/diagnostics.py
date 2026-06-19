from ninja import ModelSchema, Field
from diagnostic.models import Diagnostic

class DiagnosticOut(ModelSchema):
    severity: str | None = Field(None, alias="advice_rule.severity")
    original_image_url: str | None = Field(None, alias="submission.image.url")

    plant_label: str | None = None
    disease_label: str | None = None

    class Meta:
        model = Diagnostic
        fields = ['id', 'status', 'detected_plant', 'detected_disease', 'confidence', 'advice_text', 'created_at']

    @staticmethod
    def resolve_plant_label(obj: Diagnostic):
        return obj.get_detected_plant_display()
        
    @staticmethod
    def resolve_disease_label(obj: Diagnostic):
        return obj.get_detected_disease_display()
    
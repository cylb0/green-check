from ninja import ModelSchema, Field
from diagnostic.models import Diagnostic

class DiagnosticOut(ModelSchema):
    severity: str | None = Field(None, alias="advice_rule.severity")
    original_image_url: str | None = Field(None, alias="submission.image.url")

    class Meta:
        model = Diagnostic
        fields = ['id', 'status', 'detected_plant', 'detected_disease', 'confidence', 'advice_text', 'created_at']

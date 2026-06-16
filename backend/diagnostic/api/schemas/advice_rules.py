from diagnostic.models.advice_rule import AdviceRule
from ninja import ModelSchema

class AdviceRuleOut(ModelSchema):
    class Meta:
        model = AdviceRule
        fields = ['plant_type', 'disease_label', 'severity', 'exposure', 'soil_type', 'advice_text']

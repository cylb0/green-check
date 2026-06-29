from diagnostic.models.advice_rule import AdviceRule
from ninja import ModelSchema

class AdviceRuleOut(ModelSchema):
    plant_label: str | None = None
    disease_label: str | None = None
    
    class Meta:
        model = AdviceRule
        fields = ['severity', 'exposure', 'soil_type', 'advice_text']

    @staticmethod
    def resolve_plant_label(obj: AdviceRule):
        return obj.get_plant_type_display()

    @staticmethod
    def resolve_disease_label(obj: AdviceRule):
        return obj.get_disease_label_display()


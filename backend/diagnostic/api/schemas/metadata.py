from ninja import Schema
from typing import List

class ChoiceSchema(Schema):
    value: str
    label: str

class MetadataResponse(Schema):
    plant: List[ChoiceSchema]
    exposure: List[ChoiceSchema]
    soil: List[ChoiceSchema]
    disease: List[ChoiceSchema]
    diagnostic_status: List[ChoiceSchema]

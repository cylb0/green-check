from ninja import Schema

class TreatmentOut(Schema):
    icon: str | None = None
    title: str
    description: str
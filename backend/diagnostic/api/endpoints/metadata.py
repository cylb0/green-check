from diagnostic.api.schemas.metadata import MetadataResponse
from diagnostic.models.choices import DiseaseLabelChoice, ExposureChoice, PlantTypeChoice, SoilTypeChoice
from ninja import Router

router = Router()

@router.get("", response={200: MetadataResponse})
def get_metadata(request):
    return {
        "plant": [{"value": c.value, "label": str(c.label)} for c in PlantTypeChoice],
        "exposure": [{"value": e.value, "label": str(e.label)} for e in ExposureChoice],
        "soil": [{"value": s.value, "label": str(s.label)} for s in SoilTypeChoice],
        "disease": [{"value": d.value, "label": str(d.label)} for d in DiseaseLabelChoice]
    }
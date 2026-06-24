import io
import requests
from celery import shared_task
from diagnostic.mappings import CLASS_NAME_MAP
from diagnostic.models import Diagnostic, DiagnosticStatusChoice
import traceback

@shared_task(
    bind=True,
    max_retries=3,
    default_retry_delay=10
)
def run_ai_prediction(self, diagnostic_id, image_name):
    from django.core.files.storage import default_storage

    try:
        with default_storage.open(image_name, 'rb') as f:
            image_bytes = f.read()

        files = {'file': ('image.jpg', image_bytes, 'image/jpeg')}
        response = requests.post("http://ai-service:8001/predict", files=files, timeout=30)
        response.raise_for_status()
        
        data = response.json()
        plant, disease = CLASS_NAME_MAP.get(data['class'], (None, None))

        diag = Diagnostic.objects.get(id=diagnostic_id)
        diag.detected_plant = plant
        diag.detected_disease = disease
        diag.confidence = data['confidence']
        diag.raw_model_response = data
        diag.save(
            update_fields=[
                'detected_plant',
                'detected_disease',
                'confidence',
                'raw_model_response',
            ]
        )
        diag.apply_advice()

    except requests.exceptions.RequestException as exc:
        raise self.retry(exc=exc)

    except Exception:
        print(traceback.format_exc())
        Diagnostic.objects.filter(id=diagnostic_id).update(status=DiagnosticStatusChoice.FAILED)

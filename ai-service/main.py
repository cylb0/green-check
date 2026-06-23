import tensorflow as tf
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
import io
from PIL import Image
from tensorflow.keras.applications.efficientnet import preprocess_input

app = FastAPI()
MODEL_PATH = "/app/models/plant_disease_efficientnetb4.h5"
    
try:
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
except Exception as e:
    model = None

CLASS_NAMES = sorted([
    "Apple__Apple_scab",
    "Apple__Black_rot",
    "Apple__Cedar_apple_rust",
    "Apple__healthy",
    "Blueberry__healthy",
    "Cherry__healthy",
    "Cherry__Powdery_mildew",
    "Corn__Cercospora_leaf_spot Gray_leaf_spot",
    "Corn__Common_rust_",
    "Corn__healthy",
    "Corn__Northern_Leaf_Blight",
    "Grape__Black_rot",
    "Grape__Esca_(Black_Measles)",
    "Grape__healthy",
    "Grape__Leaf_blight_(Isariopsis_Leaf_Spot",
    "Orange__Haunglongbing_(Citrus_greening)",
    "Peach__Bacterial_spot",
    "Peach__healthy",
    "Pepper,_bell__Bacterial_spot",
    "Pepper,_bell__healthy",
    "Potato__Early_blight",
    "Potato__healthy",
    "Potato__Late_blight",
    "Raspberry__healthy",
    "Soybean__healthy",
    "Squash__Powdery_mildew",
    "Strawberry__healthy",
    "Strawberry__Leaf_scorch",
    "Tomato__Bacterial_spot",
    "Tomato__Early_blight",
    "Tomato__healthy",
    "Tomato__Late_blight",
    "Tomato__Leaf_Mold",
    "Tomato__Septoria_leaf_spot",
    "Tomato__Spider_mites Two-spotted_spider_mite",
    "Tomato__Target_Spot",
    "Tomato__Tomato_mosaic_virus",
    "Tomato__Tomato_Yellow_Leaf_Curl_Virus"
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        print(model.get_config()['layers'][0]['config']['name'])
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize((380, 380), Image.LANCZOS)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image format")
    
    img_array = np.array(image, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    predictions = model.predict(img_array)
    predicted_index = int(np.argmax(predictions[0]))
    confidence = float(np.max(predictions[0]))

    return {
        "class": CLASS_NAMES[predicted_index] if predicted_index < len(CLASS_NAMES) else "Unknown",
        "confidence": confidence
    }
from ultralytics import YOLO

def main():
    model = YOLO('yolo11n.pt') 

    model.train(
        data='dataset/leaf_data.yml',
        epochs=100,
        imgsz=640,
        batch=16,
        patience=20,  
        name='model_leaf_detector',
        device=0
    )

if __name__ == '__main__':
    main()

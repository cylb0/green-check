from ultralytics import YOLO

def main():
    model = YOLO('runs/detect/model_feuille_v1/weights/best.pt')

    model.export(
        format='onnx',
        imgsz=640,
        simplify=True
    )

if __name__ == '__main__':
    main()

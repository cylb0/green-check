from ultralytics import YOLO

def main():
    model = YOLO('runs/detect/model_feuille_v1/weights/best.pt')

    model.export(
        format='tfjs',
        imgsz=640,
        int8=True,
        data='dataset/leaf_data.yml',
    )

if __name__ == '__main__':
    main()

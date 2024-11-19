from flask import Flask, request, jsonify
import cv2
import numpy as np
import pickle
from utils.face_processing import detect_faces, get_embeddings, classify_faces

app = Flask(__name__)

# Load Haarcascade and SVM models
haarcascade_path = 'models/haarcascade_frontalface_default.xml'
svm_model = pickle.load(open('models/svm_model_144classes.pkl', 'rb'))

@app.route('/detect_faces', methods=['POST'])
def detect_faces_route():
    file = request.files['image']
    img = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)
    face_regions = detect_faces(img, haarcascade_path)

    # Return face bounding boxes
    faces = [{"x": x, "y": y, "w": w, "h": h} for (x, y, w, h, _) in face_regions]
    return jsonify({"faces": faces})

@app.route('/classify_faces', methods=['POST'])
def classify_faces_route():
    file = request.files['image']
    img = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)
    face_regions = detect_faces(img, haarcascade_path)

    results = []
    for (x, y, w, h, face_img) in face_regions:
        embedding = get_embeddings(face_img)
        predicted_class, confidence = classify_faces(embedding, svm_model)

        # Append results
        results.append({
            "x": x, "y": y, "w": w, "h": h,
            "predicted_class": predicted_class,
            "confidence": confidence
        })

    return jsonify({"results": results})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)  # Run on port 5001

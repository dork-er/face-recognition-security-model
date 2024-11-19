import cv2
import numpy as np
from keras_facenet import FaceNet

# Load FaceNet model
facenet = FaceNet()

def detect_faces(image, haarcascade_path):
    """
    Detect faces in an image using Haarcascade.
    """
    cascade = cv2.CascadeClassifier(haarcascade_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    face_regions = []
    for (x, y, w, h) in faces:
        face_img = image[y:y+h, x:x+w]
        face_regions.append((x, y, w, h, face_img))

    return face_regions

def get_embeddings(face_img):
    """
    Get FaceNet embeddings for a face image.
    """
    face_img = cv2.resize(face_img, (160, 160))
    face_img = np.expand_dims(face_img, axis=0)
    embedding = facenet.embeddings(face_img)
    return embedding

def classify_faces(embedding, svm_model):
    """
    Classify a face embedding using the SVM model.
    """
    probabilities = svm_model.decision_function(embedding)
    predicted_class = svm_model.predict(embedding)[0]
    confidence = np.max(probabilities)
    return predicted_class, confidence

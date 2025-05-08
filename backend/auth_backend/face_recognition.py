import cv2
import face_recognition
import os
import numpy as np
from django.conf import settings

# Path to face dataset folder
DATASET_DIR = os.path.join(settings.BASE_DIR, 'auth_backend', 'face_dataset')
PREDICTOR_PATH = os.path.join(settings.BASE_DIR, 'auth_backend', 'shape_predictor_68_face_landmarks.dat')

def load_known_faces():
    known_encodings = []
    known_names = []

    for user_folder in os.listdir(DATASET_DIR):
        user_path = os.path.join(DATASET_DIR, user_folder)
        if os.path.isdir(user_path):
            for image_name in os.listdir(user_path):
                img_path = os.path.join(user_path, image_name)
                image = face_recognition.load_image_file(img_path)
                encodings = face_recognition.face_encodings(image)

                if encodings:
                    known_encodings.append(encodings[0])
                    known_names.append(user_folder)

    return known_encodings, known_names

def recognize_face(frame, known_encodings, known_names):
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_encodings, face_encoding)
        face_distances = face_recognition.face_distance(known_encodings, face_encoding)

        if True in matches:  # Check if there is at least one True value in matches
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                return known_names[best_match_index]

    return None

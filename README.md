
# Face Recognition & Login System

## 👋 Introduction

This project is a **Face Recognition & Login System** built using React (Frontend) and Django (Backend). It allows users to register and log in using either:

- Email & Password  
- Face Recognition via webcam

## 🚀 Features

- 🔐 Secure Registration with email, password, and face scan
- 🤳 Face Recognition Login using webcam
- 📨 Email-based Password Login
- 🧠 Live Face Encoding using `face_recognition`
- 📦 Real-time UI with React
- 🛠 Backend API using Django Rest Framework
- 📄 Admin Panel for managing users

## 💡 Why This Project?

Traditional login systems rely only on passwords, which can be weak or reused. This system adds an extra layer of security using **face biometrics**, making it safer and faster for users.

## ⚙️ Technologies Used

### Frontend:
- React
- HTML, CSS
- WebcamJS / react-webcam

### Backend:
- Python
- Django Rest Framework
- face_recognition
- SQLite

## 📂 Project Structure

```
FaceRecognitionSystem/
├── backend/
│   ├── auth_backend/
│   └── users/
├── frontend/
│   ├── src/
│   └── public/
```

## 🔧 Installation Steps
### Fast make a split in VS CODE output screen then in 1st screen Follow the Backend steps and in 2nd screen Follow the Frontend steps

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # (on Windows)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

> Make sure both servers are running:  
> - Frontend: `http://localhost:3000`  
> - Backend: `http://127.0.0.1:8000`

## 📷 Usage Guide

1. Register using email, password, and face
2. Login either with:
   - Your face via webcam  
   - Email and password

## 📬 API Endpoints

- `POST /api/users/register/` – Register a new user
- `POST /api/users/login/` – Login with Face Recognition
- `POST /api/users/password-login/` – Login using email & password

## 🧑‍💻 Developed By

- Kingshuk Mal, Nairit Karmakar, Md Abu Jabed

## 📄 License

This project is for educational purposes.

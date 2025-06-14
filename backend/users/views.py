import base64
import numpy as np
from io import BytesIO
from PIL import Image
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import face_recognition
from .models import CustomUser
from django.contrib.auth import authenticate

# @api_view(['POST'])
# def register(request):
#     if request.method == 'POST':
#         username = request.data.get('username')
#         password = request.data.get('password')
#         face_image_data = request.data.get('face_image')

#         if not username or not password:
#             return Response({"error": "Username and password are required."}, status=400)

#         # Decode face and compute encoding if available
#         face_encoding_str = ''
#         if face_image_data:
#             try:
#                 image_data = base64.b64decode(face_image_data.split(',')[1])
#                 image = Image.open(BytesIO(image_data))
#                 rgb_image = np.array(image.convert('RGB'))
#                 face_encodings = face_recognition.face_encodings(rgb_image)

#                 if len(face_encodings) == 0:
#                     return Response({"error": "No face detected in the image."}, status=400)

#                 # Save as comma-separated string
#                 face_encoding_str = ','.join(str(val) for val in face_encodings[0])
#             except Exception as e:
#                 return Response({"error": f"Face processing failed: {str(e)}"}, status=500)

#         # Create user
#         try:
#             user = CustomUser.objects.create_user(username=username, password=password)
#             user.face_encoding = face_encoding_str
#             user.save()
#             return Response({"message": "User registered successfully!"}, status=201)
#         except Exception as e:
#             return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        face_image_data = request.data.get('face_image')

        if not username or not email or not password:
            return Response({"error": "Username, email, and password are required."}, status=400)

        # Decode face and compute encoding if available
        face_encoding_str = ''
        if face_image_data:
            try:
                image_data = base64.b64decode(face_image_data.split(',')[1])
                image = Image.open(BytesIO(image_data))
                rgb_image = np.array(image.convert('RGB'))
                face_encodings = face_recognition.face_encodings(rgb_image)

                if len(face_encodings) == 0:
                    return Response({"error": "No face detected in the image."}, status=400)

                # Save as comma-separated string
                face_encoding_str = ','.join(str(val) for val in face_encodings[0])
            except Exception as e:
                return Response({"error": f"Face processing failed: {str(e)}"}, status=500)

        # Create user
        try:
            user = CustomUser.objects.create_user(username=username, email=email, password=password)
            user.face_encoding = face_encoding_str
            user.save()
            return Response({"message": "User registered successfully!"}, status=201)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

# @api_view(['POST'])
# def login(request):
#     if request.method == 'POST':
#         username = request.data.get('username')
#         face_image_data = request.data.get('face_image')  # Base64-encoded face image from frontend

#         if not username or not face_image_data:
#             return JsonResponse({"error": "Missing required fields"}, status=400)

#         # Decode the base64 face image data
#         try:
#             image_data = base64.b64decode(face_image_data.split(',')[1])  # Removing the base64 header part
#             image = Image.open(BytesIO(image_data))
#             rgb_image = np.array(image.convert('RGB'))
#             face_encodings = face_recognition.face_encodings(rgb_image)

#             if len(face_encodings) == 0:
#                 return JsonResponse({"error": "No face detected in the image."}, status=400)

#             face_encoding = face_encodings[0]

#             try:
#                 user = CustomUser.objects.get(username=username)
#             except CustomUser.DoesNotExist:
#                 return JsonResponse({"error": "User not found."}, status=404)

#             # Compare face encodings
#             known_encoding = user.face_encoding.split(',')  # Split the comma-separated string
#             known_encoding = list(map(float, known_encoding))  # Convert stored encoding to a list of floats

#             match = face_recognition.compare_faces([known_encoding], face_encoding)

#             if match[0]:
#                 return JsonResponse({"message": "Login successful!"}, status=200)
#             else:
#                 return JsonResponse({"error": "Face does not match."}, status=401)

#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)

# @api_view(['POST'])
# def login(request):  # View name remains 'login'
#     email = request.data.get('email')
#     face_image_data = request.data.get('face_image')

#     if not email or not face_image_data:
#         return JsonResponse({"error": "Missing required fields"}, status=400)

#     try:
#         # Handle base64-encoded image string
#         if "," in face_image_data:
#             face_image_data = face_image_data.split(',')[1]
#         image_data = base64.b64decode(face_image_data)

#         # Convert image to RGB numpy array
#         image = Image.open(BytesIO(image_data)).convert('RGB')
#         rgb_image = np.array(image)

#         # Extract face encodings
#         face_encodings = face_recognition.face_encodings(rgb_image)
#         if not face_encodings:
#             return JsonResponse({"error": "No face detected in the image."}, status=400)

#         face_encoding = face_encodings[0]

#         # Look up user by email
#         try:
#             user = CustomUser.objects.get(email=email)
#         except CustomUser.DoesNotExist:
#             return JsonResponse({"error": "User not found."}, status=404)

#         # Parse stored face encoding
#         known_encoding = list(map(float, user.face_encoding.split(',')))

#         match = face_recognition.compare_faces([known_encoding], face_encoding)

#         if match[0]:
#             return JsonResponse({"message": "Login successful!", "username": user.username}, status=200)
#         else:
#             return JsonResponse({"error": "Face does not match."}, status=401)

#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)

# Latest
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    face_image_data = request.data.get('face_image')

    if not email or not face_image_data:
        return JsonResponse({"error": "Missing required fields"}, status=400)

    try:
        # Handle base64-encoded image string
        if "," in face_image_data:
            face_image_data = face_image_data.split(',')[1]
        image_data = base64.b64decode(face_image_data)

        # Convert image to RGB numpy array
        image = Image.open(BytesIO(image_data)).convert('RGB')
        rgb_image = np.array(image)

        # Extract face encodings from input image
        face_encodings = face_recognition.face_encodings(rgb_image)
        if not face_encodings:
            return JsonResponse({"error": "No face detected in the image."}, status=400)

        face_encoding = face_encodings[0]

        # Look up user by email
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return JsonResponse({"error": "User not found."}, status=404)

        # Parse stored encoding
        known_encoding = list(map(float, user.face_encoding.split(',')))

        # Face comparison with strict tolerance
        match = face_recognition.compare_faces([known_encoding], face_encoding, tolerance=0.45)
        distance = face_recognition.face_distance([known_encoding], face_encoding)[0]

        # Final decision
        if match[0] and distance < 0.45:
            return JsonResponse({"message": "Login successful!", "username": user.username}, status=200)
        else:
            return JsonResponse({"error": "Face does not match."}, status=401)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# @api_view(['POST'])
# def password_login(request):
#     username = request.data.get('username')
#     password = request.data.get('password')

#     if not username or not password:
#         return Response({"error": "Missing username or password"}, status=status.HTTP_400_BAD_REQUEST)

#     user = authenticate(username=username, password=password)

#     if user is not None:
#         return Response({"message": "Login successful", "username": user.username}, status=status.HTTP_200_OK)
#     else:
#         return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
def password_login(request):
    email = request.data.get('email')  # Get email for login
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Missing email or password"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Authenticate with email and password
    user = authenticate(username=user.username, password=password)

    if user is not None:
        return Response({"message": "Login successful", "username": user.username}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

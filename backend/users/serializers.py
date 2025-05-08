from rest_framework import serializers
from .models import CustomUser
import base64
import face_recognition
from io import BytesIO
from PIL import Image

class UserSerializer(serializers.ModelSerializer):
    face_image = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'face_image']

    def create(self, validated_data):
        username = validated_data['username']
        password = validated_data['password']
        face_image_base64 = validated_data['face_image']

        # Decode and process the image
        try:
            image_data = base64.b64decode(face_image_base64.split(',')[1])
            image = Image.open(BytesIO(image_data))
            face_array = face_recognition.load_image_file(BytesIO(image_data))
            encodings = face_recognition.face_encodings(face_array)

            if not encodings:
                raise serializers.ValidationError("No face detected in the image.")

            encoding = encodings[0]
            encoding_str = ','.join(str(val) for val in encoding)

        except Exception as e:
            raise serializers.ValidationError(f"Face encoding failed: {str(e)}")

        user = CustomUser.objects.create_user(username=username, password=password)
        user.face_encoding = encoding_str
        user.save()
        return user

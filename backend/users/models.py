# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    face_encoding = models.TextField(blank=True, null=True)  # Store face encoding as a string

    def __str__(self):
        return self.username

from django.urls import path
from . import views
from .views import register, login, password_login

urlpatterns = [
    path('register/', views.register, name='register'),  # Endpoint for registration
    path('login/', views.login, name='login'),            # Endpoint for login
    path('password-login/', password_login, name='password_login'),
]

from django.contrib import admin
from django.urls import path, include  # include is used to include other url configurations

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),  # Add the users API routes
]

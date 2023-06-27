from django.contrib import admin
from django.urls import path, include
from api.erp import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),                    
    path('api/', include(('api.erp.router', 'api'), namespace='api')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 

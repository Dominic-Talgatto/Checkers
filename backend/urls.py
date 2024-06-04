
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('checkers/', include("magazine.urls")),
    path('checkers/', include("lessons.urls")),
    path('checkers/', include('user.urls'))
]
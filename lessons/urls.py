from django.urls import path
from. import views

urlpatterns = [
    path('lessons', views.lessons, name='lessons'),
    path('lessons/<int:pk>', views.lessons_detail, name='lesson')
]

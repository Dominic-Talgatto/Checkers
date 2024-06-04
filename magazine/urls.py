from django.urls import path
from . import views

urlpatterns = [ 
    path('magazine', views.magazine),
    path('magazine/<int:id>', views.magazine_detail)
]
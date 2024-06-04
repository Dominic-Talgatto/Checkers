from django.urls import path 
from .views import ReqisterView, LoginView, UserView, PlayerInfoView # , LogOutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register', ReqisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('login2', TokenObtainPairView.as_view()),
    path('player-info', PlayerInfoView.as_view()),
]
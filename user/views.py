from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, PlayerInfoSerializer
from rest_framework.authtoken.models import Token
from .models import User, PlayerInfo
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class ReqisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(name=request.data['name'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({'token':token.key})
        return Response(serializer.errors, status=status.HTTP_200_OK)

class LoginView(APIView):
    def post(self, request):
        user = get_object_or_404(User, email=request.data['email'])
        if not user.check_password(request.data['password']):
            return Response("missing user", status=status.HTTP_410_NOT_FOUND)
    
        token_tuple = Token.objects.get_or_create(user=user)
        token = token_tuple[0] 
        serializer = UserSerializer(user)
        return Response({'token': token.key})
    

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        user = request.user
        name = user.name
        email = user.email
        return Response({'name': name, 'email': email}, status=status.HTTP_200_OK)
    

class PlayerInfoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    def get(self, request):
        try:
            player_info = PlayerInfo.objects.get(user=request.user)
        except PlayerInfo.DoesNotExist:
            player_info = PlayerInfo.objects.create(user=request.user, games_played=0, rating=0, wins=0)

        serializer = PlayerInfoSerializer(player_info)
        return Response(serializer.data)
    def post(self, request):
        try:
            player_info = PlayerInfo.objects.get(user=request.user)
        except PlayerInfo.DoesNotExist:
            player_info = PlayerInfo.objects.create(user=request.user, games_played=0, rating=0, wins=0)
        player_info.games_played = request.data.get('games_played', player_info.games_played)
        player_info.rating = request.data.get('rating', player_info.rating)
        player_info.wins = request.data.get('wins', player_info.wins)
        player_info.draws = request.data.get('draws', player_info.draws)
        player_info.defeats = request.data.get('defeats', player_info.defeats)
        player_info.victory = request.data.get('victory', player_info.victory)
        player_info.save()

        serializer = PlayerInfoSerializer(player_info)
        return Response(serializer.data)

    
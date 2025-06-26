from rest_framework import viewsets, permissions
from .models import Bet, Player
from .serializers import BetSerializer, PlayerSerializer
from django.http import HttpResponse
from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

User = get_user_model()

def some_view(request):
    return HttpResponse("This is some_view!")

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are authenticated!"})

class BetListView(generics.ListAPIView):
    serializer_class = BetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Bet.objects.filter(user=self.request.user)
    
#class BetViewSet(viewsets.ModelViewSet):
 #   serializer_class = BetSerializer
  #  permission_classes = [permissions.IsAuthenticated]

   # def get_queryset(self):
     #   return Bet.objects.filter(user=self.request.user)
#
   # def perform_create(self, serializer):
      #  serializer.save(user=self.request.user)

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [permissions.IsAdminUser]

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
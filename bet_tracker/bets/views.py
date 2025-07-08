from rest_framework import viewsets, permissions
from .models import Bet, Player
from .serializers import BetSerializer, PlayerSerializer
from django.http import HttpResponse
from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import stripe
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Sum

stripe.api_key = settings.STRIPE_SECRET_KEY

User = get_user_model()

#payout and profit summary view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def bet_summary(request):
    bets = Bet.objects.filter(user=request.user)
    
    total_payout = sum([bet.payout for bet in bets])
    total_profit = sum([bet.profit for bet in bets])

    return Response({
        'total_payout': round(total_payout, 2),
        'total_profit': round(total_profit, 2),
    })

def some_view(request):
    return HttpResponse("This is some_view!")

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are authenticated!"})

class BetViewSet(viewsets.ModelViewSet):
    serializer_class = BetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Bet.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [permissions.IsAdminUser]

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


#stripe payment view
class CreateCheckoutSessionView(APIView):
    def post(self, request):
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'Premium Bet Tracker Access',
                    },
                    'unit_amount': 1000,  # $10.00
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:3000/',
            cancel_url='http://localhost:3000/',
        )
        return Response({'checkout_url': session.url})
#bet_tracker/bets/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BetViewSet, RegisterView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from bets.views import CreateCheckoutSessionView
from django.contrib import admin

router = DefaultRouter()
router.register(r'bets', BetViewSet, basename='bet')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='auth_register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='auth_register'),
    # Add a route for deleting a bet by its ID
    path('api/bets/<int:pk>/delete/', BetViewSet.as_view({'delete': 'destroy'}), name='bet-delete'),
    path('admin/', admin.site.urls),
    path('api/create-checkout-session/', CreateCheckoutSessionView.as_view(), name='create-checkout-session'),

]

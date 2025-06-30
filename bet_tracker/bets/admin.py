from django.contrib import admin
from .models import Bet, Player 
from .forms import BetAdminForm


@admin.register(Bet)
class BetAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'bet_type',
        'sportsbook',
        'sport',
        'league',
        'event_name',
        'market_name',
        'stake',
        'odds',
        'status',
        'cashout_amount',
        'payout_display',
        'profit_display',
        'bonus_bet',
    )
    list_select_related = ('user',)  # speeds up foreign key lookups in list display

    def payout_display(self, obj):
        return round(obj.payout, 2)
    payout_display.short_description = 'Payout'

    def profit_display(self, obj):
        try:
            return round(float(obj.profit), 2)
        except (TypeError, ValueError):
            return "N/A"

    class Media:
       js = ('bet_tracker/bets/static/admin/js/bet_dynamic_leagues.js',)


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'subscription_status', 'is_verified')
    search_fields = ('username', 'email')
    list_filter = ('subscription_status', 'is_verified')

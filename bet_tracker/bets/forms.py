from django import forms
from .models import Bet
from .constants import SPORT_LEAGUE_MAP


class BetAdminForm(forms.ModelForm):
    class Meta:
        model = Bet
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Determine the sport: either from form data or from the instance
        sport = self.data.get('sport') or getattr(self.instance, 'sport', None)

        if sport:
            allowed_leagues = SPORT_LEAGUE_MAP.get(sport, [])
            all_choices = self.fields['league'].choices
            self.fields['league'].choices = [
                choice for choice in all_choices if choice[0] in allowed_leagues or choice[0] == ''
            ]
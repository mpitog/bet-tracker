from rest_framework import serializers
from .models import Bet, Player
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

from rest_framework import serializers
from .models import Bet  # Adjust the import as needed


class BetSerializer(serializers.ModelSerializer):
    status_display = serializers.SerializerMethodField()
    sportsbook_display = serializers.SerializerMethodField()
    league_display = serializers.SerializerMethodField()
    sport_display = serializers.SerializerMethodField()
    bet_type_display = serializers.SerializerMethodField()
    payout = serializers.SerializerMethodField()
    profit = serializers.SerializerMethodField()
    bet_date = serializers.DateField(format="%Y-%m-%d")

    class Meta:
        model = Bet
        fields = '__all__'
        read_only_fields = ['user', 'payout', 'profit']

    def get_payout(self, obj):
        return obj.payout

    def get_profit(self, obj):
        return obj.profit

    def get_status_display(self, obj):
        return obj.get_status_display()

    def get_sportsbook_display(self, obj):
        return obj.get_sportsbook_display()

    def get_league_display(self, obj):
        return obj.get_league_display()

    def get_sport_display(self, obj):
        return obj.get_sport_display()

    def get_bet_type_display(self, obj):
        return obj.get_bet_type_display()

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user
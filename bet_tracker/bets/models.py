from django.contrib.auth.models import AbstractUser
from django.db import models
from decimal import Decimal
from django.core.exceptions import ValidationError

#

class Sport(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class League(models.Model):
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name='leagues')
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
#

class Player(AbstractUser):
    email = models.EmailField(unique=True)
    subscription_status = models.BooleanField(default=False)
    subscription_id = models.CharField(max_length=255, null=True, blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.email

class Bet(models.Model):
    BET_TYPES = [
        ('normal', 'Normal'),
        ('low_hold', 'Low Hold'),
        ('arb', 'Arbitrage'),
        ('middle','Middle'),
        ('positive_ev', 'Positive EV'),
        ('future','Future'),

    ]
    SPORTSBOOKS = [
        ('skybook', 'Skybook'),
        ('bovada', 'Bovada'),
        ('betmania', 'BetMania'),
        ('matchbook', 'Matchbook'),
        ('sbgglobal', 'SBGGlobal'),
        ('5dimes_ca', '5Dimes.ca'),
        ('sportsbetting', 'SportsBetting'),
        ('betonline', 'BetOnline'),
        ('pinnacle', 'Pinnacle'),
        ('justbet', 'JustBet'),
        ('jazz', 'Jazz'),
        ('heritage', 'Heritage'),
        ('bethorizon', 'BetHorizon'),
        ('public_percent', 'Public%'),
        ('sportbet', 'SportBet'),
        ('caribsports', 'CaribSports'),
        ('catalina', 'Catalina'),
        ('grande', 'Grande'),
        ('buckeye', 'Buckeye'),
        ('iasports', 'IASports'),
        ('intertops', 'Intertops'),
        ('mirage', 'Mirage'),
        ('westgate', 'Westgate'),
        ('betphoenix', 'BetPhoenix'),
        ('payperhead', 'PayPerHead'),
        ('betqs', 'BetQS'),
        ('easyst', 'EasySt'),
        ('southpoint', 'SouthPoint'),
        ('5dimes_reduced', '5DimesReduced'),
        ('williamhill', 'William Hill'),
        ('wwwager', 'WWWager'),
        ('sportsinteraction', 'SportsInterAction'),
        ('betus', 'BetUS'),
        ('peppermill', 'Peppermill'),
        ('computer', 'Computer'),
        ('youwager', 'YouWager'),
        ('coasts', 'Coasts'),
        ('stations', 'Stations'),
        ('caesars', 'Caesars'),
        ('wynn', 'Wynn'),
        ('jerrys', 'Jerrys'),
        ('click_and_bet', 'Click and Bet'),
        ('atlantis', 'Atlantis'),
        ('abc', 'ABC'),
        ('stratosphere', 'Stratosphere'),
        ('wagerweb', 'WagerWeb'),
        ('test2', 'Test2'),
        ('ticosports', 'TicoSports'),
        ('perhead', 'PerHead'),
        ('golden_nugget', 'Golden Nugget'),
        ('wagerabc', 'WagerABC'),
        ('bookie', 'Bookie'),
        ('playcr', 'PlayCR'),
        ('topbet', 'TopBet'),
        ('betosb', 'BetOSB'),
        ('cd_sports', 'CD Sports'),
        ('odds', 'Odds'),
        ('wagerperhead', 'WagerPerHead'),
        ('lowvig', 'Lowvig'),
        ('betsts', 'BetSTS'),
        ('linepros', 'LinePros'),
        ('bpph', 'BPPH'),
        ('evo', 'EVO'),
        ('treasure_island', 'Treasure Island'),
        ('carson_valley_inn', 'Carson Valley Inn'),
        ('7pph', '7PPH'),
        ('cg_technology', 'CG Technology'),
        ('wagermadness', 'WagerMadness'),
        ('casablanca', 'CasaBlanca'),
        ('bethk', 'BETHK'),
        ('heritage105', 'Heritage105'),
        ('lovbet', 'Lovbet'),
        ('bet365', 'Bet365'),
        ('looselines', 'LooseLines'),
        ('mybookie', 'MyBookie'),
        ('ucabet', 'UCABet'),
        ('mgm', 'MGM'),
        ('el_caribe', 'El Caribe'),
        ('gtbets', 'GTbets'),
        ('betdsi', 'BetDSI'),
        ('sports411', 'Sports411'),
        ('acepph', 'AcePPH'),
        ('actionpass', 'ActionPass'),
        ('bet33', 'Bet33'),
        ('betfair', 'BetFair'),
        ('betisn', 'BetISN'),
        ('betway', 'BetWay'),
        ('codere', 'Codere'),
        ('consensus', 'Consensus'),
        ('dollar', 'Dollar'),
        ('hotelnv', 'HotelNV'),
        ('isi_sports', 'ISI Sports'),
        ('lakeside_inn', 'Lakeside Inn'),
        ('osc', 'OSC'),
        ('premier', 'Premier'),
        ('probets', 'ProBets'),
        ('samvo', 'Samvo'),
        ('betano','Betano'),
        ('betanysports', 'BetAnySports'),
        ('sportsbetting_au', 'SportsBetting AU'),
        ('sportsbetting_ol', 'SportsBetting OL'),
        ('baldinis', 'Baldinis'),
        ('betcris', 'BetCRIS'),
        ('dimebet', 'DimeBet'),
        ('delottery', 'DELottery'),
        ('williamhill_nj', 'William Hill NJ'),
        ('bteast', 'BetEast'),
        ('williamhill_ms', 'William Hill MS'),
        ('draftkings', 'DraftKings'),
        ('santaana', 'SantaAna'),
        ('scarlet_pearl', 'Scarlet Pearl'),
        ('rhode_island_lottery', 'Rhode Island Lottery'),
        ('betlucky_wi', 'BetLucky-WI'),
        ('betlucky_mg', 'BetLucky-MG'),
        ('playmgm', 'PlayMGM'),
        ('moneyball', 'Moneyball'),
        ('buffalo_thunder', 'Buffalo Thunder'),
        ('circa', 'Circa'),
        ('betworks', 'BetWorks'),
        ('isleta', 'Isleta'),
        ('pearl_river', 'Pearl River'),
        ('chinook', 'Chinook'),
        ('rwcatskills', 'RWCatskills'),
        ('route66', 'Route66'),
        ('thescore', 'TheScore'),
        ('beau_rivage', 'Beau Rivage'),
        ('monarch_bh', 'Monarch BH'),
        ('sky_ute', 'Sky Ute'),
        ('parx', 'Parx'),
        ('wmhill', 'WMHill'),
        ('betmgmdetroit', 'BetMGMDetroit'),
        ('spiritmountain', 'SpiritMountain'),
        ('bet105', 'Bet105'),
        ('sasquatchwildcardco', 'SasquatchWildCardCO'),
        ('maverick', 'Maverick'),
        ('betsson', 'Betsson'),
        ('odawa', 'Odawa'),
        ('firebet', 'FireBet'),
        ('sugarhouse', 'SugarHouse'),
        ('betrivers', 'BetRivers'),
        ('consensus_us', 'Consensus US'),
        ('ballybet', 'BallyBet'),
        ('resortworldlv', 'ResortWorldLV'),
        ('lines_ag', 'Lines.ag'),
        ('gila_river_az', 'Gila River AZ'),
        ('cadillac_jacks_sd', 'Cadillac Jacks SD'),
        ('tin_lizzie_sd', 'Tin Lizzie SD'),
        ('emerald_queen_wa', 'Emerald Queen WA'),
        ('circaia', 'CircaIA'),
        ('elysdc', 'ELYSDC'),
        ('boyd', 'Boyd'),
        ('betkota', 'BETKOTA'),
        ('fuboia', 'FuboIA'),
        ('wynnma', 'WynnMA'),
        ('mgm_natl_harbor_md', 'MGM Natl Harbor MD'),
        ('igt', 'IGT'),
        ('db_sportsbook_test', 'DB Sportsbook Test'),
        ('truebookies', 'Truebookies'),
        ('paradisewager', 'ParadiseWager'),
        ('pph_test', 'PPH Test'),
        ('4castersports', '4CasterSports'),
        ('amapola', 'Amapola'),
        ('betjet88', 'BetJet88'),
        ('shiba', 'Shiba'),
        ('prophet_exchange_nj', 'Prophet Exchange NJ'),
        ('3et', '3et'),
        ('sundaybets', 'SundayBets'),
        ('circaco', 'CircaCO'),
        ('gantest1', 'GANTest1'),
        ('gantest2', 'GANTest2'),
        ('circail', 'CircaIL'),
        ('ts_lambda', 'ts_lambda'),
        ('ts_lambda_stage', 'ts_lambda_stage'),
        ('donbest', 'DonBest'),
        ('bettorsden', 'BettorsDen'),
    ]
    STATUSES = [
        ('won', 'Won'),
        ('lost', 'Lost'),
        ('cashout', 'Cashout'),
        ('pending', 'Pending'),
        ('refunded', 'Refunded'),
        ('half_won', 'Half Won'),
        ('half_lost', 'Half Lost'),
    ]

    SPORTS = [
        ('soccer', 'Soccer'),
        ('basketball', 'Basketball'),
        ('american_football', 'Am.Football'),
        ('ice_hockey','Ice Hockey'),
        ('baseball','Baseball'),
        ('tennis', 'Tennis'),
    ]

    LEAGUES = [
        ('epl', 'English Premier League'),
        ('nba', 'NBA'),
        ('nfl', 'NFL'),
        ('ucl', 'UEFA Champions League'),
    ]



    sport = models.CharField(max_length=50, choices=SPORTS)
    league = models.CharField(max_length=50, choices=LEAGUES)
    user = models.ForeignKey('Player', on_delete=models.CASCADE, related_name='bets')
    bet_type = models.CharField(max_length=255, choices=BET_TYPES)
    market_name = models.CharField(max_length=255)
    bet_name = models.CharField(max_length=255)
    sportsbook = models.CharField(max_length=50, choices=SPORTSBOOKS)
    stake = models.DecimalField(max_digits=10, decimal_places=2)
    cashout_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    odds = models.FloatField()
    status = models.CharField(max_length=20, choices=STATUSES)
    bonus_bet = models.BooleanField(default=False)
    event_name = models.CharField(max_length=255)
    sport = models.CharField(max_length=50, choices=SPORTS)
    league = models.CharField(max_length=50, choices=LEAGUES)
    notes = models.TextField(blank=True)
    tags = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def payout(self):
        odds_decimal = Decimal(str(self.odds))
        if self.status == 'won':
            return self.stake * odds_decimal if not self.bonus_bet else (self.stake * odds_decimal) - self.stake
        elif self.status == 'half_won':
            return (self.stake / 2) * Decimal(self.odds) + (self.stake / 2)
        elif self.status == 'half_lost':
            return self.stake/2
        elif self.status == 'refunded':
            return self.stake
        elif self.status == 'pending':
            return Decimal('0.0')
        elif self.status == 'cashout':
            return self.cashout_amount if self.cashout_amount is not None else Decimal('0.0')
        else:
            return Decimal('0.0')

    @property
    def profit(self):
        if self.status == 'pending':
            return str("-")
        elif self.bonus_bet:
            return self.payout
        elif self.status == 'refunded':
            return Decimal('0.0')
        else:
            return self.payout - self.stake


def clean(self):
    super().clean()
    allowed_leagues = self.SPORT_LEAGUE_MAP.get(self.sport, [])
    if self.league not in allowed_leagues:
        raise ValidationError({
            'league': f'League "{self.league}" is not valid for sport "{self.sport}".'
         })
document.addEventListener('DOMContentLoaded', function () {
    const sportField = document.getElementById('id_sport');
    const leagueField = document.getElementById('id_league');

    if (!sportField || !leagueField) return;

    const leaguesBySport = {
        soccer: ['epl', 'ucl'],
        basketball: ['nba'],
        american_football: ['nfl'],
        // Add more mappings as needed
    };

    function updateLeagues() {
        const selectedSport = sportField.value;
        const allowedLeagues = leaguesBySport[selectedSport] || [];

        Array.from(leagueField.options).forEach(option => {
            option.style.display = allowedLeagues.includes(option.value) ? 'block' : 'none';
        });

        if (!allowedLeagues.includes(leagueField.value)) {
            leagueField.value = '';
        }
    }

    sportField.addEventListener('change', updateLeagues);
    updateLeagues(); // Run once on page load
});

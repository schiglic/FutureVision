// Голосування з динамічними результатами (імітація)
document.addEventListener('DOMContentLoaded', function() {
    const voteForm = document.getElementById('vote-form');
    const voteResults = document.getElementById('vote-results');
    let votes = { healthcare: 0, education: 0, transportation: 0 };

    voteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const selected = document.querySelector('input[name="vote"]:checked');
        if (selected) {
            votes[selected.value]++;
            voteResults.innerHTML = `
                <p>Медицина: ${votes.healthcare} | Освіта: ${votes.education} | Транспорт: ${votes.transportation}</p>
            `;
        }
    });
});
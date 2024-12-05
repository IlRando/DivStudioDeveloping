document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tabs li');
    const tabContent = document.getElementById('tabContent');

    // Set first tab as active
    setActiveTab(tabs[0]);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveTab(tab);
        });
    });

    function setActiveTab(clickedTab) {
        // Remove active class from all tabs
        tabs.forEach(tab => tab.classList.remove('is-active'));
        
        // Add active class to clicked tab
        clickedTab.classList.add('is-active');

        // Update content based on selected tab
        const selectedTab = clickedTab.querySelector('a').textContent;
        updateTabContent(selectedTab);
    }

    async function updateTabContent(tabName) {
        switch(tabName) {
            case 'Participantes':
                try {
                    const response = await fetch('/Events/NoMansLand/players.json');
                    const data = await response.json();
                    displayPlayers(data.players);
                } catch (error) {
                    console.error('Error loading players:', error);
                    tabContent.innerHTML = '<p>Error loading players</p>';
                }
                break;
            case 'Reglas':
                tabContent.innerHTML = '<img src="/Images/Rules.png" alt="Rules Image">';
                break;
            case 'Mods':
                tabContent.innerHTML = '<p>Lista de mods aquí...</p>';
                break;
            case 'Información general':
                tabContent.innerHTML = '<p>Información general aquí...</p>';
                break;
        }
    }

    function displayPlayers(players) {
        const playerGrid = document.createElement('div');
        playerGrid.className = 'player-grid';

        players.forEach(player => {
            const playerCard = `
                <a href="https://twitch.tv/${player.twitch}" 
                   target="_blank" 
                   class="player-card animate__animated animate__fadeInUp ${player.status}"
                   rel="noopener noreferrer">
                    <div class="player-card-inner">
                        <img src="https://mc-heads.net/avatar/${player.username}" 
                             alt="${player.username}'s avatar">
                        <h3 class="player-name">${player.username}</h3>
                        <p class="player-quote">"${player.quote}"</p>
                    </div>
                </a>
            `;
            playerGrid.innerHTML += playerCard;
        });

        tabContent.innerHTML = '';
        tabContent.appendChild(playerGrid);

        document.querySelectorAll('.player-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.remove('animate__animated', 'animate__fadeInUp');
            });
        });
    }

    // Load initial content
    updateTabContent('Participantes');
});
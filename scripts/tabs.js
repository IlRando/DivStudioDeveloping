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
                tabContent.innerHTML = '<img src="/Images/NoMansLand/Rules.png" alt="Rules Image">';
                break;
            case 'Mods':
                tabContent.innerHTML = '<p>Lista de mods aquí...</p>';
                break;
            case 'Información general':
                tabContent.innerHTML = '<img src="/Images/NoMansLand/GeneralInfo.png" alt="Rules Image">';
                break;
        }
    }

    function displayPlayers(players, page = 1) {
        const playerGrid = document.createElement('div');
        playerGrid.className = 'player-grid';
    
        // Calculate the number of pages
        const pageSize = 10; // Number of players per page
        const totalPages = Math.ceil(players.length / pageSize);
    
        // Create pagination links
        const paginationLinks = document.createElement('div');
        paginationLinks.className = 'pagination-links';

        // Add "Anterior" button
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.textContent = '⪻';
        prevButton.addEventListener('click', (event) => {
        event.preventDefault(); // Add this line
        const currentPage = page > 1 ? page - 1 : 1;
        displayPlayers(players, currentPage);
        });
        paginationLinks.appendChild(prevButton);

        // Create page number links
        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = i;
            link.addEventListener('click', (event) => {
            event.preventDefault(); // Add this line
            displayPlayers(players, i);
            });
            paginationLinks.appendChild(link);
        }

        // Add "Siguiente" button
        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.textContent = '⪼';
        nextButton.addEventListener('click', (event) => {
        event.preventDefault(); // Add this line
        const currentPage = page < totalPages ? page + 1 : totalPages;
        displayPlayers(players, currentPage);
        });
        paginationLinks.appendChild(nextButton);

        // Display players for the selected page
        displayPlayersPage(players, page, pageSize);
    
        // Append pagination links to the tab content
        tabContent.appendChild(paginationLinks);
    
        // Function to display players for a specific page
        function displayPlayersPage(players, page, pageSize) {
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const playersPage = players.slice(start, end);
            
            // Clear the player grid
            playerGrid.innerHTML = '';
            
            playersPage.forEach(player => {
                const playerCard = `
                    <a href="https://twitch.tv/${player.twitch}" 
                       target="_blank" 
                       class="player-card animate__animated animate__fadeInUp ${player.status}"
                       rel="noopener noreferrer">
                        <div class="player-card-inner">
                            <img src="https://mc-heads.net/avatar/${player.username}" 
                                 alt="${player.username}'s avatar">
                            <h3 class="player-name">${player.username}</h3>
                        </div>
                    </a>
                `;
                playerGrid.innerHTML += playerCard;
            });
            
            prevButton.className = 'prev-button';
            nextButton.className = 'next-button';
        
            tabContent.innerHTML = '';
            tabContent.appendChild(playerGrid);
        }
    }

    // Load initial content
    updateTabContent('Participantes');
});
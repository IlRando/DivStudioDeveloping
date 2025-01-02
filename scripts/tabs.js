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
                    const storedPage = localStorage.getItem('currentPage');
                    displayPlayers(data.players, storedPage ? parseInt(storedPage) : 1);
                } catch (error) {
                    console.error('Error loading players:', error);
                    tabContent.innerHTML = '<p>Error loading players</p>';
                }
                break;

                case 'Reglas':
                    tabContent.innerHTML = '<img src="/Images/NoMansLand/Rules.png" alt="Rules Image">';
                    // Remove existing animation classes
                    tabContent.querySelector('img').classList.remove('animate__animated', 'animate__zoomIn');
                    // Add animation classes again
                    tabContent.querySelector('img').classList.add('animate__animated', 'animate__zoomIn');
                    break;

                case 'Mods':
                    const carousel = document.createElement('div');
                    carousel.id = 'mods-carousel';
                    carousel.classList.remove('animate__animated', 'animate__slideInUp');
                    carousel.classList.add('animate__animated', 'animate__slideInUp');
        
                    const carouselItems = [
                        {
                            image: 'https://media.forgecdn.net/attachments/305/549/snorkel.png',
                        },
                        {
                            image: 'https://media.forgecdn.net/attachments/510/121/newscreenshot1.png',
                        },
                        {
                            image: 'https://media.forgecdn.net/attachments/393/726/screenshot4.png',
                        },
                        {
                            image: '/Images/NoMansLand/Mods/1.png',
                        },
                        {
                            image: '/Images/NoMansLand/Mods/2.png',
                        },
                        {
                            image: 'https://i.tlauncher.org/images/emotecraft-mod-screenshots-2.jpg',
                        },
                        {
                            image: 'https://www.9minecraft.net/wp-content/uploads/2019/06/Health-Overlay-mod-for-minecraft-01.jpg',
                        },
                        {
                            image: 'https://journeymap.readthedocs.io/en/latest/_images/waypoint1.png',
                        },
                        {
                            image: 'https://media.forgecdn.net/attachments/903/124/morearmors-1.png',
                        },
                        {
                            image: '/Images/NoMansLand/Mods/3.jpg',
                        },
                        {
                            image: '/Images/NoMansLand/Mods/4.png',
                        },
                        {
                            image: '/Images/NoMansLand/Mods/5.webp',
                        },
                        {
                            image: 'https://media.forgecdn.net/attachments/description/547224/description_89313efd-bb4d-48e6-bd61-414b3eda4a85.png',
                        },
                        {
                            image: 'https://media.forgecdn.net/attachments/300/239/skrin-gejmpleya-2.png',
                        }
                    ];
        
                    carouselItems.forEach(item => {
                        const carouselItem = document.createElement('div');
                        carouselItem.classList.add('carousel-item');
        
                        const carouselImage = document.createElement('img');
                        carouselImage.src = item.image;
                        carouselImage.alt = item.title;
        
                        const carouselTitle = document.createElement('h2');
                        carouselTitle.textContent = item.title;
        
                        const carouselDescription = document.createElement('p');
                        carouselDescription.textContent = item.description;
        
                        carouselItem.appendChild(carouselImage);
                        carousel.appendChild(carouselItem);
                    });
        
                    tabContent.innerHTML = '';
                    tabContent.appendChild(carousel);
        
                    tabContent.classList.add('carousel-container');

                    bulmaCarousel.attach('#mods-carousel', {
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        infinite: true,
                        autoplay: true,
                    });

                    break;

                case 'Información general':
                    tabContent.innerHTML = '<img src="/Images/NoMansLand/GeneralInfo.png" alt="GI Image">';
                    tabContent.querySelector('img').classList.remove('animate__animated', 'animate__zoomIn');
                    tabContent.querySelector('img').classList.add('animate__animated', 'animate__zoomIn');
                    break;
        }
    }

    function displayPlayers(players, page = 1) {
        const playerGrid = document.createElement('div');
        playerGrid.className = 'player-grid';
        // Store the current page number in localStorage
        localStorage.setItem('currentPage', page);

        // When the page loads, check if there's a stored page number
        document.addEventListener('DOMContentLoaded', function() {
            const storedPage = localStorage.getItem('currentPage');
            if (storedPage) {
                displayPlayers(players, parseInt(storedPage));
            } else {
                displayPlayers(players);
            }
        });

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
                    <a href="${player.twitch ? `https://twitch.tv/${player.twitch}` : `https://www.youtube.com/${player.youtube}`}"
                       target="_blank"
                       class="player-card animate__animated animate__fadeInUp ${player.status}"
                       rel="noopener noreferrer">
                        <div class="player-card-inner">
                            <img src="https://mc-heads.net/avatar/${player.username}"
                                 alt="${player.username}'s avatar">
                            <h3 class="player-name">${player.username}</h3>
                            <p class="player-quote">${player.quote || "uwu"}</p>
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
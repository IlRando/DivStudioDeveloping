function showEventDetails(eventId) {
    const eventContent = document.getElementById('eventContent');
    const eventDetailsTitle = document.querySelector('#eventDetails h1');

    // Remove the title from the event details section
    eventDetailsTitle.style.display = 'none';

    eventContent.classList.add('animate__animated', 'animate__fadeOut'); // Add fade-out animation

    fetch('/events.json')
      .then(response => response.json())
      .then(events => {
        const event = events[eventId];
        if (event) {
          eventContent.innerHTML = `
            <div class="flex items-start">
              <img src="${event.image}" alt="${event.title}" class="w-1/3" />
              <div class="pl-8">
                <h1 class="text-4xl font-bold text-white mb-4">${event.title}</h1>
                <p class="text-white mb-4">${event.description}</p>
                <a href="${event.link}" class="border-2 border-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 hover:text-black transition-all duration-300 btn-glow">Más información</a>
              </div>
            </div>
          `;
          eventContent.classList.remove('animate__fadeOut'); // Remove fade-out animation
          eventContent.classList.add('animate__fadeIn'); // Add fade-in animation
        }
      })
      .catch(error => console.error('Error fetching event data:', error));
  }
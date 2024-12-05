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
            <div class="event-details">
              <img src="${event.image}" alt="${event.title}" />
              <div>
                <h1 class="event-details-title">${event.title}</h1>
                <p class="event-details-description">${event.description}</p>
                <a href="${event.link}" class="button is-primary">Más información</a>
              </div>
            </div>
          `;
          eventContent.classList.remove('animate__fadeOut'); // Remove fade-out animation
          eventContent.classList.add('animate__fadeIn'); // Add fade-in animation
        }
      })
      .catch(error => console.error('Error fetching event data:', error));
  }
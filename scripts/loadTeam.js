fetch('/team.json')
  .then(response => response.json())
  .then(data => {
    const teamContainer = document.querySelector('#Team .columns');
    teamContainer.innerHTML = ''; // Clear existing content

    data.forEach(member => {
      const column = document.createElement('div');
      column.className = 'column is-one-third';

      const card = document.createElement('div');
      card.className = 'card';

      const cardContent = document.createElement('div');
      cardContent.className = 'card-content is-flex is-align-items-center p-0';

      const img = document.createElement('img');
      img.src = member.image;
      img.className = 'card-image';
      img.alt = `${member.role} Image`;

      const contentCenter = document.createElement('div');
      contentCenter.className = 'content-center';

      const title = document.createElement('p');
      title.className = 'title';
      title.textContent = member.role;

      contentCenter.appendChild(title);

      member.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'button is-link is-outlined';
        a.target = '_blank';
        a.textContent = link.text;
        contentCenter.appendChild(a);
      });

      cardContent.appendChild(img);
      cardContent.appendChild(contentCenter);
      card.appendChild(cardContent);
      column.appendChild(card);
      teamContainer.appendChild(column);
    });
  })
  .catch(error => console.error('Error loading team data:', error)); 
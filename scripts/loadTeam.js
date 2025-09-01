fetch('/team.json')
  .then(response => response.json())
  .then(data => {
    const teamContainer = document.querySelector('#Team .grid');
    teamContainer.innerHTML = ''; // Clear existing content
    teamContainer.style.display = 'flex';
    teamContainer.style.flexWrap = 'wrap';

    data.forEach(member => {
      const column = document.createElement('div');
      column.className = 'w-full sm:w-1/2 md:w-1/3 p-4 flex';

      const card = document.createElement('div');
      card.className = 'bg-gray-800 rounded-lg overflow-hidden w-full flex flex-col';

      const cardContent = document.createElement('div');
      cardContent.className = 'p-4 text-center flex-grow';

      const img = document.createElement('img');
      img.src = member.image;
      img.className = 'w-32 h-32 rounded-full mx-auto';
      img.alt = `${member.role} Image`;

      const title = document.createElement('p');
      title.className = 'text-white text-xl font-bold mt-4';
      title.textContent = member.role;

      cardContent.appendChild(img);
      cardContent.appendChild(title);

      const linksContainer = document.createElement('div');
      linksContainer.className = 'p-4 text-center';

      member.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'mt-2 inline-block bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
        a.target = '_blank';
        a.textContent = link.text;
        linksContainer.appendChild(a);
      });

      card.appendChild(cardContent);
      card.appendChild(linksContainer);
      column.appendChild(card);
      teamContainer.appendChild(column);
    });
  })
  .catch(error => console.error('Error loading team data:', error)); 
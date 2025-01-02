fetch('devs.json')
  .then(response => response.json())
  .then(data => {
    const dropdown = document.getElementById('links-dropdown');
    data.developers.forEach(dev => {
      const link = document.createElement('a');
      link.href = dev.url;
      link.target = '_blank';
      link.className = 'social-link';
      link.innerHTML = `<img src="${dev.image}" alt="${dev.name}" style="height: 20px; margin-right: 10px;">${dev.name}`;
      dropdown.appendChild(link);
    });
  });

function toggleDropdown() {
  const dropdown = document.getElementById('links-dropdown');
  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
  } else {
    dropdown.classList.add('show');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.querySelector('.spinner');
  spinner.addEventListener('click', () => {
    window.location.href = 'https://www.twitch.tv/randomaik';
  });
});
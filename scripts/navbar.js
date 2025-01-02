function toggleNavbar() {
    const navbarMenu = document.getElementById('navbarMenu');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        if (navbarMenu.classList.contains('is-active')) {
            navbarMenu.classList.remove('is-active');
            navbarMenu.classList.add('is-closing');
            navbarMenu.addEventListener('animationend', () => {
                navbarMenu.classList.remove('is-closing');
                navbarMenu.style.display = 'none'; // Ensure it hides after animation
            }, { once: true });
        } else {
            navbarMenu.style.display = 'block'; // Ensure it shows before animation
            navbarMenu.classList.add('is-active');
        }
    } else {
        navbarMenu.classList.toggle('is-active');
    }
}

function closeNavbar() {
    const navbarMenu = document.getElementById('navbarMenu');
    if (navbarMenu.classList.contains('is-active')) {
        navbarMenu.classList.remove('is-active');
    }
}

window.addEventListener('hashchange', () => {
    const sectionId = window.location.hash.substring(1);
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Also, scroll to the section on page load
  document.addEventListener('DOMContentLoaded', () => {
    const sectionId = window.location.hash.substring(1);
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  
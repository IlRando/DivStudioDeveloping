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

document.addEventListener('DOMContentLoaded', () => {
  const spans = document.querySelectorAll('.WelcomeSub span');

  spans.forEach((span, index) => {
    span.classList.add('animate__animated', 'animate__fadeInUp');
    span.style.animationDelay = `${index * 0.01}s`;
  });
});


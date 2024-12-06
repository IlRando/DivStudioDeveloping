document.addEventListener('DOMContentLoaded', () => {
    const spans = document.querySelectorAll('.WelcomeSub span');

    spans.forEach((span, index) => {
        span.classList.add('animate__animated', 'animate__fadeInUp');
        span.style.animationDelay = `${index * 0.01}s`;
    });
});
document.addEventListener('DOMContentLoaded', function() {

    // --- EFEK HEADER SAAT SCROLL ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- LOGIKA CAROUSEL MODERN ---
    const carousels = document.querySelectorAll('.carousel-wrapper');

    carousels.forEach(wrapper => {
        const carousel = wrapper.querySelector('.movie-carousel');
        const prevBtn = wrapper.querySelector('.carousel-arrow.prev');
        const nextBtn = wrapper.querySelector('.carousel-arrow.next');
        
        if (!carousel || !prevBtn || !nextBtn) return;

        nextBtn.addEventListener('click', () => {
            const scrollAmount = carousel.clientWidth * 0.8; // Gulir 80% dari lebar terlihat
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            const scrollAmount = carousel.clientWidth * 0.8;
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    });
});

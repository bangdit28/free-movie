document.addEventListener('DOMContentLoaded', function() {
    const movieDatabase = JSON.parse(localStorage.getItem('movieDB')) || initialMovieData;

    function createMovieCard(movie) {
        return `
            <div class="movie-card">
                <img src="${movie.posterUrl}" alt="${movie.title}">
                <div class="card-overlay">
                    <div class="card-actions">
                        <button class="action-btn"><i class="fas fa-play"></i></button>
                        <button class="action-btn"><i class="fas fa-plus"></i></button>
                        <button class="action-btn"><i class="fas fa-thumbs-up"></i></button>
                    </div>
                    <h3 class="card-title">${movie.title}</h3>
                </div>
            </div>
        `;
    }

    function populateCarousel(carouselId, category) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;
        const filteredMovies = movieDatabase.filter(movie => movie.category === category);
        let carouselHTML = '';
        filteredMovies.forEach(movie => {
            carouselHTML += createMovieCard(movie);
        });
        carousel.innerHTML = carouselHTML;
    }

    populateCarousel('populer-carousel', 'populer');
    populateCarousel('baru-carousel', 'baru');
    populateCarousel('indonesia-carousel', 'indonesia');

    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const carousels = document.querySelectorAll('.carousel-wrapper');
    carousels.forEach(wrapper => {
        const carousel = wrapper.querySelector('.movie-carousel');
        const prevBtn = wrapper.querySelector('.carousel-arrow.prev');
        const nextBtn = wrapper.querySelector('.carousel-arrow.next');
        if (!carousel || !prevBtn || !nextBtn) return;
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: 'smooth' });
        });
    });
});
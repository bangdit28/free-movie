document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.hamburger-menu'), mobileNav = document.querySelector('.mobile-nav'), closeBtn = document.querySelector('.close-btn'), navOverlay = document.querySelector('.nav-overlay');
    if (hamburgerBtn && mobileNav && closeBtn && navOverlay) {
        const openNav = () => { mobileNav.classList.add('open'); navOverlay.classList.add('active'); };
        const closeNav = () => { mobileNav.classList.remove('open'); navOverlay.classList.remove('active'); };
        hamburgerBtn.addEventListener('click', openNav); closeBtn.addEventListener('click', closeNav); navOverlay.addEventListener('click', closeNav);
    }

    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const BG_IMG_URL = 'https://image.tmdb.org/t/p/original';

    function loadContentFromLocalDB() {
        const localMovieDB = JSON.parse(localStorage.getItem('cineMaxDB')) || [];
        
        populateHero(localMovieDB[0]);
        populateCarousel('populer-carousel', localMovieDB, 'populer');
        populateCarousel('baru-carousel', localMovieDB, 'baru');
        populateCarousel('indonesia-carousel', localMovieDB, 'indonesia');
    }

    function populateHero(movie) {
        const heroTitle = document.getElementById('hero-title');
        const heroDesc = document.getElementById('hero-desc');
        const heroBg = document.getElementById('hero-bg');
        const infoButton = document.getElementById('hero-info-btn');
        const playButton = document.getElementById('hero-play-btn');

        if (!movie) {
            heroTitle.textContent = "Tambahkan Film di Panel Admin";
            heroDesc.textContent = "Website ini ditenagai oleh database film pilihan Anda. Silakan masuk ke panel admin untuk mulai mencari dan menambahkan film ke halaman utama.";
            heroBg.src = "";
            return;
        };
        heroBg.src = BG_IMG_URL + movie.backdrop_path;
        heroTitle.textContent = movie.title;
        heroDesc.textContent = movie.overview;
        if (infoButton) infoButton.onclick = () => window.location.href = `detail.html?id=${movie.id}`;
        if (playButton) playButton.onclick = () => window.location.href = `detail.html?id=${movie.id}`;
    }

    function populateCarousel(carouselId, allMovies, category) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;
        const filteredMovies = allMovies.filter(movie => movie.category === category);
        carousel.innerHTML = filteredMovies.map(movie => createMovieCard(movie)).join('');
    }

    function createMovieCard(movie) {
        return `
            <a href="detail.html?id=${movie.id}" class="movie-card-link">
                <div class="movie-card">
                    <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
                </div>
            </a>
        `;
    }

    window.addEventListener('storage', (event) => {
        if (event.key === 'cineMaxDB') {
            loadContentFromLocalDB();
        }
    });

    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => { if (window.scrollY > 50) { header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); } });
    const carousels = document.querySelectorAll('.carousel-wrapper');
    carousels.forEach(wrapper => {
        const carousel = wrapper.querySelector('.movie-carousel'), prevBtn = wrapper.querySelector('.carousel-arrow.prev'), nextBtn = wrapper.querySelector('.carousel-arrow.next');
        if (!carousel || !prevBtn || !nextBtn) return;
        nextBtn.addEventListener('click', () => { carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: 'smooth' }); });
        prevBtn.addEventListener('click', () => { carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: 'smooth' }); });
    });

    loadContentFromLocalDB();
});

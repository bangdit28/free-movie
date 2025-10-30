document.addEventListener('DOMContentLoaded', function() {
    
    // --- [FIX] LOGIKA NAVIGASI SELULER YANG DIPERBAIKI ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-btn');
    const navOverlay = document.querySelector('.nav-overlay');

    // Pastikan semua elemen ada sebelum menambahkan event listener
    if (hamburgerBtn && mobileNav && closeBtn && navOverlay) {
        const openNav = () => {
            mobileNav.classList.add('open');
            navOverlay.classList.add('active');
        };

        const closeNav = () => {
            mobileNav.classList.remove('open');
            navOverlay.classList.remove('active');
        };

        hamburgerBtn.addEventListener('click', openNav);
        closeBtn.addEventListener('click', closeNav);
        navOverlay.addEventListener('click', closeNav);
    }
    // --- AKHIR DARI FIX ---

    // Fungsi untuk memuat/memuat ulang semua data
    function loadContent() {
        const movieDatabase = JSON.parse(localStorage.getItem('movieDB')) || initialMovieData;

        // --- [BARU] FUNGSI UNTUK MENGISI HERO SECTION SECARA DINAMIS ---
        function populateHero() {
            if (movieDatabase.length > 0) {
                const featuredMovie = movieDatabase[0]; // Ambil film pertama sebagai unggulan
                document.getElementById('hero-title').textContent = featuredMovie.title;
                document.getElementById('hero-desc').textContent = featuredMovie.description;
                
                // Buat tombol info mengarah ke halaman detail film unggulan
                const infoButton = document.getElementById('hero-info-btn');
                if (infoButton) {
                    infoButton.onclick = () => {
                        window.location.href = `detail.html?id=${featuredMovie.id}`;
                    };
                }
            }
        }

        function createMovieCard(movie) {
            return `<a href="detail.html?id=${movie.id}" class="movie-card-link"><div class="movie-card"><img src="${movie.posterUrl}" alt="${movie.title}"><div class="card-overlay"><div class="card-actions"><button class="action-btn"><i class="fas fa-play"></i></button><button class="action-btn"><i class="fas fa-plus"></i></button></div><h3 class="card-title">${movie.title}</h3></div></div></a>`;
        }

        function populateCarousel(carouselId, category) {
            const carousel = document.getElementById(carouselId); if (!carousel) return;
            const filteredMovies = movieDatabase.filter(movie => movie.category === category); let carouselHTML = '';
            filteredMovies.forEach(movie => { carouselHTML += createMovieCard(movie); }); carousel.innerHTML = carouselHTML;
        }

        populateHero(); // Panggil fungsi untuk mengisi hero
        populateCarousel('populer-carousel', 'populer');
        populateCarousel('baru-carousel', 'baru');
        populateCarousel('indonesia-carousel', 'indonesia');
    }

    // --- FITUR REAL-TIME UPDATE ---
    window.addEventListener('storage', (event) => { if (event.key === 'movieDB') { loadContent(); } });
    
    // --- HEADER SCROLL & CAROUSEL ARROWS ---
    const header = document.querySelector('.main-header'); window.addEventListener('scroll', () => { if (window.scrollY > 50) { header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); } });
    const carousels = document.querySelectorAll('.carousel-wrapper');
    carousels.forEach(wrapper => {
        const carousel = wrapper.querySelector('.movie-carousel'), prevBtn = wrapper.querySelector('.carousel-arrow.prev'), nextBtn = wrapper.querySelector('.carousel-arrow.next'); if (!carousel || !prevBtn || !nextBtn) return;
        nextBtn.addEventListener('click', () => { carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: 'smooth' }); });
        prevBtn.addEventListener('click', () => { carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: 'smooth' }); });
    });

    // --- PEMUATAN AWAL ---
    loadContent();
});

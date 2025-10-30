document.addEventListener('DOMContentLoaded', () => {
    
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

    const urlParams = new URLSearchParams(window.location.search), movieId = parseInt(urlParams.get('id'));
    const movieDatabase = JSON.parse(localStorage.getItem('movieDB')) || initialMovieData;
    const movie = movieDatabase.find(m => m.id === movieId);
    const detailContent = document.getElementById('movie-detail-content');
    if (movie) {
        document.title = `${movie.title} - CineMAX`;
        detailContent.innerHTML = `<div class="movie-detail-grid"><div class="movie-poster-detail"><img src="${movie.posterUrl}" alt="${movie.title}"></div><div class="movie-info"><h1>${movie.title}</h1><p>${movie.description}</p><div class="hero-buttons"><button class="btn btn-play"><i class="fas fa-play"></i> Putar Film</button><button class="btn btn-info"><i class="fas fa-plus"></i> Tambah ke Daftar</button></div></div></div><div class="trailer-section"><h2>Trailer Resmi</h2><div class="trailer-wrapper"><iframe src="${movie.trailerUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>`;
    } else {
        detailContent.innerHTML = `<h1 style="text-align: center; margin-top: 5rem; color: var(--primary-red);">Film tidak ditemukan!</h1>`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // --- KONFIGURASI ---
    const API_KEY = 'bda883e3019106157c9a9c5cfe3921bb';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const BG_IMG_URL = 'https://image.tmdb.org/t/p/original';
    const EMBED_URL_BASE = 'https://vidrock.net/movie/';

    // --- LOGIKA NAVIGASI SELULER (TIDAK BERUBAH) ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-btn');
    const navOverlay = document.querySelector('.nav-overlay');
    if (hamburgerBtn && mobileNav && closeBtn && navOverlay) {
        const openNav = () => { mobileNav.classList.add('open'); navOverlay.classList.add('active'); };
        const closeNav = () => { mobileNav.classList.remove('open'); navOverlay.classList.remove('active'); };
        hamburgerBtn.addEventListener('click', openNav);
        closeBtn.addEventListener('click', closeNav);
        navOverlay.addEventListener('click', closeNav);
    }
    
    // --- LOGIKA HALAMAN DETAIL ---
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const detailMain = document.getElementById('detail-main'); // Cari elemen main di sini

    async function fetchAndDisplayDetail() {
        if (!movieId) {
            detailMain.innerHTML = "<h1>Error: ID Film tidak ditemukan di URL.</h1>";
            return;
        }
        try {
            const [movieRes, videoRes] = await Promise.all([
                fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`),
                fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
            ]);
            if (!movieRes.ok) throw new Error("Film tidak ditemukan!");
            const movie = await movieRes.json();
            const videoData = await videoRes.json();
            displayMovieDetail(movie, videoData.results);
        } catch (error) {
            document.getElementById('movie-detail-content').innerHTML = `<h1 style="text-align: center; margin-top: 5rem; color: var(--primary-red);">${error.message}</h1>`;
        }
    }

    function displayMovieDetail(movie, videos) {
        const detailContent = document.getElementById('movie-detail-content');
        const trailerContainer = document.getElementById('trailer-section-container');
        
        // [PERBAIKAN] Setel background image di sini, setelah elemen 'detailMain' dijamin ada
        if (detailMain) {
            detailMain.style.backgroundImage = `url(${BG_IMG_URL + movie.backdrop_path})`;
        }
        
        document.title = `${movie.title} - CineMAX`;
        
        detailContent.innerHTML = `
            <div class="movie-detail-grid">
                <div class="movie-poster-detail"><img src="${IMG_URL + movie.poster_path}" alt="${movie.title}"></div>
                <div class="movie-info">
                    <h1>${movie.title}</h1>
                    <p>${movie.overview}</p>
                    <div class="info-meta"><span>Rilis: ${movie.release_date}</span><span>Rating: ${movie.vote_average.toFixed(1)} / 10</span></div>
                    <div class="hero-buttons"><button class="btn btn-play" id="play-movie-btn"><i class="fas fa-play"></i> Putar Film</button></div>
                </div>
            </div>`;
        
        const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
            trailerContainer.innerHTML = `
                <div class="trailer-section">
                     <h2>Trailer Resmi</h2>
                     <div class="trailer-wrapper"><iframe src="https://www.youtube.com/embed/${trailer.key}" title="Trailer" frameborder="0" allowfullscreen></iframe></div>
                </div>`;
        }
        
        // [PERBAIKAN] Cari tombol dan elemen lain SETELAH mereka dibuat
        const playBtn = document.getElementById('play-movie-btn');
        const playerSection = document.getElementById('movie-player-section');
        const playerWrapper = document.getElementById('player-wrapper');
        
        if (playBtn && playerSection && playerWrapper) {
            playBtn.addEventListener('click', () => {
                playerWrapper.innerHTML = `<iframe src="${EMBED_URL_BASE}${movieId}" frameborder="0" allowfullscreen></iframe>`;
                playerSection.style.display = 'block';
                playerSection.scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    fetchAndDisplayDetail();
});

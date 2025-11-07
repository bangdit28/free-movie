document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-menu'), mobileNav = document.querySelector('.mobile-nav'), closeBtn = document.querySelector('.close-btn'), navOverlay = document.querySelector('.nav-overlay');
    if (hamburgerBtn && mobileNav && closeBtn && navOverlay) {
        const openNav = () => { mobileNav.classList.add('open'); navOverlay.classList.add('active'); };
        const closeNav = () => { mobileNav.classList.remove('open'); navOverlay.classList.remove('active'); };
        hamburgerBtn.addEventListener('click', openNav); closeBtn.addEventListener('click', closeNav); navOverlay.addEventListener('click', closeNav);
    }
    
    const API_KEY = 'bda883e3019106157c9a9c5cfe3921bb';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const BG_IMG_URL = 'https://image.tmdb.org/t/p/original';
    const DEFAULT_EMBED_BASE_URL = 'https://vidrock.net/movie/';
    
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    const detailMain = document.getElementById('detail-main');

    async function fetchAndDisplayDetail() {
        if (!movieId) { detailMain.innerHTML = "<h1>Error: ID Film tidak ditemukan di URL.</h1>"; return; }
        try {
            const movieRes = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
            const videoRes = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
            const localMovieDB = JSON.parse(localStorage.getItem('cineMaxDB')) || [];
            if (!movieRes.ok) throw new Error("Film tidak ditemukan di TMDB!");
            const movieDataFromAPI = await movieRes.json();
            const videoData = await videoRes.json();
            const movieDataFromLocal = localMovieDB.find(m => m.id === parseInt(movieId));
            displayMovieDetail(movieDataFromAPI, videoData.results, movieDataFromLocal);
        } catch (error) {
            document.getElementById('movie-detail-content').innerHTML = `<h1 style="text-align: center; margin-top: 5rem; color: var(--primary-red);">${error.message}</h1>`;
        }
    }

    function displayMovieDetail(movie, videos, localData) {
        const detailContent = document.getElementById('movie-detail-content');
        const trailerContainer = document.getElementById('trailer-section-container');
        
        if (detailMain) { detailMain.style.backgroundImage = `url(${BG_IMG_URL + movie.backdrop_path})`; }
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
        
        const playBtn = document.getElementById('play-movie-btn');
        const playerSection = document.getElementById('movie-player-section');
        const playerWrapper = document.getElementById('player-wrapper');
        
        if (playBtn && playerSection && playerWrapper) {
            playBtn.addEventListener('click', () => {
                let embedUrl;
                if (localData && localData.embed_override_url) {
                    embedUrl = localData.embed_override_url;
                } else {
                    embedUrl = `${DEFAULT_EMBED_BASE_URL}${movieId}`;
                }
                playerWrapper.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
                playerSection.style.display = 'block';
                playerSection.scrollIntoView({ behavior: 'smooth' });
            });
        }
    }
    fetchAndDisplayDetail();
});

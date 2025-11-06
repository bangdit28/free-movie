document.addEventListener('DOMContentLoaded', () => {
    // --- [SANGAT PENTING] SCRIPT KEAMANAN ---
    // Cek apakah user sudah login. Jika belum, tendang kembali ke halaman login.
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return; // Hentikan eksekusi sisa script jika belum login
    }
    // --- AKHIR SCRIPT KEAMANAN ---

    const API_KEY = 'bda883e3019106157c9a9c5cfe3921bb';
    const TMDB_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=id&include_adult=false&query=`;
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';

    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResultsContainer = document.getElementById('search-results');
    const siteMovieTableBody = document.getElementById('movie-list-body');

    let localMovieDB = JSON.parse(localStorage.getItem('cineMaxDB')) || [];

    function saveToLocalStorage() {
        localStorage.setItem('cineMaxDB', JSON.stringify(localMovieDB));
    }

    function renderSiteMovies() {
        siteMovieTableBody.innerHTML = '';
        localMovieDB.forEach(movie => {
            const row = `
                <tr>
                    <td><img src="${movie.poster_path ? IMG_URL + movie.poster_path : ''}" alt="${movie.title}"></td>
                    <td>${movie.title}</td>
                    <td>
                        <select class="category-select" data-id="${movie.id}">
                            <option value="populer" ${movie.category === 'populer' ? 'selected' : ''}>Populer</option>
                            <option value="baru" ${movie.category === 'baru' ? 'selected' : ''}>Baru</option>
                            <option value="indonesia" ${movie.category === 'indonesia' ? 'selected' : ''}>Indonesia</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" class="embed-override-input" placeholder="Kosong = pakai default" data-id="${movie.id}" value="${movie.embed_override_url || ''}">
                    </td>
                    <td><button class="delete-btn" data-id="${movie.id}">Hapus</button></td>
                </tr>`;
            siteMovieTableBody.innerHTML += row;
        });
    }

    async function searchMovies() {
        const query = searchInput.value;
        if (!query) return;
        try {
            const response = await fetch(TMDB_SEARCH_URL + encodeURIComponent(query));
            const data = await response.json();
            displaySearchResults(data.results);
        } catch (error) {
            searchResultsContainer.innerHTML = "<p>Gagal memuat hasil. Coba lagi.</p>";
        }
    }

    function displaySearchResults(movies) {
        searchResultsContainer.innerHTML = movies.filter(movie => movie.poster_path).map(movie => {
            const isAdded = localMovieDB.some(localMovie => localMovie.id === movie.id);
            return `
                <div class="result-card">
                    <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
                    <strong>${movie.title}</strong>
                    <button class="add-btn" data-movie-id="${movie.id}" ${isAdded ? 'disabled' : ''}>
                        ${isAdded ? 'Sudah Ditambahkan' : 'Tambahkan ke Situs'}
                    </button>
                </div>`;
        }).join('');
    }

    async function addMovieToSite(e) {
        if (!e.target.classList.contains('add-btn')) return;
        const button = e.target;
        const movieId = parseInt(button.getAttribute('data-movie-id'));
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
            const movieData = await res.json();
            const movieToAdd = {
                id: movieData.id, title: movieData.title, overview: movieData.overview,
                poster_path: movieData.poster_path, backdrop_path: movieData.backdrop_path,
                release_date: movieData.release_date, vote_average: movieData.vote_average,
                category: 'populer', embed_override_url: ''
            };
            localMovieDB.push(movieToAdd);
            saveToLocalStorage();
            renderSiteMovies();
            button.textContent = 'Sudah Ditambahkan';
            button.disabled = true;
        } catch (error) {
            console.error("Gagal menambahkan film:", error);
        }
    }
    
    function handleSiteMovieActions(e) {
        const target = e.target;
        const movieId = parseInt(target.getAttribute('data-id'));
        const movieIndex = localMovieDB.findIndex(movie => movie.id === movieId);
        if (movieIndex === -1) return;

        if (target.classList.contains('delete-btn')) {
            if (confirm('Yakin ingin menghapus film ini dari situs Anda?')) {
                localMovieDB.splice(movieIndex, 1);
                saveToLocalStorage();
                renderSiteMovies();
                displaySearchResults([]); searchInput.value = '';
            }
        }
        if (target.classList.contains('category-select')) {
            localMovieDB[movieIndex].category = target.value;
            saveToLocalStorage();
        }
        if (target.classList.contains('embed-override-input')) {
            localMovieDB[movieIndex].embed_override_url = target.value;
            saveToLocalStorage();
        }
    }

    searchBtn.addEventListener('click', searchMovies);
    searchInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') searchMovies() });
    searchResultsContainer.addEventListener('click', addMovieToSite);
    siteMovieTableBody.addEventListener('change', handleSiteMovieActions);
    siteMovieTableBody.addEventListener('click', handleSiteMovieActions);
    
    renderSiteMovies();
});

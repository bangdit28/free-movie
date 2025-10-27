document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil ID film dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));

    // 2. Muat database
    const movieDatabase = JSON.parse(localStorage.getItem('movieDB')) || initialMovieData;

    // 3. Cari film yang sesuai berdasarkan ID
    const movie = movieDatabase.find(m => m.id === movieId);

    const detailContent = document.getElementById('movie-detail-content');

    // 4. Jika film ditemukan, render kontennya. Jika tidak, tampilkan pesan error.
    if (movie) {
        // Ganti judul halaman
        document.title = `${movie.title} - CineMAX`;
        
        // Buat HTML untuk detail film
        const movieHTML = `
            <div class="movie-detail-grid">
                <div class="movie-poster-detail">
                    <img src="${movie.posterUrl}" alt="${movie.title}">
                </div>
                <div class="movie-info">
                    <h1>${movie.title}</h1>
                    <p>${movie.description}</p>
                    <div class="hero-buttons">
                        <button class="btn btn-play"><i class="fas fa-play"></i> Putar Film</button>
                        <button class="btn btn-info"><i class="fas fa-plus"></i> Tambah ke Daftar</button>
                    </div>
                </div>
            </div>
            <div class="trailer-section">
                 <h2>Trailer Resmi</h2>
                 <div class="trailer-wrapper">
                    <iframe src="${movie.trailerUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                 </div>
            </div>
        `;
        detailContent.innerHTML = movieHTML;
    } else {
        detailContent.innerHTML = `<h1 style="text-align: center; margin-top: 5rem; color: var(--primary-red);">Film tidak ditemukan!</h1>`;
    }
});

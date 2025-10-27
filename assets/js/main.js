document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk memuat/memuat ulang semua data ke carousel
    function loadAllCarousels() {
        // Ambil data terbaru dari Local Storage
        const movieDatabase = JSON.parse(localStorage.getItem('movieDB')) || initialMovieData;

        // Fungsi untuk merender SATU kartu film (sekarang menjadi link)
        function createMovieCard(movie) {
            return `
                <a href="detail.html?id=${movie.id}" class="movie-card-link">
                    <div class="movie-card">
                        <img src="${movie.posterUrl}" alt="${movie.title}">
                        <div class="card-overlay">
                            <div class="card-actions">
                                <button class="action-btn"><i class="fas fa-play"></i></button>
                                <button class="action-btn"><i class="fas fa-plus"></i></button>
                            </div>
                            <h3 class="card-title">${movie.title}</h3>
                        </div>
                    </div>
                </a>
            `;
        }

        // Fungsi untuk mengisi setiap carousel
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

        // Populate semua carousel
        populateCarousel('populer-carousel', 'populer');
        populateCarousel('baru-carousel', 'baru');
        populateCarousel('indonesia-carousel', 'indonesia');
    }

    // --- FITUR REAL-TIME UPDATE ---
    // Dengarkan perubahan pada Local Storage dari tab/jendela lain
    window.addEventListener('storage', (event) => {
        // Jika data 'movieDB' yang berubah, muat ulang carousel
        if (event.key === 'movieDB') {
            loadAllCarousels();
        }
    });

    // --- Logika Header & Carousel Arrows (Sama seperti sebelumnya) ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => { /* ... (kode sama) ... */ });
    const carousels = document.querySelectorAll('.carousel-wrapper');
    carousels.forEach(wrapper => { /* ... (kode sama) ... */ });

    // --- PEMUATAN AWAL ---
    // Panggil fungsi utama untuk memuat data saat halaman pertama kali dibuka
    loadAllCarousels();
});

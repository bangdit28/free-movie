const initialMovieData = [
    { id: 1, title: "Godzilla x Kong: The New Empire", description: "Dua raksasa kuno...", posterUrl: "https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg", category: "populer", trailerUrl: "https://www.youtube.com/embed/qqrpMRDuPfc" },
    { id: 2, title: "Dune: Part Two", description: "Paul Atreides bersatu...", posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", category: "populer", trailerUrl: "https://www.youtube.com/embed/U2Qp5pL3ovA" },
    { id: 3, title: "The Batman", description: "Ketika seorang pembunuh...", posterUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIY2VFIh5dcfKEjo.jpg", category: "baru", trailerUrl: "https://www.youtube.com/embed/mqqft2x_Aa4" },
    { id: 4, title: "Agak Laen", description: "Empat sekawan...", posterUrl: "https://image.tmdb.org/t/p/w500/v392z3eodG2mHaf5Cs23m9a3k3.jpg", category: "indonesia", trailerUrl: "https://www.youtube.com/embed/HqZp-y_8-sA" },
    { id: 5, title: "Poor Things", description: "Kisah fantastik...", posterUrl: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg", category: "baru", trailerUrl: "https://www.youtube.com/embed/R-_bCo7c8eI" }
];```

---

#### **6. File: `/assets/js/main.js`**
*(Logika utama dengan tambahan listener untuk nav seluler di bagian atas)*

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.hamburger-menu'), mobileNav = document.querySelector('.mobile-nav'), closeBtn = document.querySelector('.close-btn'), navOverlay = document.querySelector('.nav-overlay');
    const openNav = () => { mobileNav.classList.add('open'); navOverlay.classList.add('active'); };
    const closeNav = () => { mobileNav.classList.remove('open'); navOverlay.classList.remove('active'); };
    hamburgerBtn.addEventListener('click', openNav); closeBtn.addEventListener('click', closeNav); navOverlay.addEventListener('click', closeNav);

    function loadAllCarousels() {
        const movieDatabase = JSON.parse(localStorage.getItem('movieDB')) || initialMovieData;
        function createMovieCard(movie) {
            return `<a href="detail.html?id=${movie.id}" class="movie-card-link"><div class="movie-card"><img src="${movie.posterUrl}" alt="${movie.title}"><div class="card-overlay"><div class="card-actions"><button class="action-btn"><i class="fas fa-play"></i></button><button class="action-btn"><i class="fas fa-plus"></i></button></div><h3 class="card-title">${movie.title}</h3></div></div></a>`;
        }
        function populateCarousel(carouselId, category) {
            const carousel = document.getElementById(carouselId); if (!carousel) return;
            const filteredMovies = movieDatabase.filter(movie => movie.category === category); let carouselHTML = '';
            filteredMovies.forEach(movie => { carouselHTML += createMovieCard(movie); }); carousel.innerHTML = carouselHTML;
        }
        populateCarousel('populer-carousel', 'populer'); populateCarousel('baru-carousel', 'baru'); populateCarousel('indonesia-carousel', 'indonesia');
    }

    window.addEventListener('storage', (event) => { if (event.key === 'movieDB') { loadAllCarousels(); } });
    
    const header = document.querySelector('.main-header'); window.addEventListener('scroll', () => { if (window.scrollY > 50) { header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); } });
    const carousels = document.querySelectorAll('.carousel-wrapper');
    carousels.forEach(wrapper => {
        const carousel = wrapper.querySelector('.movie-carousel'), prevBtn = wrapper.querySelector('.carousel-arrow.prev'), nextBtn = wrapper.querySelector('.carousel-arrow.next'); if (!carousel || !prevBtn || !nextBtn) return;
        nextBtn.addEventListener('click', () => { carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: 'smooth' }); });
        prevBtn.addEventListener('click', () => { carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: 'smooth' }); });
    });

    loadAllCarousels();
});

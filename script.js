document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector('.main-header');

    // Tambahkan background pada header saat user melakukan scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // TODO (Untuk Pengembangan Lanjutan):
    // 1. Ambil data film dari sebuah API (Application Programming Interface).
    // 2. Buat fungsi untuk mengisi (populate) setiap .movie-carousel dengan data tersebut.
    // 3. Buat fungsionalitas modal/pop-up saat sebuah .movie-card diklik untuk menampilkan info detail film.
    // 4. Tambahkan tombol "next" dan "previous" untuk menggeser carousel.
    
});

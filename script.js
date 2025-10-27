document.addEventListener('DOMContentLoaded', function() {

    // --- FUNGSI MODAL TRAILER ---
    const modal = document.getElementById('trailer-modal');
    const playBtn = document.getElementById('play-trailer-btn');
    const closeBtn = document.querySelector('.close-btn');
    const trailerFrame = modal.querySelector('iframe');
    const originalSrc = trailerFrame.src;

    // Tampilkan modal saat tombol "Tonton Trailer" diklik
    playBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        // Tambahkan parameter autoplay saat modal dibuka
        trailerFrame.src = originalSrc + "?autoplay=1"; 
    });

    // Sembunyikan modal saat tombol close diklik
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        // Hentikan video dengan menghapus src
        trailerFrame.src = originalSrc; 
    });

    // Sembunyikan modal saat area di luar konten modal diklik
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
             // Hentikan video dengan menghapus src
            trailerFrame.src = originalSrc;
        }
    });


    // --- EFEK NAVIGASI TRANSPARAN SAAT SCROLL ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.5)';
        }
    });

});

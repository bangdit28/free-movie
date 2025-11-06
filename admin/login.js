document.addEventListener('DOMContentLoaded', () => {
    // --- GANTI USERNAME DAN PASSWORD DI BAWAH INI ---
    // PENTING: Gunakan kombinasi yang kuat dan hanya Anda yang tahu
    const CORRECT_USERNAME = 'bangdit28';
    const CORRECT_PASSWORD = 'tasik321'; // GANTI INI DENGAN PASSWORD ANDA

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
            // Jika login berhasil, simpan status di sessionStorage
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            // Arahkan ke panel admin
            window.location.href = 'admin.html';
        } else {
            // Jika gagal, tampilkan pesan error
            errorMessage.textContent = 'Username atau Password salah.';
            errorMessage.style.display = 'block';
        }
    });
});

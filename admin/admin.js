document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-movie-form');
    const movieTableBody = document.getElementById('movie-list-body');
    
    let movieDatabase = JSON.parse(localStorage.getItem('movieDB'));
    if (!movieDatabase) {
        movieDatabase = initialMovieData;
        saveToLocalStorage();
    }

    function saveToLocalStorage() {
        localStorage.setItem('movieDB', JSON.stringify(movieDatabase));
    }

    function renderMovieTable() {
        movieTableBody.innerHTML = '';
        movieDatabase.forEach(movie => {
            const row = `
                <tr>
                    <td><img src="${movie.posterUrl}" alt="${movie.title}"></td>
                    <td>${movie.title}</td>
                    <td>${movie.category}</td>
                    <td><button class="delete-btn" data-id="${movie.id}">Hapus</button></td>
                </tr>
            `;
            movieTableBody.innerHTML += row;
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newMovie = {
            id: Date.now(),
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            posterUrl: document.getElementById('posterUrl').value,
            trailerUrl: document.getElementById('trailerUrl').value,
            category: document.getElementById('category').value,
        };
        movieDatabase.push(newMovie);
        saveToLocalStorage();
        renderMovieTable();
        form.reset();
    });

    movieTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const movieId = parseInt(e.target.getAttribute('data-id'));
            if (confirm('Anda yakin ingin menghapus film ini?')) {
                movieDatabase = movieDatabase.filter(movie => movie.id !== movieId);
                saveToLocalStorage();
                renderMovieTable();
            }
        }
    });

    renderMovieTable();

});

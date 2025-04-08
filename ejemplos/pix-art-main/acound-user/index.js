let currentImageIndex = 0;
const images = [
    '/acound-user/usuario-cuenta.jpeg',
    '/acound-user/no idea.png',
    '/acound-user/usuario-cuenta.jpeg',
    '/acound-user/no idea.png',
    '/acound-user/usuario-cuenta.jpeg',
    '/acound-user/no idea.png',
    '/acound-user/usuario-cuenta.jpeg',
    '/acound-user/no idea.png',
    '/acound-user/no idea.png',
    '/acound-user/usuario-cuenta.jpeg',
    '/acound-user/no idea.png',
    '/acound-user/usuario-cuenta.jpeg',
    '/acound-user/no idea.png',
    '/acound-user/usuario-cuenta.jpeg',
    '/acound-user/usuario-cuenta.jpeg',
    '/acound-user/usuario-cuenta.jpeg',
    '/acound-user/usuario-cuenta.jpeg',
];

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    modal.style.display = 'flex';
    modalImage.src = images[currentImageIndex];
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function changeImage(direction) {
    currentImageIndex += direction;

    // Si llegamos al final o al principio del array, volvemos a empezar
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    const modalImage = document.getElementById('modalImage');
    modalImage.src = images[currentImageIndex];
}

// Añadir event listeners a los botones de cambio de imagen
document.querySelector('.prev').addEventListener('click', function (event) {
    event.stopPropagation();
    changeImage(-1);
});

document.querySelector('.next').addEventListener('click', function (event) {
    event.stopPropagation();
    changeImage(1);
});

// Asegúrate de que el modal no se cierre cuando se hace clic en los botones de cambio de imagen
document.getElementById('modal').addEventListener('click', function (event) {
    if (event.target.id === 'modal') {
        closeModal();
    }
});

// Contador de likes
const likes = document.querySelector('.likes');
const likeBtn = document.getElementById('like-btn');

let likeCount = 0;

// Funcionalidad de like
likeBtn.addEventListener('click', () => {
    if (likeCount > 0) {
        likeCount--;
        likes.textContent = likeCount;
        likeBtn.classList.remove('liked');
    } else {
        likeCount++;
        likes.textContent = likeCount;
        likeBtn.classList.add('liked');
    }
});

// Función para recibir imágenes compartidas
function receiveSharedArt(imageSrc) {
    const sharedImage = document.createElement('img');
    sharedImage.src = imageSrc;
    sharedImage.alt = 'Arte compartido';
    sharedImage.onclick = function() {
        openModal(currentImageIndex); // Abre el modal al hacer clic en la imagen compartida
    };
    const publicaciones = document.querySelector('.publicaciones div');
    publicaciones.appendChild(sharedImage);
}

// Esta función debe ser llamada cuando se comparte el arte desde la página principal
// Por ejemplo, cuando se hace clic en el botón de "Compartir"
document.querySelector('.comunidad a:nth-child(2)').addEventListener('click', (event) => {
    event.preventDefault();
    const imageToShare = '/ruta/a/la/imagen/compartida.png'; // Cambia esto por la imagen real
    receiveSharedArt(imageToShare);
});

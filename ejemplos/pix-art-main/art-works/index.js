document.addEventListener('DOMContentLoaded', () => {
    // Valoración con estrellas
    const stars = document.querySelectorAll('.rating span');
    const ratingValue = document.getElementById('ratingValue');
    let selectedValue = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const value = star.getAttribute('data-value');
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= value) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });

        star.addEventListener('mouseout', () => {
            stars.forEach(s => s.classList.remove('hover'));
        });

        star.addEventListener('click', () => {
            selectedValue = star.getAttribute('data-value');
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= selectedValue) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
            ratingValue.textContent = `Valoración: ${selectedValue}`;
        });
    });

    // Funcionalidad para compartir
    const shareIcon = document.getElementById('shareIcon');
    const artImage = document.getElementById('artImage');

    shareIcon.addEventListener('click', () => {
        if (navigator.share) {
            const imageUrl = artImage.getAttribute('data-url');
            navigator.share({
                title: 'Mira esta imagen',
                text: 'Echa un vistazo a esta imagen increíble!',
                url: imageUrl,
            }).then(() => {
                console.log('Imagen compartida con éxito');
            }).catch((error) => {
                console.error('Error al compartir la imagen:', error);
            });
        } else {
            // Fallback para navegadores que no soportan la API de Web Share
            alert('La API de Web Share no está disponible en tu navegador. Copia el enlace para compartir: ' + artImage.getAttribute('data-url'));
        }
    });

    // Funcionalidad de comentarios
    const commentBar = document.getElementById('commentBar');
    const commentsContainer = document.getElementById('commentsContainer');
    const commentInput = document.getElementById('commentInput');
    const submitButton = document.getElementById('submitButton');
    const commentIcon = document.getElementById('commentIcon');
    const closeCommentBar = document.getElementById('closeCommentBar');

    // Ocultar la barra de comentarios por defecto
    commentBar.classList.remove('active');

    // Mostrar la barra de comentarios al hacer clic en el ícono de comentarios
    commentIcon.addEventListener('click', () => {
        commentBar.classList.toggle('active');
    });

    // Cerrar la barra de comentarios al hacer clic en el botón de cerrar
    closeCommentBar.addEventListener('click', () => {
        commentBar.classList.remove('active');
    });

    submitButton.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            // Crear un nuevo elemento de comentario
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.textContent = commentText;

            // Añadir el nuevo comentario al contenedor
            commentsContainer.appendChild(newComment);

            // Limpiar el textarea
            commentInput.value = '';
        }
    });
});
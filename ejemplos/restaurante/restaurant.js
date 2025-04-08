const cart = [];
const totalElement = document.getElementById('total');
const cartItemsElement = document.getElementById('cart-items');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const price = parseFloat(button.getAttribute('data-price'));
        const name = button.getAttribute('data-name');
        cart.push({ price, name, });
        updateCart();
    });

});

document.getElementById('checkout').addEventListener('click', () => {

    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    } else {
        alert('gracias su pedido llegará en breve')
        // recargamos la pagina 
        location.reload();
    }
});

function updateCart() {
    const carrito = document.getElementById('carrito');
    cartItemsElement.innerHTML = '';
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}
                <button class="remove-item" data-index="${index}"><i class='bx bx-trash'></i></button>
            </p>
        `;
        cartItemsElement.appendChild(itemElement);

        if (carrito.style.display === 'none' || cart.length > 0) {
            document.getElementById('carrito').style.display = 'flex';
        } else {
            document.getElementById('carrito').style.display = 'none';
        }
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalElement.textContent = total.toFixed(2);

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        });
    });
}


document.getElementById('reservation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Reserva realizada con éxito!');
});

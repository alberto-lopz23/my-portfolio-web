let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");
let saveButton = document.getElementById("save-button");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

gridButton.addEventListener("click", () => {
    container.innerHTML = "";
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
        }

        container.appendChild(div);
    }
});

function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

eraseBtn.addEventListener("click", () => {
    erase = true;
});

paintBtn.addEventListener("click", () => {
    erase = false;
});

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 10 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 10 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};

// Funcionalidad para compartir la imagen en el perfil
document.querySelector('.comunidad a:last-child').addEventListener('click', () => {

    // Crea un canvas para capturar la imagen
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Configura el tamaño del canvas
    const cols = gridWidth.value;
    const rows = gridHeight.value;
    const colWidth = 20; // Ajusta este valor según el tamaño de las celdas
    const rowHeight = 20; // Ajusta este valor según el tamaño de las celdas
    canvas.width = cols * colWidth;
    canvas.height = rows * rowHeight;

    // Dibuja el grid en el canvas
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const colId = `gridCol${(i * cols + j + 1) * 2}`; // Generar el ID correspondiente
            const col = document.getElementById(colId);
            ctx.fillStyle = col.style.backgroundColor || 'transparent';
            ctx.fillRect(j * colWidth, i * rowHeight, colWidth, rowHeight);
        }
    }

    // Crea la imagen a partir del canvas
    const imgElement = document.createElement('img');
    imgElement.src = canvas.toDataURL();
    imgElement.alt = 'Art shared from the grid';
    imgElement.classList.add('shared-image'); // Añade una clase para estilos

    // Agrega la imagen al perfil
    document.querySelector('.perfil-images').appendChild(imgElement);
});

saveButton.addEventListener('click', () => {
    // Crea un canvas para capturar la imagen
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Configura el tamaño del canvas
    const cols = gridWidth.value;
    const rows = gridHeight.value;
    const colWidth = 20; // Ajusta este valor según el tamaño de las celdas
    const rowHeight = 20; // Ajusta este valor según el tamaño de las celdas
    canvas.width = cols * colWidth;
    canvas.height = rows * rowHeight;

    // Dibuja el grid en el canvas
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const colId = `gridCol${(i * cols + j + 1) * 2}`; // Generar el ID correspondiente
            const col = document.getElementById(colId);
            ctx.fillStyle = col.style.backgroundColor || 'transparent';
            ctx.fillRect(j * colWidth, i * rowHeight, colWidth, rowHeight);
        }
    }

    // Crea un enlace para descargar la imagen
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'grid-image.png';
    link.click();
});

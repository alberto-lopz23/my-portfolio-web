// Lista de proyectos disponibles (reales o de ejemplo)
const proyectos = [
  {
    nombre: "La esquina del sabor",
    enlace: "./proyectos/todoslosProyectos/restaurant.html",
    imagen: "./proyectos/imagenes/restaurant.png"
  },
  {
    nombre: "BlackInc Studio",
    enlace: "./proyectos/todoslosProyectos/tattooStudio.html",
    imagen: "./proyectos/imagenes/tattoo.png"
  },
  {
    nombre: "Alberto Clothes",
    enlace: "./proyectos/todoslosProyectos/clathes.html",
    imagen: "./proyectos/imagenes/clothes.png"
  },
  {
    nombre: "concepcionario",
    enlace: "./proyectos/todoslosProyectos/concepcionario.html",
    imagen: "./proyectos/imagenes/concepcionario.png"
  },
  {
    nombre: "Super Mercado",
    enlace: "./proyectos/todoslosProyectos/superMercado.html",
    imagen: "./proyectos/imagenes/superMercado.png",
  },
  { nombre: "Portfolio",
    enlace: "./proyectos/todoslosProyectos/portfolio.html",
    imagen: "./proyectos/imagenes/portfolio.png",
  },

];


// Función para elegir 4 proyectos al azar
function elegirProyectos(proyectos, cantidad = 4) {
  const seleccionados = [];
  const copia = [...proyectos];
  while (seleccionados.length < cantidad && copia.length > 0) {
    const indice = Math.floor(Math.random() * copia.length);
    seleccionados.push(copia.splice(indice, 1)[0]);
  }
  return seleccionados;
}

// Renderizar proyectos aleatorios
function renderizarProyectos() {
  const elegidos = elegirProyectos(proyectos);

  elegidos.forEach((proyecto, index) => {
    const div = document.getElementById(`proyecto-${index + 1}`);
    div.innerHTML = `
  <img src="${proyecto.imagen}" alt="Preview de ${proyecto.nombre}" class="preview-img">
  <div class="overlay">
    <a href="${proyecto.enlace}"">Ver demo</a>
  </div>
`;
  });
}

// Ejecutar al cargar
window.addEventListener("DOMContentLoaded", renderizarProyectos);

<template>
  <div class="tienda container my-5" tabindex="0" aria-label="Tienda de Panes">
    <!-- Botón de Control de Sonido Blanco -->
    <button
      class="btn btn-secondary audio-control"
      @click="toggleWhiteNoise"
      :aria-pressed="whiteNoisePlaying"
      aria-label="Control de sonido blanco"
    >
      <i :class="whiteNoisePlaying ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
    </button>

    <!-- Título principal -->
    <div class="text-center mb-5">
      <h2 class="tienda-title animate__animated animate__fadeInDown">
        Nuestra Tienda de Panes
      </h2>
      <p class="tienda-subtitle animate__animated animate__fadeInUp">
        Encuentra todos tus panes favoritos, recién horneados y con la mejor calidad.
      </p>
    </div>

    <!-- Video Accesible -->
    <div class="video-container mb-5" data-aos="fade-up">
      <video
        controls
        muted
        aria-label="Video sobre nuestra panadería"
        tabindex="0"
      >
        <source src="@/assets/videos/tienda-video.mp4" type="video/mp4" />
        <!-- Subtítulos para personas con discapacidades -->
        <track
          kind="captions"
          src="@/assets/videos/tienda-video-captions.vtt"
          srclang="es"
          label="Español"
        />
        <!-- Puedes añadir más pistas de subtítulos para otros idiomas si lo deseas -->
        Tu navegador no soporta el elemento de video.
      </video>
    </div>

    <!-- Mensaje destacado -->
    <div
      class="alert alert-info text-center mb-4 animate__animated animate__fadeIn"
      role="alert"
    >
      <i class="fas fa-exclamation-circle"></i>
      ¡Disfruta de nuestras promociones especiales toda la semana!
    </div>

    <!-- Sección de filtros -->
    <div class="row mb-4 filtros" data-aos="fade-up">
      <div class="col-md-6 mb-2">
        <!-- Barra de búsqueda con debounce y resaltado -->
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Buscar pan..."
            v-model="busqueda"
            @input="filtrarConRetraso"
            aria-label="Buscar pan"
          />
          <div class="input-group-append">
            <span class="input-group-text bg-light">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-2">
        <!-- Filtro por categoría -->
        <select
          class="form-control"
          v-model="categoriaSeleccionada"
          @change="filtrarPanes"
          aria-label="Filtrar por categoría"
        >
          <option value="todos">Todas las categorías</option>
          <option value="salado">Salados</option>
          <option value="dulce">Dulces</option>
          <option value="especial">Especiales</option>
        </select>
      </div>

      <div class="col-md-3 mb-2">
        <!-- Orden por precio -->
        <select
          class="form-control"
          v-model="ordenPrecio"
          @change="filtrarPanes"
          aria-label="Ordenar por precio"
        >
          <option value="asc">Precio Ascendente</option>
          <option value="desc">Precio Descendente</option>
        </select>
      </div>
    </div>

    <!-- Contador de resultados -->
    <div
      class="mb-3 text-muted small text-right pr-1 animate__animated animate__fadeIn"
      data-aos="fade-up"
    >
      <span>Mostrando {{ panesFiltrados.length }} resultado(s)</span>
    </div>

    <!-- Spinner (Simulación de carga local, sin AJAX) -->
    <div v-if="cargando" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
      <p class="mt-2">Cargando panes...</p>
    </div>

    <!-- Grid de panes -->
    <div v-else class="row">
      <div
        class="col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="pan in panesFiltradosPaginados"
        :key="pan.id"
        data-aos="fade-up"
        :data-aos-delay="100 * (pan.id % 5)"
      >
        <!-- CardPan con mejoras -->
        <div class="card card-pan shadow-sm h-100 position-relative">
          <!-- Etiqueta (Badge) de Categoría -->
          <span class="badge-categoria" :class="badgeClass(pan.categoria)">
            {{ pan.categoria }}
          </span>

          <!-- Etiqueta Descuento para pan dulce navideño -->
          <span
            v-if="pan.nombre.toLowerCase().includes('navideño')"
            class="badge-descuento"
          >
            -10% OFF
          </span>

          <img
            class="card-img-top"
            :src="obtenerImagen(pan.img)"
            :alt="`Imagen de ${pan.nombre}`"
          />
          <div class="card-body d-flex flex-column">
            <!-- Resalta texto en el nombre si coincide con la búsqueda -->
            <h5
              class="card-title"
              v-html="resaltarTexto(pan.nombre)"
            ></h5>

            <p class="card-text text-muted mb-2">
              <strong>{{ formatearPrecio(pan.precio) }}</strong>
            </p>
            <p class="text-capitalize text-info mb-2">
              <small>Categoría: {{ pan.categoria }}</small>
            </p>

            <!-- Botones de interacción -->
            <div class="mt-auto d-flex justify-content-between">
              <button
                class="btn btn-outline-primary"
                data-toggle="tooltip"
                title="Agrega este pan a tu carrito"
                @click="agregarCarrito(pan)"
                :aria-label="`Agregar ${pan.nombre} al carrito`"
              >
                <i class="fas fa-shopping-cart"></i>
              </button>
              <button
                class="btn btn-outline-secondary"
                @click="verDetalles(pan)"
                :aria-label="`Ver detalles de ${pan.nombre}`"
              >
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje cuando no se encuentran resultados -->
    <div
      v-if="!cargando && panesFiltrados.length === 0"
      class="alert alert-warning mt-4 text-center animate__animated animate__fadeInUp"
    >
      No se encontraron panes con los filtros aplicados.
    </div>

    <!-- Paginación (local, sin AJAX) -->
    <nav v-if="paginasTotales > 1 && !cargando" class="mt-4" aria-label="Paginación">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: paginaActual <= 1 }"
        >
          <button
            class="page-link"
            @click="cambiarPagina(paginaActual - 1)"
            :disabled="paginaActual <= 1"
            aria-label="Anterior página"
          >
            Anterior
          </button>
        </li>
        <li
          v-for="num in paginasTotales"
          :key="num"
          class="page-item"
          :class="{ active: paginaActual === num }"
        >
          <button
            class="page-link"
            @click="cambiarPagina(num)"
            :aria-label="'Página ' + num"
            :aria-current="paginaActual === num ? 'page' : null"
          >
            {{ num }}
          </button>
        </li>
        <li
          class="page-item"
          :class="{ disabled: paginaActual >= paginasTotales }"
        >
          <button
            class="page-link"
            @click="cambiarPagina(paginaActual + 1)"
            :disabled="paginaActual >= paginasTotales"
            aria-label="Siguiente página"
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>

    <!-- Modal de Detalles -->
    <div
      class="modal-overlay"
      v-if="mostrarModal"
      @click="cerrarModal"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-custom" @click.stop>
        <div class="modal-header-custom">
          <h5 class="modal-title-custom">{{ panSeleccionado.nombre }}</h5>
          <button class="close-custom" @click="cerrarModal" aria-label="Cerrar">
            &times;
          </button>
        </div>
        <div class="modal-body-custom">
          <p>
            <strong>Precio:</strong> {{ formatearPrecio(panSeleccionado.precio) }}
          </p>
          <p class="mb-2">
            <strong>Categoría:</strong> {{ panSeleccionado.categoria }}
          </p>
          <!-- Rating de ejemplo -->
          <div class="mb-3">
            <strong>Valoración: </strong>
            <i
              class="fas fa-star"
              v-for="n in panSeleccionado.rating"
              :key="n"
              style="color: #ffc107;"
            ></i>
            <span class="text-muted ml-2">
              ({{ panSeleccionado.rating }}/5)
            </span>
          </div>
          <p>
            Este pan es uno de nuestros más populares por su
            {{ panSeleccionado.categoria === "dulce"
              ? "delicioso sabor dulce"
              : "extraordinario sabor y textura" }}.
            ¡Pruébalo y cuéntanos tu opinión!
          </p>
        </div>
        <div class="modal-footer-custom">
          <button
            type="button"
            class="btn btn-primary"
            @click="agregarCarrito(panSeleccionado)"
            :aria-label="`Agregar ${panSeleccionado.nombre} al carrito`"
          >
            Agregar al Carrito
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="cerrarModal"
            aria-label="Cerrar modal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
    <!-- Fin Modal -->
  </div>
</template>

<script>
// Variable global para el debounce del buscador
let timeoutID = null;

export default {
  name: "Tienda",
  data() {
    return {
      // Búsqueda y filtros
      busqueda: "",
      categoriaSeleccionada: "todos",
      ordenPrecio: "asc",

      // Simulación de carga
      cargando: false,

      // Paginación
      paginaActual: 1,
      itemsPorPagina: 8,

      // Modal de detalles
      mostrarModal: false,
      panSeleccionado: null,

      // Estado del sonido blanco
      whiteNoisePlaying: false,
      whiteNoiseContext: null,
      whiteNoiseSource: null,

      // Datos locales
      panes: [
        { id: 1,  nombre: "Pan francés",        precio: 1.5, img: "pan-frances.webp",   categoria: "salado",  rating: 4 },
        { id: 2,  nombre: "Baguette",           precio: 1.2, img: "baguette.webp",      categoria: "salado",  rating: 5 },
        { id: 3,  nombre: "Pan integral",       precio: 1.8, img: "integral.webp",      categoria: "salado",  rating: 3 },
        { id: 4,  nombre: "Pan de centeno",     precio: 2.0, img: "centeno.webp",       categoria: "salado",  rating: 4 },
        { id: 5,  nombre: "Pan de chocolate",   precio: 2.5, img: "pan-chocolate.webp", categoria: "dulce",   rating: 4 },
        { id: 6,  nombre: "Pan dulce navideño", precio: 3.2, img: "pan-dulce.webp",     categoria: "dulce",   rating: 5 },
        { id: 7,  nombre: "Pan de semillas especial", precio: 2.2, img: "pan-semillas.webp", categoria: "especial", rating: 4 },
        { id: 8,  nombre: "Pan brioche",        precio: 2.0, img: "pan-brioche.webp",   categoria: "dulce",   rating: 4 },
        { id: 9,  nombre: "Pan focaccia",       precio: 2.4, img: "pan-focaccia.webp",  categoria: "salado",  rating: 3 },
        { id: 10, nombre: "Pan de ajo",         precio: 2.0, img: "pan-ajo.webp",       categoria: "salado",  rating: 4 },
      ],
      panesFiltrados: [],
    };
  },
  computed: {
    // Cálculo de páginas totales
    paginasTotales() {
      return Math.ceil(this.panesFiltrados.length / this.itemsPorPagina);
    },
    // Segmentación de resultados según la página actual
    panesFiltradosPaginados() {
      const start = (this.paginaActual - 1) * this.itemsPorPagina;
      const end = start + this.itemsPorPagina;
      return this.panesFiltrados.slice(start, end);
    },
  },
  created() {
    // Simulamos carga de 1 segundo
    this.cargando = true;
    setTimeout(() => {
      this.panesFiltrados = this.panes;
      this.cargando = false;
    }, 1000);
  },
  mounted() {
    // Intentar reproducir el sonido blanco al montar el componente
    this.reproducirWhiteNoise();
  },
  beforeUnmount() {
    // Detener el sonido blanco si está reproduciéndose
    this.stopWhiteNoise();
  },
  methods: {
    // Debounce para la búsqueda
    filtrarConRetraso() {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        this.filtrarPanes();
      }, 300);
    },

    // Filtrado principal
    filtrarPanes() {
      // Copiamos el array original
      let temp = [...this.panes];

      // 1) Filtro por categoría
      if (this.categoriaSeleccionada !== "todos") {
        temp = temp.filter((pan) => pan.categoria === this.categoriaSeleccionada);
      }

      // 2) Búsqueda por nombre
      const busquedaLower = this.busqueda.trim().toLowerCase();
      if (busquedaLower) {
        temp = temp.filter((pan) =>
          pan.nombre.toLowerCase().includes(busquedaLower)
        );
      }

      // 3) Orden por precio (estable)
      temp.sort((a, b) => {
        if (this.ordenPrecio === "asc") {
          return a.precio - b.precio || a.nombre.localeCompare(b.nombre);
        } else {
          return b.precio - a.precio || b.nombre.localeCompare(a.nombre);
        }
      });

      this.panesFiltrados = temp;
      // Regresamos a la página 1
      this.paginaActual = 1;
    },

    // Cambiar de página
    cambiarPagina(num) {
      if (num > 0 && num <= this.paginasTotales) {
        this.paginaActual = num;
      }
    },

    // Formateo de precio
    formatearPrecio(precio) {
      return `${precio.toFixed(2)} €`;
    },

    // Cargar imágenes locales
    obtenerImagen(archivo) {
      try {
        return require(`@/assets/${archivo}`);
      } catch (e) {
        console.error(`Error al cargar la imagen: ${archivo}`, e);
        return '';
      }
    },

    // Clase de badge según categoría
    badgeClass(categoria) {
      switch (categoria) {
        case "salado":
          return "badge-salado";
        case "dulce":
          return "badge-dulce";
        case "especial":
          return "badge-especial";
        default:
          return "badge-otros";
      }
    },

    // Resaltar texto si quieres (opcional)
    resaltarTexto(nombre) {
      // Si no hay búsqueda, devolvemos normal
      if (!this.busqueda.trim()) return nombre;

      // Búsqueda en minúsculas
      const normalName = nombre.toLowerCase();
      const search = this.busqueda.trim().toLowerCase();

      const index = normalName.indexOf(search);
      if (index === -1) return nombre;

      // Reemplaza la parte coincidente por <mark>
      const original = nombre.substring(index, index + search.length);
      const marcado = `<mark>${original}</mark>`;
      return (
        nombre.substring(0, index) +
        marcado +
        this.resaltarTexto(nombre.substring(index + search.length))
      );
    },

    // Modal
    verDetalles(pan) {
      this.panSeleccionado = pan;
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    agregarCarrito(pan) {
      alert(`¡${pan.nombre} agregado al carrito!`);
      this.cerrarModal();
    },

    // Métodos para Sonido Blanco usando Web Audio API

    // Iniciar sonido blanco
    reproducirWhiteNoise() {
      if (this.whiteNoisePlaying) return; // Ya está reproduciéndose

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.whiteNoiseContext = new AudioContext();

      const bufferSize = 2 * this.whiteNoiseContext.sampleRate; // Duración de 2 segundos
      const buffer = this.whiteNoiseContext.createBuffer(1, bufferSize, this.whiteNoiseContext.sampleRate);
      const output = buffer.getChannelData(0);

      // Genera el sonido blanco
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // Valores entre -1 y 1
      }

      this.whiteNoiseSource = this.whiteNoiseContext.createBufferSource();
      this.whiteNoiseSource.buffer = buffer;
      this.whiteNoiseSource.loop = true;

      // Controlar el volumen
      const gainNode = this.whiteNoiseContext.createGain();
      gainNode.gain.value = 0.2; // Ajusta el volumen según preferencia

      this.whiteNoiseSource.connect(gainNode);
      gainNode.connect(this.whiteNoiseContext.destination);

      this.whiteNoiseSource.start(0);
      this.whiteNoisePlaying = true;
    },

    // Detener sonido blanco
    stopWhiteNoise() {
      if (this.whiteNoiseSource) {
        this.whiteNoiseSource.stop();
        this.whiteNoiseSource.disconnect();
        this.whiteNoiseSource = null;
      }
      if (this.whiteNoiseContext) {
        this.whiteNoiseContext.close();
        this.whiteNoiseContext = null;
      }
      this.whiteNoisePlaying = false;
    },

    // Alternar sonido blanco
    toggleWhiteNoise() {
      if (this.whiteNoisePlaying) {
        this.stopWhiteNoise();
      } else {
        this.reproducirWhiteNoise();
      }
    },
  },
};
</script>

<style scoped>
/* ----------------------------------
   Import de Animate.css / AOS (opcional)
------------------------------------- */
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

/* ----------------------------------
   Tipografía y ajustes generales
------------------------------------- */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Open+Sans&display=swap");

* {
  box-sizing: border-box;
}

.tienda-title {
  color: #6b3e26;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}
.tienda-title::after {
  content: "";
  display: block;
  width: 60%;
  height: 3px;
  background-color: #a66f3f;
  margin: 0.5rem auto 0;
}
.tienda-subtitle {
  font-family: "Open Sans", sans-serif;
  color: #555;
  margin-bottom: 0;
}

/* ----------------------------------
   Cartas de Pan
------------------------------------- */
.card-pan {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  cursor: default;
}
.card-pan .card-img-top {
  object-fit: cover;
  height: 200px;
}
.card-pan:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Etiquetas de categoría (Badges) */
.badge-categoria {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px 6px;
  font-size: 0.75rem;
  color: #fff;
  border-radius: 4px;
  text-transform: capitalize;
}
.badge-salado {
  background-color: #6c757d; /* Gris */
}
.badge-dulce {
  background-color: #d63384; /* Rosa */
}
.badge-especial {
  background-color: #6f42c1; /* Morado */
}
.badge-otros {
  background-color: #adb5bd;
}

/* Etiqueta Descuento */
.badge-descuento {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #dc3545; /* Rojo */
  color: #fff;
  font-size: 0.75rem;
  padding: 3px 6px;
  border-radius: 4px;
  text-transform: uppercase;
}

/* ----------------------------------
   Filtros
------------------------------------- */
.filtros select.form-control,
.filtros input.form-control {
  border-radius: 6px;
}
.input-group-text {
  border: none;
}
.input-group-text.bg-light {
  background-color: #fafafa;
}

/* Paginación */
.pagination .page-link {
  color: #6b3e26;
}
.pagination .page-item.active .page-link {
  background-color: #a66f3f;
  border-color: #a66f3f;
  color: #fff;
}
.pagination .page-link:hover {
  background-color: #eed8c3;
}

/* ----------------------------------
   Spinner
------------------------------------- */
.spinner-border {
  width: 3rem;
  height: 3rem;
}

/* ----------------------------------
   Simulación de Modal sin jQuery
------------------------------------- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.modal-custom {
  background-color: #fff;
  width: 90%;
  max-width: 550px;
  margin: 10% auto;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
.modal-header-custom {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-title-custom {
  margin: 0;
  font-size: 1.2rem;
}
.close-custom {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}
.modal-body-custom {
  padding: 1rem;
}
.modal-footer-custom {
  padding: 1rem;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* ----------------------------------
   Botón de Control de Sonido Blanco
------------------------------------- */
.audio-control {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.audio-control:hover {
  background-color: rgba(255, 255, 255, 1);
}
.audio-control i {
  color: #6b3e26;
  font-size: 1.2rem;
}

/* Para resaltar coincidencias si deseas <mark> */
mark {
  background-color: #fff79a;
  color: #333;
  font-weight: 600;
}

/* ----------------------------------
   Video Accesible
------------------------------------- */
.video-container {
  text-align: center;
}

.video-container video {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Ocultar el cursor del ratolí para simular dificultad */
.tienda {
  cursor: none;
  position: relative;
}

/* Enfoque visible para accesibilidad */
.form-control:focus,
.btn:focus {
  outline: 2px solid #a66f3f;
  outline-offset: 2px;
}

/* Estilos para botones dentro del navbar */
.navbar-nav .nav-link:focus,
.navbar-nav .nav-link:hover {
  text-decoration: underline;
}
</style>

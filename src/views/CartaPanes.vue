<template>
  <div class="carta-panes container-fluid px-0">
    <!-- Hero Section con Parallax -->
    <section class="hero-carta d-flex flex-column align-items-center justify-content-center text-center">
      <h1
        class="carta-title animate__animated animate__fadeInDown"
        :style="{ fontSize: fontSizes.cartaTitle }"
      >
        Nuestra Carta de Panes
      </h1>
      <p
        class="carta-subtitle animate__animated animate__fadeInUp"
        :style="{ fontSize: fontSizes.cartaSubtitle }"
      >
        Descubre la variedad de nuestras delicias artesanales
      </p>
    </section>

    <!-- Sección descripción breve -->
    <section class="info-carta py-4 bg-light">
      <div class="container text-center">
        <p class="lead mb-0 animate__animated animate__fadeIn" :style="{ fontSize: fontSizes.infoCarta }">
          Cada pan es elaborado con ingredientes selectos y técnicas
          tradicionales para brindarte la mejor experiencia de sabor.
        </p>
      </div>
    </section>

    <!-- Grid de panes (Carta) -->
    <section class="lista-carta py-5">
      <div class="container">
        <h2
          class="text-center section-title mb-5 animate__animated animate__fadeInDown"
          :style="{ fontSize: fontSizes.sectionTitle }"
        >
          Explora nuestras especialidades
        </h2>
        <div class="row">
          <!-- Tarjetas de la carta de panes -->
          <div
            class="col-sm-6 col-md-4 col-lg-3 mb-4"
            v-for="(pan, index) in cartaPanes"
            :key="index"
            data-aos="fade-up"
            :data-aos-delay="100 * index"
          >
            <div class="card carta-card shadow-sm h-100">
              <img
                class="card-img-top"
                :src="obtenerImagen(pan.img)"
                :alt="`Imagen de ${pan.nombre}`"
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title" :style="{ fontSize: fontSizes.cardTitle }">{{ pan.nombre }}</h5>
                <p class="card-text text-muted mb-2" :style="{ fontSize: fontSizes.cardText }">
                  <strong>{{ formatearPrecio(pan.precio) }}</strong>
                </p>
                <!-- Pequeña descripción del pan -->
                <p class="card-text mb-3" :style="{ fontSize: fontSizes.cardText }">
                  {{ pan.descripcion }}
                </p>
                <!-- Botón "Detalles" opcional -->
                <button class="btn btn-outline-primary mt-auto" @click="verDetalles(pan)">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Detalles (opcional, sin jQuery) -->
    <div class="modal-overlay" v-if="mostrarModal" @click="cerrarModal">
      <div class="modal-custom" @click.stop>
        <div class="modal-header-custom">
          <h5 class="modal-title-custom" :style="{ fontSize: fontSizes.modalTitle }">
            {{ panSeleccionado.nombre }}
          </h5>
          <button class="close-custom" @click="cerrarModal">
            &times;
          </button>
        </div>
        <div class="modal-body-custom" :style="{ fontSize: fontSizes.modalBody }">
          <img
            class="img-fluid mb-3 rounded"
            :src="obtenerImagen(panSeleccionado.img)"
            :alt="`Imagen de ${panSeleccionado.nombre}`"
          />
          <p class="mb-2">
            <strong>Precio:</strong> {{ formatearPrecio(panSeleccionado.precio) }}
          </p>
          <p>{{ panSeleccionado.descripcion }}</p>
        </div>
        <div class="modal-footer-custom">
          <button class="btn btn-primary" @click="cerrarModal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartaPanes",
  data() {
    return {
      // Control del modal
      mostrarModal: false,
      panSeleccionado: null,
      // Data principal: "Carta" de panes
      cartaPanes: [
        {
          nombre: "Pan Rústico",
          precio: 2.0,
          img: "pan-rustico.webp",
          descripcion:
            "Hecho con masa madre y fermentación larga, ideal para acompañar sopas o comidas caseras.",
        },
        {
          nombre: "Pan de Aceitunas",
          precio: 2.5,
          img: "pan-aceitunas.webp",
          descripcion:
            "Un pan suave y esponjoso, con el sabor intenso de aceitunas verdes y negras.",
        },
        {
          nombre: "Pan de Masa Madre",
          precio: 3.0,
          img: "pan-masamadre.webp",
          descripcion:
            "Elaborado con masa madre natural, corteza crujiente y miga alveolada.",
        },
        {
          nombre: "Pan de Tomate y Orégano",
          precio: 2.2,
          img: "pan-tomate.webp",
          descripcion:
            "Un toque mediterráneo con tomates deshidratados y aroma de orégano fresco.",
        },
        {
          nombre: "Pan Dulce con Pasas",
          precio: 2.8,
          img: "pan-dulce-pasas.webp",
          descripcion:
            "Dulce y esponjoso, perfecto para el desayuno o la merienda, con pasas y un ligero glaseado.",
        },
        {
          nombre: "Pan Integral con Semillas",
          precio: 2.6,
          img: "pan-integral-semillas.webp",
          descripcion:
            "Repleto de fibra y semillas tostadas, para una opción más saludable y nutritiva.",
        },
        {
          nombre: "Pan de Centeno",
          precio: 2.5,
          img: "centeno.webp",
          descripcion:
            "Color oscuro, sabor intenso y ligeramente ácido, perfecto para bocadillos salados.",
        },
        {
          nombre: "Pan de Chocolate",
          precio: 2.5,
          img: "pan-chocolate.webp",
          descripcion:
            "Ideal para los amantes del dulce, con trocitos de chocolate en la masa.",
        },
      ],
      // Propiedades para los tamaños de fuente
      fontSizes: {
        cartaTitle: "3rem",
        cartaSubtitle: "1.4rem",
        infoCarta: "1.25rem",
        sectionTitle: "2rem",
        cardTitle: "1.25rem",
        cardText: "1rem",
        modalTitle: "1.2rem",
        modalBody: "1rem",
      },
      intervaloFuente: null, // Referencia al intervalo
    };
  },
  methods: {
    // Resuelve la ruta de la imagen en la carpeta assets
    obtenerImagen(nombreArchivo) {
      // Ajusta según tu carpeta de assets
      return require(`@/assets/${nombreArchivo}`);
    },
    // Formatea el precio
    formatearPrecio(precio) {
      return `${precio.toFixed(2)} €`;
    },
    // Abre el modal
    verDetalles(pan) {
      this.panSeleccionado = pan;
      this.mostrarModal = true;
    },
    // Cierra el modal
    cerrarModal() {
      this.mostrarModal = false;
    },
    // Genera un tamaño de fuente aleatorio dentro de un rango
    generarTamañoAleatorio(min, max, unidad = "rem") {
      const tamaño = (Math.random() * (max - min) + min).toFixed(2);
      return `${tamaño}${unidad}`;
    },
    // Actualiza los tamaños de fuente de manera aleatoria y más exagerada
    actualizarTamañosFuente() {
      this.fontSizes.cartaTitle = this.generarTamañoAleatorio(1.5, 6.0); // 1.5rem a 6.0rem
      this.fontSizes.cartaSubtitle = this.generarTamañoAleatorio(0.8, 3.0); // 0.8rem a 3.0rem
      this.fontSizes.infoCarta = this.generarTamañoAleatorio(0.5, 2.5); // 0.5rem a 2.5rem
      this.fontSizes.sectionTitle = this.generarTamañoAleatorio(1.0, 3.0); // 1.0rem a 3.0rem
      this.fontSizes.cardTitle = this.generarTamañoAleatorio(0.5, 2.5); // 0.5rem a 2.5rem
      this.fontSizes.cardText = this.generarTamañoAleatorio(0.4, 2.0); // 0.4rem a 2.0rem
      this.fontSizes.modalTitle = this.generarTamañoAleatorio(0.5, 2.0); // 0.5rem a 2.0rem
      this.fontSizes.modalBody = this.generarTamañoAleatorio(0.4, 1.8); // 0.4rem a 1.8rem
    },
  },
  mounted() {
    // Inicia el intervalo para actualizar los tamaños de fuente cada 1 segundo
    this.intervaloFuente = setInterval(this.actualizarTamañosFuente, 1000);
  },
  beforeUnmount() { // Cambiado a 'beforeUnmount' para Vue 3
    // Limpia el intervalo cuando el componente se destruye
    if (this.intervaloFuente) {
      clearInterval(this.intervaloFuente);
    }
  },
};
</script>

<style scoped>
/* ----------------------------------
   Animations / Fonts
------------------------------------- */
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Open+Sans&display=swap");

/* ----------------------------------
   Transiciones Suaves para Cambios de Fuente
------------------------------------- */
.carta-title,
.carta-subtitle,
.info-carta p,
.section-title,
.card-title,
.card-text,
.modal-title-custom,
.modal-body-custom {
  transition: font-size 0.5s ease;
}

/* ----------------------------------
   Hero Section
------------------------------------- */
.hero-carta {
  width: 100%;
  height: 70vh;
  background: linear-gradient(
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.45)
    ),
    url("~@/assets/carta-hero.webp") center center no-repeat;
  background-size: cover;
  background-attachment: fixed; /* Parallax effect en desktop */
  color: #fff;
  position: relative;
  overflow: hidden;
}
.carta-title {
  /* El tamaño de fuente ahora se maneja dinámicamente */
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
  font-family: "Poppins", sans-serif;
}
.carta-subtitle {
  /* El tamaño de fuente ahora se maneja dinámicamente */
  margin-top: 1rem;
  max-width: 600px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  font-family: "Open Sans", sans-serif;
}
.hero-carta > * {
  z-index: 2;
}

/* ----------------------------------
   Info-carta
------------------------------------- */
.info-carta p {
  font-family: "Open Sans", sans-serif;
  color: #555;
  /* El tamaño de fuente ahora se maneja dinámicamente */
}

/* ----------------------------------
   Lista de Panes (Cartas)
------------------------------------- */
.section-title {
  /* El tamaño de fuente ahora se maneja dinámicamente */
  font-weight: 700;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  position: relative;
  display: inline-block;
}
.section-title::after {
  content: "";
  display: block;
  width: 60%;
  height: 3px;
  background-color: #a66f3f;
  margin: 0.5rem auto 0;
}
.carta-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
}
.carta-card .card-img-top {
  height: 220px;
  object-fit: cover;
  filter: blur(5px); /* Aplica un desenfoque de 5 píxeles */
  transition: filter 0.3s ease; /* Transición suave para cambios en el desenfoque */
}

.carta-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* ----------------------------------
   Modal sin jQuery
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
  margin: 5% auto;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.4s ease;
}
.modal-header-custom,
.modal-body-custom,
.modal-footer-custom {
  padding: 1rem;
}
.modal-header-custom {
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-title-custom {
  margin: 0;
  /* El tamaño de fuente ahora se maneja dinámicamente */
  font-family: "Poppins", sans-serif;
}
.close-custom {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
.modal-footer-custom {
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

@keyframes fadeInUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

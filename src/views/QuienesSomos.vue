<template>
  <div class="quienes-somos container-fluid px-0">
    <!-- Hero Section con Parallax -->
    <section
      class="hero-quienes d-flex flex-column align-items-center justify-content-center text-center"
      aria-labelledby="hero-title"
    >
      <h1
        id="hero-title"
        class="quienes-title animate__animated animate__fadeInDown"
      >
        Quiénes Somos
      </h1>
      <p class="quienes-subtitle animate__animated animate__fadeInUp">
        Conoce la historia y el corazón detrás de nuestra panadería
      </p>
    </section>

    <!-- Sección Historia -->
    <section class="historia py-5" aria-labelledby="historia-title">
      <div class="container">
        <h2
          id="historia-title"
          class="section-title mb-4 text-center animate__animated animate__fadeInDown"
        >
          Nuestra Historia
        </h2>
        <div class="row align-items-center">
          <div class="col-md-6 mb-4 animate__animated animate__fadeInLeft">
            <img
              class="img-fluid rounded shadow-sm"
              :src="obtenerImagen('historia.webp')"
              alt="Historia de la Panadería"
              loading="lazy"
            />
          </div>
          <div class="col-md-6 animate__animated animate__fadeInRight">
            <p class="lead">
              Fundada en 1990, nuestra panadería ha sido un pilar en la comunidad,
              ofreciendo panes artesanales elaborados con ingredientes de la
              más alta calidad y siguiendo recetas tradicionales. Nuestro
              compromiso es brindar productos frescos y deliciosos que alegren
              cada hogar.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Misión y Visión -->
    <section
      class="mision-vision py-5 bg-light"
      aria-labelledby="mision-vision-title"
    >
      <div class="container">
        <h2
          id="mision-vision-title"
          class="section-title mb-4 text-center animate__animated animate__fadeInDown"
        >
          Misión y Visión
        </h2>
        <div class="row">
          <div
            class="col-md-6 mb-4 text-center animate__animated animate__fadeInUp"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="icon mb-3">
              <i
                class="fas fa-bread-slice fa-3x text-primary"
                aria-hidden="true"
              ></i>
              <span class="sr-only">Icono de Misión</span>
            </div>
            <h4>Misión</h4>
            <p>
              Nuestra misión es ofrecer panes de calidad superior, elaborados con
              pasión y dedicación, que satisfagan los paladares de nuestros
              clientes y promuevan una alimentación saludable y deliciosa.
            </p>
          </div>
          <div
            class="col-md-6 mb-4 text-center animate__animated animate__fadeInUp"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="icon mb-3">
              <i
                class="fas fa-eye fa-3x text-primary"
                aria-hidden="true"
              ></i>
              <span class="sr-only">Icono de Visión</span>
            </div>
            <h4>Visión</h4>
            <p>
              Aspiramos a ser la panadería líder en innovación y tradición,
              expandiendo nuestra presencia a nivel nacional y manteniendo
              siempre nuestros estándares de excelencia y compromiso con la
              comunidad.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Equipo -->
    <section class="equipo py-5" aria-labelledby="equipo-title">
      <div class="container">
        <h2
          id="equipo-title"
          class="section-title mb-4 text-center animate__animated animate__fadeInDown"
        >
          Nuestro Equipo
        </h2>
        <div class="row">
          <!-- Tarjetas de Miembros del Equipo -->
          <TeamMemberCard
            v-for="(miembro, index) in equipo"
            :key="index"
            :miembro="miembro"
            @ver-detalles="verDetalles"
          />
        </div>
      </div>
    </section>

    <!-- Modal Detalles del Equipo -->
    <transition name="modal">
      <div
        class="modal-overlay"
        v-if="mostrarModal"
        @click="cerrarModal"
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div
          class="modal-custom"
          @click.stop
          tabindex="-1"
          ref="modal"
        >
          <div class="modal-header-custom">
            <h5 class="modal-title-custom" id="modal-title">
              {{ miembroSeleccionado.nombre }}
            </h5>
            <button
              class="close-custom"
              @click="cerrarModal"
              aria-label="Cerrar Modal"
            >
              &times;
            </button>
          </div>
          <div class="modal-body-custom">
            <img
              class="img-fluid mb-3 rounded"
              :src="obtenerImagen(miembroSeleccionado.img)"
              :alt="`Imagen de ${miembroSeleccionado.nombre}`"
              loading="lazy"
            />
            <p>
              <strong>Puesto:</strong> {{ miembroSeleccionado.puesto }}
            </p>
            <p>{{ miembroSeleccionado.descripcion }}</p>
          </div>
          <div class="modal-footer-custom">
            <button class="btn btn-secondary" @click="cerrarModal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// Importa los componentes necesarios
import TeamMemberCard from "@/components/TeamMemberCard.vue";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "QuienesSomos",
  components: {
    TeamMemberCard,
  },
  data() {
    return {
      // Control del modal
      mostrarModal: false,
      miembroSeleccionado: null,
      // Data del equipo
      equipo: [
        {
          nombre: "María González",
          puesto: "Fundadora y Panadera Principal",
          img: "maria-gonzalez.webp",
          descripcion:
            "Con más de 30 años de experiencia en la elaboración de panes artesanales, María es el corazón y alma de nuestra panadería, dedicando su pasión y conocimiento a cada creación.",
        },
        {
          nombre: "Carlos Pérez",
          puesto: "Gerente de Operaciones",
          img: "carlos-perez.webp",
          descripcion:
            "Carlos supervisa todas las operaciones diarias, asegurando que cada producto cumpla con nuestros altos estándares de calidad y que la experiencia del cliente sea siempre excepcional.",
        },
        {
          nombre: "Lucía Martínez",
          puesto: "Encargada de Ventas y Marketing",
          img: "lucia-martinez.webp",
          descripcion:
            "Lucía se encarga de promover nuestra panadería en la comunidad, desarrollando estrategias de marketing innovadoras y manteniendo relaciones cercanas con nuestros clientes.",
        },
        {
          nombre: "Pedro Ramírez",
          puesto: "Chef de Pastelería",
          img: "pedro-ramirez.webp",
          descripcion:
            "Especialista en dulces y pasteles, Pedro aporta creatividad y un toque único a nuestra oferta, combinando técnicas tradicionales con sabores modernos.",
        },
        // Añade más miembros según tu equipo
      ],
    };
  },
  mounted() {
    AOS.init({
      duration: 800,
      once: true,
    });

    // Añadir listener para cerrar el modal con la tecla Esc
    document.addEventListener("keydown", this.handleEscape);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleEscape);
  },
  methods: {
    // Resuelve la ruta de la imagen en la carpeta assets
    obtenerImagen(nombreArchivo) {
      try {
        return require(`@/assets/${nombreArchivo}`);
      } catch (e) {
        // Ruta de fallback si la imagen no se encuentra
        return require(`@/assets/default.webp`);
      }
    },
    // Abre el modal con la info del miembro del equipo
    verDetalles(miembro) {
      this.miembroSeleccionado = miembro;
      this.mostrarModal = true;
      // Asegurar que el modal reciba el foco
      this.$nextTick(() => {
        const modal = this.$refs.modal;
        if (modal) {
          modal.focus();
        }
      });
      // Prevenir el scroll del fondo cuando el modal está abierto
      document.body.style.overflow = "hidden";
    },
    // Cierra el modal
    cerrarModal() {
      this.mostrarModal = false;
      this.miembroSeleccionado = null;
      // Restaurar el scroll del fondo
      document.body.style.overflow = "";
    },
    // Maneja la tecla Esc para cerrar el modal
    handleEscape(event) {
      if (event.key === "Escape" && this.mostrarModal) {
        this.cerrarModal();
      }
    },
  },
};
</script>

<style scoped>
/* ----------------------------------
   Import de Animate.css / AOS
------------------------------------- */
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css";

/* ----------------------------------
   Tipografía y ajustes generales
------------------------------------- */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Open+Sans&display=swap");

* {
  box-sizing: border-box;
}

.quienes-title {
  color: #fff; /* Cambiado a blanco para mejor contraste sobre el fondo oscuro */
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}
.quienes-title::after {
  content: "";
  display: block;
  width: 60%;
  height: 3px;
  background-color: #a66f3f;
  margin: 0.5rem auto 0;
}
.quienes-subtitle {
  font-family: "Open Sans", sans-serif;
  color: #fff;
  margin-bottom: 0;
}

.hero-quienes {
  width: 100%;
  height: 70vh;
  background: linear-gradient(
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.45)
    ),
    url("~@/assets/quienes-hero.webp") center center no-repeat;
  background-size: cover;
  background-attachment: fixed; /* Parallax effect en desktop */
  color: #fff;
  position: relative;
  overflow: hidden;
}
.quienes-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
}
.quienes-subtitle {
  font-size: 1.4rem;
  margin-top: 1rem;
  max-width: 600px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}
.hero-quienes > * {
  z-index: 2;
}
/* Estilos para la sección .historia */
.historia {
  position: relative; /* Posicionamiento relativo para el pseudo-elemento */
  width: 100%;
  z-index: 2;
}

/* Pseudo-elemento para la capa de parpadeo */
.historia::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
  animation: blinkOverlay 1.5s infinite;
  pointer-events: none; /* Permite interactuar con el contenido subyacente */
  z-index: 3; /* Asegura que la capa esté sobre el contenido de .historia */
}

/* Animación de parpadeo */
@keyframes blinkOverlay {
  25% {
    opacity: 1;
    background-color: rgba(0, 0, 0, 1);
  }
  50% {
    opacity: 0.5;
    background-color: rgba(0, 0, 0, 0.5);
  }
  75% {
    opacity: 1;
    background-color: rgba(0, 0, 0, 1);
  }
}

.historia img {
  width: 100%;
  border-radius: 8px;
}
.historia .lead {
  font-family: "Open Sans", sans-serif;
  color: #555;
}

.section-title {
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

.mision-vision .icon {
  color: #a66f3f;
}
.mision-vision h4 {
  font-family: "Poppins", sans-serif;
  margin-bottom: 1rem;
}
.mision-vision p {
  font-family: "Open Sans", sans-serif;
  color: #555;
}

.equipo-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  outline: none;
}
.equipo-card:focus {
  box-shadow: 0 0 0 3px rgba(166, 111, 63, 0.5);
}
.equipo-card .card-img-top {
  height: 220px;
  object-fit: cover;
}
.equipo-card:hover {
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
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-custom {
  background-color: #fff;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  outline: none;
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
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
}
.close-custom {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
.close-custom:focus {
  outline: 2px solid #a66f3f;
}
.modal-body-custom img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.modal-footer-custom {
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Animaciones de Transición para el Modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
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

/* ----------------------------------
   Responsividad
------------------------------------- */
@media (max-width: 768px) {
  .hero-quienes {
    background-attachment: scroll; /* Quitar parallax en móviles */
  }
  .quienes-title {
    font-size: 2.5rem;
  }
  .quienes-subtitle {
    font-size: 1.2rem;
  }
  .historia .lead {
    font-size: 1rem;
  }
  .modal-custom {
    max-width: 90%;
  }
}
</style>

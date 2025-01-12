<template>
  <div class="home container-fluid px-0" :style="{ transform: `scale(${scrollFactor})` }">
    <!-- Hero Section con Parallax y Zoom al Scroll -->
    <section class="hero d-flex flex-column align-items-center justify-content-center text-center">
      <h1 class="hero-title animate__animated animate__fadeInDown">
        ¡Bienvenido a Nuestra Gran Panadería!
      </h1>
      <p class="hero-subtitle animate__animated animate__fadeInUp">
        Más que pan... una experiencia culinaria llena de sabor y tradición.
      </p>
      <h2 class="explicacion text-white">
        INFORMACIÓN DEL PROYECTO
      </h2>
      <p class="explicacion animate__animated animate__fadeInUp">
        Este proyecto presenta un sitio web diseñado para sensibilizar a los usuarios sobre las barreras de accesibilidad que enfrentan las personas con discapacidad. A través de simulaciones interactivas y un diseño centrado en la inclusión, el sitio ilustra cómo pequeñas modificaciones pueden hacer una web más accesible para todos.
      </p>
      <button
        class="btn btn-primary btn-lg mt-3 animate__animated animate__fadeInUp"
        @click="irATienda"
      >
        Explora Nuestra Tienda
      </button>
      <!-- Botón flotante de scroll al inicio -->
      <button
        v-if="showScrollTop"
        class="btn btn-dark scroll-top animate__animated animate__fadeIn"
        @click="scrollToTop"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
    </section>

    <!-- Sección Destacados -->
    <section class="destacados py-5 position-relative">
      <div class="container">
        <h2 class="text-center mb-4 section-title" data-aos="fade-up">
          Nuestros Panes Más Populares
        </h2>
        <div class="row">
          <div
            class="col-md-4"
            v-for="(pan, index) in panesPopulares"
            :key="index"
            data-aos="fade-up"
            :data-aos-delay="150 + index * 10"
          >
            <div class="card mb-4 shadow-sm card-pan">
              <img
                :src="pan.img"
                class="card-img-top"
                :alt="`Imagen de ${pan.nombre}`"
              />
              <div class="card-body text-center">
                <h5 class="card-title">{{ pan.nombre }}</h5>
                <p class="card-text mb-2">
                  Precio: <strong>{{ pan.precio.toFixed(2) }} €</strong>
                </p>
                <button class="btn btn-outline-primary">Comprar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Beneficios -->
    <section class="beneficios py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5 section-title" data-aos="fade-up">
          Por qué elegirnos
        </h2>
        <div class="row text-center">
          <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="10">
            <i class="fas fa-bread-slice fa-3x mb-3 icon-custom"></i>
            <h4 class="my-3 font-weight-bold">Calidad y Frescura</h4>
            <p class="text-muted">
              Nuestros panes se hornean diariamente con ingredientes seleccionados.
            </p>
          </div>
          <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="20">
            <i class="fas fa-shipping-fast fa-3x mb-3 icon-custom"></i>
            <h4 class="my-3 font-weight-bold">Envío Rápido</h4>
            <p class="text-muted">
              Recibe tu pedido en la puerta de tu casa lo más rápido posible.
            </p>
          </div>
          <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="30">
            <i class="fas fa-smile fa-3x mb-3 icon-custom"></i>
            <h4 class="my-3 font-weight-bold">Satisfacción Garantizada</h4>
            <p class="text-muted">
              Si no quedas satisfecho, te devolvemos tu dinero.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="cta-final py-5 text-center">
      <div class="container">
        <h2 class="mb-4 font-weight-bold" data-aos="fade-up">
          ¿Listo para disfrutar del mejor pan del universo?
        </h2>
        <button
          class="btn btn-lg btn-primary"
          data-aos="fade-up"
          data-aos-delay="10"
          @click="irATienda"
        >
          ¡Haz tu pedido ahora!
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { throttle } from "lodash";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "Home",
  data() {
    return {
      panesPopulares: [
        {
          nombre: "Baguette Tradicional",
          precio: 1.2,
          img: require("@/assets/baguette.webp"),
        },
        {
          nombre: "Pan Integral",
          precio: 1.8,
          img: require("@/assets/integral.webp"),
        },
        {
          nombre: "Pan de Centeno",
          precio: 2.0,
          img: require("@/assets/centeno.webp"),
        },
      ],
      showScrollTop: false,
      scrollFactor: 1,
    };
  },
  methods: {
    irATienda() {
      this.$router.push({ name: "tienda" });
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleScroll() {
      const zoomSpeed = 0.2; // Incrementar el zoom para hacerlo más exagerado
      this.scrollFactor = Math.min(1 + (window.scrollY * zoomSpeed) / 500, 3); // Limitar a un máximo de 3x
      this.showScrollTop = window.scrollY > 300;
    },
  },
  mounted() {
    AOS.init({ once: true });
    window.addEventListener("scroll", throttle(this.handleScroll, 200));
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
/* General */
.section-title {
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-family: "Poppins", sans-serif;
}

.hero {
  width: 100%;
  height: 85vh;
  background: linear-gradient(
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.45)
    ),
    url("~@/assets/pan-frances.webp") center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  color: #fff;
  transition: transform 0.2s ease-out;
}

.scroll-top {
  position: fixed;
  bottom: 40px;
  right: 30px;
  z-index: 999;
  border-radius: 50%;
  font-size: 1.2rem;
}

/* Destacados */
.destacados .card-pan {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
}

.destacados .card-pan:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.beneficios i.icon-custom {
  color: #a66f3f;
}

.cta-final {
  background-color: #f8f9fa;
  padding: 60px 0;
}

.cta-final .btn {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
}
.hero-subtitle {
  color: gray;
}
.explicacion {
  font-weight: bold;
  font-size: x-large;
  background: rgb(103, 50, 4);
  margin-left: 2rem;
  margin-right: 2rem;
  padding: 1rem;
  border-radius: 1rem;
}
</style>

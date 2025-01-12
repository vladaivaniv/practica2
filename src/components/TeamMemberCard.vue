<template>
  <div
    class="col-sm-6 col-md-4 col-lg-3 mb-4 invisible"
    :data-aos="aosAnimation"
    :data-aos-delay="aosDelay"
  >
    <button
      class="card equipo-card shadow-sm h-100"
      @click="emitVerDetalles"
      :aria-label="`Conocer más sobre ${miembro.nombre}`"
    >
      <img
        class="card-img-top lazyload"
        :src="obtenerImagen(miembro.img)"
        :alt="`Foto de ${miembro.nombre}, ${miembro.puesto}`"
      />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ miembro.nombre }}</h5>
        <p class="card-text text-muted mb-2">
          <strong>{{ miembro.puesto }}</strong>
        </p>
        <p class="card-text mb-3">
          {{ miembro.descripcion }}
        </p>
        <!-- Texto adicional solo para lectores de pantalla -->
        <span class="sr-only">
          Botón para conocer más sobre {{ miembro.nombre }}
        </span>
        <!-- Botón estilizado como parte de la tarjeta -->
        <span class="btn btn-outline-secondary mt-auto">
          Conocer Más
        </span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "TeamMemberCard",
  props: {
    miembro: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    aosAnimation() {
      return "fade-up";
    },
    aosDelay() {
      return 100 * this.index;
    },
  },
  methods: {
    obtenerImagen(nombreArchivo) {
      try {
        return require(`@/assets/${nombreArchivo}`);
      } catch (e) {
        // Ruta de fallback si la imagen no se encuentra
        return require(`@/assets/default.webp`);
      }
    },
    emitVerDetalles() {
      this.$emit("ver-detalles", this.miembro);
    },
  },
};
</script>

<style scoped>
.invisible {opacity: 100;}
.equipo-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  padding: 0; /* Eliminar padding predeterminado del botón */
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

.card-body {
  display: flex;
  flex-direction: column;
}

.btn {
  /* Asegurar que el "Botón" estilizado sea accesible y visible */
  background-color: #a66f3f;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}

/* Clase para texto solo para lectores de pantalla */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

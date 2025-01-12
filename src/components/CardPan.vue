<template>
  <div class="card-pan card mb-4 shadow-sm" @mouseover="hover = true" @mouseleave="hover = false">
    <img
      :src="require(`${pan.img}`)"
      class="card-img-top"
      :alt="`Imagen de ${pan.nombre}`"
    />
    <div class="card-body">
      <h5 class="card-title">{{ pan.nombre }}</h5>
      <p class="card-text">{{ formatearPrecio(pan.precio) }}</p>
      <div class="d-flex justify-content-between align-items-center mt-3">
        <button class="btn btn-primary" @click="agregarAlCarrito">
          Comprar
        </button>
        <button class="btn btn-outline-secondary" @click="mostrarModal = true">
          Ver Detalles
        </button>
      </div>
    </div>

    <!-- Etiqueta de categoría, solo se muestra si hover == true -->
    <span class="categoria-badge badge badge-warning" v-if="hover">
      {{ pan.categoria || "General" }}
    </span>

    <!-- Modal con más detalles -->
    <div
      class="modal fade show"
      v-if="mostrarModal"
      tabindex="-1"
      role="dialog"
      style="display: block;"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ pan.nombre }}</h5>
            <button type="button" class="close" @click="cerrarModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Aquí muestras más info o descripción extendida -->
            <img
              :src="require(`${pan.img}`)"
              class="img-fluid rounded mb-3"
              :alt="`Imagen de ${pan.nombre}`"
            />
            <p class="mb-2">Precio: {{ formatearPrecio(pan.precio) }}</p>
            <p class="text-muted">
              {{ pan.descripcion || "Panes recién horneados de la mejor calidad." }}
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="agregarAlCarrito">
              Comprar
            </button>
            <button class="btn btn-secondary" @click="cerrarModal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Backdrop del modal -->
    <div class="modal-backdrop fade show" v-if="mostrarModal" @click="cerrarModal"></div>
  </div>
</template>

<script>
export default {
  name: "CardPan",
  props: {
    pan: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hover: false,       // Para mostrar etiqueta de categoría al pasar el mouse
      mostrarModal: false // Para abrir/cerrar modal de detalles
    };
  },
  methods: {
    formatearPrecio(valor) {
      return `Precio: ${valor.toFixed(2)} €`;
    },
    agregarAlCarrito() {
      // Lógica para agregar el producto al carrito
      alert(`Has agregado "${this.pan.nombre}" al carrito`);
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
  },
};
</script>

<style scoped>
/* Contenedor principal de la tarjeta */
.card-pan {
  position: relative; /* Necesario para posicionar la etiqueta de categoría */
  transition: transform 0.3s ease;
}

.card-pan:hover {
  transform: scale(1.02);
}

/* Imagen de la tarjeta */
.card-img-top {
  height: 180px;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.card-pan:hover .card-img-top {
  opacity: 0.9;
}

/* Título y texto */
.card-title {
  color: #6b3e26;
  font-weight: bold;
}

/* Etiqueta de categoría emergente en hover */
.categoria-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.9rem;
  padding: 0.5rem;
}

/* Modal estilos de fallback (ya que no usamos el modal nativo de Bootstrap en su 100%) */
.modal.fade.show {
  background: rgba(0, 0, 0, 0.7);
  overflow: auto;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Adaptaciones para el .modal a fin de no requerir JavaScript extra */
.modal-dialog-centered {
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>

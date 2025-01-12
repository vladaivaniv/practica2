<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" role="navigation">
    <div class="container">
      <router-link class="navbar-brand" to="/">Mi Panadería</router-link>
      
      <!-- Botón de Toggler Controlado por Vue -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleNavbar"
        :aria-expanded="isNavbarCollapsed ? 'false' : 'true'"
        aria-controls="navbarSupportedContent"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menú de Navegación Controlado por Vue -->
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        :class="{ show: !isNavbarCollapsed }"
      >
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" :class="{ active: isActiveRoute('home') }">
            <router-link
              class="nav-link"
              to="/"
              @keydown.enter="focusLink('homeLink')"
              ref="homeLink"
              tabindex="0" 
            >Inicio</router-link>
          </li>
          <li class="nav-item" :class="{ active: isActiveRoute('tienda') }">
            <router-link
              class="nav-link"
              to="/tienda"
              @keydown.enter="focusLink('tiendaLink')"
              ref="tiendaLink"
              tabindex="0"
            >Tienda</router-link>
          </li>
          <li class="nav-item" :class="{ active: isActiveRoute('contacto') }">
            <router-link
              class="nav-link"
              to="/contacto"
              @keydown.enter="focusLink('contactoLink')"
              ref="contactoLink"
              tabindex="0"
            >Contacto</router-link>
          </li>
          <li class="nav-item" :class="{ active: isActiveRoute('carta') }">
            <router-link
              class="nav-link"
              to="/carta"
              @keydown.enter="focusLink('cartaLink')"
              ref="cartaLink"
              tabindex="0"
            >Carta</router-link>
          </li>
          <li class="nav-item" :class="{ active: isActiveRoute('quienesSomos') }">
            <router-link
              class="nav-link"
              to="/quienessomos"
              @keydown.enter="focusLink('quienesSomosLink')"
              ref="quienesSomosLink"
              tabindex="0"
            >¿Quiénes Somos?</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      isNavbarCollapsed: true, // Estado del menú de navegación
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarCollapsed = !this.isNavbarCollapsed;
      if (!this.isNavbarCollapsed) {
        // Si el menú se abre, enfocar el primer enlace
        this.$nextTick(() => {
          if (this.$refs.homeLink && this.$refs.homeLink.$el) {
            this.$refs.homeLink.$el.focus();
          }
        });
      }
    },
    isActiveRoute(routeName) {
      return this.$route.name === routeName;
    },
    focusLink(refName) {
      if (this.$refs[refName] && this.$refs[refName].$el) {
        this.$refs[refName].$el.focus();
        this.isNavbarCollapsed = true; // Cerrar el menú después de seleccionar
      }
    },
    handleKeydown(event) {
      if (event.key === "Escape" && !this.isNavbarCollapsed) {
        this.isNavbarCollapsed = true;
        this.$nextTick(() => {
          // Enfocar el botón de toggler al cerrar con Esc
          const toggler = this.$el.querySelector(".navbar-toggler");
          if (toggler) toggler.focus();
        });
      }
    },
  },
  mounted() {
    // Escuchar eventos de teclado para cerrar el menú con Esc
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>

<style scoped>
.navbar-nav .active .nav-link {
  font-weight: bold;
  color: #a66f3f !important;
}

/* Indicadores de foco personalizados */
.nav-link:focus,
.navbar-toggler:focus {
  outline: 2px solid #a66f3f;
  outline-offset: 2px;
}

/* Asegurar que el botón de toggler sea visible al enfocarlo */
.navbar-toggler:focus {
  box-shadow: 0 0 0 3px rgba(166, 111, 63, 0.5);
}
</style>

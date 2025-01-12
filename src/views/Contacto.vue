<template>
  <div class="contacto container my-5" tabindex="0" aria-label="Formulario de Contacto">
    <!-- Overlay per ocultar el cursor del ratolí -->
    <div class="cursor-overlay"></div>

    <h2 class="text-center">{{ currentLanguage.contactTitle }}</h2>
    <form @submit.prevent="enviarFormulario" class="mt-4" aria-label="Formulario de contacto">
      <div class="form-group">
        <label :for="'nombre'">{{ currentLanguage.nameLabel }}</label>
        <input
          type="text"
          class="form-control"
          :id="'nombre'"
          v-model="form.nombre"
          :placeholder="currentLanguage.namePlaceholder"
          required
          tabindex="0"
          aria-required="true"
        />
      </div>
      <div class="form-group">
        <label :for="'email'">{{ currentLanguage.emailLabel }}</label>
        <input
          type="email"
          class="form-control"
          :id="'email'"
          v-model="form.email"
          :placeholder="currentLanguage.emailPlaceholder"
          required
          tabindex="0"
          aria-required="true"
        />
      </div>
      <div class="form-group">
        <label :for="'mensaje'">{{ currentLanguage.messageLabel }}</label>
        <textarea
          class="form-control"
          :id="'mensaje'"
          rows="3"
          v-model="form.mensaje"
          :placeholder="currentLanguage.messagePlaceholder"
          required
          tabindex="0"
          aria-required="true"
        ></textarea>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        tabindex="0"
        @click.stop.prevent="enviarFormulario"
        aria-label="Enviar formulario de contacto"
      >
        {{ currentLanguage.sendButton }}
      </button>
    </form>
    <div
      class="alert alert-success mt-3"
      role="alert"
      v-if="mensajeEnviado"
      tabindex="0"
      aria-live="polite"
    >
      {{ currentLanguage.successMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Contacto",
  data() {
    return {
      form: {
        nombre: "",
        email: "",
        mensaje: "",
      },
      mensajeEnviado: false,

      // Configuració d'idiomes
      languages: [
        {
          idioma: "Català",
          contactTitle: "Contacte",
          nameLabel: "Nom",
          namePlaceholder: "Introdueix el teu nom",
          emailLabel: "Correu electrònic",
          emailPlaceholder: "Introdueix el teu correu electrònic",
          messageLabel: "Missatge",
          messagePlaceholder: "Introdueix el teu missatge",
          sendButton: "Enviar",
          successMessage: "¡Gràcies pel teu missatge! Pronto et respondrem.",
        },
        {
          idioma: "Español",
          contactTitle: "Contacto",
          nameLabel: "Nombre",
          namePlaceholder: "Introduce tu nombre",
          emailLabel: "Correo electrónico",
          emailPlaceholder: "Introduce tu correo electrónico",
          messageLabel: "Mensaje",
          messagePlaceholder: "Introduce tu mensaje",
          sendButton: "Enviar",
          successMessage: "¡Gracias por tu mensaje! Pronto te responderemos.",
        },
        {
          idioma: "English",
          contactTitle: "Contact",
          nameLabel: "Name",
          namePlaceholder: "Enter your name",
          emailLabel: "Email",
          emailPlaceholder: "Enter your email",
          messageLabel: "Message",
          messagePlaceholder: "Enter your message",
          sendButton: "Send",
          successMessage: "Thank you for your message! We will respond shortly.",
        },
        {
          idioma: "Français",
          contactTitle: "Contact",
          nameLabel: "Nom",
          namePlaceholder: "Entrez votre nom",
          emailLabel: "E-mail",
          emailPlaceholder: "Entrez votre e-mail",
          messageLabel: "Message",
          messagePlaceholder: "Entrez votre message",
          sendButton: "Envoyer",
          successMessage: "Merci pour votre message ! Nous répondrons bientôt.",
        },
      ],
      currentLanguageIndex: 0,
      fontSize: 16, // Tamany inicial en píxels
      textInterval: null,
      fontInterval: null,

      // Per simular canvi de disposició
      elements: ["Nombre", "Correo electrónico", "Mensaje", "Enviar"],
      disposicioInterval: null,
    };
  },
  computed: {
    currentLanguage() {
      return this.languages[this.currentLanguageIndex];
    },
  },
  mounted() {
    // Iniciar intervals per simular discapacitats cognitives
    this.textInterval = setInterval(this.canviarIdioma, 500); // Canviar idioma cada 3 segons
    this.fontInterval = setInterval(this.canviarFont, 3000); // Canviar tamany de text cada 2 segons
    this.disposicioInterval = setInterval(this.canviarDisposicio, 300); // Canviar disposició cada 5 segons
  },
  beforeUnmount() {
    // Netejar intervals per evitar fuites de memòria
    clearInterval(this.textInterval);
    clearInterval(this.fontInterval);
    clearInterval(this.disposicioInterval);
  },
  methods: {
    enviarFormulario() {
      // Simula un enviament de formulari exitós
      this.mensajeEnviado = true;
      // Neteja els camps
      this.form.nombre = "";
      this.form.email = "";
      this.form.mensaje = "";
    },

    // Mètodes per canviar idioma i tamany de text
    canviarIdioma() {
      this.currentLanguageIndex =
        (this.currentLanguageIndex + 1) % this.languages.length;
    },
    canviarFont() {
      // Alterna entre tamanys de 16px i 20px
      this.fontSize = this.fontSize === 16 ? 20 : 16;
      // Aplica el nou tamany de font als elements de text
      const elementsText = this.$el.querySelectorAll(".contacto h2, .contacto label, .contacto input, .contacto textarea, .contacto button, .alert");
      elementsText.forEach((el) => {
        el.style.fontSize = `${this.fontSize}px`;
      });
    },

    // Mètodes per canviar disposició dels elements
    canviarDisposicio() {
      // Reorganitza els elements de manera aleatòria
      this.elements = this.shuffleArray(this.elements);
      // Actualitza l'ordre visual dels elements
      const formGroups = this.$el.querySelectorAll(".form-group");
      const form = this.$el.querySelector("form");
      formGroups.forEach((group) => {
        form.appendChild(group);
      });
    },
    shuffleArray(array) {
      let currentIndex = array.length,
        randomIndex;

      // Mentre queden elements per barallar
      while (currentIndex != 0) {
        // Selecciona un element restant
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Intercanvia'l amb l'element actual
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
  },
};
</script>

<style scoped>
/* ----------------------------------
   Tipografia i Ajustos Generals
------------------------------------- */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Open+Sans&display=swap");

* {
  box-sizing: border-box;
}

.contacto {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  border: 2px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;

  /* Ocultar el cursor del ratolí per simular dificultat */
  cursor: none;
  position: relative;
}

/* Overlay per ocultar el cursor del ratolí */
.cursor-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: none; /* Oculta el cursor */
  /* Opcional: Animació per simular moviment ràpid */
  animation: cursorMove 0.5s linear infinite;
}

/* Animació per simular moviment ràpid del cursor */
@keyframes cursorMove {
  0% {
    /* No faci res, només mantenir el cursor ocult */
  }
  100% {
    /* No faci res, només mantenir el cursor ocult */
  }
}

/* Estilització del Títol */
.contacto h2 {
  color: #6b3e26;
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
}

/* Estilització dels Inputs i Textarea */
.contacto form input,
.contacto form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 1rem;
  font-family: "Open Sans", sans-serif;
  border: 1px solid #ccc;
  border-radius: 5px;

  /* Deshabilitar interaccions del ratolí */
  pointer-events: none;
}

/* Permetre interaccions només quan el camp té focus */
.contacto form input:focus,
.contacto form textarea:focus {
  outline: 2px solid #a66f3f;
  pointer-events: auto;
}

/* Estilització del Botó d'Enviament */
.contacto form button {
  padding: 10px 20px;
  font-size: 1rem;
  font-family: "Open Sans", sans-serif;
  background-color: #6b3e26;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer; /* El cursor canvia a pointer per indicar que és clicable */
  transition: background-color 0.3s ease;
}

.contacto form button:hover,
.contacto form button:focus {
  background-color: #a66f3f;
}

/* Estilització de l'Alerta de Èxit */
.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  padding: 15px;
  border-radius: 5px;
  font-family: "Open Sans", sans-serif;
}

/* Estilització per canviar disposició dels elements de manera aleatòria */
.elements-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.element {
  background-color: #a66f3f;
  color: #fff;
  padding: 15px 25px;
  margin: 10px;
  border-radius: 5px;
  transition: transform 0.5s ease, background-color 0.5s ease;
}

.element:hover {
  transform: scale(1.1);
  background-color: #8c5930;
}

/* Responsivitat */
@media (max-width: 600px) {
  .contacto {
    padding: 15px;
  }

  .contacto form button {
    width: 100%;
  }
}
</style>

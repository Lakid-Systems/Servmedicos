<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { themeColor } from "../data/items";

const heading = "Inicie sesión en su cuenta";
const labels = {
  email: "Correo Electrónico",
  message: "Contraseña",
};

// Estado para los datos del formulario
const email = ref("");
const password = ref("");

// Router para redirección
const router = useRouter();

// URL de la API
const apiUrl = "https://integradora-backend-linux.onrender.com/login"; // URL QUE CONECTA A LA API

// Función para manejar el inicio de sesión
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Correo_Electronico: email.value,
        Contrasena: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }

    const data = await response.json();
    console.log("Respuesta de la API:", data);

    // Redirigir al usuario si el inicio de sesión es exitoso
    router.push("/estatus");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Correo o contraseña incorrectos");
  }
};
</script>

<template>
  <div class="untree_co-section" id="contact-section">
    <div class="container">
      <div class="row mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="col-12 text-center">
          <h2 class="heading logo m-0">LAKID<span style="color: #5bae9e;">✙</span></h2>
          <h4>{{ heading }}</h4>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-7">
          <form class="contact-form" @submit="handleLogin" data-aos="fade-up" data-aos-delay="100">
            <div class="form-group">
              <label for="email">{{ labels.email }}</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">{{ labels.message }}</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              :style="[ { backgroundColor: themeColor }, { borderColor: themeColor } ]"
            >
              Iniciar Sesión
            </button>
            <router-link to="/">
              <a
                class="btn btn-outline-primary"
                :style="[{ color: themeColor }, { borderColor: themeColor }, { marginLeft: '20px' }]"
              >
                Regresar
              </a>
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .row.justify-content-center {
    display: flex;
    justify-content: center;
  }

  .col-lg-7 {
    display: flex;
    justify-content: center;
  }
</style>

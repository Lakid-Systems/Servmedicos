<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { themeColor } from "../data/items";

const heading = "Inicie sesión en su cuenta";
const labels = {
  email: "Correo Electrónico",
  message: "Contraseña",
};

// GENERANDO DATOS PARA PRUEBA DE CONEXION A DASHOBOARD.............
const validEmail = "tolentinodomingodiego@gmail.com";
const validPassword = "aldo";

// VERIFICANDO DATOS DE INICIO DE SESION.......
const email = ref("");
const password = ref("");

// Router para redirección............
const router = useRouter();

// Función para manejar el inicio de sesión...............
const handleLogin = (e) => {
  e.preventDefault();
  if (email.value === validEmail && password.value === validPassword) {
    router.push("/dashboard");
  } else {
    alert("Correo o contraseña incorrectos");
  }
};

// SECCIÓN PARA OBTENER DATOS DE UNA API...........
// URL de la API
// const apiUrl = "https://api.example.com/users"; // Cambia esta URL por la de tu API

// Estado para almacenar los datos de la API
// const apiData = ref([]);

// Función para obtener datos de la API
// const fetchApiData = async () => {
//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error("Error al obtener los datos de la API");
//     }
//     apiData.value = await response.json();
//     console.log("Datos obtenidos de la API:", apiData.value);
//   } catch (error) {
//     console.error("Error al obtener los datos de la API:", error);
//   }
// };

// Llamar a la función fetchApiData cuando el componente se monte
// onMounted(() => {
//   fetchApiData();
// });
</script>

<template>
  <div class="untree_co-section" id="contact-section">
    <div class="container">
      <div class="row mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="col-12 text-center">
          <h2 class="heading logo m-0">LAKID<span style="color: #5bae9e;">✙</span></h2>
          <h4 class="">{{ heading }}</h4>
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
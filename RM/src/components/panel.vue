<script setup>
import { themeColor } from "../data/items";
import { useRouter } from "vue-router"; // Importa useRouter para la redirección

const router = useRouter(); // Obtén la instancia del router

const sidebarItems = [
  { name: "Dashboard", route: "/estatus" },
  { name: "Espacios", route: "/espacios_vista" },
  { name: "Áreas", route: "/areas" },
  { name: "Consumibles", route: "/insumos" },
];

// Función para manejar el logout
const logout = () => {
  router.push("/login"); // Redirige a la página de login
};
</script>

<template>
  <div class="layout">
    <div class="sidebar">
      <h2 class="sidebar-title" style="font-weight: bold;">LAKID<span style="color: #5bae9e;">✙</span></h2>
      <ul class="sidebar-menu">
        <li v-for="item in sidebarItems" :key="item.name" class="sidebar-item">
          <router-link :to="item.route" class="sidebar-link" active-class="active">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- Botón de Salir (flotante) -->
    <button class="logout-button" @click="logout">Salir</button>
  </div>
</template>

<style scoped>
/* Reset de márgenes y padding para evitar espacios no deseados */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.layout {
  display: flex;
  min-height: 100vh;
  margin: 0; /* Asegura que no haya márgenes externos */
  padding: 0; /* Asegura que no haya padding externo */
  position: relative; /* Necesario para posicionar el botón de salir */
}

.sidebar {
  width: 250px;
  background-color: #e2f1eb;
  padding: 20px;
  border-right: 1px solid #e2f1eb;
  display: flex;
  flex-direction: column;
}

.sidebar-title {
  text-align: center;
  margin-bottom: 30px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.sidebar-item {
  margin-bottom: 15px;
}

.sidebar-link {
  text-decoration: none;
  color: #212529;
  font-weight: 500;
  padding: 10px 15px;
  display: block;
  border-radius: 5px;
  transition: background-color 0.2s;
  align-items: center;
}

.sidebar-link:hover {
  background-color: v-bind(themeColor);
  color: #ffffff;
}

/* Estilo para el enlace activo */
.sidebar-link.active {
  background-color: v-bind(themeColor);
  color: #ffffff;
}

.content {
  flex: 1;
  overflow: auto;
  background-color: #ffffff;
  min-width: none;
}


.logout-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: 10px 20px;
  background-color: #ff8295;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
  z-index: 1000; 
}

.logout-button:hover {
  background-color: #fd5c74;
}
</style>
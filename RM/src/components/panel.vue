<script setup>
import { themeColor } from "../data/items";
import { useRouter } from "vue-router"; // Importa useRouter para la redirección

const router = useRouter(); // Obtén la instancia del router

const sidebarItems = [
  { name: "Dashboard", route: "/estatus", icon: "../src/assets/images/dashboard.png" },
  { name: "Espacios", route: "/espacios_vista", icon: "../src/assets/images/espacios.png" },
  { name: "Áreas", route: "/areas", icon: "../src/assets/images/areas.png" },
  { name: "Consumibles", route: "/insumos", icon: "../src/assets/images/consumibles.png" },
];

// Función para manejar el logout
const logout = () => {
  localStorage.removeItem("authToken"); // Elimina el token del almacenamiento local
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
            <img :src="item.icon" alt="icon" class="icon" />
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
  margin: 0;
  padding: 0;
  position: relative;
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
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: background-color 0.2s;
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

.icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
}

.content {
  flex: 1;
  overflow: auto;
  background-color: #ffffff;
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

<!-- Layout.vue -->
<script setup>
import { themeColor } from "../data/items";

const sidebarItems = [
  { name: "Dashboard", route: "/estatus" },
  { name: "Espacios", route: "/espacios_vista" },
  { name: "Áreas", route: "/areas" },
  { name: "Insumos", route: "/insumos" },

];
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
}

.sidebar {
  width: 250px;
  background-color: #ebfffd;
  padding: 20px;
  border-right: 1px solid #a2dbd4;
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
</style>
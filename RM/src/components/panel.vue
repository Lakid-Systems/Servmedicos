<!-- Layout.vue -->
<script setup>
import { themeColor } from "../data/items";

const sidebarItems = [
  { name: "Dashboard", route: "/Home" },
  { name: "Espacios", route: "/prueba" },
  { name: "Áreas", route: "/areas" },
  { name: "Extra1", route: "/extra1" },
  { name: "Extra2", route: "/extra2" }
];
</script>

<template>
  <div class="layout">
    <div class="sidebar">
      <h2 class="sidebar-title">LAKID<span style="color: #5bae9e;">+</span></h2>
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
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  border-right: 1px solid #dee2e6;
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
</style>
<script setup>
import { ref } from 'vue';

// Datos de prueba para espacios
const espacios = ref([
  {
    id: 1,
    nombre: "Sala de Conferencias",
    capacidad: 50,
    estado: "Disponible",
  },
  {
    id: 2,
    nombre: "Laboratorio de Innovación",
    capacidad: 20,
    estado: "Ocupado",
  },
  {
    id: 3,
    nombre: "Auditorio Principal",
    capacidad: 200,
    estado: "Mantenimiento",
  },
  {
    id: 4,
    nombre: "Sala de Juntas",
    capacidad: 15,
    estado: "Disponible",
  },
]);
</script>

<template>
  <div class="espacios-container">
    <h2>Lista de Espacios</h2>
    <ul>
      <li v-for="espacio in espacios" :key="espacio.id">
        <strong>{{ espacio.nombre }}</strong> - Capacidad: {{ espacio.capacidad }} - Estado: <span :class="espacio.estado.toLowerCase()">{{ espacio.estado }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.espacios-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f4f4f4;
  margin: 8px 0;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.disponible {
  color: #28a745;
}

.ocupado {
  color: #dc3545;
}

.mantenimiento {
  color: #ffc107;
}
</style>

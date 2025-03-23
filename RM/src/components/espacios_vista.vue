<script setup>
import { ref } from 'vue';
import Header2 from './Header2.vue';
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

const editarEspacio = (id) => {
  alert(`Editar espacio con ID: ${id}`);
};

const eliminarEspacio = (id) => {
  alert(`Eliminar espacio con ID: ${id}`);
};
</script>

<template>
  <div class="espacios-container">
    <h2>Lista de Espacios</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Capacidad</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="espacio in espacios" :key="espacio.id">
          <td>{{ espacio.nombre }}</td>
          <td>{{ espacio.capacidad }}</td>
          <td :class="espacio.estado.toLowerCase()">{{ espacio.estado }}</td>

          <!-- GENERANDO BOTONES DE ACCIONES DE EDICIÓN Y ELIMINACIÓN -->
          <td>
            <button @click="editarEspacio(espacio.id)" class="btn btn-edit">
              ✏️
            </button>
            <button @click="eliminarEspacio(espacio.id)" class="btn btn-delete">
              🗑️
            </button>
          </td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.espacios-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
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

.btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  margin: 0 4px;
}

.btn-edit {
  color: #007bff;
}

.btn-delete {
  color: #dc3545;
}

.btn:hover {
  opacity: 0.8;
}
</style>
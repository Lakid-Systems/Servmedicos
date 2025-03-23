<template>
    <div class="table-container" data-aos="fade-up">
      <table class="room-table" data-aos="fade-up">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in rooms" :key="room.id">
            <td>{{ room.id }}</td>
            <td>{{ room.nombre }}</td>
            <td>{{ room.capacidad }}</td>
            <td :class="room.estado.toLowerCase()">{{ room.estado }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rooms: [
          { id: 1, nombre: "Sala de Conferencias", capacidad: 50, estado: "Disponible" },
          { id: 2, nombre: "Laboratorio de Innovación", capacidad: 20, estado: "Ocupado" },
          { id: 3, nombre: "Auditorio Principal", capacidad: 200, estado: "Mantenimiento" },
          { id: 4, nombre: "Sala de Juntas", capacidad: 15, estado: "Disponible" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
 
  .table-container {
    margin: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .room-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #f9f9f9;
    border-radius: 50px;
  }
  
  .room-table th, .room-table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .room-table th {
    background-color: #5bae9e;
    color: white;
  }
  
  .room-table tr:nth-child(even) {
    background-color: #e2f1eb; /* Lighter variant */
  }
  
  .room-table .disponible {
    color: #3b8e6c; /* Darker variant of #5bae9e */
  }
  
  .room-table .ocupado {
    color: #c97e6b; /* Lighter red-orange variant */
  }
  
  .room-table .mantenimiento {
    color: #6ea87d; /* Medium green variant */
  }
  </style>
  
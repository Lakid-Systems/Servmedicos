<template>
    <div class="table-container" data-aos="fade-up">
      <table class="room-table" data-aos="fade-up">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estatus</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(room, index) in rooms" :key="index">
            <td>{{ room.Nombre }}</td>
            <td>{{ room.Descripcion }}</td>
            <td :class="room.Estatus ? 'disponible' : 'ocupado'">
              {{ room.Estatus ? 'Disponible' : 'No Disponible' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rooms: []
      };
    },
    mounted() {
      this.getAreasMedicas();
    },
    methods: {
      async getAreasMedicas() {
        try {
          const token = localStorage.getItem('token'); 
  
          if (!token) {
            console.error("Token de autenticación no encontrado.");
            return;
          }
          const response = await fetch('https://integradora-backend-linux.onrender.com/areas_medicas', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });
  
          
          if (!response.ok) {
            console.error("Error al obtener los datos. Estado: ", response.status);
            return;
          }
  
          
          const data = await response.json();
  
          
          if (Array.isArray(data)) {
            this.rooms = data.map(area => ({
              Nombre: area.Nombre,
              Descripcion: area.Descripcion,
              Estatus: area.Estatus,
            }));
          } else {
            console.error("La respuesta no es un array válido", data);
          }
        } catch (error) {
          console.error("Hubo un error al obtener los datos:", error);
        }
      }
    }
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
    background-color: #e2f1eb;
  }
  
  .room-table .disponible {
    color: #3b8e6c;
  }
  
  .room-table .ocupado {
    color: #c97e6b;
  }
  </style>
  
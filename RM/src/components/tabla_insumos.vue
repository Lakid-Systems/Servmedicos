<template>
    <div class="table-container" data-aos="fade-up">
      <table class="room-table" data-aos="fade-up">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Departamento</th>
            <th>Cantidad</th>
            <th>Detalle</th>
            <th>Estatus</th>
            <th>Observaciones</th>
            <th>Espacio Médico</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(room, index) in rooms" :key="index">
            <td>{{ room.nombre }}</td>
            <td>{{ room.descripcion }}</td>
            <td>{{ room.tipo }}</td>
            <td>{{ room.departamento }}</td>
            <td>{{ room.cantidad_existencia }}</td>
            <td>{{ room.detalle }}</td>
            <td :class="room.estatus ? 'disponible' : 'ocupado'">
              {{ room.estatus ? 'Disponible' : 'No Disponible' }}
            </td>
            <td>{{ room.observaciones }}</td>
            <td>{{ room.espacio_medico }}</td>
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
      this.getInsumos();
    },
    methods: {
      async getInsumos() {
        try {
          const token = localStorage.getItem('authToken');
          if (!token) {
            console.error("Token de autenticación no encontrado.");
            return;
          }
          const response = await fetch('https://integradora-backend-linux.onrender.com/consumibles', {
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
            this.rooms = data.map(insumo => ({
              nombre: insumo.nombre,
              descripcion: insumo.descripcion,
              tipo: insumo.tipo,
              departamento: insumo.departamento,
              cantidad_existencia: insumo.cantidad_existencia,
              detalle: insumo.detalle,
              estatus: insumo.estatus,
              observaciones: insumo.observaciones,
              espacio_medico: insumo.espacio_medico
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

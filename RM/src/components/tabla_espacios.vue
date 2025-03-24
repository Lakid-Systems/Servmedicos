<template>
  <div class="table-container" data-aos="fade-up">
    <table class="room-table" data-aos="fade-up">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Nombre</th>
          <th>Estatus</th>
          <th>Capacidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in rooms" :key="room.nombre">
          <td>{{ room.tipo }}</td>
          <td>{{ room.nombre }}</td>
          <td :class="(String(room.estatus) || '').toLowerCase()">{{ room.estatus }}</td>
          <td>{{ room.capacidad }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
      intervalId: null, // Para guardar el ID del intervalo
    };
  },
  mounted() {
    this.getInsumos();
    this.startAutoUpdate(); // Inicia la actualización automática
  },
  beforeUnmount() {
    clearInterval(this.intervalId); // Detiene el intervalo al salir del componente
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
          // Verifica si hubo cambios antes de actualizar
          if (JSON.stringify(this.rooms) !== JSON.stringify(data)) {
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
          }
        } else {
          console.error("La respuesta no es un array válido", data);
        }
      } catch (error) {
        console.error("Hubo un error al obtener los datos:", error);
      }
    },

    startAutoUpdate() {
      this.intervalId = setInterval(this.getInsumos, 3000); 
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

.room-table .activo {
  color: #3b8e6c;
}

.room-table .ocupado {
  color: #c97e6b;
}

.room-table .mantenimiento {
  color: #6ea87d;
}
</style>

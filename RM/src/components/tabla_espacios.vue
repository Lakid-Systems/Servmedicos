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
          <td :class="(room.estatus || '').toLowerCase()">{{ room.estatus }}</td>
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
    };
  },
  mounted() {
    this.fetchRooms();
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await fetch("https://integradora-backend-linux.onrender.com/espacios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6Imx1aXNpdmFuIiwiQ29ycmVvX0VsZWN0cm9uaWNvIjoibHVpcy5pdmFuQGV4YW1wbGUuY29tIiwiQ29udHJhc2VuYSI6IkNvbnRyYXNlbmFTZWd1cmFMdWlzMTIzIiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOm51bGx9.9bYcf6iq-tQKIs_aN6oi_Vh7tqBMzKQ2B4BZS2fOw10"
          },
        });

        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.status);
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);
        this.rooms = data;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
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

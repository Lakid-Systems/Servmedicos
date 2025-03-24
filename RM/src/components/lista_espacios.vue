<template>
  <div class="search-list-container" data-aos="fade-up">
    <div class="search-panel" data-aos="fade-up">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar por nombre..."
        class="search-input"
      />
    </div>

    <ul class="room-list" data-aos="fade-up">
      <li
        v-for="room in filteredRooms"
        :key="room.nombre"
        class="room-item"
      >
        <span class="room-type">{{ room.tipo }}</span>
        <span class="room-name">{{ room.nombre }}</span>
        <span class="room-capacity">Capacidad: {{ room.capacidad }}</span>
        <span :class="room.estatus.toLowerCase()" class="room-status">{{ room.estatus }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      rooms: [],  
      previousRooms: [],  
    };
  },
  computed: {
    filteredRooms() {
      return this.rooms.filter(room =>
        room.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    
    this.fetchRooms();
    this.startAutoUpdate();  
  },
  beforeUnmount() {
    clearInterval(this.intervalId); 
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await fetch("https://integradora-backend-linux.onrender.com/espacios", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6Imx1aXNpdmFuIiwiQ29ycmVvX0VsZWN0cm9uaWNvIjoibHVpcy5pdmFuQGV4YW1wbGUuY29tIiwiQ29udHJhc2VuYSI6IkNvbnRyYXNlbmFTZWd1cmFMdWlzMTIzIiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOm51bGx9.9bYcf6iq-tQKIs_aN6oi_Vh7tqBMzKQ2B4BZS2fOw10'
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();

        // Compara si los datos han cambiado antes de actualizarlos
        if (JSON.stringify(this.rooms) !== JSON.stringify(data)) {
          this.previousRooms = [...this.rooms];  
          this.rooms = data;  
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    startAutoUpdate() {
      this.intervalId = setInterval(this.fetchRooms, 3000); // Actualiza cada 3 segundos
    },
  },
};
</script>

<style scoped>
.search-list-container {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.search-panel {
  margin-bottom: 15px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2f1eb;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus {
  border-color: #5bae9e;
  outline: none;
}

.room-list {
  list-style: none;
  padding: 0;
}

.room-item {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  margin-bottom: 5px;
  border-radius: 5px;
}

.room-item:last-child {
  border-bottom: none;
}

.room-type, .room-name, .room-capacity, .room-status {
  padding: 5px;
  font-size: 17px;
}

.room-type {
  background-color: #e2f1eb;
  color: #525252dc;
  width: 25%;
  text-align: center;
  border-radius: 5px;
}

.room-name {
  background-color: #e2f1eb;
  color: #525252dc;
  width: 35%;
  text-align: left;
}

.room-capacity {
  background-color: #e2f1eb;
  color: #525252dc;
  width: 20%;
  text-align: left;
}

.room-status {
  background-color: #e2f1eb;
  color: #525252dc;
  width: 20%;
  text-align: center;
  border-radius: 5px;
}

.room-status.disponible {
  background-color: #a7d8cf;
}

.room-status.ocupado {
  background-color: #ecb8ab;
}

.room-status.mantenimiento {
  background-color: #a9e2b9;
}
</style>

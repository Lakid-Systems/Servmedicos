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
          :key="room.id"
          class="room-item"
        >
          <span class="room-id">{{ room.id }}</span>
          <span class="room-name">{{ room.nombre }}</span>
          <span class="room-capacity">Capacidad: {{ room.capacidad }}</span>
          <span :class="room.estado.toLowerCase()" class="room-status">{{ room.estado }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        rooms: [
          { id: 1, nombre: "Sala de Conferencias", capacidad: 50, estado: "Disponible" },
          { id: 2, nombre: "Laboratorio de Innovación", capacidad: 20, estado: "Ocupado" },
          { id: 3, nombre: "Auditorio Principal", capacidad: 200, estado: "Mantenimiento" },
          { id: 4, nombre: "Sala de Juntas", capacidad: 15, estado: "Disponible" },
        ],
      };
    },
    computed: {
      filteredRooms() {
        return this.rooms.filter(room =>
          room.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
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
  }
  
  .room-item:last-child {
    border-bottom: none;
  }
  
  .room-id, .room-name, .room-capacity, .room-status {
    padding: 5px;
    font-size: 17px;
  }
  
  .room-id {
    background-color: #e2f1eb; 
    color: #525252dc;
    width: 15%;
    text-align: center;
    border-top-left-radius: 5px; 
  border-bottom-left-radius: 5px; 
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
    width: 30%;
    text-align: left;
  }
  
  .room-status {
    background-color: #e2f1eb;
    color: #525252dc;
    width: 20%;
    text-align: center;
    border-top-right-radius: 5px;   
  border-bottom-right-radius: 5px; 
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
  
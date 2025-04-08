<template>
  <div class="table-container" data-aos="fade-up">
    <!-- Botón para abrir el modal -->
    <button class="add-button" @click="mostrarFormulario">
      <img src="../assets/images/añadir.png" alt="Icono" class="icono-boton" />
      Nuevo
    </button>

    <!-- Modal del formulario -->
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Agregar Área Médica</h3>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nuevoNombre" placeholder="Nombre del área">
        
        <label for="descripcion">Descripción:</label>
        <input type="text" id="descripcion" v-model="nuevaDescripcion" placeholder="Descripción del área">
        
        <label for="estatus">¿Disponible?</label>
        <select v-model="nuevoEstatus">
          <option value="true">Disponible</option>
          <option value="false">No Disponible</option>
        </select>

        <button class="submit-button" @click="agregarArea">Agregar</button>
        <button class="close-button" @click="cerrarFormulario">Cerrar</button>
      </div>
    </div>

    <!-- Tabla -->
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
      rooms: [],
      intervalId: null,
      mostrarModal: false,
      nuevoNombre: '',
      nuevaDescripcion: '',
      nuevoEstatus: true, // Por defecto, disponible
    };
  },
  mounted() {
    this.getAreasMedicas();
    this.startAutoUpdate();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    async getAreasMedicas() {
      try {
        const token = localStorage.getItem('authToken');
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
          if (JSON.stringify(this.rooms) !== JSON.stringify(data)) {
            this.rooms = data.map(area => ({
              Nombre: area.Nombre,
              Descripcion: area.Descripcion,
              Estatus: area.Estatus,
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
      this.intervalId = setInterval(this.getAreasMedicas, 3000);
    },

    mostrarFormulario() {
      this.mostrarModal = true;
    },

    cerrarFormulario() {
      this.mostrarModal = false;
      // Limpiar los campos del formulario
      this.nuevoNombre = '';
      this.nuevaDescripcion = '';
      this.nuevoEstatus = true;
    },

    agregarArea() {
      if (this.nuevoNombre && this.nuevaDescripcion) {
        const newArea = {
          Nombre: this.nuevoNombre,
          Descripcion: this.nuevaDescripcion,
          Estatus: this.nuevoEstatus,
        };
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error("Token de autenticación no encontrado.");
          return;
        }

        fetch('https://integradora-backend-linux.onrender.com/areas_medicas', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newArea),
        })
        .then(response => {
          if (!response.ok) {
            console.error("Error al agregar el área. Estado: ", response.status);
            return;
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            console.log("Área agregada:", data);
          } else {
            console.error("No se recibió respuesta válida al agregar el área.");
          }
        })
        .catch(error => {
          console.error("Hubo un error al agregar el área:", error);
        });

        this.rooms.push(newArea); // Añadir el nuevo área a la tabla
        this.cerrarFormulario(); // Cerrar el formulario después de agregar
      } else {
        alert("Por favor ingresa todos los datos.");
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

/* Estilos para el modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegura que el modal esté sobre el contenido */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  width: 350px; /* Reducir el ancho del formulario */
  max-width: 90%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 150px; /* Mover el formulario más abajo */
}


.modal-content h3 {
  text-align: center;
  margin-bottom: 20px;
}

.modal-content label {
  display: block;
  margin-bottom: 8px;
}

.modal-content input, .modal-content select {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button, .close-button {
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px; /* Añadir espacio entre los botones */
  width: 100%; /* Hacer que los botones ocupen todo el ancho */
  display: block; /* Asegura que los botones estén uno debajo del otro */
}

.submit-button {
  background-color: #5bae9e;
}

.submit-button:hover {
  background-color: #4a9b89;
}

.close-button {
  background-color: #b3b3b3;
}

.close-button:hover {
  background-color: #b3b3b3;
}

.icono-boton {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: middle;
}

.add-button {
  margin-bottom: 10px;
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #5bae9e;
}

.add-button:hover {
  background-color: #4a9b89;
}
</style>

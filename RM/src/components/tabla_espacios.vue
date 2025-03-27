<template>
  <div class="table-container" data-aos="fade-up">
    <button class="add-button" @click="mostrarFormulario">Agregar</button>
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

  <div v-if="mostrarLogin">
    <!-- Fondo oscuro (backdrop) -->
    <div class="backdrop" @click="cerrarFormulario"></div>
    <div class="login-modal">
      <form @submit.prevent="agregarEspacio">
        <h2>Agregar Espacio</h2>
        <label>Tipo:</label>
        <input type="text" placeholder="Ej. Laboratorio" v-model="nuevoEspacio.tipo" required />

        <label>Nombre:</label>
        <input type="text" placeholder="Ej. Laboratorio de Imagenología" v-model="nuevoEspacio.nombre" required />

        <label>Estatus:</label>
        <select v-model="nuevoEspacio.estatus" required>
          <option value="activo">Activo</option>
          <option value="ocupado">Ocupado</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>

        <label>Capacidad:</label>
        <input type="number" v-model="nuevoEspacio.capacidad" required />

        <button type="submit">Guardar</button>
        <button type="button" @click="cerrarFormulario">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [],
      intervalId: null,
      mostrarLogin: false,
      nuevoEspacio: {
        tipo: '',
        nombre: '',
        estatus: 'activo',
        capacidad: '',
        espacio_superior_id: null,
        id: '',
        fecha_registro: new Date().toISOString(),
        fecha_actualizacion: null
      }
    };
  },
  mounted() {
    this.getEspacios();
    this.startAutoUpdate();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    async getEspacios() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error("Token de autenticación no encontrado.");
          return;
        }
        const response = await fetch('https://integradora-backend-linux.onrender.com/espacios', {
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
            this.rooms = data.map(espacio => ({
              tipo: espacio.tipo,
              nombre: espacio.nombre,
              estatus: espacio.estatus,
              capacidad: espacio.capacidad
            }));
          }
        } else {
          console.error("La respuesta no es un array válido", data);
        }
      } catch (error) {
        console.error("Hubo un error al obtener los datos:", error);
      }
    },
    async agregarEspacio() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error("Token de autenticación no encontrado.");
          return;
        }
        // Asignar valores para los campos ocultos antes de enviar
        this.nuevoEspacio.id = this.generateUUID(); // Generar un nuevo UUID para 'id'
        this.nuevoEspacio.fecha_registro = new Date().toISOString(); // Asignar la fecha actual

        const response = await fetch('https://integradora-backend-linux.onrender.com/espacios', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.nuevoEspacio)
        });
        if (!response.ok) {
          console.error("Error al agregar espacio. Estado: ", response.status);
          return;
        }
        this.getEspacios();
        this.cerrarFormulario();
      } catch (error) {
        console.error("Hubo un error al agregar el espacio:", error);
      }
    },
    startAutoUpdate() {
      this.intervalId = setInterval(this.getEspacios, 3000);
    },
    mostrarFormulario() {
      this.mostrarLogin = true;
    },
    cerrarFormulario() {
      this.mostrarLogin = false;
      this.nuevoEspacio = { tipo: '', nombre: '', estatus: 'activo', capacidad: '', espacio_superior_id: null, id: '', fecha_registro: new Date().toISOString(), fecha_actualizacion: null };
    },
    generateUUID() {
      // Función para generar un UUID único
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
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

.login-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  width: 350px;
  z-index: 9999;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9998;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  font-weight: bold;
  color: #333;
}

input, select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

input:focus, select:focus {
  border-color: #5bae9e;
  outline: none;
  box-shadow: 0 0 5px rgba(91, 174, 158, 0.5);
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease-in-out;
}

button[type="submit"] {
  background-color: #5bae9e;
  color: white;
}

button[type="submit"]:hover {
  background-color: #4a9b89;
}

button[type="button"] {
  background-color: #ccc;
  color: #333;
}

button[type="button"]:hover {
  background-color: #b3b3b3;
}
</style>

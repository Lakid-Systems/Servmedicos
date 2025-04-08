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
        <h3>Agregar Insumo</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="nuevoNombre" placeholder="Nombre del insumo">
          </div>

          <div class="form-group">
            <label for="descripcion">Descripción:</label>
            <input type="text" id="descripcion" v-model="nuevaDescripcion" placeholder="Descripción del insumo">
          </div>

          <div class="form-group">
            <label for="tipo">Tipo:</label>
            <input type="text" id="tipo" v-model="nuevoTipo" placeholder="Tipo de insumo">
          </div>

          <div class="form-group">
            <label for="departamento">Departamento:</label>
            <input type="text" id="departamento" v-model="nuevoDepartamento" placeholder="Departamento">
          </div>

          <div class="form-group">
            <label for="cantidad_existencia">Cantidad:</label>
            <input type="number" id="cantidad_existencia" v-model="nuevaCantidad" placeholder="Cantidad disponible">
          </div>

          <div class="form-group">
            <label for="detalle">Detalle:</label>
            <input type="text" id="detalle" v-model="nuevoDetalle" placeholder="Detalle del insumo">
          </div>

          <div class="form-group">
            <label for="estatus">¿Disponible?</label>
            <select v-model="nuevoEstatus">
              <option value="true">Disponible</option>
              <option value="false">No Disponible</option>
            </select>
          </div>

          <div class="form-group">
            <label for="observaciones">Observaciones:</label>
            <input type="text" id="observaciones" v-model="nuevasObservaciones" placeholder="Observaciones">
          </div>

          <div class="form-group">
            <label for="espacio_medico">Espacio Médico:</label>
            <input type="text" id="espacio_medico" v-model="nuevoEspacioMedico" placeholder="Espacio médico">
          </div>
        </div>

        <div class="form-actions">
          <button class="submit-button" @click="agregarInsumo">Agregar</button>
          <button class="close-button" @click="cerrarFormulario">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Tabla -->
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
      rooms: [],
      intervalId: null,
      mostrarModal: false,
      nuevoNombre: '',
      nuevaDescripcion: '',
      nuevoTipo: '',
      nuevoDepartamento: '',
      nuevaCantidad: '',
      nuevoDetalle: '',
      nuevoEstatus: true,
      nuevasObservaciones: '',
      nuevoEspacioMedico: '',
    };
  },
  mounted() {
    this.getInsumos();
    this.startAutoUpdate();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
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
    },

    mostrarFormulario() {
      this.mostrarModal = true;
    },

    cerrarFormulario() {
      this.mostrarModal = false;
      // Limpiar los campos del formulario
      this.nuevoNombre = '';
      this.nuevaDescripcion = '';
      this.nuevoTipo = '';
      this.nuevoDepartamento = '';
      this.nuevaCantidad = '';
      this.nuevoDetalle = '';
      this.nuevoEstatus = true;
      this.nuevasObservaciones = '';
      this.nuevoEspacioMedico = '';
    },

    agregarInsumo() {
      if (this.nuevoNombre && this.nuevaDescripcion && this.nuevoTipo) {
        const newInsumo = {
          nombre: this.nuevoNombre,
          descripcion: this.nuevaDescripcion,
          tipo: this.nuevoTipo,
          departamento: this.nuevoDepartamento,
          cantidad_existencia: this.nuevaCantidad,
          detalle: this.nuevoDetalle,
          estatus: this.nuevoEstatus,
          observaciones: this.nuevasObservaciones,
          espacio_medico: this.nuevoEspacioMedico,
        };

        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error("Token de autenticación no encontrado.");
          return;
        }

        fetch('https://integradora-backend-linux.onrender.com/consumibles', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newInsumo),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Insumo agregado:", data);
            this.rooms.push(data); // Agrega el nuevo insumo a la tabla
            this.cerrarFormulario(); // Cierra el formulario después de agregar
          })
          .catch(error => {
            console.error("Error al agregar el insumo:", error);
          });
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

.room-table th,
.room-table td {
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
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 15px;
  border-radius: 12px;
  width: 450px;
  /* Reducido y adaptado */
  max-width: 90%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 80px;
  /* Aumento el margen superior para bajarlo más */
}

.modal-content h3 {
  text-align: center;
  margin-bottom: 10px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  padding: 6px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button,
.close-button {
  padding: 8px 15px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: block;
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
  background-color: #b7b2b2;
}

.icono-boton {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: middle;
}

.add-button {
  display: flex;
  align-items: center;
  background-color: #5bae9e;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

.add-button:hover {
  background-color: #4a9b89;
}
</style>

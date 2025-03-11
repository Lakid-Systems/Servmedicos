<template>
    <Header2 />
  
    <!-- Div vacio para evitar superposicion entre el header y el carrousel -->
    <div class="header-spacer" :style="{ height: headerHeight + 'px' }"></div>
  
    <!-- carrusel -->
    <div class="carrusel-wrapper">
      <h2 class="carrusel-title">Últimas Áreas Agregadas</h2>
      <div class="carrusel-container">
        <swiper
          :modules="[Autoplay, Pagination]"
          :slides-per-view="1"
          :space-between="10"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :loop="true"
          :pagination="{ clickable: true }"
          class="mySwiper"
        >
          <swiper-slide v-for="(area, index) in lastFourAreas" :key="index">
            <div class="slide-content">
              <h3>{{ area.name }}</h3>
              <p>{{ area.description }}</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  
    <div class="untree_co-section bg-light">
      <div class="container">
        <!-- Lista -->
        <div class="row mb-4">
          <div class="col-12">
            <h2 class="heading">Lista de Áreas</h2>
            <ul class="list-group">
              <li v-for="(area, index) in areas" :key="index" class="list-group-item">
                {{ area.name }} - {{ area.description }}
                <button @click="deleteArea(index)" class="btn btn-danger btn-sm float-right">Eliminar</button>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Tabla -->
        <div class="row mb-4">
          <div class="col-12">
            <h2 class="heading">Tabla de Áreas</h2>
            <input v-model="searchQuery" placeholder="Buscar área..." class="form-control mb-3" />
            <table class="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(area, index) in filteredAreas" :key="index">
                  <td>{{ area.name }}</td>
                  <td>{{ area.description }}</td>
                  <td>
                    <button @click="deleteArea(index)" class="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  

        <div class="row">
          <div class="col-12">
            <button @click="showModal = true" class="btn btn-primary">Agregar Área</button>
          </div>
        </div>
  
        <!-- Modal -->
        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <span @click="showModal = false" class="close">&times;</span>
            <h2>Agregar Nueva Área</h2>
            <form @submit.prevent="addArea">
              <div class="form-group">
                <label for="name">Nombre:</label>
                <input v-model="newArea.name" id="name" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="description">Descripción:</label>
                <textarea v-model="newArea.description" id="description" class="form-control" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Agregar</button>
              <button type="button" @click="showModal = false" class="btn btn-secondary">Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Header2 from "../components/Header2.vue";
  import { ref, computed, onMounted } from 'vue';
  
  //  Swiper y sus módulos para el carrousel
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  import { Autoplay, Pagination } from 'swiper/modules';
  
  const areas = ref([
    { name: 'Quirófanos', description: 'Área destinada a cirugías.' },
    { name: 'Urgencias', description: 'Área de atención médica inmediata.' },
    { name: 'Almacén', description: 'Área de almacenamiento de insumos.' },
    { name: 'Laboratorio', description: 'Área de análisis clínicos.' },
    { name: 'Rayos X', description: 'Área de diagnóstico por imágenes.' },
  ]);
  
  const searchQuery = ref('');
  const showModal = ref(false);
  const newArea = ref({ name: '', description: '' });
  const headerHeight = ref(80); 

  // Obtener los lutimos 4 registros para el carrusel
  const lastFourAreas = computed(() => {
    return areas.value.slice(-4);
  });
  
  const filteredAreas = computed(() => {
    return areas.value.filter(area =>
      area.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      area.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  const addArea = () => {
    areas.value.push({ ...newArea.value });
    newArea.value = { name: '', description: '' };
    showModal.value = false;
  };
  
  const deleteArea = (index) => {
    areas.value.splice(index, 1);
  };
  
  
  onMounted(() => {
    const header = document.querySelector('header'); 
    if (header) {
      headerHeight.value = header.offsetHeight;
    }
  });
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 50%;
  }
  
  .close {
    float: right;
    cursor: pointer;
  }
  
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .btn {
    margin-left: 10px;
  }
  
  /* cuadro vacio */
  .header-spacer {
    width: 100%;
    background-color: transparent; 
  }
  
  
  .carrusel-wrapper {
    background-color: #7cd0bf;
    padding: 20px 0;
  }
  
  .carrusel-title {
    text-align: center;
    color: white;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
  }
  
  .carrusel-container {
    width: 80%;
    margin: 0 auto;
  }
  
  .slide-content {
    text-align: center;
    padding: 20px;
    color: white;
  }
  
  .mySwiper {
    width: 100%;
  }
  </style>
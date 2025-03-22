<template>
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
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import "swiper/swiper-bundle.css";
  import { Autoplay, Pagination } from "swiper/modules";
  import { defineProps, computed } from "vue";
  
  const props = defineProps({
    areas: Array,
  });
  
  const lastFourAreas = computed(() => {
    return props.areas.slice(-4);
  });
  </script>
  
  <style scoped>
  /* Estilos del carrusel */
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
  
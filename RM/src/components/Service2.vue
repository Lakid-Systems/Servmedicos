<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const service1Heading = "Nuestros servicios";

// Datos de los elementos del carrusel
const items = [
  {
    id: 1,
    name: "Espacios",
    des: "Gestiona y optimiza la asignación de áreas dentro del hospital, asegurando una distribución eficiente de recursos y personal.",
  },
  {
    id: 2,
    name: "Áreas",
    des: "Monitorea y organiza cada departamento, desde quirófanos hasta almacenes, para un control preciso y una mejor operatividad.",
  },
  {
    id: 3,
    name: "Insumos",
    des: "Mantén un inventario detallado de equipos médicos y materiales esenciales, evitando desabastecimientos y optimizando costos.",
  },
];

const total = items.length;
const images = ref({}); // Inicializado como objeto vacío

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3002/carrusel");
    const data = response.data;

    // Transformar el array en un objeto con id como clave
    const imageMap = {};
    data.forEach(item => {
      imageMap[item.id] = item.image;
    });

    images.value = imageMap;
    console.log("Imágenes cargadas:", images.value);
  } catch (error) {
    console.error("Error al cargar las imágenes:", error);
  }
});
</script>

<template>
  <div class="untree_co-section bg-light" id="services-section">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-lg-5 order-lg-2 js-custom-dots">
          <span class="caption" data-aos="fade-up" data-aos-delay="0">{{ service1Heading }}</span>
          <a href="#" class="service link horizontal d-flex active" data-aos="fade-left" data-aos-delay="0">
            <div class="service-contents">
              <h3>{{ items[0].name }}</h3>
              <p>{{ items[0].des }}</p>
            </div>
          </a>
          <a href="#" class="service link horizontal d-flex" data-aos="fade-left" data-aos-delay="100">
            <div class="service-contents">
              <h3>{{ items[1].name }}</h3>
              <p>{{ items[1].des }}</p>
            </div>
          </a>
          <a href="#" class="service link horizontal d-flex" data-aos="fade-left" data-aos-delay="200">
            <div class="service-contents">
              <h3>{{ items[2].name }}</h3>
              <p>{{ items[2].des }}</p>
            </div>
          </a>
        </div>
        <div class="col-lg-7">
          <div class="img-shadow">
            <div class="owl-single no-dots owl-carousel">
              <div class="item" v-for="item in items" :key="item.id">
                <span class="number">{{ item.id }}/{{ total }}</span>
                <img 
                  :src="images[item.id] || 'https://via.placeholder.com/300'" 
                  alt="Imagen de {{ item.name }}" 
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

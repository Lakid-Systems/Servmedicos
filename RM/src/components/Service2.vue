<script setup>
  // Importamos las dependencias necesarias de Vue y Axios
  import { ref, onMounted } from "vue";
  import axios from "axios";

  // Título de la sección de servicios
  const service1Heading = "Nuestros servicios";

  // Datos de los elementos del carrusel, con su id, nombre y descripción
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

  // Variable que guarda la cantidad total de elementos en el carrusel
  const total = items.length;

  // Variable reactiva para almacenar las imágenes del carrusel
  const images = ref({}); // Inicializada como un objeto vacío

  // Al montar el componente, realizamos una petición HTTP para obtener las imágenes
  onMounted(async () => {
    try {
      // Hacemos una petición GET a un servicio para obtener las imágenes
      const response = await axios.get("http://localhost:3002/carrusel");
      const data = response.data;

      // Transformamos el array de datos de las imágenes en un objeto, usando el id como clave
      const imageMap = {};
      data.forEach(item => {
        imageMap[item.id] = item.image;
      });

      // Asignamos el objeto con las imágenes a la variable reactiva
      images.value = imageMap;
      console.log("Imágenes cargadas:", images.value);
    } catch (error) {
      // Si ocurre un error durante la carga de las imágenes, lo mostramos en consola
      console.error("Error al cargar las imágenes:", error);
    }
  });
</script>
<!-- Definir Data-aos="xxxx" para la animacion -->
 <!-- https://egghead.io/blog/how-to-use-the-animate-on-scroll-aos-library-in-vue -->
<template>
  <div class="untree_co-section bg-light" id="services-section">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-lg-5 order-lg-2 js-custom-dots">
          <!-- Título de la sección de servicios con animación de entrada (AOS) -->
          <span class="caption" data-aos="fade-up" data-aos-delay="0">{{ service1Heading }}</span>
          
          <!-- Enlaces de servicios con animación AOS -->
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

        <!-- Columna con la imagen del carrusel -->
        <div class="col-lg-7">
          <div class="img-shadow">
            <!-- Carrusel de imágenes con animación (usando owl-carousel) -->
            <div class="owl-single no-dots owl-carousel">
              <!-- Recorremos cada item y mostramos la imagen correspondiente -->
              <div class="item" v-for="item in items" :key="item.id">
                <!-- Mostramos el número de la imagen actual y el total -->
                <span class="number">{{ item.id }}/{{ total }}</span>
                
                <!-- Mostramos la imagen correspondiente, si no tiene imagen se muestra una de placeholder -->
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
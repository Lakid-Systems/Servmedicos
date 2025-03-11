<script setup>
import mainPhoto from "../assets/images/hospital.png";
import { themeColor } from "../data/items";

const heroHeading = "Organiza tus espacios";
const buttonSeeFeature = "Comprar";
const buttonPricing = "Conoce mas";
</script>

<template>
  <div class="untree_co-hero" id="home-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12">
          <div class="dots"></div>
          <div class="row align-items-center">
            <div
              class="col-lg-7 ml-auto order-lg-2"
              data-aos="fade-right"
              data-aos-delay="400"
            >
            <img :src="mainPhoto" alt="Image" class="img-fluid" style="height: 80vh !important; width: auto;" />
            </div>
            <div class="col-lg-5">
              <h1 class="heading" data-aos="fade-up" data-aos-delay="0">
                {{ heroHeading }}
              </h1>
              <div class="excerpt" data-aos="fade-up" data-aos-delay="100">
                <p>
                  ¿Cansado de perder tiempo buscando insumos médicos?
                  <span
                    style="
                      background-color: rgba(64, 123, 255, 0.07);
                      color: #5bae9e;
                    "
                    >Lakid</span
                  >
                  es un sistema que te permite gestionar el 
                  inventario de insumos médicos, equipos y 
                  medicamentos en tiempo real, evitando desperdicios 
                  y asegurando disponibilidad en todo momento.
                </p>
              </div>
              <p data-aos="fade-up" data-aos-delay="200">
                <a
                  class="btn btn-primary smoothscroll"
                  style="margin-right: 5px"
                  :style="[
                    { background: themeColor },
                    { borderColor: themeColor },
                  ]"
                  >{{ buttonSeeFeature }}</a>
                <router-link to="/MoreInfo">
                <a
                  class="btn btn-outline-primary smoothscroll pricing"
                  :style="[{ color: themeColor }, { borderColor: themeColor }]"
                  >{{ buttonPricing }}</a>  </router-link>
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pricing:hover {
  color: #fff !important;
}
</style>

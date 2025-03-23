<script setup>
import { themeColor } from "../data/items";
import mainPhoto from "../assets/images/developer.svg";

const heading = "Nosotros";
const subHeading = "¿Quienes somos?";
const totalMembers = "100";
const totalTeam = "2";
</script>

<template>
  <div class="untree_co-section" id="about-section">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-lg-8" data-aos="fade-up" data-aos-delay="100">
          <img :src="mainPhoto" alt="Image" class="img-fluid" />
        </div>
        <div class="col-lg-4">
          <div class="mb-4" data-aos="fade-up" data-aos-delay="0">
            <span class="caption" :style="[{ color: themeColor }]">{{
              heading
            }}</span>
            <h2 class="heading">{{ subHeading }}</h2>
          </div>
          <div class="mb-4" data-aos="fade-up" data-aos-delay="100">
            <p>
              En Lakid, estamos comprometidos con la eficiencia y la 
              innovación en la gestión hospitalaria. Nuestro objetivo es transformar la gestión 
              hospitalaria con soluciones inteligentes que optimicen procesos y mejoren la atención a los pacientes.
            </p>
            <p>
              Con un enfoque en tecnología, automatización y seguridad,  
              <span class="highlight">facilitamos la administración de espacios, áreas, insumos y consumibles,</span
              > reduciendo desperdicios y mejorando la toma de decisiones.
            </p>
          </div>
          <ul
            class="list-unstyled ul-check primary mb-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <li>Eficiencia sin límites</li>
            <li>Control total, cero desperdicios</li>
            <li>Datos que potencian decisiones</li>
          </ul>
          <div class="row count-numbers">
            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="0">
              <span class="counter d-block"
                ><span :data-number="totalMembers">{{ totalMembers }}</span
                ></span
              >
              <span class="caption-2">Empresas con nosotros</span>
            </div>
            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <span class="counter d-block"
                ><span :data-number="totalTeam">{{ totalTeam }}</span
                ><span></span
              ></span>
              <span class="caption-2">años de servicio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

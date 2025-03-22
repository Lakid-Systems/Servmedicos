<script setup>
import { themeColor, siteName } from "../data/items";

const heading = "Inicie sesión en su cuenta";
const labels = {
  email: "Correo Electrónico",
  message: "Contraseña",
};
</script>

<template>
  <div class="untree_co-section" id="contact-section">
    <div class="container">
      <div class="row mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="col-12 text-center">
          <h2 class="heading logo m-0  " >LAKID<span  style="  color: #5bae9e;">✙</span></h2>
          <h4 class="">{{ heading }}</h4>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-7">
          <form class="contact-form" data-aos="fade-up" data-aos-delay="100">
            <div class="form-group">
              <label for="email">{{ labels.email }}</label>
              <input type="email" class="form-control" id="email" />
            </div>
            <div class="form-group">
              <label for="message">{{ labels.message }}</label>
              <input type="password" class="form-control" id="password" />
            </div>
            <router-link to="/estatus">
              <button
                type="submit"
                class="btn btn-primary"
                :style="[ { backgroundColor: themeColor }, { borderColor: themeColor } ]"
              > Iniciar Sesión</button>
            </router-link>
            <router-link to="/"> 
            <a class="btn btn-outline-primary"
              :style="[{ color: themeColor }, { borderColor: themeColor }, { marginLeft: '20px' }]">
              <a>Regresar</a>
            </a> </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .row.justify-content-center {
    display: flex;
    justify-content: center;
  }

  .col-lg-7 {
    display: flex;
    justify-content: center;
  }
</style>

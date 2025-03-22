<script setup>
import { themeColor, siteName } from "../data/items";
</script>
<template>
  <nav class="site-nav dark js-site-navbar mb-5 site-navbar-target">
    <div class="container">
      <div class="site-navigation">
        <a href="" class="logo m-0 float-left"
          >{{ siteName }}<span  style=" color: #5bae9e;">✙</span></a>
        <ul class="js-clone-nav d-none d-lg-inline-block site-menu float-left">
          <li class="active">
            <a href="#home-section" class="nav-link">Inicio</a>
          </li>
          <li><a href="#services-section" class="nav-link">Servicios</a></li>
          <li><a href="#about-section" class="nav-link">Nosotros</a></li>
          <li><a href="#contact-section" class="nav-link">Contactos</a></li>
        </ul>
        <ul
          class="js-clone-nav d-none mt-1 d-lg-inline-block site-menu float-right"
        >
                  <li class="cta-button-outline" style="margin-right: 5px;">
            <router-link to="/login">Inicia Sesión</router-link>
          </li>

          <li class="cta-primary">
            <a href="#" :style="[{ backgroundColor: themeColor }]">Registrate</a>
          </li>
        </ul>
        <a
          href="#"
          class="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block dark d-lg-none"
          data-toggle="collapse"
          data-target="#main-navbar"
        >
          <span></span>
        </a>
      </div>
    </div>
  </nav>
</template>

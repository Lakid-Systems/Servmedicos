<script setup>
import {siteName } from "../data/items";
</script>
<template>
  <nav class="site-nav dark js-site-navbar mb-5 site-navbar-target">
    <div class="container">
      <div class="site-navigation">
        <a href="" class="logo m-0 float-left"
          >{{ siteName }} <span  style=" background-color: rgba(64, 123, 255, 0.07); color: #5bae9e;">-</span> <span>Inicio</span></a
        >
        <ul
          class="js-clone-nav d-none mt-1 d-lg-inline-block site-menu float-right"
        >
                  <li class="cta-button-outline" style="margin-right: 5px;">
            <router-link to="/">Salir</router-link>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { contactInfo } from "../data/items";

const copyrightText = "Copyright 2025, Todos Los derechos reservados.";
const column1Heading = "Lakid";
const column1Text =
  "Optimizamos la gestión de recursos hospitalarios con tecnología eficiente y segura.";
const column2Heading = "Proyectos";
const column3Heading = "Servicios";
const column4Heading = "Contacto";

const connectHeading = "Siguenos";

const socialItems = [
  {
    link: "https://www.instagram.com/",
    icon: "icon-instagram",
  },
  {
    link: "https://www.twitter.com/",
    icon: "icon-twitter",
  },
  {
    link: "https://www.facebook.com/",
    icon: "icon-facebook",
  },
  {
    link: "https://www.linkedin.com/",
    icon: "icon-linkedin",
  },
  {
    link: "https://www.pinterest.com/",
    icon: "icon-pinterest",
  },
];
</script>

<template>
  <div class="site-footer">
    <div class="footer-dots"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="widget">
            <h3>{{ column1Heading }}</h3>
            <p>{{ column1Text }}</p>
          </div>
          <div class="widget">
            <h3>{{ connectHeading }}</h3>
            <ul class="list-unstyled social">
              <li style="margin-right: 4px">
                <a :href="socialItems[0].link"
                  ><span :class="socialItems[0].icon"></span
                ></a>
              </li>
              <li style="margin-right: 4px">
                <a :href="socialItems[1].link"
                  ><span :class="socialItems[1].icon"></span
                ></a>
              </li>
              <li style="margin-right: 4px">
                <a :href="socialItems[2].link"
                  ><span :class="socialItems[2].icon"></span
                ></a>
              </li>
              <li style="margin-right: 4px">
                <a :href="socialItems[3].link"
                  ><span :class="socialItems[3].icon"></span
                ></a>
              </li>
              <li>
                <a :href="socialItems[4].link"
                  ><span :class="socialItems[4].icon"></span
                ></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-2 ml-auto">
          <div class="widget">
            <h3>{{ column2Heading }}</h3>
            <ul class="list-unstyled float-left links">
              <li><a href="#">Lakid systems</a></li>
              <li><a href="#">Ecoluz Urbana</a></li>
              <li><a href="#">KalidGPT</a></li>

            </ul>
          </div>
        </div>
        <div class="col-lg-2">
          <div class="widget">
            <h3>{{ column3Heading }}</h3>
            <ul class="list-unstyled float-left links">
              <li><a href="#">Desarrollo de software</a></li>
              <li><a href="#">Soporte y mantenimiento</a></li>
              <li><a href="#">Redes e IoT</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="widget">
            <h3>{{ column4Heading }}</h3>
            <address>{{ contactInfo.address }}</address>
            <ul class="list-unstyled links mb-4">
              <li>
                <a :href="'tel://' + contactInfo.phone1">{{
                  contactInfo.phone1
                }}</a>
              </li>
              <li>
                <a :href="'tel://' + contactInfo.phone2">{{
                  contactInfo.phone2
                }}</a>
              </li>
              <li>
                <a :href="'mailto:' + contactInfo.email"
                  ><span>{{ contactInfo.email }}</span></a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12 text-center">
          <p>
            {{ copyrightText }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

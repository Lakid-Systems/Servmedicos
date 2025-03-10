<script setup>
import { themeColor } from "../data/items";
const heading = "Precios";
const subHeading = "Cuanto te cuesta tenernos!";
const startButtonName = "Empecemos";
const packages = [
  {
    name: "Gratis",
    price: "0",
  },
  {
    name: "Pro",
    price: "19.99",
  },
  {
    name: "Pro max",
    price: "79.99",
  },
];
</script>
<template>
  <div class="untree_co-section bg-light" id="pricing-section">
    <div class="container">
      <div class="row pricing-title">
        <div class="col-12 text-center" data-aos="fade-up" data-aos-delay="0">
          <h2 class="heading">{{ heading }}</h2>
          <p>{{ subHeading }}</p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="row">
            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div class="pricing">
                <div class="body">
                  <div class="price">
                    <span class="d-block plan">{{ packages[0].name }}</span>
                    <span class="price" :style="[{ color: themeColor }]"
                      ><sup>$</sup><span>{{ packages[0].price }}</span></span
                    >
                  </div>
                  <ul class="list-unstyled ul-check primary mb-5">
                    <li>There live the blind texts</li>
                    <li>Far far away behind the word</li>
                    <li>Far from the countries Vokalia and Consonantia</li>
                  </ul>
                  <p class="text-center mb-0">
                    <a
                      href="#"
                      class="btn btn-outline-primary"
                      :style="[
                        { color: themeColor },
                        { borderColor: themeColor },
                      ]"
                      >{{ startButtonName }}</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div class="pricing active">
                <div class="body">
                  <div class="price">
                    <span class="d-block plan">{{ packages[1].name }}</span>
                    <span class="price" :style="[{ color: themeColor }]"
                      ><sup>$</sup><span>{{ packages[1].price }}</span></span
                    >
                  </div>
                  <ul class="list-unstyled ul-check primary mb-5">
                    <li>There live the blind texts</li>
                    <li>Far far away behind the word</li>
                    <li>Far from the countries Vokalia and Consonantia</li>
                  </ul>
                  <p class="text-center mb-0">
                    <a
                      href="#"
                      class="btn btn-primary"
                      :style="[
                        { backgroundColor: themeColor },
                        { borderColor: themeColor },
                      ]"
                      >{{ startButtonName }}</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div class="pricing">
                <div class="body">
                  <div class="price">
                    <span class="d-block plan">{{ packages[2].name }}</span>
                    <span class="price" :style="[{ color: themeColor }]"
                      ><sup>$</sup><span>{{ packages[2].price }}</span></span
                    >
                  </div>
                  <ul class="list-unstyled ul-check primary mb-5">
                    <li>There live the blind texts</li>
                    <li>Far far away behind the word</li>
                    <li>Far from the countries Vokalia and Consonantia</li>
                  </ul>
                  <p class="text-center mb-0">
                    <a
                      href="#"
                      class="btn btn-outline-primary"
                      :style="[
                        { color: themeColor },
                        { borderColor: themeColor },
                      ]"
                      >{{ startButtonName }}</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
    <div class="not-found">
      <div class="not-found-content">
        <img :src="error" alt="Página no encontrada" class="not-found-image" />
        <h1 class="oops-text">Ooops...</h1>
        <p class="page-not-found">Página no encontrada</p>
        <p class="description">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
          <br />
          Por favor, verifica la URL o regresa a la página de inicio.
        </p>
        <router-link to="/" class="home-link">Regresar a inicio</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import error from "../assets/images/404.png";
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    background-color: #f8f9fa;
    text-align: center;
  }
  
  .not-found-content {
    max-width: 600px;
    padding: 20px;
    border-radius: 10px;
    
  }
  
  .not-found-image {
    width: 200px;
    margin-bottom: 20px;
  }
  
  .oops-text {
    font-size: 3rem;
    font-weight: bold;
    color: #000; 
    margin: 10px 0;
  }
  
  .page-not-found {
    font-size: 2rem;
    font-weight: bold;
    color: #000; 
    margin: 10px 0;
  }
  
  .description {
    font-size: 1.2rem;
    color: #6c757d; 
    margin: 20px 0;
  }
  
  .home-link {
    display: inline-block;
    width: 100%; 
    max-width: 300px; 
    margin-top: 20px;
    padding: 15px 20px;
    background-color: #5bae9e; 
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .home-link:hover {
    background-color: #4a8c7e; 
  }
  </style>
<template>
    <div class="cards-container" data-aos="fade-up">
      <div 
        v-for="(card, index) in cards" 
        :key="index" 
        class="card"
      >
        <div class="icon">
          <img :src="card.icon" alt="icon" class="icon-img" />
        </div>
        <div class="content">
          <h4>{{ card.title }}</h4>
          <p>{{ card.value }}</p>
          <span>{{ card.info }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: [
          { title: 'Capacidad', value: '90%', info: 'Ahora', icon: '../src/assets/images/percent.png' },
          { title: 'Espacios en uso', value: '40 de 60', info: 'Ahora', icon: '../src/assets/images/uso.png' },
          { title: 'Mantenimiento', value: '17 de 60', info: 'Ultimo dia', icon: '../src/assets/images/mto.png' },
          { title: 'Fuera de servicio', value: '3 de 60', info: 'Ahora', icon: '../src/assets/images/off.png' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .cards-container {
    display: flex;
    gap: 20px;
    padding: 20px;
    width: 100%;
    margin-top: 50px;
  }
  
  .card {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
    flex-grow: 1;
    min-width: 200px;
  }
  
  .card:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    margin-right: 10px;
  }
  
  .icon-img {
    width: 30px;
    height: 30px;
  }
  
  .content h4 {
    margin: 0;
    font-size: 16px;
    color: #666;
  }
  
  .content p {
    margin: 5px 0;
    font-size: 20px;
    font-weight: bold;
  }
  
  .content span {
    font-size: 12px;
    color: #888;
  }
  </style>
  
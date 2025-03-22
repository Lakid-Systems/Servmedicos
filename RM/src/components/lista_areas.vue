<template>
    <div class="container">
      <div class="main-card" data-aos="fade-up">
        <div class="cards-container">
          <div class="card" data-aos="fade-up" data-aos-delay="100">
            <div class="card-header">Áreas más utilizadas</div>
            <div class="card-body">
              <h5 class="card-title">Últimas áreas con mayor uso</h5>
              <ul class="areas-list">
                <li v-for="(area, index) in areas" :key="index" class="area-item">
                  <span class="area-name">{{ area.name }}</span>
                  <span class="area-value">{{ area.value }} consultas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Datos de las áreas más utilizadas
  const areas = [
    { name: 'Pediatría', value: 120 },
    { name: 'Medicina General', value: 95 },
    { name: 'Ginecología', value: 80 },
    { name: 'Cardiología', value: 75 },
    { name: 'Dermatología', value: 60 },
  ];
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    width: 100%;
  }
  
  .main-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    padding: 20px;
    width: 100%;
    max-width: 1200px;
  }
  
  .cards-container {
    display: flex;
    gap: 20px;
    width: 100%;
  }
  
  .card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    flex: 1;
    padding: 15px;
    text-align: center;
  }
  
  .card-header {
    font-size: 0.9em;
    color: #999;
    margin-bottom: 10px;
  }
  
  .card-title {
    font-size: 1.2em;
    color: #333;
    margin-bottom: 15px;
  }
  
  .areas-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .area-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  
  .area-item:last-child {
    border-bottom: none;
  }
  
  .area-name {
    font-size: 1em;
    color: #333;
  }
  
  .area-value {
    font-size: 0.9em;
    color: #666;
  }
  </style>
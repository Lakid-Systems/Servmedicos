<template>
    <div class="container">
      <div class="main-card" data-aos="fade-up">
        <div class="cards-container">
          <div class="card" data-aos="fade-up" data-aos-delay="100">
            <div class="card-header">Uso de espacios médicos</div>
            <div class="card-body">
              <h5 class="card-title">Espacios más utilizados</h5>
              <div class="chart-container">
                <canvas ref="myChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  const myChart = ref(null);
  
  onMounted(() => {
    const ctx = myChart.value.getContext('2d');
    new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['Quirófanos', 'Consultorios', 'Urgencias', 'Laboratorios', 'Rayos X'],
        datasets: [{
          label: 'Uso de Espacios Médicos',
          data: [45, 30, 20, 15, 10], // Datos de ejemplo
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Evita que la gráfica mantenga una relación de aspecto fija
      }
    });
  });
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
  
  .chart-container {
    position: relative; /* Asegura que el canvas se ajuste correctamente */
    height: 300px; /* Altura fija para el contenedor de la gráfica */
  }
  
  canvas {
    max-width: 100%;
    height: 100% !important; /* Asegura que el canvas ocupe toda la altura del contenedor */
  }
  </style>
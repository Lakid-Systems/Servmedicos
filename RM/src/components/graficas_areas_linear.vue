<template>
    <div class="container">
      <div class="main-card" data-aos="fade-up">
        <div class="cards-container">
          <div class="card" data-aos="fade-up" data-aos-delay="100">
            <div class="card-header">Uso de áreas médicas</div>
            <div class="card-body">
              <h5 class="card-title">Áreas más utilizadas</h5>
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
      type: 'line', // Tipo de gráfica: líneas
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'], // Meses del año
        datasets: [
          {
            label: 'Pediatría',
            data: [30, 40, 35, 50, 45, 55], // Datos de ejemplo para Pediatría
            borderColor: 'rgba(255, 99, 132, 1)', // Color de la línea
            borderWidth: 2,
            fill: false, // No rellenar el área bajo la línea
          },
          {
            label: 'Medicina General',
            data: [50, 55, 60, 65, 70, 75], // Datos de ejemplo para Medicina General
            borderColor: 'rgba(54, 162, 235, 1)', // Color de la línea
            borderWidth: 2,
            fill: false, // No rellenar el área bajo la línea
          },
          {
            label: 'Ginecología',
            data: [20, 25, 30, 35, 40, 45], // Datos de ejemplo para Ginecología
            borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
            borderWidth: 2,
            fill: false, // No rellenar el área bajo la línea
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Evita que la gráfica mantenga una relación de aspecto fija
        scales: {
          y: {
            beginAtZero: true, // Comenzar el eje Y desde 0
            title: {
              display: true,
              text: 'Número de consultas', // Título del eje Y
            },
          },
          x: {
            title: {
              display: true,
              text: 'Meses', // Título del eje X
            },
          },
        },
        plugins: {
          legend: {
            position: 'top', // Posición de la leyenda
          },
        },
      },
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
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const myChart = ref(null);
let chartInstance = null;
let interval = null;
let lastData = null;


const obtenerDatos = async () => {
  try {
    const response = await fetch('https://space-api-7odx.onrender.com/');  
    if (!response.ok) throw new Error('Error al obtener los datos de la API');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Función para contar la frecuencia de cada área
const contarFrecuenciaAreas = (data) => {
  const frecuencia = {};

  
  data.forEach(item => {
    if (frecuencia[item.area]) {
      frecuencia[item.area]++;
    } else {
      frecuencia[item.area] = 1;
    }
  });

  
  const areasOrdenadas = Object.entries(frecuencia)
    .sort((a, b) => b[1] - a[1])  
    .slice(0, 5);  

  return areasOrdenadas;
};


const actualizarGrafico = (areasFrecuentes) => {
  const areas = areasFrecuentes.map(item => item[0]);
  const usos = areasFrecuentes.map(item => item[1]);

  const ctx = myChart.value.getContext('2d');

  if (!chartInstance) {
  
    chartInstance = new Chart(ctx, {
      type: 'line', 
      data: {
        labels: areas,
        datasets: [{
          label: 'Uso de Áreas Médicas',
          data: usos,
          borderColor: 'rgba(91, 174, 158, 1)',  
          borderWidth: 2,
          fill: false, 
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de usos', 
            },
          },
          x: {
            title: {
              display: true,
              text: 'Áreas', 
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }
    });
  } else {
 
    chartInstance.data.labels = areas;
    chartInstance.data.datasets[0].data = usos;

    chartInstance.update();  
  }
};


const cargarDatos = async () => {
  const data = await obtenerDatos(); 
  if (data.length === 0) {
    console.log('No hay datos en la base de datos');
    actualizarGrafico([]); 
    return;
  }

  const areasFrecuentes = contarFrecuenciaAreas(data);


  if (!lastData || JSON.stringify(lastData) !== JSON.stringify(areasFrecuentes)) {
    actualizarGrafico(areasFrecuentes); 
    lastData = areasFrecuentes; 
  }
};

// Función para iniciar la actualización periódica
const iniciarActualizacionPeriodica = () => {
  interval = setInterval(async () => {
    await cargarDatos(); 
  }, 3000);  
};


onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval);
  }
});


onMounted(async () => {
  await cargarDatos();
  iniciarActualizacionPeriodica();
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
  position: relative;
  height: 300px; 
}

canvas {
  max-width: 100%;
  height: 100% !important; 
}
</style>

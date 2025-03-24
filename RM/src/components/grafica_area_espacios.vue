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


const contarFrecuenciaEspacios = (data) => {
  const frecuencia = {};

  
  data.forEach(item => {
    if (frecuencia[item.espacio]) {
      frecuencia[item.espacio]++;
    } else {
      frecuencia[item.espacio] = 1;
    }
  });

  
  const espaciosOrdenados = Object.entries(frecuencia)
    .sort((a, b) => b[1] - a[1])  
    .slice(0, 5); 

  return espaciosOrdenados;
};


const actualizarGrafico = (espaciosFrecuentes) => {
  const espacios = espaciosFrecuentes.map(item => item[0]);
  const usos = espaciosFrecuentes.map(item => item[1]);

  const ctx = myChart.value.getContext('2d');

  if (!chartInstance) {
    chartInstance = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: espacios,
        datasets: [{
          label: 'Uso de Espacios Médicos',
          data: usos,
          backgroundColor: [
            'rgba(91, 174, 158, 0.6)',  
            'rgba(0, 151, 167, 0.6)',   
            'rgba(34, 193, 195, 0.6)',  
            'rgba(48, 143, 118, 0.6)',  
            'rgba(0, 204, 204, 0.6)'   
          ],
          borderColor: [
            'rgba(91, 174, 158, 1)',   
            'rgba(0, 151, 167, 1)',    
            'rgba(34, 193, 195, 1)',   
            'rgba(48, 143, 118, 1)',   
            'rgba(0, 204, 204, 1)'     
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  } else {
    
    chartInstance.data.labels = espacios;
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

  const espaciosFrecuentes = contarFrecuenciaEspacios(data);

  
  if (!lastData || JSON.stringify(lastData) !== JSON.stringify(espaciosFrecuentes)) {
    actualizarGrafico(espaciosFrecuentes); 
    lastData = espaciosFrecuentes; 
  }
};


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

<template>
  <div class="cards-container" data-aos="fade-up">
    <div 
      v-for="(card, index) in cards" 
      :key="index" 
      class="card"
    >
      <div class="icon">
        <canvas v-if="index === 0" ref="capacityChart" class="chart"></canvas>
        <img v-else :src="card.icon" alt="icon" class="icon-img" />
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
import axios from 'axios';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

export default {
  data() {
    return {
      cards: [
        { title: 'Capacidad', value: '0%', info: 'Ahora', icon: '../src/assets/images/percent.png' },
        { title: 'Espacios en uso', value: '0 operativos de 0', info: 'Ahora', icon: '../src/assets/images/uso.png' },
        { title: 'Mantenimiento', value: '0 de 0', info: 'Ultimo dia', icon: '../src/assets/images/mto.png' },
        { title: 'Fuera de servicio', value: '0 de 0', info: 'Ahora', icon: '../src/assets/images/off.png' }
      ],
      intervalId: null, 
      previousData: null, 
      capacityChart: null 
    };
  },
  async created() {
   
    await this.fetchData();

   
    this.intervalId = setInterval(this.fetchData, 3000);
  },
  beforeDestroy() {
   
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
   
    if (this.capacityChart) {
      this.capacityChart.destroy();
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://space-api-7odx.onrender.com/');
        const newData = response.data;

       
        if (JSON.stringify(newData) !== JSON.stringify(this.previousData)) {
          const totalEspacios = newData.length;

          // Calcular espacios ocupados (Operativos + En mantenimiento + Cerrados)
          const espaciosOcupados = newData.filter(espacio => 
            espacio.estado === "Operativo" || 
            espacio.estado === "En mantenimiento" || 
            espacio.estado === "Cerrado"
          ).length;

          // Calcular el porcentaje de capacidad ocupada
          const capacidadPorcentaje = ((espaciosOcupados / totalEspacios) * 100).toFixed(0) + '%';

          // Calcular espacios en uso (Operativos + Disponibles)
          const espaciosOperativos = newData.filter(espacio => 
            espacio.estado === "Operativo"
          ).length;

          const espaciosDisponibles = newData.filter(espacio => 
            espacio.estado === "Disponible"
          ).length;

          const totalEspaciosEnUso = espaciosOperativos + espaciosDisponibles;

          // Calcular espacios en mantenimiento
          const espaciosMantenimiento = newData.filter(espacio => 
            espacio.estado === "En mantenimiento"
          ).length;

          // Calcular espacios fuera de servicio
          const espaciosFueraServicio = newData.filter(espacio => 
            espacio.estado === "Cerrado"
          ).length;

          // Actualizar las cards con los datos obtenidos
          this.cards[0].value = capacidadPorcentaje; // Capacidad ocupada
          this.cards[1].value = `${espaciosOperativos} operativos de ${totalEspaciosEnUso}`; // Espacios en uso
          this.cards[2].value = `${espaciosMantenimiento} de ${totalEspacios}`; // Mantenimiento
          this.cards[3].value = `${espaciosFueraServicio} de ${totalEspacios}`; // Fuera de servicio

         
          this.$nextTick(() => {
            this.updateCapacityChart(espaciosOcupados, totalEspacios);
          });

        
          this.previousData = newData;
        }
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    },
    updateCapacityChart(espaciosOcupados, totalEspacios) {
     
      const canvas = this.$refs.capacityChart?.[0]; 
      if (!canvas || !canvas.getContext) {
        console.error('El elemento canvas no está disponible o no es válido.');
        return;
      }

      const ctx = canvas.getContext('2d');

   
      if (this.capacityChart) {
        this.capacityChart.destroy();
      }

      
      const colorBase = '#5bae9e';
      const colorClaro = '#8fc9bd'; 

   
      this.capacityChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [espaciosOcupados, totalEspacios - espaciosOcupados],
            backgroundColor: [colorBase, colorClaro], 
            hoverBackgroundColor: [colorBase, colorClaro] 
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false, 
            },
            tooltip: {
              enabled: false, 
            }
          }
        }
      });
    }
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

.chart {
  width: 100px !important;
  height: 100px !important;
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
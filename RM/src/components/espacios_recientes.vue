<template>
  <div class="container">
    <div class="main-card" data-aos="fade-up">
      <div class="cards-container">
        <div class="card" data-aos="fade-up" data-aos-delay="100">
          <div class="card-header">Últimos espacios ocupados</div>
          <div class="card-body">
            <h5 class="card-title">Espacios recientemente utilizados</h5>
            <ul class="spaces-list">
              <li v-for="(space, index) in spaces" :key="index" class="space-item">
                <span class="space-name">{{ space.name }}</span>
                <span class="space-time">{{ space.time }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


const spaces = ref([]);


const fetchData = async () => {
  try { 
    // Obtener todos los datos de la API
    const response = await fetch('https://space-api-7odx.onrender.com/');
    const data = await response.json();

   
    const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

   
    const last5Spaces = sortedData.slice(0, 5).map(item => ({
      name: item.espacio,
      time: new Date(item.createdAt).toLocaleString(), // Convertir la fecha a un formato legible
    }));

    
    spaces.value = last5Spaces;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};


onMounted(() => {
  fetchData();
  setInterval(fetchData, 3000); 
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

.spaces-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.space-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.space-item:last-child {
  border-bottom: none;
}

.space-name {
  font-size: 1em;
  color: #333;
}

.space-time {
  font-size: 0.9em;
  color: #666;
}
</style>

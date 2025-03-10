<script setup>
const resources = [
  { title: 'Medicamentos', description: 'Disponibilidad de fármacos esenciales y suministros médicos.' },
  { title: 'Equipos Médicos', description: 'Instrumental quirúrgico, monitores, ventiladores y más.' },
  { title: 'Suministros Hospitalarios', description: 'Guantes, jeringas, gasas y demás insumos.' }
];
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">Recursos Materiales del Hospital</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="(resource, index) in resources" :key="index" class="p-4 border rounded shadow">
        <h2 class="text-xl font-semibold">{{ resource.title }}</h2>
        <p class="text-gray-600">{{ resource.description }}</p>
      </div>
    </div>
  </div>
</template>

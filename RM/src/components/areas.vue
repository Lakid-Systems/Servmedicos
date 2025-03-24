<script setup> 
import Tabla_espacios from '../components/tabla_areas.vue';
import Header2 from '../components/Header2.vue';
import Lista_areas from '../components/lista_areas.vue';
import Tabla_areas from '../components/tabla_areas.vue';
</script>

<template> 
   <div style=" margin-bottom: 60px;  ">
      <Header2> </Header2>
   </div>
    <Tabla_areas> </Tabla_areas>
    <div style="display: flex; align-items: center; width: 100%;">
    <div style="width: 90%;">
        <lista_areas />
    </div>
    <div style="width: 30%;">

    </div>
</div>


</template>
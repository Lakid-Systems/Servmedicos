<script setup> 
import estatus_dash from '../components/estatus_dash.vue';
import Header2 from '../components/Header2.vue';
import grafica_area from '../components/grafica_area_espacios.vue';
import graficas_areas_linear from '../components/graficas_areas_linear.vue';
import lista_areas from '../components/lista_areas.vue';
import Footer from '../components/Footer.vue';
import espacios from '../components/espacios.vue';
 
</script>

<template>  
<Header2 /> 
<div style="display: flex; align-items: center;  ;  ">
    <estatus_dash />  
</div>
<div style="display: flex; align-items: center;  ;  ">
    <grafica_area /> 
    <graficas_areas_linear /> 
</div>

<div style="display: flex; align-items: center; width: 100%;">
    <div style="width: 70%;">
        <lista_areas />
    </div>
    <div style="width: 30%;">
        <espacios />
    </div>
</div>


<Footer /> 



</template>

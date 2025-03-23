<template>
  <div class="panel-superior">
    <div class="nombre-sistema">
      <span>{{ nombreSistema }}</span>
    </div>
    <div class="usuario">
      <span class="nombre-usuario">Usuario Nombre</span>
      <div class="icono-perfil">
        <img src="src/assets/images/user.png" alt="Icono de perfil" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PanelSuperior",
  computed: {
    // Computed property para obtener el nombre del sistema según la ruta
    nombreSistema() {
      const routeName = this.$route.name; // Obtiene el nombre de la ruta actual
      switch (routeName) {
        case "dashboard":
          return "Dashboard";
        case "estatus":
          return "Dashboard";
        case "insumos":
          return "Insumos";
        case "areas":
          return "Áreas";
        case "espacios_vista":
          return "Espacios";
        default:
          return "Sistema de Monitoreo";
      }
    },
  },
};
</script>

<style scoped>
.panel-superior {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #8fcabe; /* Color principal */
  color: white;
  
}

.nombre-sistema span {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff; /* Blanco para el texto del nombre del sistema */
}

.usuario {
  display: flex;
  align-items: center;
}

.nombre-usuario {
  margin-right: 10px;
  font-size: 16px;
  color: #ffffff; /* Blanco para el texto del nombre de usuario */
}

.icono-perfil img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #ffffff; /* Borde blanco alrededor del icono */
}

.icono-perfil img:hover {
  border-color: #4a9a82; /* Cambio de color del borde al pasar el cursor */
}
</style>

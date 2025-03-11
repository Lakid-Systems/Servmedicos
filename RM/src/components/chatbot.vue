<template>
    <div>
      <!-- Aquí puedes colocar el contenido de tu página -->
    </div>
  </template>
  
  <script>
  // Objeto global para manejar el script de Chatbase
  const chatbaseScript = {
    loadScript() {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...params) => { // Cambié 'arguments' por 'params'
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(params); // Usa 'params' en lugar de 'arguments'
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") {
              return target.q;
            }
            return (...args) => target(prop, ...args);
          }
        });
      }
  
      const onLoad = function() {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "6eBp02XuAD4tp7rSkP9_0";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
      };
  
      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    },
    init() {
      this.loadScript();
    }
  };
  
  export default {
    mounted() {
      // Inicializamos el objeto chatbaseScript cuando el componente se monta
      chatbaseScript.init();
    }
  };
  </script>
  
  <style scoped>
  /* Estilo para mantener el script en la parte inferior izquierda */
  body {
    position: relative;
  }
  
  .chatbase-container {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1000;
  }
  </style>
  
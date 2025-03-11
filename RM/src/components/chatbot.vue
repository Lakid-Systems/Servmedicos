<template>

  </template>
  
  <script>
 
  const chatbaseScript = {
    loadScript() {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...params) => { 
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(params); 
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
      chatbaseScript.init();
    }
  };
  </script>
  
  <style scoped>
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
  
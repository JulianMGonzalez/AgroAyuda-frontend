<template>
  <div>
    <register-usuario></register-usuario>
    <footer-component></footer-component>
  </div>
</template>

<script>
import RegisterUsuario from "../components/public/RegisterUsuario.vue";
import FooterComponent from "../components/shared/FooterComponent.vue";
export default {
  components: {
    RegisterUsuario,
    FooterComponent,
  },
};
</script>
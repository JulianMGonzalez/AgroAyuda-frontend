<template>
  <div>
    <menu-component></menu-component>
    <register-usuario></register-usuario>
    <footer-component></footer-component>
  </div>
</template>

<script>
import RegisterUsuario from "../components/public/RegisterUsuario.vue";
import FooterComponent from "../components/shared/FooterComponent.vue";
import MenuComponent from "../components/shared/MenuComponent.vue";
export default {
  components: {
    RegisterUsuario,
    MenuComponent,
    FooterComponent,
  },
};
</script>
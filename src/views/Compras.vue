<template>
  <div>
      
    <navigation-drawer></navigation-drawer>
    <compras-component></compras-component>
    <footer-component></footer-component>
    
  </div>
</template>
<script>
import ComprasComponent from "../components/auth/ComprasComponent.vue";
import FooterComponent from '../components/shared/FooterComponent.vue';
import NavigationDrawer from "../components/shared/NavigationDrawer.vue";
export default {
  components: { ComprasComponent, NavigationDrawer, FooterComponent },
};
</script>
<template>
  <div>
    <navigation-drawer></navigation-drawer>
    <validacion-component></validacion-component>
    <footer-component></footer-component>
  </div>
</template>

<script>
import FooterComponent from "@/components/shared/FooterComponent.vue";
import NavigationDrawer from "@/components/shared/NavigationDrawer.vue";
import ValidacionComponent from '../../components/shared/ValidacionComponent.vue';

export default {
  components: {
    FooterComponent,
    NavigationDrawer,
    ValidacionComponent,
  },
};
</script>
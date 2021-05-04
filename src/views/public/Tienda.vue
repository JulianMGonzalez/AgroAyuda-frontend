<template>
  <div>
    <navigation-drawer></navigation-drawer>
    <tienda-component></tienda-component>
  </div>
</template>

<script>
import TiendaComponent from "@/components/public/TiendaComponent";
import NavigationDrawer from "@/components/shared/NavigationDrawer.vue";

export default {
  components: {
    TiendaComponent,
    NavigationDrawer,
  },
};
</script>

<template>
  <div>
    <navigation-drawer></navigation-drawer>
    <compras-component></compras-component>
  </div>
</template>
<script>
import ComprasComponent from "@/components/public/ComprasComponent";
import NavigationDrawer from "@/components/shared/NavigationDrawer.vue";
export default {
  components: { ComprasComponent, NavigationDrawer },
};
</script>
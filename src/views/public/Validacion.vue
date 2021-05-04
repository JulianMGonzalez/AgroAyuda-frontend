<template>
  <div>
    <navigation-drawer></navigation-drawer>
    <validacion-component></validacion-component>
  </div>
</template>

<script>
import NavigationDrawer from "@/components/shared/NavigationDrawer.vue";
import ValidacionComponent from '../../components/shared/ValidacionComponent.vue';

export default {
  components: {
    NavigationDrawer,
    ValidacionComponent,
  },
};
</script>
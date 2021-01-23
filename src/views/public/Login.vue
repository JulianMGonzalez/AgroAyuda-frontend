<template>
  <div>
    <navigation-drawer></navigation-drawer>
    <the-login></the-login>
    <footer-component></footer-component>
  </div>
</template>

<script>
import TheLogin from "@/components/public/TheLogin.vue";
import FooterComponent from "@/components/shared/FooterComponent.vue";
import NavigationDrawer from "@/components/shared/NavigationDrawer.vue";
export default {
  components: {
    TheLogin,
    FooterComponent,
    NavigationDrawer
  },
};
</script>
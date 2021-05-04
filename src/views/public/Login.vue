<template>
  <div>
    <navigation-drawer></navigation-drawer>
    <the-login></the-login>
  </div>
</template>

<script>
import TheLogin from "@/components/public/TheLogin.vue";
import NavigationDrawer from "@/components/shared/NavigationDrawer.vue";
export default {
  components: {
    TheLogin,
    NavigationDrawer
  },
};
</script>
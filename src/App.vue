<template>
  <v-app id="app" style="min-height: 100vh">
    <menu-component></menu-component>
    <transition name="slide-fade" mode="out-in">
      
      <router-view />
    </transition>
  </v-app>
</template>

<script>
import HelloWorld from "./components/public/HelloWorld";
import MenuComponent from './components/shared/MenuComponent.vue';

export default {
  name: "App",

  components: {
    HelloWorld,
    MenuComponent
  },

  data: () => ({}),
};
</script>

<style scoped>
.slide-fade-enter-active{
  transition: all .3s ease;
}
.slide-fade-leave-active{
  transition: all .3s cubic-bezier(.17,.67,.83,.67);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateY(800px);
  opacity: 0;
}
</style>


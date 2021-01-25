<template>
  <v-app id="app" style="min-height: 100vh">
    <menu-component></menu-component>
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
    <v-snackbar
      v-model="$store.state.snackbar.show"
      :multi-line="true"
      :right="true"
      :top="true"
      :timeout="6000"
      :color="$store.state.snackbar.variant"
    >
      {{ $store.state.snackbar.message }}
      <v-btn
        dark
        text
        @click="$store.commit('actualizarTienda', { show: false })"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
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
  created(){
    this.$store.dispatch("autoLogin");
  },
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(800px);
  opacity: 0;
}
</style>


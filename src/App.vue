<template>
<v-app id="app">
  
        <router-view/>
      
  </v-app>
</template>

<script>
import HelloWorld from './components/public/HelloWorld'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
  
  }),
};
</script>
<style>
.main {
  background: url("/fondo.png");
}
</style>

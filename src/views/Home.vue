<template>
  <div>
    <navigation-drawer></navigation-drawer>
    <HelloWorld />
    <footer-component></footer-component>
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/public/HelloWorld.vue'
import FooterComponent from '../components/shared/FooterComponent.vue'
import NavigationDrawer from '../components/shared/NavigationDrawer.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    FooterComponent,
    NavigationDrawer
  }
}
</script>

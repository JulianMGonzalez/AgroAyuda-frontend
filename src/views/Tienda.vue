<template>
<div>
    <navigation-drawer></navigation-drawer>
  <tienda-component></tienda-component>
  <footer-component></footer-component>

</div>
</template>

<script>
import TiendaComponent from '../components/public/TiendaComponent'
import FooterComponent from '../components/shared/FooterComponent.vue'
import NavigationDrawer from '../components/shared/NavigationDrawer.vue'

export default {
  components:{
    TiendaComponent,
    FooterComponent,
    NavigationDrawer
  }

  
}
</script>

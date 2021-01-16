<template>
<div>
  <menu-component></menu-component>
    <navigation-drawer></navigation-drawer>
  <tienda-component></tienda-component>
  <footer-component></footer-component>

</div>
</template>

<script>
import TiendaComponent from '../components/public/TiendaComponent'
import FooterComponent from '../components/shared/FooterComponent.vue'
import MenuComponent from '../components/shared/MenuComponent.vue'
import NavigationDrawer from '../components/shared/NavigationDrawer.vue'

export default {
  components:{
    TiendaComponent,
    FooterComponent,
    MenuComponent,
    NavigationDrawer
  }

  
}
</script>

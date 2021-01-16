<template>
<div>
    <menu-component></menu-component>
    <navigation-drawer></navigation-drawer>
    <data-servicio></data-servicio>
    <footer-component></footer-component>
</div>
</template>

<script>
import DataServicio from '../components/public/DataServicio.vue'
import FooterComponent from '../components/shared/FooterComponent.vue'
import MenuComponent from '../components/shared/MenuComponent.vue'
import NavigationDrawer from '../components/shared/NavigationDrawer.vue'

export default {
    components:{
        DataServicio,
        MenuComponent,
        FooterComponent,
        NavigationDrawer
    }
    
}
</script>,
        NavigationDrawer
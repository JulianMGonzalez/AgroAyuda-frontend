<template>
<div>
    <menu-component></menu-component>
    <navigation-drawer></navigation-drawer>
    <blog-component></blog-component>
    <footer-component></footer-component>
</div>
</template>

<script>
// @ is an alias to /src
import BlogComponent from '../components/public/BlogComponent.vue'
import FooterComponent from '../components/shared/FooterComponent.vue'
import MenuComponent from '../components/shared/MenuComponent.vue'
import NavigationDrawer from '../components/shared/NavigationDrawer.vue'

export default {
  components: {
    BlogComponent,
    FooterComponent,
    MenuComponent,
    NavigationDrawer
  }
}
</script>
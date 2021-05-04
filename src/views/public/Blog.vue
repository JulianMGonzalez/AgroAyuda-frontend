<template>
<div>
    <navigation-drawer></navigation-drawer>
    <blog-component></blog-component>
</div>
</template>

<script>
// @ is an alias to /src
import BlogComponent from '@/components/public/BlogComponent.vue'
import NavigationDrawer from '@/components/shared/NavigationDrawer.vue'

export default {
  components: {
    BlogComponent,
    NavigationDrawer
  },
  created(){
    NavigationDrawer
  }
}
</script>
<template>
  <div>
    <navigation-drawer></navigation-drawer>
    <HelloWorld />
  </div>
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/public/HelloWorld.vue'
import NavigationDrawer from '@/components/shared/NavigationDrawer.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    NavigationDrawer
  }
}
</script>

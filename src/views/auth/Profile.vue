<template>
<div>
    <navigation-drawer></navigation-drawer>
    <profile-component></profile-component>
    <footer-component></footer-component>
</div>
</template>
<script>
import ProfileComponent from '../../components/auth/ProfileComponent.vue'
import FooterComponent from '../../components/shared/FooterComponent.vue'
import NavigationDrawer from '../../components/shared/NavigationDrawer.vue'
export default {
    components:{
        ProfileComponent,
        NavigationDrawer,
        FooterComponent
    }
}
</script>
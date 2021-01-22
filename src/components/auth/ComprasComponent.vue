<template>
  <v-main>
    <v-card v-if="!this.$store.state.usuario">
      <p>Aun no has iniciado sesion?</p>
      <v-btn to="/login">
        <v-icon>mdi-github</v-icon>
        Iniciar Sesion</v-btn
      >
    </v-card>
  </v-main>
</template>
<script>
export default {};
</script>
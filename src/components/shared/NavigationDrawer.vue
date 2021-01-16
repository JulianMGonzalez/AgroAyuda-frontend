<template>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      color="green darken-4"
      v-if="this.$store.state.usuario"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title class="white--text">
          <br />
          Hola, {{ user.nombre }}!<br />
          <p>{{ user.rol }}</p>
        </v-list-item-title>

        <v-btn icon @click.stop="mini = !mini" color="orange">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="orange">mdi-home-city</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Inicio</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="orange" @click="salir()">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text" @click="salir()"
            >Salir</v-list-item-title
          >
        </v-list-item>
        <v-list-item
          v-if="
            this.$store.state.usuario.rol === 'Administrador' ||
            this.$store.state.usuario.rol === 'Vendedor'
          "
        >
          <v-list-item-icon>
            <v-icon color="orange" @click="admin()">mdi-alert-minus</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text" @click="admin()"
            >Gestion</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    data: () => ({
        drawer: true,
        mini: true,
    }),
    methods:{
        admin() {
      try {
        if (
          this.$store.state.usuario.rol === "Administrador" ||
          this.$store.state.usuario.rol === "Vendedor"
        ) {
          this.$router.push({ name: "Admin" });
        } else {
          swal("Error!", "Error", "error");
        }
      } catch (error) {
        console.log(error);
      }
    },
    salir() {
        this.$store.dispatch('salir');
        this.$router.push({ name: "Login" });
    },
    getUserDetails() {
      let user = localStorage.getItem("user");
      if (user) {
        this.user = JSON.parse(user);
      }
    },
    },
    created() {
    this.getUserDetails();
  },
}
</script>
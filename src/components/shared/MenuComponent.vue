<template>
  <v-card>
    <v-navigation-drawer temporary v-model="sideNav" app right>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          color="primary"
        >
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/login"
          v-if="!this.$store.state.usuario"
          color="primary"
        >
        <v-list-item-content>Cuenta</v-list-item-content>
        </v-list-item>

        <v-list-item @click="salir()" v-else color="primary">
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>Salir</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="white" dense dark hide-on-scroll>
      <v-container class="d-flex justify-center">
        <v-btn to="/" icon class="ml-4">
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="50"
            max-width="50"
            src="@/assets/logo footer.png"
          >
          </v-img>
        </v-btn>
        <a href="/" class="ma-auto">
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="100"
            max-width="100"
            class="ml-3 hidden-xs-only"
            src="@/assets/agroayuda.png"
          ></v-img>
        </a>

        <v-spacer></v-spacer>
        <v-app-bar-nav-icon
          @click.stop="sideNav = !sideNav"
          class="hidden-lg-and-up"
          ><v-icon color="primary" large
            >mdi-microsoft-xbox-controller-menu</v-icon
          ></v-app-bar-nav-icon
        >
        <v-divider vertical></v-divider>
        <v-btn
          small
          rounded
          color="primary"
          text
          class="hidden-md-and-down ma-auto"
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.link"
        >
          {{ item.title }}
        </v-btn>
        <v-btn small icon to="/compras" class="ma-auto">
          <v-badge content="1" value="1" color="green" overlap>
            <v-icon color="primary" small> mdi-cart-outline </v-icon>
          </v-badge>
        </v-btn>
        <v-btn
          small
          rounded
          v-if="!this.$store.state.usuario"
          depressed
          color="primary"
          class="hidden-md-and-down ma-auto"
          text
          to="/login"
          >Cuenta
        </v-btn>
        <v-btn
          small
          rounded
          v-else
          color="primary"
          text
          class="hidden-md-and-down ma-auto"
          @click="salir()"
        >
          Salir</v-btn
        >
      </v-container>
    </v-app-bar>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    sideNav: false,
    menuItems: [
      { title: "Blog", link: "/blog" },
      { title: "Servicios", link: "/servicio" },
      { title: "Tienda", link: "/tienda" },
    ],
  }),
  methods: {
    salir() {
      this.$store.dispatch("salir");
      this.$router.push({ name: "Login" });
    },
    inicio() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
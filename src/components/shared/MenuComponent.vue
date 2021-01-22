<template>
  <v-card>
    <v-navigation-drawer temporary v-model="sideNav" app right>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          color="#1b5e20"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
        <v-list-item to="/registrar" v-if="!this.$store.state.usuario" color="#1b5e20">
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>registrate</v-list-item-content>
        </v-list-item>

        <v-list-item to="/login" v-if="!this.$store.state.usuario" color="#1b5e20">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>iniciar sesion</v-list-item-content>
        </v-list-item>

        <v-list-item @click="salir()" v-else color="#1b5e20">
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>salir</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="white" dense dark prominent hide-on-scroll>
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="98"
        max-width="98"
        src="@/assets/LOGO (2).png"
      ></v-img>
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="150"
        max-width="150"
        class="mt-8 hidden-xs-only"
        src="@/assets/agroayuda.png"
      ></v-img>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"
        ><v-icon color="green" class="mt-10" large
          >mdi-microsoft-xbox-controller-menu</v-icon
        ></v-app-bar-nav-icon
      >

      <v-btn
        color="#1b5e20"
        text
        class="hidden-xs-only mt-6"
        v-for="(item, i) in menuItems"
        :key="i"
        :to="item.link"
      >
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <v-btn
        v-if="!this.$store.state.usuario"
        depressed
        color="#1b5e20"
        class="hidden-xs-only mt-6"
        text
        to="/login"
        ><v-icon>mdi-login</v-icon>Inicia Sesion
      </v-btn>
      <v-btn
        v-else
        color="#1b5e20"
        text
        class="hidden-xs-only mt-6"
        @click="salir()"
        ><v-icon>mdi-logout-variant</v-icon> Salir</v-btn
      >
      <v-btn
        v-if="!this.$store.state.usuario"
        color="#1b5e20"
        text
        class="hidden-xs-only mt-6"
        to="/registrar"
        ><v-icon>mdi-account-plus</v-icon>
        Registrate
      </v-btn>
    </v-app-bar>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    sideNav: false,
    menuItems: [
      { icon: "mdi-home", title: "inicio", link: "/" },
      { icon: "mdi-forum", title: "Blog", link: "/blog" },
      { icon: "mdi-clipboard-text-outline", title: "servicio", link: "/servicio" },
      { icon: "mdi-store", title: "Tienda", link: "/tienda" },
      { icon: "mdi-cart", title: "Carrito", link: "/compras" },
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
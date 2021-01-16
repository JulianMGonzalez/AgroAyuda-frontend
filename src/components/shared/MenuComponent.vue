<template>
  <v-card>
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
      <v-navigation-drawer right app v-model="sideNav" color="green darken-4">
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(item, i) in menuItems"
              :key="i"
              :to="{ path: item.link }"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>{{ item.title }}</v-list-item-content>
            </v-list-item>

            <v-list-item v-if="!this.$store.state.usuario" to="/login">
              <v-list-item-action>
                <v-icon>mdi-github</v-icon>
              </v-list-item-action>
              <v-list-item-content>Inicia Sesion</v-list-item-content>
            </v-list-item>

            <v-list-item v-else @click="salir()">
              <v-list-item-action>
                <v-icon>mdi-github</v-icon>
              </v-list-item-action>
              <v-list-item-content>Salir</v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-list-item v-if="!this.$store.state.usuario" to="/registrar">
          <v-list-item-action>
            <v-icon>mdi-github</v-icon>
          </v-list-item-action>
          <v-list-item-content>Registrate</v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>

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
        ><v-icon>mdi-github</v-icon>Inicia Sesion
      </v-btn>
      <v-btn
        v-else
        color="#1b5e20"
        text
        class="hidden-xs-only mt-6"
        @click="salir()"
        ><v-icon>mdi-github</v-icon> Salir</v-btn
      >
      <v-btn
        v-if="!this.$store.state.usuario"
        color="#1b5e20"
        text
        class="hidden-xs-only mt-6"
        to="/registrar"
        ><v-icon>mdi-github</v-icon>
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
      { icon: "mdi-github", title: "inicio", link: "/" },
      { icon: "mdi-github", title: "Blog", link: "/blog" },
      { icon: "mdi-github", title: "servicio", link: "/servicio" },
      { icon: "mdi-github", title: "Tienda", link: "/tienda" },
    ],
  }),
  methods: {
    salir() {
      this.$store.dispatch("salir");
      this.$router.push({ name: "Login" });
    },}
};
</script>
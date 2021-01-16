<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      color="indigo darken-4"
      v-if="this.$store.state.usuario"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title class="white--text">
          <br />
          {{ user.nombre }}<br />
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

    <v-app-bar app color="white" dense dark prominent>
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="98"
        max-width="98"
        src="@/assets/LOGO (2).png"
      ></v-img>
      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                color="#1b5e20 "
                class="mt-7"
                dark
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-icon> mdi-microsoft-xbox-controller-menu </v-icon>
              </v-btn>
            </template>
            <span>Menu</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item>
            <v-btn
              depressed
              color="indigo darken-4"
              class="ml-2 text-white"
              elevation="4"
              @click="servicio()"
            >
              Servicios
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              depressed
              color="indigo darken-4"
              class="ml-2 text-white"
              elevation="4"
              @click="blog()"
            >
              Blog
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              v-if="!this.$store.state.usuario"
              depressed
              color="amber darken-1"
              class="ml-2"
              elevation="4"
              @click="entrar()"
              >Inicia Sesion</v-btn
            >
            <v-btn
              v-else
              depressed
              color="amber darken-1"
              class="ml-2"
              elevation="4"
              @click="salir()"
              >Salir</v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-btn
              v-if="!this.$store.state.usuario"
              depressed
              color="indigo darken-4"
              class="ml-2 text-white"
              elevation="4"
              @click="registrar()"
            >
              Registrate
            </v-btn>
            <v-btn
              v-else
              loading
              class="ml-2 text-white"
              color="indigo darken-4"
            ></v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
      <h1 class="d-flex justify-content-center">Servicios</h1>
      <v-sheet class="mx-auto" elevation="8" max-width="1200">
        <v-slide-group v-model="model" class="pa-4" show-arrows center-active>
          <v-slide-item
            v-for="([img, resumen], i) in servicios"
            :key="i"
            v-slot="{ active, toggle }"
          >
            <v-card
              :color="active ? 'success' : 'grey lighten-1'"
              class="ma-4"
              height="250"
              width="325"
              @click="toggle"
            >
              <v-img
                v-if="!active"
                :src="img"
                max-height="250"
                max-width="325"
              ></v-img>
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <v-icon
                    v-if="active"
                    color="white"
                    size="48"
                    v-text="'mdi-close-circle-outline'"
                  ></v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>

        <v-expand-transition>
          <v-sheet v-if="model != null" height="200" tile>
            <v-card
              class=""
              align="center"
              justify="center"
              
            >
              <v-btn color="green" class="mx-4 white--text"><v-icon size="24px">
              mdi-storefront-outline
            </v-icon>Tienda</v-btn><br>
            <p>hola</p>
            
              
            </v-card>
          </v-sheet>
        </v-expand-transition>
      </v-sheet>
    </v-main>

    <v-footer v-bind="localAttrs" :padless="padless">
      <v-card flat tile class="text-center" color="#5e2129">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
            color="white"
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
             
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text pt-0">
          <div>
            <!--Grid row-->
            <div class="row">
              <!--Grid column-->
              <div class="col-lg-5 col-md-12 mb-4 mb-md-0">
                <h5 class="text-uppercase"><b>Agroayuda</b></h5>

                <br/>
                <p>
                  <font size="4"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eum veritatis debitis sit, recusandae modi! Obcaecati praesentium eaque qui sapiente exercitationem, eligendi ipsum, perspiciatis delectus adipisci, ducimus ratione consequuntur voluptatum.</font>
                </p>
              </div>
              <div class="col-lg-2 d-flex justify-content-center">
                <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  src="@/assets/logo footer.png"
                  max-height="125"
                  max-width="125"
                ></v-img>
              </div>
              <div class="col-lg-5 col-md-12 mb-4 mb-md-0">
                <v-btn
                  v-for="(item, i) in links"
                  :onclick= "item.onclick"
                  :key="i"
                  color="white"
                  text
                  rounded
                  class="my-2"
                >
                  {{ item.p }}
                </v-btn>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d501058.6514427606!2d-75.780221!3d2.074216!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e24fd4a965ba00b%3A0x2acff39e4ee259aa!2sResina%2C%20Guadalupe%2C%20Huila!5e1!3m2!1ses-419!2sco!4v1610416486886!5m2!1ses-419!2sco" width="300" height="300" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                <!-- <h5 class="text-uppercase"><b>CONTACTOS</b></h5>
                  <br>
                  <p>
                    <font size=4> 
                      <ul><li><a href="mailto:tuagroayuda@gmail.com">Gmail</a></li></ul>
                     </font>
                  </p> -->
              </div>
            </div>
            <!--Grid row-->
          </div>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>AgroAyuda</strong><br />
          <a
            href="https://github.com/JulianMGonzalez/semana-5-69"
            class="btn btn-success"
            >GitHub</a
          >
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    mini: true,
    model: null,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    servicios: [
      [
        "https://cdn.pixabay.com/photo/2016/07/07/16/46/roll-the-dice-1502706_960_720.jpg",
      ],
      ["https://cdn.vuetifyjs.com/images/carousel/sky.jpg"],
      [
        "https://cdn.pixabay.com/photo/2016/02/19/11/23/women-1209678_960_720.jpg",
        
      ],
      [require("@/assets/TuDado.png")],
    ],
  }),
  methods: {
    getUserDetails() {
      let user = localStorage.getItem("user");
      if (user) {
        this.user = JSON.parse(user);
      }
    },
    entrar() {
      this.$router.push({ name: "Login" });
    },
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
    inicio() {
      this.$router.push({ name: "Home" });
    },
    blog() {
      this.$router.push({ name: "Blog" });
    },
    registrar() {
      this.$router.push({ name: "Registrar" });
    },
    salir() {
      this.$store.dispatch("salir");
      this.$router.push({ name: "Login" });
    },
  },
  created() {
    this.getUserDetails();
  },
};
</script>

<style scoped>
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
<template>
  <!-- App.vue -->
  <v-app>
    <v-banner elevation="7" class="mt-12">
      <v-carousel cycle show-arrows-on-hover hide-delimiters height="400">
        <v-carousel-item
          v-for="(item, i) in imagenes"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <v-row class="d-flex align-end" align="center" justify="center">
            <div class="display-3 font-weight-black" v-text="item.p"></div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-banner>
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

    <v-app-bar app color="orange" dense dark>
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="50"
        max-width="50"
        src="@/assets/TuDado.png"
      ></v-img>
      <v-toolbar-title class="font-weight-black"
        ><span class="#051C9E--text">TuDado</span></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                color="indigo darken-4"
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
            <v-btn v-else loading class="ml-2 text-white" color="indigo darken-4"></v-btn>
            
          
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main class="bg-dark">
      <v-alert border="bottom" colored-border type="warning" elevation="2">
        Nos Centramos en el sector cultural. Si bien estas competencias son
        innatas, todos tenemos la capacidad de poder desarrollarlas. Por ello,
        estos cursos son muy solicitados, ya que los profesionales necesitan
        diferenciarse y destacarse dentro del competitivo mercado actual, tanto
        durante la búsqueda de una oportunidad laboral como en su permanencia y
        crecimiento dentro de una compañía
      </v-alert>
      <v-card max-width="900" max-height="400" tile>
        <v-img height="400" width="900" src="@/assets/ajedrez.jpg">
          <v-row align="end" class="fill-height">
            <v-col align-self="start" class="pa-0" cols="12">
              <v-avatar class="profile" color="grey" size="250" tile>
                <v-img
                  src="@/assets/sonriendo.jpg"
                  width="250"
                  height="250"
                ></v-img>
                <v-list-item-title class="title">
                  Juan Carlos Garcia
                </v-list-item-title>
              </v-avatar>
            </v-col>
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    Juan Carlos Garcia
                  </v-list-item-title>
                  <v-list-item-subtitle>Neiva, Huila</v-list-item-subtitle>
                  <v-list-item-subtitle
                    >"El desarrollo de habilidades blandas como: trabajar en
                    equipo, poseer un buen nivel de comunicación, tener
                    adaptabilidad ante los distintos escenarios, una actitud
                    positiva en la oficina me han hecho un mejor trabajador,
                    recomiendo totalmente la pagina para desarrollar estas
                    increibles habilidades! "</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
      <v-alert
        v-model="alert"
        border="left"
        close-text="Close Alert"
        color="indigo darken-4"
        dark
        dismissible
      >
        Para entrar en zona de administracion dale en Geston!
      </v-alert>

      <!-- Provides the application the proper gutter -->
     
    </v-main>

    <v-footer dark padless class="d-flex justify-center">
      <v-card flat tile class="indigo darken-4 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
            color="orange"
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0" v-if="this.$store.state.usuario">
          <div class="container p-4">
            <!--Grid row-->
            <div class="row">
              <!--Grid column-->
              <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="50"
                  max-width="50"
                  src="@/assets/TuDado.png"
                ></v-img>
                <h5 class="text-uppercase">TuDado</h5>

                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                  atque ea quis molestias. Fugiat pariatur maxime quis culpa
                  corporis vitae repudiandae aliquam voluptatem veniam, est
                  atque cumque eum delectus sint!
                </p>
              </div>
              <!--Grid column-->

              <!--Grid column-->
              <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="50"
                  max-width="50"
                  src="@/assets/TuDado.png"
                ></v-img>
                <h5 class="text-uppercase">Contacto</h5>

                <p>Nmeros lugares correos</p>
              </div>
              <!--Grid column-->
            </div>
            <!--Grid row-->
          </div>
        </v-card-text>
        <v-card-text class="white--text pt-0" v-else>
          Las personas transcurren la gran parte del día en sus en sus trabajos,
          donde se enfrentan frecuentemente a diversos tipos de problemáticas,
          en este escenario los inconvenientes abundan. <br />Por eso, las
          habilidades blandas han adquirido gran importancia y valor en el mundo
          de los negocios, ya que sirven para resolver inconvenientes y
          enfrentar de manera correcta la jornada laboral. <br />
          Julian David Montero <br />
          Monterogjulian@gmail.com <br />
          Tel: 323 2477487 <br />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>TuDado</strong><br />
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
    imagenes: [
      {
        src:
          "https://cdn.pixabay.com/photo/2016/07/07/16/46/roll-the-dice-1502706_960_720.jpg",
        p: "AgroAyuda",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        p: "",
      },
      {
        src:
          "https://cdn.pixabay.com/photo/2016/02/19/11/23/women-1209678_960_720.jpg",
        p: "",
      },
      {
        src:
          "https://cdn.pixabay.com/photo/2016/11/21/17/50/battle-1846807_960_720.jpg",
        p: "Desarrolla tus habilidades blandas",
      },
    ],
    drawer: true,
    length: 3,
    onboarding: 0,
    alert: true,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    mini: true,
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
    servicio() {
      this.$router.push({ name: "Servicio" });
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
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
  },
  created() {
    this.getUserDetails();
  },
};
</script>
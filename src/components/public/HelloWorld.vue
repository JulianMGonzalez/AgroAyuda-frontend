<template>
  <!-- App.vue -->
  <v-app>
    <section id="inicio">
      <v-banner app elevation="7" class="mt-16">
        <v-carousel cycle show-arrows-on-hover hide-delimiters height="500">
          <v-carousel-item
            v-for="(item, i) in imagenes"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-img :src="item.src" max-height="500"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-banner>
    </section>
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
    <v-app-bar app color="white" dense dark prominent>
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="98"
        max-width="98"
        src="@/assets/LOGO (2).png"
      ></v-img>
      <v-spacer></v-spacer>
      <v-navigation-drawer temporary v-model="sideNav">
        <v-list>
          <v-list-tile
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar dark class="primary">
        <v-toolbar-side-icon
          @click.stop="sideNav = !sideNav"
          class="hidden-sm-and-up"
        ></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer"
            >DevMeetup</router-link
          >
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            flat
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <main>
        <router-view></router-view>
      </main>
      <!-- <v-menu>
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
      </v-menu>   -->
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-alert border="bottom" colored-border type="warning" elevation="2">
        Nos Centramos en el sector cultural. Si bien estas competencias son
        innatas, todos tenemos la capacidad de poder desarrollarlas. Por ello,
        estos cursos son muy solicitados, ya que los profesionales necesitan
        diferenciarse y destacarse dentro del competitivo mercado actual, tanto
        durante la búsqueda de una oportunidad laboral como en su permanencia y
        crecimiento dentro de una compañía
      </v-alert>
      <v-row>
        <v-card
          max-width="2400"
          max-height="2400"
          tile
          v-for="([testimonio, imagen, autor, like, share], a) in testimonio"
          :key="a"
          class="col-lg-4 col-md-12 mb-4 mb-md-0"
        >
          <!-- cambiar a testimonios y pnerlo bonito  -->
          <v-card class="mx-auto" color="#5e2129" dark>
            <v-card-title>
              <v-icon large left> mdi-twitter </v-icon>
              <span class="title font-weight-light">Twitter</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              {{ testimonio }}
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img class="elevation-6" alt="" :src="imagen"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ autor }}</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <v-icon class="mr-1"> mdi-heart </v-icon>
                  <span class="subheading mr-2">{{ share }}</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1"> mdi-share-variant </v-icon>
                  <span class="subheading">{{ like }}</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-row>
      <v-alert border="top" colored-border type="info" elevation="9">
        Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu. Ut
        varius tincidunt libero. Curabitur ligula sapien, tincidunt non, euismod
        vitae, posuere imperdiet, leo. Morbi nec metus.
      </v-alert>
          <div id="team" class="container-fluid">
      <div class="row justify-content-center mb-5" >
        <div class="col mt-5" v-for="(item, index) of team" :key="index">
      <div
        class="card green darken-4 text-white"
        :key="i"
      >
        <div class="d-flex justify-content-center p-2">
          <img
            v-bind:src="item.image"
            width="190"
            height="190"
            alt="Estudiante"
          />
        </div>
        <div class="card-body">
          <h5 class="text-center">{{ item.codigo }}. {{ item.nombre }}</h5>
          <p class="text-center">{{ item.descripcion }}</p>
          <p class="text-center">{{ item.rol }}</p>
        </div>
        <div class="p-3 mb-2 yellow darken-4 text-dark">
          <p class="text-center">¡El campo es de todos!</p>
        </div>
      </div>
      </div>
      </div>
    </div>
      

      <!-- Provides the application the proper gutter -->
    </v-main>
    <v-footer v-bind="localAttrs" :padless="padless">
      <v-card
        max-height="2400"
        max-width="2400"
        flat
        tile
        class="text-center"
        color="#5e2129"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            :onclick="icon.onclick"
            target="_blank"
            class="mx-4 white--text"
            icon
            color="white"
          >
            <v-icon size="24px">
              {{ icon.p }}
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

                <br />
                <p>
                  <font size="4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque eum veritatis debitis sit, recusandae modi! Obcaecati
                    praesentium eaque qui sapiente exercitationem, eligendi
                    ipsum, perspiciatis delectus adipisci, ducimus ratione
                    consequuntur voluptatum.</font
                  >
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
                  :onclick="item.onclick"
                  :key="i"
                  color="white"
                  text
                  rounded
                  class="my-2"
                >
                  {{ item.p }}
                </v-btn>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d501058.6514427606!2d-75.780221!3d2.074216!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e24fd4a965ba00b%3A0x2acff39e4ee259aa!2sResina%2C%20Guadalupe%2C%20Huila!5e1!3m2!1ses-419!2sco!4v1610416486886!5m2!1ses-419!2sco"
                  width="300"
                  height="300"
                  frameborder="0"
                  style="border: 0"
                  allowfullscreen=""
                  aria-hidden="false"
                  tabindex="0"
                ></iframe>
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
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    testimonio: [
      [
        "Mis productos ahora se están distribuyendo con facilidad, me agrada poder educar a las personas sobre productos agricolas. ",
        require("@/assets/agriculture.png"),
        "Juan Pablo",
        "3",
        "10",
      ],
      [
        "100% recomendado, la verdad ayuda mucho a mis ventas; ahora todos mis cultivos se venden y no tengo perdida de ellos.",
        require("@/assets/hombre.png"),
        "Miguel Rivera",
        "4",
        "5",
      ],
      [
        "Gracias a los desarrolladores y a los agricultores por pensar en nosotros, las personas de la ciudad la cual queremos aprender sobre el campo.",
        require("@/assets/sr.png"),
        "Julio Gomez",
        "6",
        "12",
      ],
    ],
    sideNav: false,
    menuItems: [
      { icon: "supervisor_account", title: "View Meetups", link: "/meetups" },
      { icon: "room", title: "Organize Meetup", link: "/meetup/new" },
      { icon: "person", title: "Profile", link: "/profile" },
      { icon: "face", title: "Sign up", link: "/signup" },
      { icon: "lock_open", title: "Sign in", link: "/signin" },
    ],
    team: [
      {
        codigo: 1,
        nombre: "Julian Carranza",
        descripcion:
          "",
        rol: "Desarrollador backend",
        image: require("@/assets/maiz.jpg"),
      },
      {
        codigo: 2,
        nombre: "Julian David Montero",
        descripcion:
          "",
        rol: "Desarrollador backend",
        image: require("@/assets/maiz.jpg"),
      },
      {
        codigo: 3,
        nombre: "Laura Vargas",
        descripcion: "",
        rol: "______________",
        image: require("@/assets/maiz.jpg"),
      },
      {
        codigo: 4,
        nombre: "Santiago maragua",
        descripcion:
          "",
        rol: "Desarrollador backend",
        image: require("@/assets/maiz.jpg"),
      },
      {
        codigo: 5,
        nombre: "Jesus bermeo",
        descripcion:
          "",
        rol: "Desarrollador backend",
        image: require("@/assets/maiz.jpg"),
      },
    ],
    links: [
      {
        p: "inicio",
        onclick: "location.href='#inicio'",
      },
      {
        p: "Teléfono",
        // onclick: "location.href='https://wa.me/573232477487'",
        onclick: "window.open('https://wa.me/573232477487', '_blank')",
      },
      {
        p: "Gmail",
        onclick: "location.href='mailto:tuagroayuda@gmail.com'",
      },
      {
        p: "nuestro Equipo",
        onclick: "",
      },
      {
        p: "Soporte Técnico",
        onclick: "",
      },
    ],
    direccionar: [],
    imagenes: [
      {
        src: require("@/assets/maiz.jpg"),
      },
      {
        src: require("@/assets/frutas.png"),
      },
      {
        src: require("@/assets/persona.png"),
      },
      {
        src: require("@/assets/carro.jpg"),
      },
    ],
    drawer: true,
    length: 3,
    onboarding: 0,
    alert: true,
    icons: [
      {
        p: "mdi-facebook",
        onclick: "window.open('https://www.facebook.com/', '_blank')",
      },
      {
        p: "mdi-instagram",
        onclick: "window.open('https://www.instagram.com/', '_blank')",
      },
      {
        p: "mdi-twitter",
        onclick: "window.open('https://www.twitter.com/', '_blank')",
      },
      {
        p: "mdi-github",
        onclick:
          "window.open('https://github.com/julca02/backendagroayuda', '_blank')",
      },
    ],
    mini: true,
    padless: false,
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
  computed: {
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
};
</script>
<style scoped>
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>


<template>
  <!-- App.vue -->
  <v-app>
    <v-system-bar app color="#5e2129"> </v-system-bar>
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
    <!-- Sizes your content based upon application components -->

    <v-main class="main">
      <section id="resumen">
        <v-sheet class="mx-auto" elevation="8" max-width="1200">
          <v-card>
            <v-alert border="top" elevation="9">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, nostrum atque saepe temporibus fugit cupiditate obcaecati expedita sed repudiandae, voluptas veritatis animi earum deleniti repellendus officia ratione perferendis corporis fugiat?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum accusantium, quia incidunt, fugit accusamus veniam exercitationem voluptatibus dolor libero necessitatibus, quaerat sapiente? Quidem iusto distinctio error officia. Voluptate, quos nemo?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, nostrum atque saepe temporibus fugit cupiditate obcaecati expedita sed repudiandae, voluptas veritatis animi earum deleniti repellendus officia ratione perferendis corporis fugiat?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum accusantium, quia incidunt, fugit accusamus veniam exercitationem voluptatibus dolor libero necessitatibus, quaerat sapiente? Quidem iusto distinctio error officia. Voluptate, quos nemo?
            </v-alert>
          </v-card>
        </v-sheet>
      </section>

      <section id="indicadores">
        <v-sheet class="mx-auto" elevation="8" max-width="1200">
          <v-card>
            <h1 class="d-flex justify-content-center">indicadores</h1>
            <p>no encuentro una api buena</p>
          </v-card>
        </v-sheet>
      </section>
      <div id="team" class="container-fluid">
        <div class="row justify-content-center mb-5">
          <div class="col mt-5" v-for="([testimonio, imagen, autor, like, share], a) in testimonios"
          :key="a">
          <v-card class="ml-5 mr-5">
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
          </div>
        </div>
      </div>
      

      <div id="team" class="container-fluid">
        <div class="row justify-content-center mb-5">
          <div class="col mt-5" v-for="(item, index) of team" :key="index">
            <div class="card green darken-4 text-white" :key="index">
              <div class="d-flex justify-content-center p-2">
                <img
                  v-bind:src="item.image"
                  width="190"
                  height="190"
                  alt="Estudiante"
                />
              </div>
              <div class="card-body">
                <h5 class="text-center">
                  {{ item.codigo }}. {{ item.nombre }}
                </h5>
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
            v-for="(icon, i) in icons"
            :key="i"
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
import axios from "axios";

export default {
  data: () => ({
    sideNav: false,
    menuItems: [
      { icon: "mdi-github", title: "inicio", link: "/" },
      { icon: "mdi-github", title: "Blog", link: "/blog" },
      { icon: "mdi-github", title: "servicio", link: "/servicio" },
      { icon: "mdi-github", title: "Tienda", link: "/tienda" },
    ],
    testimonios: [
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
    ],
    padless: false,
    equipo: [
      [
        require("@/assets/frutas.png"),
        "Julian David Montero Gonzalez",
        "Desarrollador Web"
      ],
      [
        require("@/assets/maiz.jpg"),
        "Julian Carranza Capera",
        "Aprendíz"
      ],
      [
        require("@/assets/frutas.png"),
        "Jesus David Bermeo Quimbaya",
        "Ad empresas"
      ],
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
    ],
    team: [
      {
        codigo: 1,
        nombre: "Julian Carranza",
        descripcion: "",
        rol: "Desarrollador backend",
        image: require("@/assets/maiz.jpg"),
      },
      {
        codigo: 2,
        nombre: "Julian David Montero",
        descripcion: "",
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
        descripcion: "",
        rol: "Desarrollador backend",
        image: require("@/assets/maiz.jpg"),
      },
      {
        codigo: 5,
        nombre: "Jesus bermeo",
        descripcion: "",
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
    news: null,
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
  mounted() {
    axios.get("").then((response) => {
      this.news = response.data;
      console.log(this.news);
    });
  },
};
</script>
<style >
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.main {
  background: url(fondo.png);
}
</style>
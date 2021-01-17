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
    length: 3,
    onboarding: 0,
    alert: true,
    news: null,
  }),
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
  }
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
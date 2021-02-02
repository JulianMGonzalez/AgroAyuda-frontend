<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <section id="inicio">
      <v-main class="main">
        <!-- Provides the application the proper gutter -->

        <v-sheet class="mx-auto" elevation="8" max-width="1200">
          <h1 class="d-flex justify-content-center">
            <strong>Servicios</strong>
          </h1>
          <v-slide-group v-model="model" class="pa-4" show-arrows center-active>
            <v-slide-item
              v-for="(item, i) in servicios"
              :key="i"
              v-slot="{ active, toggle }"
            >
              <v-card
                :color="active ? '#5e2129' : 'grey lighten-1'"
                class="ma-4"
                height="700"
                width="500"
                @click="toggle"
              >
                <v-img
                  v-if="!active"
                  :src="item.imagen"
                  max-height="700"
                  max-width="500"
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

          <v-expand-transition v-for="(item, i) in servicios" :key="i">
            <v-sheet v-if="model != null" tile>
              <v-card align="center" justify="center">
                <v-card-subtitle v-if="model === i">{{
                  item.nombre
                }}</v-card-subtitle>
                <v-card-subtitle v-if="model === i">{{
                  item.texto
                }}</v-card-subtitle>
                <v-btn
                  color="green"
                  class="mx-4 white--text"
                  v-if="model === i"
                  :to="{ path: item.link }"
                  ><v-icon size="24px"> {{ item.icono }} </v-icon
                  >{{ item.nombre }}</v-btn
                >
              </v-card>
            </v-sheet>
          </v-expand-transition>
        </v-sheet>
        <v-container>
          <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item
              v-for="(item, i) in items"
              :key="i"
              :color="item.color"
              :icon="item.icon"
              fill-dot
            >
              <v-card :color="item.color" dark>
                <v-card-title class="title"> {{ item.titulo }} </v-card-title>
                <v-card-text class="white text--primary">
                  <p>
                    {{ item.resumen }}
                  </p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-container>
      </v-main>
    </section>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    model: null,
    items: [
      {
        color: "red lighten-2",
        icon: "mdi-star",
        titulo: "¡Todo empieza en el campo!",
        resumen:
          "Los campesinos deben cultivar productos que tengan un mercado asegurado.",
      },
      {
        color: "purple darken-1",
        icon: "mdi-book-variant",
        titulo: "Y ahora?",
        resumen:
          "Debemos aprender a ser empresarios en el campo y a trabajar con otros productores; grandes, medianos y pequeños.",
      },
      {
        color: "green lighten-1",
        icon: "mdi-airballoon",
        titulo: "¡Todo empieza en el campo!",
        resumen:
          "Los campesinos deben cultivar productos que tengan un mercado asegurado.",
      },
      {
        color: "indigo",
        icon: "mdi-buffer",
        titulo: "¡Todo empieza en el campo!",
        resumen:
          "Los campesinos deben cultivar productos que tengan un mercado asegurado.",
      },
    ],
    servicios: [
      {
        imagen: require("@/assets/servicios1.jpg"),
        nombre: "Tienda",
        icono: "mdi-store",
        texto:
          "Los mejores productos del campo colombiano. Permitimos hacer compra y venta de productos hacía ciudades sin discriminación de cantidad, permitiendo que los campesinos hagan sus ventas sin empresas intermediarias",
        link: "/tienda",
      },
      {
        imagen: require("@/assets/servicios2.jpg"),
        nombre: "Terminos y Condiciones",
        icono: "mdi-store",
        texto:
          "Los términos y condiciones del software incitan al usuario a fomentar el control de desechos orgánicos e inorgánicos.",
        link: "/",
      },
      {
        imagen: require("@/assets/servicios3.jpg"),
        nombre: "Blog",
        icono: "mdi-github",
        texto:
          "Orientar a las personas del área urbana con conocimientos fundamentales para la cultivación de productos agrícolas.",
        link: "/blog",
      },
      {
        imagen: require("@/assets/servicios4.jpg"),
        nombre: "Inicio",
        icono: "mdi-home",
        texto:
          " Actualizar cada día el precio de la bolsa de valores de los productos.",
        link: "/",
      },
    ],
  }),
};
</script>

<style>
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.main {
  background: url("fondo.png");
}
</style>

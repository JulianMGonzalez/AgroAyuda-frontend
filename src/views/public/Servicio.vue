<template>
  <div>
    <navigation-drawer></navigation-drawer>
    <section class="mt-13">
      <h3 class="text-center font-weight-black primary--text">SERVICIOS</h3>
      <v-container>
        <v-row justify="center">
          <v-expansion-panels popout>
            <v-expansion-panel v-for="(item, i) in servicios" :key="i">
              <v-expansion-panel-header>{{
                item.nombre
              }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" lg="10" md="12">{{ item.texto }}</v-col>
                  <v-col cols="12" lg="2" md="12"
                    ><v-btn
                      color="primary"
                      class="mx-4 white--text mb-5"
                      :to="{ path: item.link }"
                      ><v-icon size="24px"> {{ item.icono }} </v-icon
                      >{{ item.nombre }}
                    </v-btn></v-col
                  >
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        
        <section class="py-15">
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
        </section>
      </v-container>
    </section>
  </div>
</template>

<script>
import NavigationDrawer from "@/components/shared/NavigationDrawer.vue";

export default {
  components: {
    NavigationDrawer,
  },
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
  created() {
    NavigationDrawer;
  },
};
</script>
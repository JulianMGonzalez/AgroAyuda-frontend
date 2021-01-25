<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <section id="inicio">
      <v-main class="main">
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
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

          <v-expand-transition
            v-for="(item, i) in servicios"
            :key="i"
          >
            <v-sheet v-if="model != null" tile>
              <v-card align="center" justify="center">
              <v-card-title v-if="model === i">{{item.nombre}}</v-card-title>
              <v-card-subtitle v-if="model === i">{{item.texto}}</v-card-subtitle>
              <v-btn color="green" class="mx-4 white--text" v-if="model === i" :to= "{path: item.link}"><v-icon size="24px">
              {{ item.icono }}
              </v-icon>{{ item.nombre }}</v-btn>
              </v-card>
              
            </v-sheet>
          </v-expand-transition>
        </v-sheet>
      </v-main>
    </section>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    model: null,
    dialog: false,
    servicios: [
      {
        imagen: require("@/assets/servicios1.jpg"), nombre: 'Tienda', icono: 'mdi-store', texto: 'Los mejores productos del campo colombiano. Permitimos hacer compra y venta de productos hacía ciudades sin discriminación de cantidad, permitiendo que los campesinos hagan sus ventas sin empresas intermediarias', link: '/tienda'
      },
      {
        imagen: require("@/assets/servicios2.jpg"), nombre: 'Terminos y Condiciones', icono: 'mdi-store', texto: 'Los términos y condiciones del software incitan al usuario a fomentar el control de desechos orgánicos e inorgánicos.', link: '/'
      },
      {
        imagen: require("@/assets/servicios3.jpg"), nombre: 'Blog', icono: 'mdi-github', texto: 'Orientar a las personas del área urbana con conocimientos fundamentales para la cultivación de productos agrícolas.', link: '/blog'
      },
      {
        imagen: require("@/assets/servicios4.jpg"), nombre: 'Inicio', icono: 'mdi-home', texto: ' Actualizar cada día el precio de la bolsa de valores de los productos.', link: '/'
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

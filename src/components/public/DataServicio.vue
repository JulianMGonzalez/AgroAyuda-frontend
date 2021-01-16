<template>
 <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main class="main">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
      
      <v-sheet class="mx-auto" elevation="8" max-width="1200">
        <h1 class="d-flex justify-content-center"><strong>Servicios</strong></h1>
        <v-slide-group v-model="model" class="pa-4" show-arrows center-active>
          <v-slide-item
            v-for="([img], i) in servicios"
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
                :src="img"
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

        <v-expand-transition v-for="([img, nombre, icono, link], i) in servicios"
            :key="i">
          <v-sheet v-if="model != null" tile>
            <v-card
              class=""
              align="center"
              justify="center"
              
            >
              <v-btn color="green" class="mx-4 white--text" v-if="model === i" :to= "{path: link}"><v-icon size="24px">
              {{ icono }}
              </v-icon>{{ nombre }}</v-btn>
            
              
            </v-card>
          </v-sheet>
        </v-expand-transition>
      </v-sheet>
    </v-main>

  </v-app>
</template>

<script>
export default {
  data: () => ({
    model: null,
    servicios: [
      [
        require("@/assets/servicios1.jpg"),
        "Tienda",
        "mdi-github",
        "/tienda"
      ],
      [
        require("@/assets/servicios2.jpg"),
        "Terminos y Condiciones",
        "mdi-github",
      ],
      [
        require("@/assets/servicios3.jpg"),
        "Blog",
        "mdi-github",
        "/blog"
      ],
      [
        require("@/assets/servicios4.jpg"),
        "Inicio",
        "mdi-github",
        "/"
      ],
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

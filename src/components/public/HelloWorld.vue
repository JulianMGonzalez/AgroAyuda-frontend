<template>
  <!-- App.vue -->
  <v-app class="home">
    <v-carousel
      show-arrows-on-hover
      hide-delimiters
      height="600"
      cycle
      class="mt-12"
    >
      <v-carousel-item
        v-for="(item, i) in imagenes"
        :key="i"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-parallax dark :src="item.src" height="600">
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-row align="center" justify="center">
                <v-col cols="12" md="6" xl="8">
                  <h1 class="display-2 font-weight-bold mb-4">AgroAyuda</h1>
                  <h1 class="font-weight-light">
                    {{ item.p }}
                  </h1>
                </v-col>
                <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down">
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="svg-border-waves text-white">
            <v-img src="@/assets/borderWaves.svg" />
          </div>
        </v-parallax>
      </v-carousel-item>
    </v-carousel>

    <!-- Sizes your content based upon application components -->
    <v-main class="main">
      <v-container>
        <section id="resumen" class="resumen">
          <h3 class="text-center font-weight-black primary--text">
            CONOCE A AGROAYUDA
          </h3>
          <v-divider></v-divider>
          <v-row
            no-gutters
            class="d-flex justify-center align-items-center pa-4"
          >
            <v-col cols="12" sm="6">
              <v-img
                max-width="300"
                height="300"
                src="@/assets/info.png"
              ></v-img>
            </v-col>
            <v-col cols="12" sm="6">
              <v-alert
                rounded="xl"
                border="right"
                elevation="18"
                icon="mdi-piggy-bank-outline"
                color="primary"
                dark
                >Buscamos ayudar a las personas del campo agrícola para que
                puedan dar a conocer sus productos a más personas no solo a
                nivel local sino también a nivel departamental y nacional, con
                esta plataforma se busca brindar apoyo con el uso de la misma de
                una forma interactiva para que estos pueda postear sus productos
                y tener comunicación directa con los compradores para no tener
                que incluir los intermediarios.<br />
                En Colombia se suelen comprar los productos a muy bajo costo
                para luego venderlos por el doble o hasta el triple de lo que se
                le compra al campesino Colombiano afectando así su economía,
                dando poco margen de ganancia o hasta dando perdidas por
                cosechas las cuales toman meses de arduo trabajo para el
                campesino.</v-alert
              >
            </v-col>
          </v-row>
        </section>
        <section id="products" class="products py-10">
          <v-row>
            <v-col sm="10" offset-sm="1" lg="8" offset-lg="2">
              <h2>
                <h3 class="text-center font-weight-black primary--text">
                  PRODUCTOS
                </h3>
                <v-btn to="/tienda" small text color="secondary"
                  >Ver Todos</v-btn
                >
              </h2>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              sm="6"
              md="4"
              v-for="producto in mostrarAlimentos.slice(0, 3)"
              :key="producto.nombre"
            >
              <v-card
                outlined
                rounded="xl"
                :loading="loading"
                class="mx-auto my-12"
                max-width="374"
              >
                <template slot="progress">
                  <v-progress-linear
                    color="primary"
                    height="10"
                    indeterminate
                  ></v-progress-linear>
                </template>

                <v-img height="250" :src="producto.imagen"></v-img>

                <v-card-title>{{ producto.nombre }}</v-card-title>

                <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating
                      :value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">4.5</div>
                  </v-row>

                  <div class="my-4 subtitle-1">
                    ${{ producto.precio_venta }}.00
                  </div>

                  <div>{{ producto.descripcion }}</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-title>Disponible!</v-card-title>

                <v-card-text>
                  <v-chip-group
                    active-class="primary accent-4 white--text"
                    column
                  >
                    <v-chip>{{ producto.stock }}</v-chip>
                  </v-chip-group>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="secondary" outlined to="/tienda"
                    ><v-icon>mdi-cart-plus</v-icon>
                    Comprar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </section>
        <section id="indicadores" class="indicadores py-10">
          <h3 class="text-center font-weight-black primary--text">
            INDICADORES
          </h3>
          <v-divider></v-divider>
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-sheet
              class="mx-auto"
              :elevation="hover ? 10 : 2"
              max-width="1200"
            >
              <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                type="card"
              ></v-skeleton-loader>
            </v-sheet>
          </v-hover>
        </section>
        <section id="testimonials" class="testimonials py-10">
          <div class="container-fluid mt-16">
            <h3 class="text-center font-weight-black primary--text">
              TESTIMONIOS
            </h3>
            <v-divider></v-divider>
            <div class="row justify-content-center mb-5">
              <div
                class="col mt-5"
                v-for="([testimonio, imagen, autor, like], a) in testimonios"
                :key="a"
              >
                <v-card class="ml-10 mr-10" rounded="xl">
                  <v-card class="mx-auto" color="secondary" dark>
                    <v-card-title>
                      <v-icon large left> mdi-twitter </v-icon>
                      <span class="title font-weight-light">Twitter</span>
                    </v-card-title>

                    <v-card-text class="fw-bold text-white">
                      <font size="4">
                        {{ testimonio }}
                      </font>
                    </v-card-text>

                    <v-card-actions>
                      <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                          <v-img
                            class="elevation-6"
                            alt=""
                            :src="imagen"
                          ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>{{ autor }}</v-list-item-title>
                        </v-list-item-content>

                        <v-row align="center" justify="end">
                          <div>
                            <v-btn icon @click="messages++">
                              <v-badge
                                :content="messages"
                                :value="messages"
                                color="green"
                                overlap
                              >
                                <v-icon class="mr-1"> mdi-heart </v-icon>
                              </v-badge>
                            </v-btn>

                            <span class="mr-1">·</span>
                            <v-icon class="mr-1"> mdi-share-variant </v-icon>
                            <span class="subheading">{{ like }}</span>
                          </div>
                        </v-row>
                      </v-list-item>
                    </v-card-actions>
                  </v-card>
                </v-card>
              </div>
            </div>
          </div>
        </section>
        <section id="team" class="team py-16">
          <h3 class="text-center font-weight-black primary--text">
            NUESTRO EQUIPO
          </h3>
          <v-divider></v-divider>
          <v-row class="fill-height mb-10" align="center" justify="center">
            <template v-for="(item, i) in team">
              <v-col :key="i" cols="12" md="4">
                <v-hover v-slot="{ hover }">
                  <v-card
                    class="mx-auto text-center"
                    color="grey lighten-4"
                    max-width="600"
                    elevation="10"
                    rounded="xl"
                  >
                    <v-img :aspect-ratio="16 / 9" :src="item.image">
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex transition-fast-in-fast-out secondary darken-2 v-card--reveal white--text"
                          style="height: 100%"
                        >
                          {{ item.descripcion }}
                        </div>
                      </v-expand-transition>
                    </v-img>
                    <v-card-text class="pt-6" style="position: relative">
                      <div class="font-weight-medium grey--text mb-2">
                        {{ item.rol }}
                      </div>
                      <v-divider></v-divider>
                      <span class="font-weight-bold secondary--text mb-2">
                        {{ item.nombre }}
                      </span>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
            </template>
          </v-row>
        </section>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import productos from "@/logic/APIproductos.js";
export default {
  data: () => ({
    messages: 0,
    tienda: [],
    loading: false,
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
        nombre: "JULIAN CARRANZA CAPERA",
        descripcion:
          "Determinar las necesidades esenciales y no esenciales, así como las que son de segundo nivel, definir una estructura básica del sistema que incluya fuentes de información, módulos de procesamiento de información, y resultados esperados. ",
        rol: "Desarrollador Frontend - Analista",
        image: require("@/assets/yo.jpg"),
      },
      {
        codigo: 2,
        nombre: "JULIAN DAVID MONTERO GONZALEZ",
        descripcion:
          "Cuenta con la capacidad suficiente para entender a su equipo de trabajo, también con la capacidad suficiente para la solución de los problemas que se presenten en el trascurso del proyecto, todas sus funciones están puestas las actividades del resto del equipo, debe hacer control de tareas diarias. ",
        rol: "Desarrollador Full Stack - Lider del proyecto",
        image: require("@/assets/rolito.jpg"),
      },
      {
        codigo: 3,
        nombre: "LAURA VARGAS PERDOMO",
        descripcion:
          "Como líder cuenta con porte organizativo, se encarga de redactar y mantener actualizaciones de los requerimientos, crea y asigna tareas al resto del equipo; pero sus tareas de programación deben limitarse únicamente a la arquitectura marcando la línea a seguir por el resto de los programadores. ",
        rol: "Analista - Gerente del proyecto",
        image: require("@/assets/laura.jpg"),
      },
      {
        codigo: 4,
        nombre: "SANTIAGO MARAGUA",
        descripcion:
          "No son necesariamente los desarrolladores con más experiencia. Deben tener habilidades de programación adecuadas. ",
        rol: "Diseñador - Tester",
        image: require("@/assets/maragua.jpg"),
      },
      {
        codigo: 5,
        nombre: "JESUS DAVID BERMEO",
        descripcion:
          "El ingeniero de tener altas capacidades en programación, teniendo en cuenta que las bases de datos son una herramienta muy poderosa en un proyecto. ",
        rol: "Diseñador - Analista",
        image: require("@/assets/david.jpg"),
      },
    ],
    imagenes: [
      {
        src: require("@/assets/banner1.jpg"),
        p:
          "AgroAyuda apuesta por la calidad. Te ofrecemos los mejores productos!",
      },
      {
        src: require("@/assets/banner2.jpg"),
        p: "Agroayuda es lo mejor",
      },
      {
        src: require("@/assets/banner3.jpg"),
        p: "Agroayuda es lo mejor",
      },
      {
        src: require("@/assets/banner4.jpg"),
        p: "Agroayuda es lo mejor",
      },
    ],

    length: 3,
    onboarding: 0,
  }),
  created() {
    this.listar();
  },
  computed: {
    mostrarAlimentos() {
      return this.tienda.filter((item) => item.estado == 1);
    },
  },
  methods: {
    async listar() {
      let response = await productos.get();
      this.tienda = response.data;
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
};
</script>
<style >
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.main {
  background-image: url("~@/assets/fondo.png");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
.texto {
  font-size: 18px;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}
.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}
</style>
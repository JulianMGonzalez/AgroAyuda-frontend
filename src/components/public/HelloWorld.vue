<template>
  <!-- App.vue -->
  <v-app class="home">
    <v-carousel
      show-arrows-on-hover
      hide-delimiters
      height="600"
      cycle
      class="mt-16"
    >
      <v-carousel-item
        v-for="(item, i) in imagenes"
        :key="i"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-parallax dark :src="item.src" height="500">
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
      <section id="resumen" class="mr-5 ml-5">
        <v-container class="pa-4">
          <h3 class="text-center font-weight-black primary--text">
            CONOCE A AGROAYUDA
          </h3>
          <v-divider></v-divider>
          <v-card>
            <v-alert
              border="top"
              elevation="9"
              type="warning"
              color="primary"
              rounded="xl"
              shaped
            >
              <p class="texto">
                Según el DANE, Los campesinos corresponden al 30% de nuestra
                población en Colombia, los cuales producen el 83,5 % de los
                alimentos que consumimos diariamente. Además de ser una
                población excluida y con diversos problemas a la hora de su
                producción, compra y venta. Igualmente, se presenta conflictos
                en sectores esenciales como la salud, educación, vivienda, etc.
                Por lo tanto, nos enfocaremos en la perdida de esto productos,
                por la falta de opciones de venta. Podemos referirnos a la
                difícil situación que afronta el campesino al tratar de
                contribuir y sacar sus cosechas. La cual sea capaz de
                suplementar sus necesidades básicas. Nuestro problema se
                sustenta en las desventajas y características que son atribuidas
                a problemas emergente, actuales y extensos en nuestro país:<br />
                • Los campesinos no cuentan con herramientas tecnológicas que
                faciliten su labor diaria.<br />
                • No cuenta con una buena educación para sustentar y aprovechar
                los productos del campo y capacitarse en medios sustentables
                para el medio ambiente. <br />
                • La alta demanda de los productos agrícolas hace las
                compra-venta colapsen y los productores pequeños no puedan
                exportar, dichos producidos a otras localidades.<br />
                • No cuentas con precios estables pasa comercialización de estos
                productos. <br />
                • La falta de infraestructura vial y transporte.<br />
                • Constante alza en precios de los peajes. <br />
                • Compra de producto importados de otros países.<br />
                • Productos de agro-insumo en constante alza de sus precios y
                más contaminantes para el ser humano y medio ambiente. <br />
                • Sequias, inundaciones, plagas, etc. Generado perdidas para el
                campesino.
              </p>
            </v-alert>
          </v-card>
        </v-container>
      </section>
      <section>
        <v-container class="mt-10">
          <v-row>
            <v-col sm="10" offset-sm="1" lg="8" offset-lg="2">
              <h2>
                <h3 class="font-weight-black primary--text">PRODUCTOS</h3>
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
                  <v-btn color="#5e2129" outlined to="/tienda"
                    ><v-icon>mdi-cart-plus</v-icon>
                    Comprar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section id="indicadores">
        <v-container class="mt-10">
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
        </v-container>
      </section>
      <div class="mt-10"></div>
      <div id="team" class="container-fluid mt-16">
        <h3 class="text-center font-weight-black primary--text">TESTIMONIOS</h3>
        <v-divider></v-divider>
        <div class="row justify-content-center mb-5">
          <div
            class="col mt-5"
            v-for="([testimonio, imagen, autor, like], a) in testimonios"
            :key="a"
          >
            <v-card class="ml-10 mr-10">
              <v-card class="mx-auto" color="#5e2129" dark>
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
                      <v-img class="elevation-6" alt="" :src="imagen"></v-img>
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

      <v-container class="pa-4 text-center mt-16">
        <h3 class="text-center font-weight-black primary--text">
          NUESTRO EQUIPO
        </h3>
        <v-divider></v-divider>
        <v-row class="fill-height mb-10" align="center" justify="center">
          <template v-for="(item, i) in team">
            <v-col :key="i" cols="12" md="4">
              <v-hover v-slot="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                  elevation="10"
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
        p: "Compra a los mejores precios!",
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
  background: url(fondo.png);
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
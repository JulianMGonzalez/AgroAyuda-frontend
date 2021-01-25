<template>
  <!-- App.vue -->
  <v-app>
    <section id="inicio">
      <v-banner elevation="7" class="mt-16">
        <v-carousel cycle show-arrows-on-hover hide-delimiters height="550">
          <v-carousel-item
            v-for="(item, i) in imagenes"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
      </v-banner>
    </section>

    <!-- Sizes your content based upon application components -->

    <v-main class="main">
      <section id="resumen" class="mr-5 ml-5">
        <v-sheet class="mx-auto" elevation="8" max-width="1200">
          <v-card>
            <v-alert border="top" elevation="9" type="warning" color="#1b5e20">
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
                productos. • La falta de infraestructura vial y transporte.<br />
                • Constante alza en precios de los peajes. <br />
                • Compra de producto importados de otros países.<br />
                • Productos de agro-insumo en constante alza de sus precios y
                más contaminantes para el ser humano y medio ambiente. <br />
                • Sequias, inundaciones, plagas, etc. Generado perdidas para el
                campesino.
              </p>
            </v-alert>
          </v-card>
        </v-sheet>
      </section>
      <section>
        <v-container>
          <v-row>
            <v-col sm="10" offset-sm="1" lg="8" offset-lg="2">
              <h2>
                <strong> productos populares </strong>
                <v-btn to="/tienda" small text color="#5e2129">Ver Todos</v-btn>
              </h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              sm="6"
              md="4"
              v-for="(producto) in tienda.slice(0, 3)"
              :key="producto.nombre"
            >
              <v-card
                outlined
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
                  <v-btn
                    
                    color="#5e2129"
                    outlined
                    to="/tienda"
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
        <v-sheet class="mx-auto" elevation="8" max-width="1200">
          <v-card>
            <h1 class="text-center">indicadores</h1>
            <p>no encuentro una api buena</p>
          </v-card>
        </v-sheet>
      </section>
      <div id="team" class="container-fluid">
        <div class="row justify-content-center mb-5">
          <div
            class="col mt-5"
            v-for="([testimonio, imagen, autor, like, share], a) in testimonios"
            :key="a"
          >
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
        src: require("@/assets/banner1.jpg"),
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
    tienda: [],
    cargando: true,
    onboarding: 0,
    alert: true,
    news: null,
  }),
  created() {
    this.list();
    
  },
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    list() {
      axios
        .get("http://localhost:3000/api/articulo/list", {
          headers: {
            token: this.$store.state.token,
          },
        })
        .then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].estado === 1) {
              this.tienda.push(response.data[i]);
            }
          }
          this.cargando = false;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>
<style>
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.main {
  background: url(fondo.png);
}
.texto {
  font-size: 18px;
}
</style>
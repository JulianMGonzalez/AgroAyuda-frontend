<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main class="main">
      <v-row>
        <v-col md="2" offset-lg="1">
          <div>
            <v-sheet
              v-if="$vuetify.breakpoint.lgAndUp"
              height="300"
              :elevation="4"
              class="pa-8"
              tile
            >
              <h3>Filtros</h3>
              <v-radio-group v-model="priceFilter" :mandatory="true">
                <v-radio
                  v-for="(price, i) in prices"
                  :key="i"
                  :label="price.nombre"
                  :value="i"
                />
              </v-radio-group>
            </v-sheet>
            <v-expansion-panels v-if="$vuetify.breakpoint.mdAndDown">
              <v-expansion-panel>
                <v-expansion-panel-header expand-icon="mdi-chevron-up">
                  Filtro
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-radio-group v-model="priceFilter" :mandatory="true">
                    <v-radio
                      v-for="(price, i) in prices"
                      :key="i"
                      :label="price.nombre"
                      :value="i"
                    />
                  </v-radio-group>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
        <v-col md="9" lg="7" xl="7">
          <div>
            <h3 class="text-center font-weight-black primary--text">
              PRODUCTOS
            </h3>
            <v-divider></v-divider>
            <v-text-field
              v-model="buscar"
              rounded
              solo
              filled
              placeholder="Buscar producto"
              label="Buscar"
            ></v-text-field>
            <ul>
              <li v-for="producto in buscarProducto" :key="producto.id">
                <div>
                  <v-img :src="producto.imagen" width="100%"></v-img>
                  <p>{{ producto.nombre }}</p>
                </div>
              </li>
            </ul>

            <v-row>
              <v-col sm="8" md="4" v-for="(producto, i) in tienda" :key="i">
                <v-hover v-slot="{ hover }">
                <v-card
                  outlined
                  rounded="xl"
                  :loading="loading"
                  class="mx-auto"
                  max-width="374"
                >
                  <template slot="progress">
                    <v-progress-linear
                      color="primary"
                      height="10"
                      indeterminate
                      class="ma-0 pa-0"
                    ></v-progress-linear>
                  </template>
                  <div class="img-contenedor">
                  <img
                    width="100%"
                    height="250"
                    :src="producto.imagen"
                  >
                  <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal display-3 white--text"
                          style="height: 100%"
                        >
                          <v-btn
                            icon
                            fab
                            top
                            class="white--text"
                            color="white"
                            ><v-icon>mdi-magnify</v-icon></v-btn
                          >
                        </div>
                      </v-expand-transition>
                  </div>
                  <div class="d-flex justify-center align-center flex-column">
                    <v-card-title class="overline ma-0 pa-0">{{
                      producto.nombre
                    }}</v-card-title>

                    <v-card-text
                      class="d-flex justify-center align-center flex-column ma-0 pa-0"
                    >
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>

                      <p class="body-1 mt-2">${{ producto.precio_venta }}</p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        v-if="!producto.disponible"
                        :disabled="producto.disponible"
                        color="secondary"
                        outlined
                        rounded
                        @click="
                          (producto.disponible = true),
                            addCard(JSON.parse(JSON.stringify(producto)))
                        "
                        ><v-icon>mdi-cart-plus</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="producto.disponible"
                        :disabled="producto.disponible"
                        color="secondary"
                        outlined
                        ><v-icon>mdi-cart-check</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </div>
                </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
<script>
import productos from "@/logic/APIproductos.js";

export default {
  data() {
    return {
      buscar: null,
      prices: [
        {
          nombre: "Todos",
          precio: "all",
        },
        {
          nombre: "5.000 a 100.000",
          precio: 5000,
        },
        {
          nombre: "100.000 a 500.000",
          precio: 100000,
        },
        {
          nombre: "Mas de 500.000",
          precio: 500000,
        },
      ],
      priceFilter: 0,
      checkbox: true,
      loading: false,
      tienda: [],
    };
  },
  created() {
    this.list();

    let cart = [];
    if (JSON.parse(localStorage.getItem("products"))) {
      cart = JSON.parse(localStorage.getItem("products"));
    } else {
      cart = [];
    }
    for (let index = 0; index < cart.length; index++) {
      for (let index2 = 0; index2 < this.tienda.length; index2++) {
        if (cart[index].id == this.tienda[index2].id) {
          this.tienda[index2].disponible = true;
        }
      }
    }
  },
  computed: {
    buscarProducto() {
      return this.tienda.filter((item) => item.nombre.includes(this.buscar));
    },
    filtrarProducto() {
      return this.tienda.filter((item) =>
        item.precio_venta.filter(this.prices.precio)
      );
    },
  },
  methods: {
    async list() {
      let response = await productos.get();
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].estado === 1) {
          if (response.data[i].disponible === "false") {
            response.data[i].disponible = false;
          }
          if (response.data[i].disponible === "true") {
            response.data[i].disponible = true;
          } else {
            response.data[i].disponible = false;
          }
          this.tienda.push(response.data[i]);
        }
      }
    },
    addCard(producto, quantity = 1) {
      let cart = [];
      if (JSON.parse(localStorage.getItem("products"))) {
        cart = JSON.parse(localStorage.getItem("products"));
      } else {
        cart = [];
      }
      cart.push(producto);
      localStorage.setItem("products", JSON.stringify(cart));
      for (var i = 0; i < this.tienda.length; i++) {
        this.loading = true;
        this.$store.commit("agregarCarrito", { itemId: producto.id, quantity });
        this.$store.commit("actualizarTienda", { show: true });
        setTimeout(() => (this.loading = false), 2000);
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 10;
  position: absolute;
  width: 100%;
  margin-bottom: 40px;
}
.img-contenedor img {
-webkit-transition:all .9s ease; /* Safari y Chrome */
-moz-transition:all .9s ease; /* Firefox */
-o-transition:all .9s ease; /* IE 9 */
-ms-transition:all .9s ease; /* Opera */
width:100%;
}
.img-contenedor:hover img {
-webkit-transform:scale(1.25);
-moz-transform:scale(1.25);
-ms-transform:scale(1.25);
-o-transform:scale(1.25);
transform:scale(1.25);
}
.img-contenedor {/*Ancho y altura son modificables al requerimiento de cada uno*/
overflow:hidden;
}
</style>
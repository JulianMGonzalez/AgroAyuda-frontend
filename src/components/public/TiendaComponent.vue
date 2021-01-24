<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main class="main">
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
     
      <v-container>
        <v-row>
          <v-col md="3" offset-lg="1">
            <div>
              <v-sheet
                v-if="$vuetify.breakpoint.mdAndUp"
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
                    :label="price"
                    :value="i"
                  />
                </v-radio-group>
              </v-sheet>
              <v-expansion-panels v-if="$vuetify.breakpoint.smAndDown">
                <v-expansion-panel>
                  <v-expansion-panel-header expand-icon="mdi-chevron-up">
                    Filtro
                    
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-radio-group v-model="priceFilter" :mandatory="true">
                      <v-radio
                        v-for="(price, i) in prices"
                        :key="i"
                        :label="price"
                        :value="i"
                      />
                    </v-radio-group>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-col>
          <v-col md="9" lg="7">
            <div>
              <h3>Productos</h3>

              <v-row>
            <v-col
              sm="8"
              md="4"
              v-for="(producto, i) in tienda"
              :key="i"
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
                    ${{ producto.precio_venta }}
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
                  <v-btn color="#5e2129" outlined @click="agregarCarrito(producto.codigo)"
                    ><v-icon small>mdi-cart-plus</v-icon>
                    Añadir al carro
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      prices: ["Todos", "5.000", "5.000 a 100.000", "$100.000 a $500.000", "Mas de 500.000"],
      priceFilter: 0,
      checkbox: true,
      loading: false,
      tienda: [],
    };
  },
  created() {
    this.list();
  },
  methods: {
    list() {
      axios
        .get("http://localhost:3000/api/articulo/list", {
          headers: {
            token: this.$store.state.token,
          },
        })
        .then((response) => {
          for(var i = 0; i < response.data.length; i++){
              if(response.data[i].estado === 1){
                var total = this.tienda.push(response.data[i])
              };
              }
          this.cargando = false;
        
        })
        .catch((error) => {
          console.log(error);
        });
    },
    agregarCarrito(index, quantity = 1) {
      for(var i = 0; i < this.tienda.length; i++){
        if(index === this.tienda[i].codigo){
          axios
          .post(
            "http://localhost:3000/api/carrito/add",
            {
              estado: this.tienda[i].estado,
              nombre: this.tienda[i].nombre,
              imagen: this.tienda[i].imagen,
              descripcion: this.tienda[i].descripcion,
              codigo: this.tienda[i].codigo,
              categoria: this.tienda[i].categoriaId,
              stock: this.tienda[i].stock,
              precio_venta: this.tienda[i].precio_venta,
            },
            {
              headers: {
                token: this.$store.state.token,
              },
            }
          )
          .then((response) => {
            
          })
          .catch((error) => {
            return error;
          });
        }
      }
      
      this.loading = true;
      this.$store.commit("agregarCarrito", { itemId: index, quantity });
      this.$store.commit("actualizarTienda", { show: true });
      setTimeout(() => (this.loading = false), 2000);
    },
  },
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
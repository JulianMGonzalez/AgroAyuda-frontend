<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col sm="8" md="5" offset-md="2" lg="4" offset-lg="3">
          <div>
            <v-row v-for="product in tienda" :key="product.id">
              <v-card
    outlined
    min-width="100%"
    class="mb-5 pa-4"
  >
    <div class="d-flex">
      <div>
        <v-img
          :src="product.imagen"
          width="120px"
          height="120px"
        />
      </div>
      
      <div class="d-flex flex-column justify-center">
        <v-card-title class="pt-0">
          {{ product.nombre }}
        </v-card-title>
        
        <v-card-subtitle>
          ${{ product.precio_venta }}
        </v-card-subtitle>
        
        <v-btn
          color="error"
          class="ml-4"
          outlined
          small
          @click="removeFromCart"
        >
          <v-icon small left>fa-minus</v-icon>
          Eliminar
        </v-btn>
      </div>
    </div>
  </v-card>
            </v-row>
          </div>
        </v-col>
        <v-col sm="4" md="3" order="first" order-sm="last">
          <div>
    <v-card
      outlined
    >
      <v-card-title>Detalles del Pago</v-card-title>

      <v-card-text>
        <p>Total: $2500</p>
        <v-btn
          color="primary"
          @click="goToCheckout"
        >
          Comprar
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
        </v-col>
      </v-row>
    </v-container>

    <v-card v-if="!this.$store.state.usuario">
      <p>Aun no has iniciado sesion?</p>
      <v-btn to="/login">
        <v-icon>mdi-account</v-icon>
        Iniciar Sesion</v-btn
      >
    </v-card>
  </v-main>
</template>

<script>
module.exports = {
  data() {
    return {
      checkoutForm: null,
      nameRules: [],
      name: '',
      emailRules: [],
      email: '',
      tienda: []
    }
    
  },
  created() {
    this.list();
  },
  methods: {
    goToCheckout() {
      console.log('checkout')
      this.$router.push({ name: 'Validacion' })
    },
    removeFromCart() {
      if (this.tienda) {
        axios
          .put(
            "http://localhost:3000/api/carrito/deactivate",
            {
              id: this.tienda[0].id,
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
      
    },
    list() {
      axios
        .get("http://localhost:3000/api/carrito/list", {
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
  
  }
}
</script>
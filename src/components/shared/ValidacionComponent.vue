<template>
  <v-container>
    <v-row>
      <v-col sm="6" offset-sm="3" xl="4" offset-xl="4">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="step > 1"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="step > 2" step="2"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-text-field
                v-model="data.name"
                :rules="[rules.required]"
                label="Nombre"
                required
              />

              <v-text-field
                v-model="data.email"
                :rules="[rules.required, rules.email]"
                label="E-mail"
                required
              />

              <v-text-field
                v-model="data.phone"
                :rules="[rules.required, rules.phone]"
                label="Numero celular"
                required
              />

              <v-btn color="primary" @click="next"> Continuar </v-btn>
              <v-btn text @click="$router.replace({ name: 'Compras' })">
                Cancelar
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-text-field
                v-model="data.street"
                label="Direccion"
                required
              />

              <v-text-field v-model="data.state" label="Departamento" required />

              <v-text-field
                v-model="data.zip"
                label="Zip"
                :rules="[rules.required, rules.zip]"
                required
              />

              <v-btn color="primary" @click="next"> Continuar </v-btn>

              <v-btn text @click="previous"> Volver </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-list disabled dense>
                <v-subheader class="title"> Detalles del pago </v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item v-for="(value, name) in data" :key="name">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ name }}: {{ value }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <v-btn color="primary" @click="overlay = !overlay" v-if="this.$store.state.usuario">
                Comprar
              </v-btn>
              <v-btn color="primary" to="/login" v-else>
                Iniciar
              </v-btn>

              <v-btn text @click="previous"> Volver </v-btn>
              <div class="text-center">
                <v-overlay :value="overlay" class="flex-column">
                  <p>Cargando orden</p>
                  <v-progress-circular
                    indeterminate
                    size="64"
                  ></v-progress-circular>
                </v-overlay>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      overlay: false,
      checkoutForm: false,
      data: {
        email: "",
        name: "",
        phone: "",
        street: "",
        state: "",
        zip: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        zip: (value) => value.length == 5 || "Must be five characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        phone: (value) => {
          const pattern = /\d{10}/;
          return pattern.test(value) || "Invalid phone number.";
        },
      },
    };
  },
  methods: {
    next() {
      this.step += 1;
    },
    previous() {
      this.step -= 1;
    },
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
          this.$router.push({ name: "Home" });
        }, 3000);
    },
  },
};
</script>
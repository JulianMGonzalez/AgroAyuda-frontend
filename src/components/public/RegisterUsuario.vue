<template>
  <v-app>
    <main id="inicio">
     
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 x14>
          <v-card class="mt-16">
            <div>
              <div class="d-flex justify-content-center align-items-center">
                <img
                  src="@/assets/LOGO (2).png"
                  width="150"
                  height="150"
                  alt=""
                />
                <h1 class="font-weight-black ">AgroAyuda</h1>
              </div>
              <h1 class="alert alert-secundary mt-5 ml-15">¡Unete a nuestros servicos de AgroAyuda!</h1>

              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="submit">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Nombre"
                    rules="required|max:20"
                  >
                    <v-text-field
                      class="ml-6 mr-6"
                      v-model="nombre"
                      :counter="20"
                      :error-messages="errors"
                      label="Nombre"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Telofono"
                    rules="required|max:20"
                  >
                    <v-text-field
                      class="ml-6 mr-6"
                      v-model="telefono"
                      :counter="20"
                      :error-messages="errors"
                      label="Telefono"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                  >
                    <v-text-field
                      class="ml-6 mr-6"
                      v-model="email"
                      :error-messages="errors"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="password"
                    rules="required|password:@confirm"
                  >
                    <v-text-field
                    
                      v-model="password"
                      :error-messages="errors"
                      type="password"
                      label="Contraseña"
                      required
                      class="ml-6 mr-6"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="confirm"
                    rules="required"
                    
                  >
                    <v-text-field
                      v-model="confirmation"
                      :error-messages="errors"
                      type="password"
                      label=" repita la contraseña"
                      required
                      class="ml-6 mr-6"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="checkbox"
                  >
                    <v-checkbox
                      class="ml-6 mr-6"
                      v-model="checkbox"
                      :error-messages="errors"
                      value="1"
                      label="terminos y condiciones"
                      type="checkbox"
                      required
                    ></v-checkbox>
                  </validation-provider>
                  <v-row class="mr-1 mb-2" justify="center">
                    <v-dialog v-model="dialog" persistent max-width="800">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          small
                        >
                          Terminos y condiciones
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="headline">
                          Terminos y Condiciones
                        </v-card-title>
                        <v-card-text
                          >Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Natus facere magni aliquam blanditiis voluptatem
                          assumenda ipsam omnis pariatur aliquid ex esse nostrum
                          iure autem nulla a, quo asperiores, impedit
                          officia?</v-card-text
                        >
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                          >
                            Salir
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                  <v-row justify="center" class="mt-3 mb-6">
                    <v-btn
                      color="orange"
                      class="mr-4 mb-4"
                      type="submit"
                      :disabled="invalid"
                      @click="registrar"
                    >
                      Enviar
                    </v-btn>
                    <v-btn class="mr-4 mb-4" color="error" @click="clear">
                      Limpiar
                    </v-btn>
                  </v-row>
                </form>
              </validation-observer>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </main>
    
  
  </v-app>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend(
  "required",
  {
    ...required,
    message: "{_field_} no puede ir vacio",
  },);
extend(
  'password', 
  {
    params: ['target'],
    validate(value, { target }) {
      return value === target;
  },
  message: 'Las contraseñas no son iguales'
});
extend("max", {
  ...max,
  message: "{_field_} no puede tener mas de {length} caracteres",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email no valido",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data: () => ({
    nombre: "",
    telefono: "",
    email: "",
    password: "",
    confirmation: "",
    checkbox: null,
    dialog: null,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    registrar() {
      axios
        .post(
          "http://localhost:3000/api/usuario/add",
          {
            nombre: this.nombre,
            email: this.email,
            password: this.password,
            telefono: this.telefono
          },
          {
            headers: {
              token: this.$store.state.token,
            },
          }
        )
        .then((response) => {
          swal("Buen Trabajo!", "Usuario Creado", "success");
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          return error;
        });
    },

    clear() {
      this.name = "";
      this.email = "";
      this.telefono = "";
      this.password = "";
      this.confirmation = "";
      this.checkbox = null;
      this.$refs.observer.reset();
    }
  },
};
</script>
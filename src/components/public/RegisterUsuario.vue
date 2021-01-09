<template>
  <v-app>
    <v-app-bar app color="orange" dense dark>
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="50"
        max-width="50"
        src="@/assets/TuDado.png"
      ></v-img>
      <v-toolbar-title class="font-weight-black"
        ><span class="#051C9E--text">TuDado</span></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                color="indigo darken-4"
                dark
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
              >
                <v-icon> mdi-microsoft-xbox-controller-menu </v-icon>
              </v-btn>
            </template>
            <span>Menu</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item>
            <v-btn
              depressed
              color="indigo darken-4"
              class="ml-2 text-white"
              elevation="4"
              @click="inicio()"
            >
              Inicio
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              depressed
              color="indigo darken-4"
              class="ml-2 text-white"
              elevation="4"
              @click="servicio()"
            >
              Servicios
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              depressed
              color="indigo darken-4"
              class="ml-2 text-white"
              elevation="4"
              @click="blog()"
            >
              Blog
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              v-if="!this.$store.state.usuario"
              depressed
              color="amber darken-1"
              class="ml-2"
              elevation="4"
              @click="entrar()"
              >Inicia Sesion</v-btn
            >
            <v-btn
              v-else
              depressed
              color="amber darken-1"
              class="ml-2"
              elevation="4"
              @click="salir()"
              >Salir</v-btn
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <main app>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 x14>
          <v-card>
            <div class="mt-13">
              <div class="d-flex justify-content-center align-items-center">
                <img
                  src="@/assets/TuDado.png"
                  width="150"
                  height="150"
                  alt=""
                />
                <h1 class="font-weight-black text-danger">TuDado</h1>
              </div>
              <h1 class="alert alert-secundary mt-5 ml-15">¡Unete a TuDado!</h1>

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
    <v-footer dark padless class="d-flex justify-center mt-10">
      <v-card flat tile class="indigo darken-4 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
            color="orange"
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          <div class="container p-4">
            <!--Grid row-->
            <div class="row">
              <!--Grid column-->
              <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="50"
                  max-width="50"
                  src="@/assets/TuDado.png"
                ></v-img>
                <h5 class="text-uppercase">TuDado</h5>

                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                  atque ea quis molestias. Fugiat pariatur maxime quis culpa
                  corporis vitae repudiandae aliquam voluptatem veniam, est
                  atque cumque eum delectus sint!
                </p>
              </div>
              <!--Grid column-->

              <!--Grid column-->
              <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="50"
                  max-width="50"
                  src="@/assets/TuDado.png"
                ></v-img>
                <h5 class="text-uppercase">Contacto</h5>

                <p>Nmeros lugares correos</p>
              </div>
              <!--Grid column-->
            </div>
            <!--Grid row-->
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>TuDado</strong><br />
          <a
            href="https://github.com/JulianMGonzalez/semana-5-69"
            class="btn btn-success"
            >GitHub</a
          >
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import sawl from "sweetalert";
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
    email: "",
    password: "",
    confirmation: "",
    checkbox: null,
    dialog: null,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
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
      this.password = "";
      this.confirmation = "";
      this.checkbox = null;
      this.$refs.observer.reset();
    },
    inicio() {
      this.$router.push({ name: "Home" });
    },
    entrar() {
      this.$router.push({ name: "Login" });
    },
    servicio() {
      this.$router.push({ name: "Servicio" });
    },
    blog() {
      this.$router.push({ name: "Blog" });
    },
    salir() {
      this.$store.dispatch("salir");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
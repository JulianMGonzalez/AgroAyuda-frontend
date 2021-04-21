
<template>
  <v-app id="inspire">
    <v-main class="main">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 secondary--text text--accent-3"
                        >
                          Accede a AgroAyuda!
                        </h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-facebook</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-google-plus</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-linkedin</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">El campo es de todos!</h4>
                        <v-form>
                          <v-text-field
                            v-model="email"
                            label="Email"
                            name="email"
                            prepend-icon="email"
                            type="text"
                            color="primary"
                            rounded
                            shaped
                            solo
                          />

                          <v-text-field
                            v-model="password"
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="primary"
                            rounded
                            shaped
                            solo
                          />
                        </v-form>
                        <h3 class="text-center mt-4">
                          Has olvidado tu contraseña?
                        </h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="primary" dark @click="ingresar"
                          >Ingresar</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="secondary">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hola!</h1>
                        <h5 class="text-center">
                          Ingresa tu informacion solicitada y unete a AgroAyuda
                        </h5>
                      </v-card-text>
                      <div
                        class="d-flex justify-content-center align-items-center"
                      >
                        <img
                          src="@/assets/logo footer.png"
                          width="150"
                          height="150"
                        />
                      </div>
                      <div class="text-center mt-10">
                        <v-btn rounded outlined dark @click="step++"
                          >Registrate</v-btn
                        >
                      </div>

                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="secondary">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          ¡Bienvenido de Vuelta!
                        </h1>
                        <h5 class="text-center">
                          ¡Ingresa a AgroAyuda y mira lo ultimo!
                        </h5>
                      </v-card-text>
                      <div
                        class="d-flex justify-content-center align-items-center"
                      >
                        <img
                          src="@/assets/logo footer.png"
                          width="150"
                          height="150"
                        />
                      </div>
                      <div class="text-center mt-10">
                        <v-btn rounded outlined dark @click="step--"
                          >Ingresa</v-btn
                        >
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 secondary--text text--accent-3"
                        >
                          Crear Cuenta
                        </h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-facebook</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-google-plus</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>mdi-linkedin</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">El campo es de todos!</h4>
                        <validation-observer
                          ref="observer"
                          v-slot="{ invalid }"
                        >
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
                              <v-dialog
                                v-model="dialog"
                                persistent
                                max-width="800"
                              >
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
                                    >Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Natus facere magni aliquam
                                    blanditiis voluptatem assumenda ipsam omnis
                                    pariatur aliquid ex esse nostrum iure autem
                                    nulla a, quo asperiores, impedit
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
                              <v-btn
                                class="mr-4 mb-4"
                                color="error"
                                @click="clear"
                              >
                                Limpiar
                              </v-btn>
                            </v-row>
                          </form>
                        </validation-observer>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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

extend("required", {
  ...required,
  message: "{_field_} no puede ir vacio",
});
extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Las contraseñas no son iguales",
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
  data() {
    return {
      step: 1,
      email: "",
      password: "",
      errorM: null,
      nombre: "",
      telefono: "",
      confirmation: "",
      checkbox: null,
      dialog: null,
    };
  },
  // beforeCreate(){
  //   this.$store.dispatch('autoLogin')? this.$router.push({name: 'Admin'}): false;
  //  },
  methods: {
    ingresar() {
      axios
        .post("http://localhost:3000/api/usuario/login", {
          email: this.email,
          password: this.password,
        })
        .then((respuesta) => {
          let user = respuesta.data.user;
          localStorage.setItem("user", JSON.stringify(user));
          return respuesta.data;
        })
        .then((data) => {
          swal("Buen Trabajo!", "Ingresando...", "success");
          this.$store.dispatch("guardarToken", data.tokenReturn);
        })
        .catch((error) => {
          //console.log(eror);
          swal("Error!", "credenciales son incorrectas", "error");
          this.errorM = null;
          console.log(error.response.status);
          if (error.response.status == 401) {
            this.errorM = "credenciales son incorrectas.";
          } else if (error.response.status == 404) {
            swal("Error!", "el usuario no existe", "error");
            this.errorM = "el usuario no existe";
          } else {
            swal("Error!", "Ocurrió un error con el servidor.", "error");
            this.errorM = "Ocurrió un error con el servidor.";
          }
        });
      this.$router.push({ name: "Home" });
      // this.$router.go(-1)
    },
    home() {
      this.$router.push({ name: "Home" });
    },
    submit() {
      this.$refs.observer.validate();
    },
    registrar() {
      axios
        .post(
          "http://localhost:3000/api/usuario/add",
          {
            nombre: this.nombre.toLowerCase(),
            email: this.email,
            password: this.password,
            telefono: this.telefono,
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
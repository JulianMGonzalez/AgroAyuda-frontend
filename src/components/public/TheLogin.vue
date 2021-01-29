<template>
  <v-app class="mt-16">
    <v-main id="inicio">
      
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 x14>
          <v-card>
            <v-toolbar dark color="silver darken-3">
              <v-toolbar-title> Acceso al Sistema </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="email"
                autofocus
                color="accent"
                label="Email"
                required
              >
              </v-text-field>
              
              <v-text-field
                v-model="password"
                type="password"
                color="accent"
                label="Password"
                required
                v-on:keyup.enter="ingresar()"
              >
              </v-text-field>
              <v-flex class="red--text" v-if="errorM">
                {{ errorM }}
              </v-flex>
            </v-card-text>
            <v-card-actions class="px-3 pb-3">
              <v-flex text-xs-right>
                <v-btn @click="ingresar()" color="primary">Ingresar</v-btn>
                <v-divider></v-divider>
                <v-btn @click="home()" color="error">A Casa!</v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-main>
  </v-app>
</template>
<script>
import sawl from "sweetalert";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      errorM: null,
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
        this.$router.go(-1)
    },
    home() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

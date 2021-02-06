<template>
  <v-app>
    <main id="inicio" class="mt-5">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 x14>
          <v-card class="mt-16">
            <div>
              <div class="d-flex justify-content-center align-items-center">
                <img
                  :src="user.imagen"
                  width="150"
                  height="150"
                  alt=""
                  
                />
              </div>
              <v-text-field
                class="ml-6 mr-6"
                v-model="user.nombre"
                :counter="10"
                label="Nombre"
                required
              ></v-text-field>

              <v-text-field
                class="ml-6 mr-6"
                v-model="user.email"
                label="E-mail"
                disabled
                required
              ></v-text-field>

              <v-text-field
                class="ml-6 mr-6"
                v-model="user.telefono"
                :counter="10"
                label="Telefono"
                required
              ></v-text-field>

              <v-divider></v-divider>

              <v-select
                dense
                class="ml-6 mr-6"
                v-model="select"
                :items="items"
                :rules="[(v) => !!v || 'Item is required']"
                label="Tipo de Documento"
              ></v-select>

              <v-text-field
                class="ml-6 mr-6"
                v-model="user.num_documento"
                :counter="10"
                label="Numero de Documento"
                required
              ></v-text-field>

              <v-divider></v-divider>

              <v-text-field
                class="ml-6 mr-6"
                v-model="user.direccion"
                :counter="10"
                label="Dirección"
                required
              ></v-text-field>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    usuario: [],
    select: null,
    items: [
        'C.C.',
        'C.E.'
      ],
  }),
  created() {
    this.getUserDetails();
  },
  methods: {
    getUserDetails() {
      let user = localStorage.getItem("user");
      if (user) {
        this.user = JSON.parse(user);
      }
    },
  },
};
</script>
<style scoped>
</style>
<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="usuario"
        sort-by="nombre"
        class="elevation-1"
        :loading="cargando"
        loading-text="Cargando... espera"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Usuario</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <template
              ><v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field
            ></template>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Agregar Usuario
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline"> {{ formTitle }} </span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.id"
                          label="Id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                          auto-grow
                          no-resize
                          counter="256"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.telefono"
                          label="Telefono"
                          
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.password"
                          label="Contraseña"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.rol"
                          label="Rol"
                        ></v-text-field>
                      </v-col>
                      
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >¿Quieres cambiar de estado este elemento?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Guardar</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon medium class="mr-2" @click="editItem(item)" color="orange">
            mdi-pencil
          </v-icon>
          <v-icon medium @click="deleteItem(item)" color="green">
            <template v-if="item.estado"> mdi-swap-vertical</template>
            <template v-else>mdi-swap-horizontal</template>
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="list"> Actualizar </v-btn>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    cargando: true,
    search: '',
    headers: [
      { text: "ID", value: "id" },
      { text: "Nombre", align: "start", sortable: true, value: "nombre" },
      { text: "E-mail", value: "email" },
      { text: "Telefono", value: "telefono" },
      { text: "Rol", value: "rol" },
      { text: "Estado", value: "estado" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    usuario: [],
    editedIndex: -1,
    editedItem: {
      id:0,
      nombre: "",
      email: "",
      telefono: "",
      estado: 0,
    },
    defaultItem: {
      id:0,
      nombre: "",
      email: "",
      telefono: "",
      estado: 1,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregar usuario" : "Editar usuario";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.list();
  },

  methods: {
    list() {
      axios
        .get("http://localhost:3000/api/usuario/list", {
          headers: {
            token: this.$store.state.token
          }
        })
        .then((response) => {
          this.usuario = response.data;
          this.cargando = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      if (this.editedItem.estado === 1) {
        axios
          .put("http://localhost:3000/api/usuario/deactivate", {
            id: this.editedItem.id,
          }, {
          headers: {
            token: this.$store.state.token
          }
        })
          .then((response) => {
            this.list();
          })
          .catch((error) => {
            return error;
          });
      } else {
        axios
          .put("http://localhost:3000/api/usuario/activate", {
            id: this.editedItem.id,
          }, {
          headers: {
            token: this.$store.state.token
          }
        })
          .then((response) => {
            this.list();
          })
          .catch((error) => {
            return error;
          });
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        axios
          .put("http://localhost:3000/api/usuario/update", {
            id: this.editedItem.id,
            nombre: this.editedItem.nombre,
            email: this.editedItem.email,
            telefono: this.editItem.telefono,
            password: this.editedItem.password,
            rol: this.editedItem.rol,
          }, {
          headers: {
            token: this.$store.state.token
          }
        })
          .then((response) => {
            this.list();
          })
          .catch((error) => {
            return error;
          });
      } else {
        axios
          .post("http://localhost:3000/api/usuario/add", {
            estado: 1,
            id: this.editedItem.id,
            nombre: this.editedItem.nombre,
            email: this.editedItem.email,
            telefono: this.editItem.telefono,
            password: this.editedItem.password,
            rol: this.editedItem.rol,
          }, {
          headers: {
            token: this.$store.state.token
          }
        })
          .then((response) => {
            this.list();
          })
          .catch((error) => {
            return error;
          });
      }
      this.close();
    },
  },
};
</script>
<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="categorias"
        sort-by="nombre"
        class="elevation-1"
        :loading="cargando"
        loading-text="Cargando... espera"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Categorias</v-toolbar-title>
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
                  Agregar Categoria
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
                          v-model="editedItem.nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="editedItem.descripcion"
                          label="Descripcion"
                          auto-grow
                          no-resize
                          counter="256"
                        ></v-textarea>
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
      {
        text: "Nombre Categoria",
        align: "start",
        sortable: true,
        value: "nombre",
      },
      { text: "Descripcion", value: "descripcion" },
      { text: "Estado", value: "estado" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    categorias: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      descripcion: "",
      estado: 0,
    },
    defaultItem: {
      nombre: "",
      descripcion: "",
      estado: 1,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregar categoria" : "Editar categoria";
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
        .get("http://localhost:3000/api/categoria/list", {
          headers: {
            token: this.$store.state.token
          }
        })
        .then((response) => {
          this.categorias = response.data;
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
          .put("http://localhost:3000/api/categoria/deactivate", {
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
          .put("http://localhost:3000/api/categoria/activate", {
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
          .put("http://localhost:3000/api/categoria/update", {
            id: this.editedItem.id,
            nombre: this.editedItem.nombre,
            descripcion: this.editedItem.descripcion,
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
          .post("http://localhost:3000/api/categoria/add", {
            id: this.editedItem.id,
            nombre: this.editedItem.nombre,
            descripcion: this.editedItem.descripcion,
            estado: 0,
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
<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="blogs"
        sort-by="nombre"
        class="elevation-1"
        :loading="cargando"
        loading-text="Cargando... espera"
        :search="search"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>blogs</v-toolbar-title>
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
                  Agregar blog
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
                          label="id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.titulo"
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
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.estado"
                          label="estado"
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
        <template v-slot:[`item.imagen`]="{ item }">
          <div class="p-2">
            <v-img
              :src="item.imagen"
              height="50px"
              width="50px"
            ></v-img>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
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
    search: "",
    headers: [
      { text: "ID", value: "id" },
      { text: "Usuario", value: "usuarioId" },
      { text: "Nombre blog", align: "start", sortable: true, value: "titulo"},
      { text: "Contenido", align: "start", sortable: true, value: "descripcion"},
      { text: "Estado", align: "start", sortable: true, value: "estado"},
      { text: "Actions", value: "actions", sortable: false },
    ],
    blogs: [],
    usuarios: [],
    categoria: "",
    editedIndex: -1,
    editedItem: {
      id: 0,
      titulo: "",
      descripcion: "",
      estado: 0,
    },
    defaultItem: {
      id: 0,
      titulo: "",
      descripcion: "",
      estado: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregar blog" : "Editar blog";
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
    this.listUsuarios()
  },

  methods: {
    list() {
      axios
        .get("http://localhost:3000/api/blog/list", {
          headers: {
            token: this.$store.state.token,
          },
        })
        .then((response) => {
            this.blogs = response.data
            this.cargando = false;
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listUsuarios() {
      axios
        .get("http://localhost:3000/api/usuario/list", {
          headers: {
            token: this.$store.state.token,
          },
        })
        .then((response) => {
          this.usuarios = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editItem(item) {
      this.editedIndex = item.id;
      this.categoria = item ? item.categoriaId : "";
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
          .put(
            "http://localhost:3000/api/blog/deactivate",
            {
              id: this.editedItem.id,
            },
            {
              headers: {
                token: this.$store.state.token,
              },
            }
          )
          .then((response) => {
            this.list();
          })
          .catch((error) => {
            return error;
          });
      } else {
        axios
          .put(
            "http://localhost:3000/api/blog/activate",
            {
              id: this.editedItem.id,
            },
            {
              headers: {
                token: this.$store.state.token,
              },
            }
          )
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
        this.categoria = "";
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
          .put(
            "http://localhost:3000/api/blog/update",
            {
              id: this.editedItem.id,
              usuarioId: this.usuarios[0].id,
              titulo: this.editedItem.titulo,
              descripcion: this.editedItem.descripcion,
              estado: this.editedItem.estado
            },
            {
              headers: {
                token: this.$store.state.token,
              },
            }
          )
          .then((response) => {
            this.list();
          })
          .catch((error) => {
            return error;
          });
      } else {
        axios
          .post(
            "http://localhost:3000/api/blog/add",
            {
              id: this.editedItem.id,  
              usuarioId: this.usuarios[0].id,
              titulo: this.editedItem.titulo,
              descripcion: this.editedItem.descripcion,
              estado: this.editedItem.estado
              
            },
            {
              headers: {
                token: this.$store.state.token,
              },
            }
          )
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
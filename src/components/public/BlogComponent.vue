<template>
  <!-- App.vue -->

  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main class="main">
      <!-- Provides the application the proper gutter -->

      <v-row justify="space-around">
        <v-col cols="auto">
          <v-dialog transition="dialog-bottom-transition" max-width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
                v-if="$store.state.usuario"
                >Crear pregunta</v-btn
              >
              <v-btn color="primary" to="/login" v-else>Iniciar Sesion</v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <validation-observer ref="observer" v-slot="{ invalid }">
                  <form @enviar.prevent="submit">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Titulo"
                      rules="required|max:50"
                    >
                      <v-text-field
                        class="ml-6 mr-6"
                        v-model="blog.titulo"
                        :counter="50"
                        :error-messages="errors"
                        label="Título"
                        required
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Descripción"
                      rules="required|max:560"
                    >
                      <v-textarea
                        class="ml-6 mr-6"
                        v-model="blog.descripcion"
                        :error-messages="errors"
                        label="Descripción"
                        required
                        no-resize
                        counter="560"
                      ></v-textarea>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Categoria"
                      rules="required"
                    >
                      <v-combobox
                        :error-messages="errors"
                        color="primary"
                        class="ml-6 mr-6"
                        v-model="chips"
                        :items="items"
                        chips
                        clearable
                        label="Seleccionar categoria"
                        multiple
                        prepend-icon="mdi-filter-variant"
                        solo
                      >
                        <template
                          v-slot:selection="{ attrs, item, select, selected }"
                        >
                          <v-chip
                            color="primary"
                            v-bind="attrs"
                            :input-value="selected"
                            close
                            @click="select"
                            @click:close="remove(item)"
                          >
                            <strong>{{ item }}</strong
                            >&nbsp;
                          </v-chip>
                        </template>
                      </v-combobox>
                    </validation-provider>
                    <div class="text-center">
                      <v-btn
                        class="ma-3"
                        type="submit"
                        @click="enviar(), (dialog.value = false), cerrar()"
                        :disabled="invalid"
                        color="secondary"
                      >
                        Publicar
                      </v-btn>
                      <v-btn
                        @click="(dialog.value = false), cerrar()"
                        color="error"
                        class="ma-3"
                      >
                        Cerrar
                      </v-btn>
                    </div>
                  </form>
                </validation-observer>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
      <v-card
        v-model="model"
        class="mx-auto mt-10"
        elevation="8"
        max-width="1200"
        height="250"
        v-for="(blog, i) in blogs"
        :key="i"
      >
        <v-card-text>
          <div>Categoria</div>
          <p class="display-1 text--primary">{{ blog.titulo }}</p>
          <div class="text--primary">
            {{ blog.usuarioId }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="secondary" @click="abrir(blog)"> Leer Mas </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <v-card
            v-if="reveal"
            class="transition-fast-in-fast-out v-card--reveal"
            style="height: 100%"
          >
            <v-card-text class="pb-0">
              <p class="display-1 text--primary">{{ blog.titulo }}</p>
              <p>
                {{ blog.descripcion }}
              </p>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-btn text color="secondary" @click="reveal = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import blogs from "@/logic/APIblogs.js";
import { required, max, regex } from "vee-validate/dist/rules";
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

extend("max", {
  ...max,
  message: "{_field_} no puede tener {length} caracteres!",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} no es reconocido {regex}",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    dialog: false,
    model: null,
    reveal: false,
    loading: false,
    blog: {},
    blogs: [],
    name: "",
    items: ["Cultivo", "Vender", "Cosecha", "Verduras", "Fruta"],
    chips: ["Cultivo", "Vender", "Cosecha", "Verduras", "Fruta"],
  }),
  created() {
    this.list();
  },
  methods: {
    abrir(item){
      let blog = JSON.parse(JSON.stringify(this.blogs))
      for(let i=0; i < blog.length; i++){
        if(blog[i].id === item.id){
          this.reveal = true
        }
        
      }
        

    },
    cerrar() {
      this.blog = {};
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    async enviar() {
      await blogs.post({
            usuarioId: this.$store.state.usuario.id,
            titulo: this.blog.titulo,
            descripcion: this.blog.descripcion,
            estado: 1,
          },
          {
            headers: {
              token: this.$store.state.token
            }
          }
          );
      this.$refs.observer.validate();
    },
    async list() {
      try {
        let response = await blogs.get();
        this.blogs = response.data;
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.main {
  background: url("fondo.png");
}
</style>
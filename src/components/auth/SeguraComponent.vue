<template>
<v-app id="inspire">
  <v-item-group mandatory>
    <v-sheet
      class="overflow-y-auto"
      max-height="600"
      tile
    >
      
        <template v-slot:default="{ active, toggle }">
          <v-sheet
            :color="active ? $vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4' : undefined"
            class="px-4 pt-4 pb-3"
            tile
            style="cursor: pointer;"
            @click="toggle"
          >
            <div
              :class="[`text-${c}`, active && `mb-${margin}`]"
              class="transition-swing"
              v-text="text"
            >
            </div>

            <v-expand-transition>
              <v-responsive
                v-if="active"
                max-width="350"
              >
                <div class="d-flex justify-space-between caption">
                  <div>
                    <div class="grey--text mb-2">
                      Font
                    </div>

                    <div class="font-weight-medium">
                      Roboto
                    </div>
                  </div>

                  <div>
                    <div class="grey--text mb-2">
                      Weight
                    </div>

                    <div
                      class="font-weight-medium"
                      v-text="weight"
                    ></div>
                  </div>

                  <div>
                    <div class="grey--text mb-2">
                      Size
                    </div>

                    <div
                      class="font-weight-medium"
                      v-text="size"
                    ></div>
                  </div>

                  <div>
                    <div class="grey--text text-darken-1 mb-2">
                      Letter spacing
                    </div>

                    <div
                      class="font-weight-medium"
                      v-text="spacing"
                    ></div>
                  </div>
                </div>
              </v-responsive>
            </v-expand-transition>
          </v-sheet>
        </template>
    </v-sheet>
  </v-item-group>


    <v-main class="grey lighten-5">
      <v-container>
        
        <router-view/>
        <h1>Hola</h1>
      </v-container>
    </v-main>
  </v-app>

</template>

<script>

export default {
  name: 'SeguraComponent',

  components: {
    
  },
  created(){
    this.$store.dispatch('autoLogin');
  },
};
</script>

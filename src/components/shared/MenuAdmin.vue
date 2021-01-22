<template>
<div>
   <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary>
    
      <!--  -->
      <v-card
      class="mx-auto"
      width="300"
    >
      <v-list>
        <v-list-item
        :to="{name: 'Home'}">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
  
        <v-list-group
          prepend-icon="mdi-account-circle"
        >
          
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="([title, icon, ruta], i) in gestion"
              :key="i"
              :to= "{name: ruta}"
            >
              <v-list-item-title v-text="title"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="icon" color="red"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
  
          <v-list-group                         
            prepend-icon="mdi-account-circle"
            v-if="this.$store.state.usuario.rol === 'Administrador'"
          >
            <template v-slot:activator v->
              <v-list-item-content>
                <v-list-item-title>Usuario</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="([title, icon, ruta], i) in cruds"
              :key="i"
              :to= "{name: ruta}"
            >
              <v-list-item-title v-text="title"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="icon" color="red"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
      </v-list>
    </v-card>
    </v-navigation-drawer>
        <v-app-bar app color="white" class="mt-3">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      
      <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="50"
          max-width="50"
          src="@/assets/LOGO (2).png"
      ></v-img>
      <v-toolbar-title>AgroAyuda</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn 
      icon
      class="mr-5"
      @click="salir()">
          <v-icon> mdi-logout</v-icon>
          <span>Salir</span>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        gestion: [
        ['Categoria', 'mdi-numeric-9-plus-box', 'Categoria'],
        ['Articulo', 'mdi-numeric-9-plus-box', 'Articulo'],
        ['Ventas', 'mdi-numeric-9-plus-box', 'Venta']
      ],
      cruds: [
        ['Usuario', 'mdi-plus-outline', 'Usuario']
        
      ],
    }),
    methods:{
    salir(){
    this.$store.dispatch('salir');
    this.$router.push({ name: "Login" });

  }
  }
}
</script>
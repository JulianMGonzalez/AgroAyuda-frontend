import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/public/Home.vue'
import store from '@/store/index'
import swal from 'sweetalert'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/public/Login.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      public: true
    }
  },

  {
    path: '/tienda',
    name: 'Tienda',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tienda" */ '../views/public/Tienda.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/compras',
    name: 'Compras',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tienda" */ '../views/auth/Compras.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/registrar',
    name: 'Registrar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/public/Registrar.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/servicio',
    name: 'Servicio',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "servicio" */ '../views/public/Servicio.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "blog" */ '../views/public/Blog.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/auth/Admin.vue'),
    meta: {
      auth: true
    },
    children: [

      {
        path: 'categoria',
        name: 'Categoria',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "categoria" */ '../views/auth/Categoria.vue'),
        meta: {
          auth: true,
          administrador: true,
          vendedor: false
        }
      },
      {
        path: 'ventas',
        name: 'Venta',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "venta" */ '../views/auth/Venta.vue'),
        meta: {
          auth: true,
          administrador: true,
          vendedor: true
        }
      },
      {
        path: 'articulo',
        name: 'Articulo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "articulo" */ '../views/auth/Articulo.vue'),
        meta: {
          auth: true,
          administrador: true,
          vendedor: true
        }
      },
      {
        path: 'usuario',
        name: 'Usuario',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "usuario" */ '../views/auth/Usuario.vue'),
        meta: {
          auth: true,
          administrador: true,
          vendedor: false
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.public)) {
    next();
  } else if (to.matched.some(record => record.meta.auth)) {
    if (store.state.usuario && store.state.usuario.rol === 'Administrador') {
      next();
    }else if(store.state.usuario && store.state.usuario.rol === 'Vendedor'){
      next();
    }
    else {
      swal("Error!", 'No tienes permisos', "error");
      router.push({ name: 'Home' });

    }
  } else {
    console.log("permisos pero sin metas")
    next()
  }
})

export default router

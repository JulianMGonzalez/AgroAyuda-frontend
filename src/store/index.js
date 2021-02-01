import Vue from "vue";
import Vuex from "vuex";
import decode from "jwt-decode";
import products from '@/components/auth/DataArticulo'
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        usuario: null,
        products,
        snackbar: {
            show: false,
            variant: 'primary',
            message: 'Bien! Producto agregado al carrito'
        },
        cart: [] // { itemId, quantity }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUsuario(state, usuario) {
            state.usuario = usuario;
        },
        agregarCarrito(state, payload) {
            const { itemId, quantity } = payload
            const idx = state.cart.findIndex((product) => {
              return product.itemId === itemId
            })
            if (idx === -1) {
              state.cart.push({ itemId, quantity })
            } else {
              state.cart[idx].quantity += 1
            }
          },
          actualizarTienda(state, settings) {
            state.snackbar = {
              ...state.snackbar,
              ...settings
            }
          }
    },
    actions: {
        guardarToken({ commit }, token) {
            commit("setToken", token)
            commit("setUsuario", decode(token))
            localStorage.setItem("token", token)
        },
        autoLogin({ commit }) {
            let token = localStorage.getItem("token");
            if (token) {
                commit("setToken", token);
                commit("setUsuario", decode(token));
            }

          // router.push({ name: 'Home' }).catch(() => {});

        },
        salir({ commit }) {
            commit("setToken", null);
            commit("setUsuario", null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            //router.push({ name: 'Home' });
        }
    },
    modules: {}
});
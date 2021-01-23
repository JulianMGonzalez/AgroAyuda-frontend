export default {
    data: () => ({
        tienda: []
    }),
    created() {
        this.list();
    },
    methods: {
        list() {
            axios
                .get("http://localhost:3000/api/articulo/list", {
                    headers: {
                        token: this.$store.state.token,
                    },
                })
                .then((response) => {
                    this.tienda = response.data;
                    this.cargando = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
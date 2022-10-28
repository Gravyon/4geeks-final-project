import axios from "axios";

const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            product: [],
            productDetail: {},
            products: [],

            listaFavoritos: [],
            // listaCarrito: [],

            auth: false,
            register: false,
        },
        actions: {
            // fecht de los cuadros
            getProduct: async () => {
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/product"
                    ); //ir a buscar
                    const data = await response.json();
                    console.log(data);
                    setStore({
                        product: data,
                    }); //promesa 2
                } catch (err) {
                    // console.log(err);
                }

                // fecht de los detalles
            },
            // funcion para obtener detalles de los cuadros
            getProductDetail: async (id) => {
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/product/" + id
                    );
                    const data = await response.json();
                    console.log(data);

                    setStore({
                        productDetail: data,
                    });
                } catch (err) {
                    console.log(err);
                }
            },
            // funcion para Login
            login: async (email, password) => {
                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/login", {
                            email: email,
                            password: password,
                        }
                    );

                    localStorage.setItem("token", response.data.msg);
                    console.log(response.data.msg);
                    setStore({
                        auth: true,
                    });
                    return true;
                } catch (error) {
                    console.log(error);
                    if (error.code === "ERR_BAD_REQUEST") {
                        alert(error.response.data.msg);
                    }
                }
            },

            // logout

            logout: () => {
                localStorage.removeItem("token");
                setStore({
                    auth: false,
                });
                return false;
            },
            getProducts: (product) => {
                const store = getStore();
                if (store.products.includes(product)) {
                    getActions().removeProduct(product);
                } else {
                    setStore({
                        products: [...store.products, product],
                    });
                }
            },
            removeProduct: (product) => {
                const store = getStore();
                setStore({
                    products: store.products.filter((item) => item !== product),
                });
            },
            // constante marcar favoritos
            marcarFavoritos: (i) => {
                let store = getStore();
                if (store.listaFavoritos.includes(i)) {
                    getActions().eliminarFavoritos(i);
                } else {
                    setStore({
                        listaFavoritos: [...store.listaFavoritos, i],
                    });
                }
            },

            // constante eliminar favoritos
            eliminarFavoritos: (i) => {
                let store = getStore();
                setStore({
                    listaFavoritos: store.listaFavoritos.filter((item) => item !== i),
                });
            },

            // funcion para crear productos

            createProduct: async (name, description, category, url, price) => {
                try {

                    const response = await axios.post(process.env.BACKEND_URL + "/api/product", {
                        name: name,
                        description: description,
                        category: category,
                        url: url,
                        price: price
                    })

                } catch (error) {
                    console.log(error)
                }
            }
        },
    };
};

export default getState;
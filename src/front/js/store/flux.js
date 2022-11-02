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
            shoppingList: [],
            // listaCarrito: [],
            // productId: [],
            // productId: "",
            userId: null,
            auth: false,
            registered: false,
        },
        actions: {
            // fecht de los cuadros
            getProduct: async () => {
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/product"
                    ); //ir a buscar
                    const data = await response.json();
                    // console.log(data);
                    setStore({
                        product: data,
                    }); //promesa 2
                } catch (err) {
                    console.log(err);
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
                    console.log(response);
                    console.log(response.data.user.id);
                    setStore({
                        auth: true,
                        userId: response.data.user.id,
                    });
                    return true;
                } catch (error) {
                    console.log(error);
                    if (error.code === "ERR_BAD_REQUEST") {
                        alert(error.response.data.msg);
                    }
                }
            },

            //  Funcion para logout

            logout: () => {
                localStorage.removeItem("token");
                setStore({
                    auth: false,
                });
                return false;
            },
            addProducts: (product) => {
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

            createFavorite: async (product_id) => {
                let store = getStore();

                let user_id = store.userId;
                console.log(user_id);

                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/favorites", {
                            id_products: product_id,
                            id_user: user_id,
                        }
                    );
                    console.log(response);
                    return response;
                } catch (error) {
                    console.log(error);
                    console.log(error.response.status);
                    console.log(product_id);
                    if (error.response.status === 404) {
                        getActions().eliminarFavoritos(product_id);
                    }
                }
            },

            // Funcion para eliminar favoritos en la base
            eliminarFavoritos: async (product_id) => {
                let store = getStore();
                let user_id = store.userId;

                try {
                    const response = await axios.delete(
                        process.env.BACKEND_URL + "/api/favorites", {
                            data: {
                                id_products: product_id,
                                id_user: user_id,
                            },
                        }
                    );
                    alert(response.data.msg);
                    return response;
                } catch (error) {
                    console.log(error);
                }
            },

            //funcion para obtener todos los favoritos de un usuario

            getFavorites: async () => {
                let store = getStore();
                let user_id = store.userId;
                // console.log(user_id)
                try {
                    const response = await axios.get(
                        process.env.BACKEND_URL + "/api/user/" + user_id + "/favorites"
                    );
                    // console.log(response.data.results)
                    setStore({
                        listaFavoritos: response.data.results,
                        // userId: response.user_id
                    });
                } catch (error) {
                    console.log(error);
                }
            },

            // funcion para crear productos

            createProduct: async (name, description, category, url, price) => {
                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/product", {
                            name: name,
                            description: description,
                            category: category,
                            url: url,
                            price: price,
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            },

            signup: async (username, email, password) => {
                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/user", {
                            username: username,
                            email: email,
                            password: password,
                        }
                    );

                    if (response.status === 200) {
                        getActions().login(email, password);
                        setStore({
                            registered: true,
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            //Funcion para validar el Token y mantener al usuario registrado

            validToken: async () => {
                let accessToken = localStorage.getItem("token");
                try {
                    const response = await axios.get(
                        process.env.BACKEND_URL + "/api/valid-token", {
                            headers: {
                                Authorization: "Bearer " + accessToken,
                            },
                        }
                    );
                    // console.log(accessToken);
                    setStore({
                        auth: response.data.status,
                        userId: response.data.user.id,
                    });
                    console.log(auth);
                    return;
                } catch (error) {
                    // console.log(error);
                    if (error.code === "ERR_BAD_REQUEST") {
                        setStore({
                            auth: false,
                        });
                    }
                    return false;
                }
            },
<<<<<<< HEAD

            // ChangePassword: async (email) => {
            //     try {
            //         const response = await axios.put(
            //             process.env.BACKEND_URL + "/api/user/password/" + user_id, {
            //                 email: email,
            //                 password: password,
            //             }
            //         );

            //         if (response.status === 200) {
            //             setStore({
            //             });
            //         }
            //     } catch (error) {
            //         console.log(error);
            //     }
            // },
=======
            // funcion para agregar productos al carrito
            createShopping: async (product_id) => {

                let store = getStore();

                let user_id = store.userId
                console.log(user_id);

                try {

                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/shopping", {
                            id_products: product_id,
                            id_user: user_id
                        }
                    )
                    console.log(response);
                    return response;

                } catch (error) {
                    console.log(error);
                    console.log(error.response.status)
                    console.log(product_id)

                }
            },

            //funcion para eliminar productos del carrito

            deleteShopping: async (product_id) => {
                let store = getStore();
                let user_id = store.userId

                try {
                    const response = await axios.delete(
                        process.env.BACKEND_URL + "/api/shopping", {
                            data: {

                                id_products: product_id,
                                id_user: user_id
                            }
                        }
                    )
                    alert(response.data.msg);
                    return response;
                } catch (error) {
                    console.log(error)

                }
            },

            // funcion para obtener todos los productos agregados al carrito

            getShopping: async () => {

                let store = getStore();
                let user_id = store.userId
                // console.log(user_id)

                try {
                    const response = await axios.get(
                        process.env.BACKEND_URL + "/api/user/" + user_id + "/shopping"
                    )
                    // console.log(response.data.results)

                    setStore({

                        shoppingList: response.data.results
                        // userId: response.user_id
                    })

                } catch (error) {
                    console.log(error)
                }
            },
>>>>>>> 8eab3af37ad230185f604edf78a222abe83771a3
        },
    };
};

export default getState;
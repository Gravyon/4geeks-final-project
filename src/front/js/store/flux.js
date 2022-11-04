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

            userId: null,
            auth: false,
            registered: false,
            profile: {},
            priceList: [],
            sum: 0,
        },
        actions: {
            // Profile
            // Profile
            userProfile: async () => {
                const userToken = localStorage.getItem("token");
                try {
                    const response = await axios.get(
                        process.env.BACKEND_URL + "/api/profile", {
                            headers: {
                                Authorization: "Bearer " + userToken,
                            },
                        }
                    );
                    // console.log(data)
                    setStore({
                        profile: response.data.user,
                    });
                    console.log(response.data);
                    return true;
                } catch (error) {
                    console.log(error);
                    if (error.code === "ERR_BAD_REQUEST") {
                        console.log(error.response.data.msg);
                    }
                }
            },
            //Update user info function
            updateUser: async (email, username, password) => {
                let store = getStore();
                let user_id = store.userId;
                // userId = store.profile.user.id
                try {
                    const response = await axios.put(
                        process.env.BACKEND_URL + "/api/user/" + user_id, {
                            email: email,
                            username: username,
                            password: password,
                        }
                    );
                } catch (error) {
                    console.log(error);
                    if (error.response.status === 401) {
                        alert(error.response.data.msg);
                        return error.response.data.msg;
                    }
                    if (error.response.status === 409) {
                        alert(error.response.data.msg);
                        return error.response.data.msg;
                    }
                    if (error.response.status === 404) {
                        alert(error.response.data.msg);
                        return error.response.data.msg;
                    }
                }
            },
            filterSearch: (searchValue) => {
                let store = getStore();
                let results = store.product.filter((item) => {
                    if (
                        item.name
                        .toString()
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                        item.description
                        .toString()
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    ) {
                        console.log(item);
                        return item;
                    }
                });

                setStore({
                    product: results,
                });
            },
            // fecht de los cuadros
            getProduct: async () => {
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/product"
                    ); //ir a buscar
                    const data = await response.json();

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
                    return response.data.msg;
                } catch (error) {
                    console.log(error);
                    console.log(error.response.status);

                    if (error.response.status === 404) {
                        alert(
                            error.response.data.msg +
                            ". You'll be rediredted to the register page"
                        );
                        return error.response.data.msg;
                    } else if (error.response.status === 401) {
                        alert(error.response.data.msg);
                        return error.response.data;
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

            //Funcion para crear favoritos
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
                    } else if (error.response.data === "User is not logged in") {
                        alert(error.response.data);
                        return error.response.data;
                        alert(
                            error.response.data + ". You'll be rediredted to the login page"
                        );
                        return error.response.data;
                    }
                }
            },

            // Funcion para eliminar favoritos en la base de datos
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
                    getActions().getFavorites();
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
                    // console.log(error);
                    console.log(error.response.data.msg);
                    if (error.response.status === 404) {
                        setStore({
                            listaFavoritos: [],
                        });
                    }
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
            //Funcion para registrarse como usuario
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
                    console.log(response);
                    return response.data.msg;
                } catch (error) {
                    console.log(error);
                    if (error.response.status === 400) {
                        alert(
                            error.response.data.msg +
                            ". You'll be rediredted to the login page"
                        );
                        return error.response.data.msg;
                    }
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

                    setStore({
                        auth: response.data.status,
                        userId: response.data.user.id,
                    });
                    console.log(auth);
                    return;
                } catch (error) {
                    if (error.code === "ERR_BAD_REQUEST") {
                        setStore({
                            auth: false,
                        });
                    }
                    return false;
                }
            },
            // funcion para agregar productos al carrito
            createShopping: async (product_id) => {
                let store = getStore();

                let user_id = store.userId;
                console.log(user_id);

                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/shopping", {
                            id_products: product_id,
                            id_user: user_id,
                        }
                    );

                    getActions().getShopping();
                    return response;
                } catch (error) {
                    if (error.response.status === 404) {
                        getActions().eliminarFavoritos(product_id);
                    } else if (error.response.data === "User is not logged in") {
                        alert(
                            error.response.data + ". You'll be rediredted to the login page"
                        );
                        return error.response.data;
                    }
                }
            },

            //funcion para eliminar productos del carrito

            deleteShopping: async (product_id) => {
                let store = getStore();
                let user_id = store.userId;

                try {
                    const response = await axios.delete(
                        process.env.BACKEND_URL + "/api/shopping", {
                            data: {
                                id_products: product_id,
                                id_user: user_id,
                            },
                        }
                    );
                    // alert(response.data.msg);
                    console.log(response);

                    getActions().getShopping();
                    // console.log(store.shoppingList)

                    return;
                } catch (error) {
                    console.log(error);
                }
            },

            // funcion para obtener todos los productos agregados al carrito

            getShopping: async () => {
                let store = getStore();
                let user_id = store.userId;

                try {
                    const response = await axios.get(
                        process.env.BACKEND_URL + "/api/user/" + user_id + "/shopping"
                    );

                    setStore({
                        shoppingList: response.data.results,
                    });
                    return store.shoppingList;
                } catch (error) {
                    console.log(error.response.data.msg);
                    if (error.response.status === 404) {
                        setStore({
                            shoppingList: [],
                        });
                    }
                }
            },
            changePassword: async (email) => {
                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/user/password", {
                            email: email,
                        }
                    );

                    if (response.status === 200) {
                        alert("Your password was sended");
                    }
                } catch (error) {
                    console.log(error);
                    if (error.response.status === 404) {
                        alert("Your email does not exist");
                    }
                }
            },
            //funcion para pbtener un array con los precios de los elementos del carrito:

            priceFilter: async () => {
                let store = getStore();
                await getActions().getShopping();

                setStore({
                    priceList: store.shoppingList.map((item) => parseInt(item.price)),
                });

                return store.priceList;
            },

            //funcion para sumar las los precios del carrito:

            sumaTotal: (arr) => {
                let store = getStore();

                const initialValue = store.sum;
                const sumTotal = arr.reduce(
                    (previousValue, currentValue) => previousValue + currentValue,
                    initialValue
                );

                setStore({
                    sum: sumTotal,
                });
            },

            // contactus: async (firstName, lastName, email, message) => {
            //     try {
            //         const response = await axios.post(
            //             process.env.BACKEND_URL + "/api/user/password", {
            //                 firstName: firstName,
            //                 lastName: lastName,
            //                 email: email,
            //                 message: message,
            //             }
            //         );

            //         if (response.status === 200) {
            //             alert("Your message was sended");
            //         }
            //     } catch (error) {
            //         console.log(error);
            //         if (error.response.status === 404) {
            //             alert("Your email does not exist");
            //         }
            //     }
            // },
        },
    };
};

export default getState;
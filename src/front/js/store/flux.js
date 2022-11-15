import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";

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

            productId: null,
            userId: null,
            auth: false,
            registered: false,
            profile: {},
            priceList: [],
            // productIdList: [],
            sum: 0,
            classNameDetails: "btn btn-outline-light align-bottom",
            avgScore: null,
            productRating: [],
            comments: [],
            favoriteItem: [], //contiene las id de los productos favoritos
            productsIds: [],
        },
        actions: {
            // Profile
            // Profile
            // cambiaClassNameDetails: (id) => {
            //     let store = getStore();
            //     if (store.classNameDetails == "btn btn-outline-light align-bottom") {
            //         setStore({
            //             classNameDetails: "btn btn-light align-bottom",
            //         });
            //     } else {
            //         setStore({
            //             classNameDetails: "btn btn-outline-light align-bottom",
            //         });
            //     }
            // },
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
                    // console.log(error);
                    if (error.code === "ERR_BAD_REQUEST") {
                        // console.log(error.response.data.msg);
                        return;
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
                    console.log(response);
                } catch (error) {
                    // console.log(error);
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
                let store = getStore();
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/product/" + id
                    );
                    const data = await response.json();
                    console.log(data);
                    setStore({
                        productDetail: data,
                        productId: data.id,
                    });
                    console.log(store.productDetail);
                    console.log(store.productId);
                    return store.productId;
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
                    // console.log(response.data.msg);
                    // console.log(response);
                    // console.log(response.data.user.id);
                    setStore({
                        auth: true,
                        userId: response.data.user.id,
                    });
                    console.log(response.status);
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
                getActions().mapfavorites();

                let user_id = store.userId;
                // console.log(user_id);

                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/favorites", {
                            id_products: product_id,
                            id_user: user_id,
                        }
                    );
                    console.log(response);
                    getActions().mapfavorites();
                    return response;
                } catch (error) {
                    console.log(error);
                    console.log(error.response.status);
                    console.log(product_id);
                    if (error.response.status === 404) {
                        getActions().eliminarFavoritos(product_id);
                    } else if (error.response.data.msg === "User is not logged in") {
                        // alert(error.response.data);
                        // return error.response.data;
                        alert(
                            error.response.data.msg +
                            ". You'll be rediredted to the login page"
                        );
                        return error.response.data.msg;
                    }
                }
            },

            //funcion para mapear los favoritos por usuuario:

            mapfavorites: async () => {
                let store = getStore();
                await getActions().getFavorites();
                console.log(store.listaFavoritos);
                // let favoriteItem;
                setStore({
                    favoriteItem: store.listaFavoritos.map((item) => item.id),
                });
                console.log(store.favoriteItem); //array de las id de los productos agregados a favoritos por el user
            },
            mapProductId: async () => {
                let store = getStore();
                await getActions().getProduct();
                console.log(store.product);
                // let favoriteItem;
                setStore({
                    productsIds: store.product.map((item) => item.id),
                });
                console.log(store.productsIds); //array de las id de todos los productos
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
                    // console.log(response.data.results);

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

                    if (response.data.msg === "New user created") {
                        getActions().login(email, password);
                        setStore({
                            registered: true,
                        });
                    }

                    console.log(response);
                    console.log(response.status);
                    console.log(response.data.msg);
                    return response.data.msg;
                } catch (error) {
                    // console.log(error);
                    if (error.response.status === 409) {
                        return error.response.data.msg;
                    } else if (error.response.status === 406) {
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
                    } else if (error.response.data.msg === "User is not logged in") {
                        alert(error.response.data.msg + "... redirecting to login...");
                        return error.response.data.msg;
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
                        swal("Your password has been sent to your email");
                    }
                } catch (error) {
                    if (error.response.data.msg === "User email doesn't exist") {
                        swal("Your email does not exist");
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

            eliminarCuenta: async () => {
                let store = getStore();
                let user_id = store.userId;

                try {
                    const response = await axios.delete(
                        process.env.BACKEND_URL + "/api/user/" + user_id, {}
                    );
                    console.log(response.data.msg);

                    if (response.status === 200) {
                        // Swal.fire(response.data.msg);
                        setStore({
                            auth: false,
                        });
                        return response;
                    }
                } catch (error) {
                    console.log(error);
                    if (error.response.status === 404) {
                        Swal.fire(error.response.msg);
                    }
                }
            },

            deleteProduct: async (product_id) => {
                let store = getStore();

                try {
                    const response = await axios.delete(
                        process.env.BACKEND_URL + "/api/product/" + product_id, {
                            data: {
                                id_products: product_id,
                            },
                        }
                    );
                    alert(response.data.msg);
                    console.log(response);
                    // console.log(store.shoppingList)
                    getActions().getProduct();

                    return;
                } catch (error) {
                    console.log(error);
                }
            },

            //funcion para crear review de productos:
            createScore: async (comment, score, product_id) => {
                let store = getStore();
                let user_id = store.userId;

                console.log(typeof user_id);
                console.log(typeof product_id);
                console.log(typeof comment);
                console.log(typeof score);

                product_id = parseInt(product_id);
                console.log(typeof product_id);
                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/review", {
                            id_products: product_id,
                            id_user: user_id,
                            comment: comment,
                            score: score,
                        }
                    );

                    console.log(response);

                    return response;
                } catch (error) {
                    // if (error.response.status === 404) {
                    //     getActions().eliminarFavoritos(product_id);
                    // } else if (error.response.data === "User is not logged in") {
                    //     alert(
                    //         error.response.data + ". You'll be rediredted to the login page"
                    //     );
                    //     return error.response.data;
                    // }
                    console.log(error);
                }
            },

            getProductRatings: async (id) => {
                let store = getStore();
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/product/" + id + "/reviews"
                    );
                    const data = await response.json();
                    console.log(data);

                    setStore({
                        comments: data.map((item) => item.comment),
                    });

                    console.log(store.comments);
                    return store.comments;
                } catch (error) {
                    console.log(error);
                }
            },

            updateProduct: async (
                name,
                description,
                category,
                price,
                url,
                productId
            ) => {
                let store = getStore();
                // const price = parseInt(price);
                // let product_id = store.productId;
                // userId = store.profile.user.id
                console.log(productId);
                console.log(name, description, category, price, url);
                try {
                    const response = await axios.put(
                        process.env.BACKEND_URL + "/api/product/" + productId, {
                            name,
                            description,
                            category,
                            price,
                            url,
                        }
                    );

                    if (response.status === 200) {
                        Swal.fire(response.data.msg);
                        getActions().getProduct();
                        return response;
                    }

                    console.log(response);
                    // return true;
                } catch (error) {
                    console.log(error);

                    if (error.response.status === 404) {
                        alert(error.response.data.msg);
                        return error.response.data.msg;
                    }
                }
            },
        },
    };
};

export default getState;
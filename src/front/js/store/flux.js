import React from "react";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    // Store se utiliza para sincronizar y persistir los datos en toda la aplicacion
    store: {
      product: [],
      productDetail: {},
      products: [],
      listaFavoritos: [],
      shoppingList: [],
      admin: false,
      seller: false,
      productId: null,
      userId: null,
      auth: false,
      registered: false,
      profile: {},
      priceList: [],
      sum: 0,
      avgScore: null,
      productRating: [],
      comments: [],
      favoriteItem: [], //contiene las id de los productos favoritos
      productsIds: [],
      faved: false,
      favoriteHeart: <BsHeart />,
    },
    actions: {
      // Profile
      userProfile: async () => {
        // Busca si existe un token
        const userToken = localStorage.getItem("token");
        try {
          const response = await axios.get(
            process.env.BACKEND_URL + "/api/profile",
            {
              headers: {
                Authorization: "Bearer " + userToken,
              },
            }
          );
          // Log de informacion, ya no se utliza
          // console.log(data)
          setStore({
            profile: response.data.user,
          });
          //   console.log(response.data);
          return true;
        } catch (error) {
          // Codigo de error standard
          // console.log(error);
          if (error.code === "ERR_BAD_REQUEST") {
            // console.log(error.response.data.msg);
            return;
          }
        }
      },
      //Update user info function
      updateUser: async (email, username, password, name, lastname) => {
        // Se trae store para tener los datos de usuario por id
        let store = getStore();
        let user_id = store.userId;
        // userId = store.profile.user.id
        try {
          const response = await axios.put(
            process.env.BACKEND_URL + "/api/user/" + user_id,
            {
              email: email,
              username: username,
              password: password,
              name: name,
              lastname: lastname,
            }
          );
          // Sweet alert
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(response);
        } catch (error) {
          // Codigos de error y sus alertas respectivas
          // console.log(error);
          if (error.response.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
          if (error.response.status === 409) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
        }
      },
      // Filtra de busqueda para la barra de busqueda en landing page
      // Se toma un valor por parametro, lo cual es lo que el usuario ingresa en la barra
      filterSearch: (searchValue) => {
        // window.scrollTo(0, 600);
        // Se trae store para luego setear el array filtrado
        let store = getStore();
        // Se declara results para que se guarde lo filtrado a partir de los datos
        // que traiga el array de productos de la base de datos
        let results = store.product.filter((item) => {
          // Un if con dos condiciones OR
          // Uno es para que busque por nombre y el otro por descripcion del producto
          // Si cualquier valor que se pase, se cumple, entonces se muestran los resultados
          if (
            item.name
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item.description
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item.category
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ) {
            // Console log para ver que trae
            console.log(item);
            // Retorna item
            return item;
          }
        });
        // Setea el array de producto con los resultados filtrados
        setStore({
          product: results,
        });
        // Funciona para que la barra de busqueda mueva la pantalla a donde se encuentran los productos
      },

      // fetch de los productos
      getProduct: async () => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/product"
          ); //ir a buscar
          const data = await response.json();
          // Setea store con los datos que trae
          setStore({
            product: data,
          }); //promesa 2
        } catch (err) {
          // Log de error standard
          console.log(err);
        }
        // fetch de los detalles
      },
      // funcion para obtener detalles de los cuadros
      getProductDetail: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/product/" + id
          );
          const data = await response.json();
          // console.log(data);
          // Setea store con los datos que se traigan
          setStore({
            productDetail: data,
            productId: data.id,
          });
          // console.log(store.productDetail);
          // console.log(store.productId);
          return store.productId;
        } catch (err) {
          console.log(err);
        }
      },
      // Funcion de google login
      responseGoogle: async (response) => {
        // Se guarda en userObject lo que traiga google
        // Se utiliza jwt_decode para descifrar el token de google
        const userObject = jwt_decode(response.credential);
        // Guarda el token en local storage
        localStorage.setItem("token", response.credential);
        // Se declara results y se le asigna la funciona de signup
        // Luego los datos de google se pasan a la funciona de signup
        let results = await getActions().signup(
          userObject.name,
          userObject.email,
          userObject.given_name
        );
        // Log auxiliar de results
        console.log(results);
        // Si el usuario existe entonces hace login en vez de signup
        if (results === "User exists") {
          await getActions().login(userObject.email, userObject.given_name);
          // Retorna true, esto se utliza para saber que tipo de respues se da
          // Y luego se utiliza en el componente de login, especificamente en google login
          return true;
        }
        // Si la respuesta es que se creo un nuevo usuario, entonces se pasan los datos y se crea el usuario
        else if (results === "New user created") {
          await getActions().signup(
            userObject.name,
            userObject.email,
            userObject.given_name
          );
          // Retorna true, esto se utliza para saber que tipo de respues se da
          // Y luego se utiliza en el componente de login, especificamente en google login
          return true;
        }
        // Por default retorna true en caso de que no entre en ningun if
        return false;
      },
      // funcion para Login
      // Se pasa email y password, son requeridos
      login: async (email, password) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/login",
            {
              email: email,
              password: password,
            }
          );
          // Setea store con el id de usuario y auth se vuelve true para darle accesso
          // Condiones para determinar el nivel de acceso del usuario
          // Si es admin
          if (response.data.user.admin) {
            setStore({
              admin: true,
              auth: true,
              userId: response.data.user.id,
            });
            // Si es vendedor, no esta implementado pero queda como lujo
          } else if (response.data.user.seller) {
            setStore({
              seller: true,
              auth: true,
              userId: response.data.user.id,
            });
            // Si no es vendedor ni admin entonces se le da acceso standard
          } else {
            setStore({
              auth: true,
              userId: response.data.user.id,
            });
          }
          // Guarda el token en local storage segun los datos del fetch
          localStorage.setItem("token", response.data.msg);
          return response.data.msg;
        } catch (error) {
          // Este error es practicamente inutil como un log, por lo tanto se comenta para no saturar la consola
          // console.log(error);
          // console.log(error.response.status);
          // Alertas segun el error de respuesta
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              confirmButtonColor: "#000000",
              text: error.response.data.msg + "... redirecting to signup...",
            });
            return error.response.data.msg;
          } else if (error.response.data.msg === "Bad email or password") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data;
          }
        }
      },

      //  Funcion para logout
      logout: () => {
        // Simplemente saca el token y auth se vuelve false
        localStorage.removeItem("token");
        setStore({
          auth: false,
        });
        return false;
      },

      //Funcion para crear favoritos
      createFavorite: async (product_id) => {
        // Se llama store
        let store = getStore();
        // La funciona de mapeo de favoritos
        getActions().mapfavorites();
        // Instancia de id de usuario
        let user_id = store.userId;
        // console.log(user_id);
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/favorites",
            {
              id_products: product_id,
              id_user: user_id,
            }
          );
          //   console.log(response);
          // Se llaman las funciones respectivas
          getActions().getProduct();
          getActions().mapfavorites();
          getActions().comparingFavorites();
          return response;
        } catch (error) {
          // console.log(error);
          // console.log(error.response.status);
          // console.log(product_id);
          if (error.response.status === 404) {
            getActions().eliminarFavoritos(product_id);
          } else if (error.response.data.msg === "User is not logged in") {
            // alert(error.response.data);
            // return error.response.data;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:
                error.response.data.msg +
                ". You'll be rediredted to the login page",
              confirmButtonColor: "#000000",
            });
            return error.response.data.msg;
          }
        }
      },
      //funcion para mapear los favoritos por usuuario:
      mapfavorites: async () => {
        // Se llama store
        let store = getStore();
        await getActions().getFavorites();
        // Setea store
        setStore({
          favoriteItem: store.listaFavoritos?.map((item) => item.id),
        });
        //array de las id de los productos agregados a favoritos por el user
        // console.log(store.favoriteItem);
      },
      // Mapeo de productos por id
      mapProductId: async () => {
        let store = getStore();
        await getActions().getProduct();
        // console.log(store.product);
        // let favoriteItem;
        setStore({
          productsIds: store.product.map((item) => item.id),
        });
        // console.log(store.productsIds); //array de las id de todos los productos
      },
      // Funciona para comparar favoritos
      // Es para colorear el corazon de favoritos si el boton fue presionado
      comparingFavorites: async (productId) => {
        let store = getStore();
        await getActions().mapfavorites(); // store.favoriteItem
        await getActions().mapProductId(); // store.productsIds
        // For para que se comparen los arrays
        for (let i = 0; i < store.productsIds.length; i++) {
          let element = store.productsIds[i];
          if (store.favoriteItem?.includes(element)) {
            // console.log(element);
            for (element in store.favoriteItem) {
              setStore({
                favoriteHeart: <BsFillHeartFill />,
              });
            }
          } else {
            // console.log(element);
            setStore({
              favoriteHeart: <BsHeart />,
            });
          }
        }
      },
      // Funcion para eliminar favoritos en la base de datos
      eliminarFavoritos: async (product_id) => {
        // Se llama store
        let store = getStore();
        let user_id = store.userId;
        try {
          const response = await axios.delete(
            process.env.BACKEND_URL + "/api/favorites",
            {
              data: {
                id_products: product_id,
                id_user: user_id,
              },
            }
          );
          // Sweet alert con los datos del fetch
          Swal.fire({ text: response.data.msg, confirmButtonColor: "#000000" });
          // Llama las funciones respectivas
          getActions().getFavorites();
          getActions().comparingFavorites();
          return response;
        } catch (error) {
          console.log(error);
        }
      },
      //funcion para obtener todos los favoritos de un usuario
      getFavorites: async () => {
        // Llama store
        let store = getStore();
        let user_id = store.userId;

        try {
          const response = await axios.get(
            process.env.BACKEND_URL + "/api/user/" + user_id + "/favorites"
          );
          // Setea store
          setStore({
            listaFavoritos: response.data.results,
          });
        } catch (error) {
          // El log de este error en inutil por que no es preciso
          // Si no tiene favoritos entonces se vacia la lista
          if (error.response.status === 404) {
            setStore({
              listaFavoritos: [],
            });
          }
        }
      },
      // funcion para crear productos
      // Se pasan los datos respectivos por parametro
      createProduct: async (name, description, category, url, price) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/product",
            {
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
      // Se pasan los valores respectivos
      signup: async (username, email, password) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/user",
            {
              username: username,
              email: email,
              password: password,
            }
          );

          if (response.data.msg === "New user created") {
            getActions().login(email, password);
            // Setea store para declarar al usuario como registrado
            setStore({
              registered: true,
            });
          }
          return response.data.msg;
        } catch (error) {
          // Si usuario exitste
          if (error.response.data.msg === "User exists") {
            // swal(error.response.data.msg);
            return error.response.data.msg;
          }
        }
      },
      //Funcion para validar el Token y mantener al usuario registrado
      validToken: async () => {
        // Guarda el token de local storage en un variable para que persista
        let accessToken = localStorage.getItem("token");
        try {
          const response = await axios.get(
            process.env.BACKEND_URL + "/api/valid-token",
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          );
          if (response.data.user.admin) {
            setStore({
              admin: true,
              auth: true,
              userId: response.data.user.id,
            });
          } else if (response.data.user.seller) {
            setStore({
              seller: true,
              auth: true,
              userId: response.data.user.id,
            });
          } else {
            setStore({
              auth: true,
              userId: response.data.user.id,
            });
          }
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
        // Se llama a store
        let store = getStore();
        let user_id = store.userId;
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/shopping",
            {
              id_products: product_id,
              id_user: user_id,
            }
          );
          // Llama al carrito
          getActions().getShopping();
          return response;
        } catch (error) {
          // Mensajes de error
          if (error.response.status === 404) {
            getActions().eliminarFavoritos(product_id);
          } else if (error.response.data.msg === "User is not logged in") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              confirmButtonColor: "#000000",
              text: error.response.data.msg + "... redirecting to login...",
            });
            return error.response.data.msg;
          }
        }
      },
      //funcion para eliminar productos del carrito
      deleteShopping: async (product_id) => {
        // Se llama a store
        let store = getStore();
        let user_id = store.userId;

        try {
          const response = await axios.delete(
            process.env.BACKEND_URL + "/api/shopping",
            {
              data: {
                id_products: product_id,
                id_user: user_id,
              },
            }
          );
          // Se llama a la funcion de traer shopping
          getActions().getShopping();
          return;
        } catch (error) {
          console.log(error);
        }
      },
      // funcion para obtener todos los productos agregados al carrito
      getShopping: async () => {
        // Se llama a store
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
          // console.log(error.response.data.msg);
          if (error.response.status === 404) {
            setStore({
              shoppingList: [],
            });
          }
        }
      },
      // Funciona de cambiar password, utliza mailtrap para enviar una nueva password generada aleatoriamente
      changePassword: async (email) => {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/user/password",
            {
              email: email,
            }
          );
          // Respues de ok
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
        // Se llama a store
        let store = getStore();
        await getActions().getShopping();
        // Setea en store el precio y se convierte a int para que sea un numero
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
      // Funcion de borrar cuenta
      eliminarCuenta: async () => {
        // Llama a store
        let store = getStore();
        let user_id = store.userId;
        try {
          const response = await axios.delete(
            process.env.BACKEND_URL + "/api/user/" + user_id,
            {}
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
      // Funcion de borrar producto
      deleteProduct: async (product_id) => {
        // Llama a store
        let store = getStore();
        try {
          const response = await axios.delete(
            process.env.BACKEND_URL + "/api/product/" + product_id,
            {
              data: {
                id_products: product_id,
              },
            }
          );
          // Llama a la fucnion de obtener productos
          getActions().getProduct();
          return;
        } catch (error) {
          console.log(error);
        }
      },
      //funcion para crear review de productos:
      createScore: async (comment, score, product_id) => {
        // Llama a store
        let store = getStore();
        let user_id = store.userId;
        // Convierte al id de producto en un numero
        product_id = parseInt(product_id);
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + "/api/review",
            {
              id_products: product_id,
              id_user: user_id,
              comment: comment,
              score: score,
            }
          );

          return response;
        } catch (error) {
          // Error standard en un log
          console.log(error);
        }
      },
      // Funcion de puntaje de productos
      getProductRatings: async (id) => {
        let store = getStore();
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/product/" + id + "/reviews"
          );
          const data = await response.json();
          // Setea store
          setStore({
            comments: data.map((item) => item),
          });
          return store.comments;
        } catch (error) {
          // Log de error
          console.log(error);
        }
      },
      // Funcion para actualizar productos
      // Se pasa los parametros necesarios
      updateProduct: async (
        name,
        description,
        category,
        price,
        url,
        productId
      ) => {
        // Llama a store
        let store = getStore();
        try {
          const response = await axios.put(
            process.env.BACKEND_URL + "/api/product/" + productId,
            {
              name: name,
              description: description,
              category: category,
              price: price,
              url: url,
            }
          );
          // Respues de ok
          if (response.status === 200) {
            Swal.fire(response.data.msg);
            getActions().getProductDetail();
            return response;
          }
          getActions().getProductDetail();
        } catch (error) {
          // Log de error
          console.log(error);
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.msg,
            });
            return error.response.data.msg;
          }
        }
      },
      // updateProduct: async (
      //   name,
      //   description,
      //   category,
      //   price,
      //   url,
      //   product_id
      // ) => {
      //   // Llama a store
      //   let store = getStore();
      //   // let prodcut_id = store.productId;
      //   // console.log(prodcut_id);

      //   // console.log(store.productId);
      //   console.log(product_id);
      //   try {
      //     const response = await axios.put(
      //       process.env.BACKEND_URL + "/api/product/" + product_id,
      //       {
      //         name: name,
      //         description: description,
      //         category: category,
      //         price: price,
      //         url: url,
      //       }
      //     );
      //     // Respues de ok
      //     if (response.status === 200) {
      //       Swal.fire(response.data.msg);
      //       getActions().getProduct();
      //       return response;
      //     }
      //   } catch (error) {
      //     // Log de error
      //     console.log(error);
      //     if (error.response.status === 404) {
      //       Swal.fire({
      //         icon: "error",
      //         title: "Oops...",
      //         text: error.response.data.msg,
      //       });
      //       return error.response.data.msg;
      //     }
      //   }
      // },
    },
  };
};
export default getState;

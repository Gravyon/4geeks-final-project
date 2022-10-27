// import axios from "axios";

const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            product: [],
            productDetail: {},
        },
        actions: {
            // fecht de los cuadros
            getProduct: async () => {
                try {
                    const response = await fetch(
                        "https://3001-gravyon-4geeksfinalproj-agrddi0204s.ws-us72.gitpod.io/api/product"
                    ); //ir a buscar
                    const data = await response.json();
                    console.log(data);
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
                        "https://3001-gravyon-4geeksfinalproj-agrddi0204s.ws-us72.gitpod.io/api/product/" +
                        id
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
        },
    };
};

export default getState;
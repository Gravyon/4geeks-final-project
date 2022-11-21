import React, { useState, useEffect, useContext } from "react";
import ReactDOM, { render } from "react-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Context } from "../store/appContext";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const PayPalCheckout = () => {
  const { actions, store } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    if (store.userId != null) {
      const getInfo = async () => {
        let arrTotal = await actions.priceFilter();

        actions.sumaTotal(arrTotal);
      };
      getInfo();
    }
  }, [store.userId]);

  console.log(store.sum);

  const eliminarProducto = (id) => actions.deleteShopping(id);

  return (
    <div>
      <PayPalScriptProvider
        options={{ "client-id": process.env.PAYPAL_SANDBOX_CLIENT_ID }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: store.sum,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              Swal.fire({
                position: "top",
                icon: "success",
                title: `Transaction completed by ${name}`,
                showConfirmButton: false,
                timer: 3000,
              });

              {
                details.status === "COMPLETED"
                  ? store.shoppingList.map((item) => {
                      eliminarProducto(item.id);
                      navigate("/carrito");
                      // <div>
                      //   <p>Transaction completed by ${name}</p>
                      //   <button>Home</button>
                      // </div>;
                    })
                  : null;
              }
            });
          }}
        />
      </PayPalScriptProvider>
      <div></div>
    </div>
  );
};

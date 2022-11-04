import React, { useState, useEffect, useContext } from "react";
import ReactDOM, { render } from "react-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Context } from "../store/appContext";

export const PayPalCheckout = () => {
  const { actions, store } = useContext(Context);

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

  return (
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
            alert(`Transaction completed by ${name}`);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

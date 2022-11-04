import React, { useState, useEffect, useContext } from "react";
import ReactDOM, { render } from "react-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Context } from "../store/appContext";

export const PayPalCheckout = () => {
  const { actions, store } = useContext(Context);
  const [price, setPrice] = useState([]);
  const [suma, setSuma] = useState(0);

  useEffect(() => {
    if (store.userId != null) {
      // console.log(store.userId)
      //   actions.getShopping();
      sumarTotal();
    }
  }, [store.userId]);

  console.log(store.shoppingList);

  const sumarTotal = () => {
    setPrice(
      store.shoppingList.map((item) => {
        item.price;
        return item.price;
      })
    );
    console.log(item.price); //price es mi nuevo array

    function sumar(item) {
      setSuma(suma + item);
      return suma;
    }

    price.forEach(sumar);
    console.log(suma);
  };

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
                  value: "1.99",
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

import React, { useState, useEffect, useContext } from "react";
import ReactDOM, { render } from "react-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Context } from "../store/appContext";

// const { store, actions } = useContext(Context);


export const PayPalCheckout = () => {

  // const [price, setPrice] = useState(0);
  // setPrice(store.shoppingList.map((item) => suma =+ item.price))
  // console.log(price)

  // //funcion para crear orden:

  // const createOrder = (data, actions) => {
  //   return actions.order.create({})
  // }
  
  return (
    <PayPalScriptProvider options={{"client-id": process.env.PAYPAL_SANDBOX_CLIENT_ID}}>
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
)
};

import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import PaypalExpressBtn from "react-paypal-express-checkout";

// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export const PayPalCheckout = () => {
  const onSuccess = (payment) => {
    console.log("The payment was succeeded!", payment);
  };

  const onCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    console.log("The payment was cancelled!", data);
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  let env = "sandbox";
  let currency = "USD";
  let total = 1;

  const client = {
    sandbox:
      "ATjtdmidJIPsPJh1nqKE6UqzDxB3ohTPJKIOxZS-TMleWHrYt3CWrWvF_2NWhS-w7AOdNq0SRQoMJ706",
    production: "production-app-id",
  };

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  );
};

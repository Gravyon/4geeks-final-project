import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



export const PayPalCheckout = () => {
  
  return (
    <PayPalScriptProvider options={{"client-id": process.env.PAYPAL_SANDBOX_CLIENT_ID}}>
            <PayPalButtons />
        </PayPalScriptProvider>
)
};

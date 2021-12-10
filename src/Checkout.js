import React from "react";
import { useService } from "@xstate/react";
import { Cart } from "./Cart";
import { Shipping } from "./Shipping";
import { Contact } from "./Contact";
import { Payment } from "./Payment";
import { Confirmation } from "./Confirmation";
import { CheckoutContext } from "./index";

export function Checkout({ checkoutRef }) {
  const [state] = useService(checkoutRef);

  return (
    <CheckoutContext.Provider value={checkoutRef}>
      {state.matches("cart") && <Cart />}
      {state.matches("shipping") && <Shipping />}
      {state.matches("contact") && <Contact />}
      {state.matches("payment") && <Payment />}
      {state.matches("confirmation") && <Confirmation />}
    </CheckoutContext.Provider>
  );
}

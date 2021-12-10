import { useService } from "@xstate/react";
import React, { useContext } from "react";
import { CheckoutContext } from ".";

const paymentMethods = [
  {
    id: "1234",
    description: "Card ending in 1234"
  },
  {
    id: "paypal",
    description: "PayPal"
  }
];

export function Payment() {
  const service = useContext(CheckoutContext);
  const [state, send] = useService(service);

  const canPlaceOrder = service.machine.transition(state, "ORDER").changed;

  console.log(state);

  return (
    <div className="screen" data-screen="payment">
      <h2>Payment</h2>
      <ul>
        {paymentMethods.map((method) => {
          const checked = state.context.paymentMethod === method.id;
          return (
            <li key={method.id}>
              <label
                className="field -radio"
                data-checked={checked || undefined}
              >
                <div>{method.description}</div>
                <input
                  type="radio"
                  checked={checked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      send({
                        type: "SELECT_PAYMENT_METHOD",
                        id: method.id
                      });
                    }
                  }}
                />
              </label>
            </li>
          );
        })}
      </ul>
      <div>
        <label className="simple-field">
          <input
            type="checkbox"
            checked={state.context.agreedToTerms}
            onChange={(e) => {
              send({ type: "AGREE", value: e.target.checked });
            }}
          />
          <span>I agree to the terms and conditions</span>
        </label>
      </div>
      <button
        className="button -primary"
        disabled={!canPlaceOrder}
        onClick={() => {
          send("ORDER");
        }}
      >
        Place order
      </button>
    </div>
  );
}

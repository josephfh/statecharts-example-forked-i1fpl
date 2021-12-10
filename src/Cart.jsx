import { useService } from "@xstate/react";
import React, { useContext } from "react";
import { CheckoutContext } from ".";

const cartItems = [
  {
    id: "milleniumfalcon",
    title: "Millenium Falcon",
    quantity: 1
  }
];

export function Cart() {
  const service = useContext(CheckoutContext);
  const [state, send] = useService(service);

  return (
    <div className="screen" data-screen="cart">
      <h2>My Cart</h2>
      <table className="items">
        <thead>
          <tr>
            <th>Details</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>$800</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <label className="field -input">
        <div>VIP Code</div>
        <input
          type="text"
          placeholder="Enter VIP Code here"
          value={state.context.vipCode || ""}
          data-xstate-event="ENTER_VIP_CODE"
          onChange={(e) => {
            send({
              type: "ENTER_VIP_CODE",
              value: e.target.value
            });
          }}
        />
      </label>
      <div className="summary">
        <button
          className="button"
          data-xstate-event="CHECKOUT"
          onClick={() => {
            send("CHECKOUT");
          }}
        >
          Checkout Securely
        </button>
        <button
          className="button"
          data-xstate-event="CHECKOUT"
          onClick={() => {
            send("PAYPAL");
          }}
        >
          Pay via PayPal
        </button>
      </div>
    </div>
  );
}

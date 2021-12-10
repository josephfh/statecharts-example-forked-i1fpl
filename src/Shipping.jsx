import { useService } from "@xstate/react";
import React, { useContext } from "react";
import { CheckoutContext } from ".";

const addresses = [
  {
    id: "address1",
    name: "David K.",
    address: "12345 Some Way"
  },
  {
    id: "address2",
    name: "David K.",
    address: "200 Another Way"
  }
];

const shippingMethods = [
  {
    value: "standard",
    label: "Standard Shipping",
    details: "(3-5 business days)",
    price: "$4.95"
  },
  {
    value: "saver",
    label: "Express Saver",
    details: "(3-5 business days)",
    price: "$14.95"
  },
  {
    value: "express",
    label: "Express",
    details: "(3-5 business days)",
    price: "$19.95"
  }
];

export function Shipping() {
  const service = useContext(CheckoutContext);
  const [state, send] = useService(service);

  return (
    <div className="screen" data-screen="shipping">
      <h2>Shipping Address</h2>
      <ul>
        {addresses.map((address) => {
          const checked = state.context.shippingAddress === address.id;
          return (
            <li key={address.id}>
              <label
                className="field -radio"
                data-checked={checked || undefined}
              >
                <div>
                  <div>{address.name}</div>
                  <div>{address.address}</div>
                </div>
                <input
                  type="radio"
                  checked={checked}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      return;
                    }
                    send({
                      type: "SELECT_SHIPPING_ADDRESS",
                      id: address.id
                    });
                  }}
                />
              </label>
            </li>
          );
        })}
      </ul>
      <label htmlFor="useAsBilling">
        <input type="checkbox" name="useAsBilling" id="useAsBilling" />
        <span>Use this as my billing address</span>
      </label>
      <div hidden={!state.context.shippingAddress}>
        <h2>Select shipping method</h2>
        <ul>
          {shippingMethods.map((shippingMethod) => {
            const checked =
              state.context.shippingMethod === shippingMethod.value;
            return (
              <li key={shippingMethod.value}>
                <label
                  className="field -radio"
                  data-checked={checked || undefined}
                >
                  <div>{shippingMethod.label}</div>
                  <input
                    type="radio"
                    checked={checked}
                    onChange={(e) => {
                      if (e.target.checked) {
                        send({
                          type: "SELECT_SHIPPING_METHOD",
                          value: shippingMethod.value
                        });
                      }
                    }}
                  />
                </label>
              </li>
            );
          })}
        </ul>
        <button
          className="button -primary"
          onClick={() => {
            send("NEXT");
          }}
        >
          Continue to Contact Information
        </button>
      </div>
    </div>
  );
}

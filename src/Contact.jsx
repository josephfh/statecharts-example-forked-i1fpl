import { useService } from "@xstate/react";
import React, { useContext } from "react";
import { CheckoutContext } from ".";

export function Contact() {
  const service = useContext(CheckoutContext);
  const [state, send] = useService(service);

  const canContinue = service.machine.transition(state, "NEXT").changed;

  return (
    <div className="screen" data-screen="contact">
      <h2>Contact Information</h2>
      <strong>Enter contact details</strong>
      <label className="field -input">
        <div>Email</div>
        <input
          type="text"
          placeholder="someone@example.com"
          value={state.context.email || ""}
          onChange={(e) => {
            send({
              type: "ENTER_EMAIL",
              value: e.target.value
            });
          }}
        />
      </label>
      <label className="field -input">
        <div>Mobile number</div>
        <input
          type="text"
          placeholder="555-1234"
          value={state.context.mobile || ""}
          onChange={(e) => {
            send({
              type: "ENTER_MOBILE",
              value: e.target.value
            });
          }}
        />
      </label>
      <button
        className="button -primary"
        disabled={!canContinue}
        onClick={() => {
          send("NEXT");
        }}
      >
        Continue to payment
      </button>
    </div>
  );
}

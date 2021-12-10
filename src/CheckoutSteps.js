import React from "react";
import { checkoutMachine } from "./checkoutMachine";
import { confirmPaths, getMeta, confirmScenario } from "./index";

export function CheckoutSteps() {
  return (
    <>
      {confirmPaths[0].segments.map((segment, i, segments) => {
        const { description } = getMeta(segment.state);
        const { transitions } = checkoutMachine.transition(
          segment.state,
          segment.event
        );

        const sameState = segment.state.matches(segments[i - 1]?.state.value);
        const transition = transitions[0];

        return (
          <div key={i}>
            {!sameState && (
              <span>
                On the <strong>{description}</strong>,{" "}
              </span>
            )}
            <span>
              {sameState && <span>... and then </span>}
              {(transition.meta?.description && (
                <strong>{transition.meta.description}</strong>
              )) || (
                <>
                  Execute event <strong>{transition.eventType}</strong>
                </>
              )}
              {transition.cond?.meta?.description
                ? ` (${transition.cond?.meta?.description})`
                : ""}
            </span>
          </div>
        );
      })}
      <div>
        Then you will reach{" "}
        <strong>{getMeta(confirmScenario.state).description}</strong>
      </div>
      <br />
    </>
  );
}

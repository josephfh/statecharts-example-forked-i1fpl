import React, { useMemo } from "react";
import { interpret } from "xstate";
import { checkoutMachine } from "./checkoutMachine";
import { Checkout } from "./Checkout";
import { confirmPaths } from "./index";

export function CheckoutStates() {
  const services = useMemo(() => {
    const intermediatePaths = [
      ...confirmPaths[0].segments.map((segment, i, segments) => {
        return segments.slice(0, i);
      }),
      confirmPaths[0].segments
    ];
    return intermediatePaths.map((segments) => {
      const s = interpret(checkoutMachine).start();

      segments.forEach((segment) => {
        s.send(segment.event);
      });

      return s;
    });
  }, []);

  return (
    <>
      {services.map((service, i) => {
        return <Checkout key={i} checkoutRef={service} />;
      })}
    </>
  );
}

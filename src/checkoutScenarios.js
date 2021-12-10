import { getShortestPaths } from "@xstate/graph";
import { checkoutMachine } from "./checkoutMachine";

export const checkoutScenarios = getShortestPaths(checkoutMachine, {
  events: {
    ENTER_VIP_CODE: [{ type: "ENTER_VIP_CODE", value: "vip1234" }],
    SELECT_SHIPPING_ADDRESS: [
      {
        type: "SELECT_SHIPPING_ADDRESS",
        id: "address1"
      }
    ],
    SELECT_PAYMENT_METHOD: [
      {
        type: "SELECT_PAYMENT_METHOD",
        id: "1234"
      }
    ],
    ENTER_EMAIL: [
      {
        type: "ENTER_EMAIL",
        value: "davidkpiano@example.com"
      }
    ],
    ENTER_MOBILE: [
      {
        type: "ENTER_MOBILE",
        value: "1235551234"
      }
    ],
    AGREE: [
      {
        type: "AGREE",
        value: true
      },
      {
        type: "AGREE",
        value: false
      }
    ]
  }
});

import { createMachine, assign } from "xstate";

export const checkoutMachine = createMachine(
  {
    id: "checkout",
    initial: "cart",
    context: {
      shippingAddress: null,
      shippingMethod: "standard",
      email: null,
      mobile: null,
      agreedToTerms: false,
      paymentMethod: null,
      vipCode: null
    },
    states: {
      cart: {
        meta: {
          description: "Shopping Cart"
        },
        on: {
          ENTER_VIP_CODE: {
            meta: { description: "Enter a VIP Code" },
            actions: assign({
              vipCode: (_, e) => e.value
            })
          },
          CHECKOUT: {
            target: "shipping",
            meta: { description: "Click the checkout button" }
          },
          PAYPAL: {
            target: "payment",
            actions: assign({
              paymentMethod: "paypal"
            }),
            meta: {
              description: "Pay via PayPal"
            }
          }
        }
      },
      shipping: {
        meta: {
          description: "Shipping Address"
        },
        on: {
          SELECT_SHIPPING_ADDRESS: {
            actions: assign({
              shippingAddress: (_, e) => e.id
            }),
            meta: { description: "Select a shipping address" }
          },
          SELECT_SHIPPING_METHOD: {
            actions: assign({
              shippingMethod: (_, e) => e.value
            })
          },
          NEXT: {
            target: "#contact",
            meta: { description: "Click the next button" },
            cond: {
              type: "validShipping",
              meta: {
                description: "Shipping address must be valid"
              }
            }
          }
        }
      },
      contact: {
        id: "contact",
        meta: {
          description: "Contact Information"
        },
        on: {
          ENTER_EMAIL: {
            meta: { description: "Enter email address" },
            actions: assign({ email: (_, e) => e.value })
          },
          ENTER_MOBILE: {
            meta: { description: "Enter mobile (phone) number" },
            actions: assign({ mobile: (_, e) => e.value })
          },
          NEXT: {
            target: "payment",
            cond: {
              type: "contactInfoValid",
              meta: "Email and mobile number required"
            },
            meta: { description: "Click the next button" }
          }
        }
      },
      payment: {
        meta: {
          description: "Payment"
        },
        on: {
          SELECT_PAYMENT_METHOD: {
            meta: {
              description: "Select a payment method"
            },
            actions: assign({
              paymentMethod: (_, e) => e.id
            })
          },
          AGREE: {
            meta: {
              description: "Agree to terms and conditions"
            },
            actions: assign({
              agreedToTerms: (_, e) => e.value
            })
          },
          ORDER: {
            target: "confirmation",
            meta: { description: "Place your order" },
            cond: {
              type: "agreedToTerms",
              meta: { description: "Must agree to terms and conditions" }
            }
          }
        }
      },
      confirmation: {
        meta: {
          description: "Order Confirmed"
        }
      }
    }
  },
  {
    guards: {
      validShipping: (ctx) => ctx.shippingAddress,
      agreedToTerms: (ctx) => ctx.agreedToTerms && ctx.paymentMethod,
      contactInfoValid: (ctx) => ctx.email && ctx.mobile
    }
  }
);

import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const order = new CheckoutProcess("so-cart", "#cart_total");
order.init();

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.forms[0];
  const ck_status = form.checkValidity();
  form.reportValidity();
  if (ck_status) {
    order.checkout();
  }
});

import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();
const order = new CheckoutProcess("so-cart", "#cart_total");
order.init();

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    order.checkout();
})




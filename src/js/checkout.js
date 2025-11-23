import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess("so-cart", "#cart_total");
checkout.init();






import { getLocalStorage, formDataToJSON, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function pakageItems(items) {
    return items.map((item) => ({
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: item.quantity
    }));
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector
        this.list = [],
        this.itemTotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSubTotal();
        this.calculateItemSummary();

    }

    calculateItemSubTotal() {
        this.itemTotal = this.list.reduce((total, item) => 
            total + (Number(item.FinalPrice) * item.quantity), 0);
    }


    calculateItemSummary() {
        this.tax = (this.itemTotal * 0.06)
        const totalQuantity = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);
        this.shipping = 10 + (totalQuantity - 1) * 2
        this.orderTotal = parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping);

        this.displayOrderTotals();
    }
    
    displayOrderTotals() {
        const subTotal = document.querySelector(".subTotal");
        const taxE = document.querySelector(".tax");
        const shippingE = document.querySelector(".shipping");
        const orderTotalE = document.querySelector(".order");

        subTotal.textContent = `$${(this.itemTotal).toFixed(2)}`;
        taxE.textContent = `$${(this.tax).toFixed(2)}`;
        shippingE.textContent = `$${(this.shipping).toFixed(2)}`;
        orderTotalE.textContent = `$${(this.orderTotal).toFixed(2)}`;
    }
    async checkout(){
        const forms = document.forms["checkoutForm"]
        const order = formDataToJSON(forms)

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = pakageItems(this.list);
        
        try {
            const response = await services.checkout(order);
            console.log(response) 
            setLocalStorage("so-cart", [])
            location.assign("/checkout/success.html")
            
        } catch (err) {
            removeAllAlerts();
            for (let message in err.message) {
                alertMessage(err.message[message]);
            }
        }
    }
    
}


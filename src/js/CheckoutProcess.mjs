import { getLocalStorage } from "./utils.mjs";

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
    
}

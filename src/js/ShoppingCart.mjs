import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <button class="less">-</button>
  <p class="cart-card__quantity">qty: <span class="qty">1</span></p>
  <button class="more">+</button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
export default class ShoppingCart{
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector
    }
    
    renderCartContents() {
      const cartItems = getLocalStorage("so-cart");
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      if (cartItems.length > 0) {
        document.getElementById("hidde").style.display = "block";
      }
      const totalprice = sumtotalprice(cartItems);
      document.querySelector(".cart-total").innerHTML = totalprice;
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
    }
    
}
function sumtotalprice(items) {
      
      return items.reduce((total, item) =>
        total + Number(item.FinalPrice || item.price), 0);
}

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("more")) {
    const parent = e.target.closest(".cart-card");
    const qty = parent.querySelector(".qty");
    qty.textContent = Number(qty.textContent) + 1;
  }
  if (e.target.classList.contains("less")) {
    const parent = e.target.closest(".cart-card");
    const qty = parent.querySelector(".qty");
    const current = Number(qty.textContent);

    if (current > 1) {
      qty.textContent = Number(qty.textContent) - 1;
    }
    
  }}
  
)
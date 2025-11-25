import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}"/>
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>

    <button class="decrease">-</button>

    <p class="cart-card__quantity">qty: ${item.quantity}</p>

    <button class="increase">+</button>

    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartContents() {
    const cartItems = getLocalStorage("so-cart") || [];

    // Asegura quantity
    cartItems.forEach(item => {
      if (!item.quantity || item.quantity < 1) item.quantity = 1;
   
    });
   
    // Mostrar HTML
    const htmlItems = cartItems.map(item => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Mostrar total
    const totalprice = this.sumtotalprice(cartItems);
    document.querySelector(".cart-total").textContent = totalprice.toFixed(2);
    setLocalStorage(".cart-total", totalprice)

    // Guardar en localStorage
    setLocalStorage("so-cart", cartItems);
  }

  sumtotalprice(items) {
    return items.reduce(
      (total, item) => total + (Number(item.FinalPrice) * item.quantity),
      0
    );
  }
}

document.querySelector(".product-list").addEventListener("click", (e) => {
  const cart = getLocalStorage("so-cart");

  if (e.target.classList.contains("increase") ||
      e.target.classList.contains("decrease")) {

    const parent = e.target.closest(".cart-card");
    const index = Array.from(document.querySelectorAll(".cart-card")).indexOf(parent);

    let currentQty = cart[index].quantity;

    if (e.target.classList.contains("increase")) {
      currentQty++;
    }

    if (e.target.classList.contains("decrease") && currentQty > 1) {
      currentQty--;
    }

    // Actualizar cantidad
    cart[index].quantity = currentQty;

    // Guardar
    setLocalStorage("so-cart", cart);

    // Volver a renderizar el carrito
    const cartView = new ShoppingCart("so-cart", ".product-list");
    cartView.renderCartContents();
  }
});

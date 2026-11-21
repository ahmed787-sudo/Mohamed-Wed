"use strict";
const products = [
  {id:1,name:"تيشيرت أساسي",price:650,tag:"CORE TEE",symbol:"TEE"},
  {id:2,name:"هودي يومي",price:1250,tag:"DAILY HOODIE",symbol:"HOOD"},
  {id:3,name:"بنطلون واسع",price:950,tag:"RELAXED FIT",symbol:"PANTS"},
  {id:4,name:"قميص أوفرسايز",price:850,tag:"OVERSHIRT",symbol:"SHIRT"},
  {id:5,name:"جاكيت خفيف",price:1650,tag:"LIGHT JACKET",symbol:"JACKET"},
  {id:6,name:"كاب كلاسيك",price:350,tag:"CLASSIC CAP",symbol:"CAP"}
];
const WHATSAPP_NUMBER = "201001879213";
let cart = [];
const $ = id => document.getElementById(id);
const productsEl = $("products");
const cartPanel = $("cart");
const cartItemsEl = $("cartItems");

function renderCart() {
  const quantities = products.map(product => ({
    product,
    quantity: cart.filter(item => item.id === product.id).length
  })).filter(item => item.quantity > 0);

  $("cartCount").textContent = String(cart.length);
  cartItemsEl.innerHTML = quantities.length
    ? quantities.map(({product, quantity}) => `
      <div class="cartItem">
        <div class="cartItem-info"><span>${product.name}</span><b>${product.price} EGP للقطعة</b></div>
        <div class="quantity-controls" aria-label="الكمية">
          <button type="button" data-plus="${product.id}" aria-label="زيادة الكمية">+</button>
          <span>${quantity}</span>
          <button type="button" data-minus="${product.id}" aria-label="تقليل الكمية">−</button>
        </div>
      </div>`).join("")
    : '<p class="empty-cart">السلة فارغة</p>';
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  $("cartTotal").textContent = "الإجمالي: " + total + " EGP";
  $("checkout").disabled = cart.length === 0;
}

function openCart() {
  cartPanel.classList.add("open");
  $("cartBtn").setAttribute("aria-expanded", "true");
}
function closeCart() {
  cartPanel.classList.remove("open");
  $("cartBtn").setAttribute("aria-expanded", "false");
}
function sendOrder() {
  if (!cart.length) {
    window.alert("أضف منتجًا أولًا");
    return;
  }
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  const lines = products.map(product => { const quantity = cart.filter(item => item.id === product.id).length; return quantity ? product.name + " × " + quantity + " - " + (product.price * quantity) + " EGP" : null; }).filter(Boolean);
  const message = ["طلب تجريبي من متجر NORTH:", ...lines, "الإجمالي: " + total + " EGP"].join("\n");
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.assign(url);
}

if (productsEl) {
  productsEl.innerHTML = products.map(product =>
    `<article class="product"><div class="photo">${product.symbol}</div><h3>${product.name}</h3><p>${product.tag}</p><div class="row"><strong>${product.price} EGP</strong><button type="button" data-add="${product.id}">أضف للسلة +</button></div></article>`
  ).join("");
  productsEl.addEventListener("click", event => {
    const button = event.target.closest("button[data-add]");
    if (!button || !productsEl.contains(button)) return;
    const product = products.find(item => item.id === Number(button.dataset.add));
    if (!product) return;
    cart.push(product);
    renderCart();
    button.textContent = "تمت الإضافة ✓";
    window.setTimeout(() => { if (button.isConnected) button.textContent = "أضف للسلة +"; }, 900);
  });
}

cartItemsEl.addEventListener("click", event => {
  const plus = event.target.closest("button[data-plus]");
  const minus = event.target.closest("button[data-minus]");
  if (plus) {
    const product = products.find(item => item.id === Number(plus.dataset.plus));
    if (product) cart.push(product);
    renderCart();
    return;
  }
  if (minus) {
    const index = cart.findIndex(item => item.id === Number(minus.dataset.minus));
    if (index !== -1) cart.splice(index, 1);
    renderCart();
  }
});
$("cartBtn").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
$("checkout").addEventListener("click", sendOrder);
renderCart();
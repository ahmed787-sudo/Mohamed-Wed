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

function renderCart() {
  $("cartCount").textContent = String(cart.length);
  $("cartItems").innerHTML = cart.length
    ? cart.map(product => `<div class="cartItem"><span>${product.name}</span><b>${product.price} EGP</b></div>`).join("")
    : "السلة فارغة";
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  $("cartTotal").textContent = "الإجمالي: " + total + " EGP";
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
  const lines = cart.map(product => product.name + " - " + product.price + " EGP");
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
$("cartBtn").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
$("checkout").addEventListener("click", sendOrder);
renderCart();
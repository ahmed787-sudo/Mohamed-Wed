"use strict";
const WHATSAPP_NUMBER = "201001879213";
document.addEventListener("click", event => {
  const button = event.target.closest("button[data-name][data-price]");
  if (!button) return;
  const message = "Hello, I'm interested in " + button.dataset.name + " (" + button.dataset.price + " EGP). Please share more details.";
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.assign(url);
});
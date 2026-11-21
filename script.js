"use strict";
const WHATSAPP_NUMBER = "201001879213";
const prices = {
  EGP: [
    {name:"Landing Page",price:8000,desc:"صفحة هبوط تسويقية مركزة",features:["تصميم متجاوب","قسم خدمات ومميزات","زر واتساب ونموذج تواصل","أساسيات SEO"]},
    {name:"Business Website",price:15000,desc:"موقع تعريفي احترافي للشركات",features:["حتى 8 صفحات","تصميم متجاوب","صفحات خدمات واتصال","أساسيات SEO"]},
    {name:"Professional Website",price:25000,desc:"موقع احترافي بمحتوى وتجربة أوسع",features:["هيكل صفحات مخصص","أقسام ومحتوى متقدم","نماذج تواصل","تحسين تجربة الاستخدام"]},
    {name:"E-commerce Store",price:35000,desc:"متجر إلكتروني لعرض وبيع المنتجات",features:["حتى 50 منتجًا كبداية","تصنيفات وصفحات منتجات","سلة وطلب شراء","إعداد وسائل الشحن والدفع حسب المتاح"]},
    {name:"Custom Web App",price:80000,desc:"تطبيق ويب أو نظام مخصص",features:["تحليل المتطلبات","واجهات ولوحة تحكم","وظائف حسب الاتفاق","قابل للتوسع"]}
  ],
  SAR: [
    {name:"Landing Page",price:2500,desc:"صفحة هبوط تسويقية مركزة",features:["تصميم متجاوب","قسم خدمات ومميزات","زر واتساب ونموذج تواصل","أساسيات SEO"]},
    {name:"Business Website",price:6000,desc:"موقع تعريفي احترافي للشركات",features:["حتى 8 صفحات","تصميم متجاوب","صفحات خدمات واتصال","أساسيات SEO"]},
    {name:"Professional Website",price:10000,desc:"موقع احترافي بمحتوى وتجربة أوسع",features:["هيكل صفحات مخصص","أقسام ومحتوى متقدم","نماذج تواصل","تحسين تجربة الاستخدام"]},
    {name:"E-commerce Store",price:12000,desc:"متجر إلكتروني لعرض وبيع المنتجات",features:["حتى 50 منتجًا كبداية","تصنيفات وصفحات منتجات","سلة وطلب شراء","إعداد وسائل الشحن والدفع حسب المتاح"]},
    {name:"Custom Store / Platform",price:25000,desc:"متجر أو منصة مخصصة",features:["تخطيط مخصص","وظائف متقدمة","لوحة إدارة حسب النطاق","قابل للتوسع"]}
  ],
  AED: [
    {name:"Landing Page",price:2500,desc:"صفحة هبوط تسويقية مركزة",features:["تصميم متجاوب","قسم خدمات ومميزات","زر واتساب ونموذج تواصل","أساسيات SEO"]},
    {name:"Business Website",price:6000,desc:"موقع تعريفي احترافي للشركات",features:["حتى 8 صفحات","تصميم متجاوب","صفحات خدمات واتصال","أساسيات SEO"]},
    {name:"Professional Website",price:10000,desc:"موقع احترافي بمحتوى وتجربة أوسع",features:["هيكل صفحات مخصص","أقسام ومحتوى متقدم","نماذج تواصل","تحسين تجربة الاستخدام"]},
    {name:"E-commerce Store",price:12000,desc:"متجر إلكتروني لعرض وبيع المنتجات",features:["حتى 50 منتجًا كبداية","تصنيفات وصفحات منتجات","سلة وطلب شراء","إعداد وسائل الشحن والدفع حسب المتاح"]},
    {name:"Custom Store / Platform",price:25000,desc:"متجر أو منصة مخصصة",features:["تخطيط مخصص","وظائف متقدمة","لوحة إدارة حسب النطاق","قابل للتوسع"]}
  ]
};
const services = [
  ["01","صفحات الهبوط","صفحات تسويقية للحملات والعروض وجمع العملاء المحتملين.","من 8,000 EGP"],
  ["02","مواقع الشركات","موقع احترافي يعرض نشاطك وخدماتك ويزيد ثقة العملاء.","من 15,000 EGP"],
  ["03","المتاجر الإلكترونية","عرض المنتجات والتصنيفات والسلة والطلبات ووسائل الدفع.","من 35,000 EGP"],
  ["04","تطبيقات الويب","لوحات تحكم وأنظمة حجز وإدارة مصممة حسب احتياجك.","من 80,000 EGP"]
];

function waLink(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}
function openWhatsApp(message) {
  const url = waLink(message);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.assign(url);
}

const serviceGrid = document.getElementById("serviceGrid");
if (serviceGrid) {
  serviceGrid.innerHTML = services.map(s =>
    `<article class="service-card"><span class="number">${s[0]} / SERVICE</span><h3>${s[1]}</h3><p>${s[2]}</p><span class="service-price">${s[3]}</span></article>`
  ).join("");
}

function renderPrices(currency) {
  const host = document.getElementById("pricingGrid");
  if (!host || !prices[currency]) return;
  host.innerHTML = prices[currency].map((p,i) => {
    const formatted = new Intl.NumberFormat("en-US").format(p.price);
    const message = `Hello Mohamed, I'm interested in the ${p.name} package (${formatted} ${currency}). Please send me a detailed quote.`;
    return `<article class="price-card ${i===1?"featured":""}">
      <span class="tier">PACKAGE 0${i+1}</span><h3>${p.name}</h3><p>${p.desc}</p>
      <div class="price-value">${formatted} <small>${currency}</small></div>
      <ul>${p.features.map(f=>`<li>${f}</li>`).join("")}</ul>
      <a class="btn btn-primary quote-btn" href="${waLink(message)}" target="_blank" rel="noopener noreferrer">اطلب عرض السعر عبر واتساب ↗</a>
    </article>`;
  }).join("");
}

const currencySelect = document.getElementById("currencySelect");
if (currencySelect) {
  renderPrices(currencySelect.value);
  currencySelect.addEventListener("change", event => renderPrices(event.currentTarget.value));
}

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
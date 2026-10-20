/* ==========================================================
   BELLA MASSA - SCRIPT (JavaScript puro)
   1. CONFIG  2. Produtos  3. Funções  4. Inicialização
   ========================================================== */

/* ---------- 1. CONFIGURAÇÕES: EDITE AQUI ---------- */
const CONFIG = {
  // Número com código do país + DDD, só dígitos. Ex.: Brasil, DDD 11 -> "5511999999999"
  // ATENÇÃO: este é um PLACEHOLDER. Troque pelo número real.
  whatsappNumber: "5500000000000",
  phoneDisplay: "[SUBSTITUIR: (00) 00000-0000]",
  // Texto usado para buscar o local no Google Maps. Troque pelo endereço real.
  mapsQuery: "[SUBSTITUIR: endereço completo da pizzaria]",
  // Imagem usada quando a foto do produto não for encontrada
  fallbackImage: "images/placeholder.svg",
};

/* ---------- 2. PRODUTOS: EDITE, ADICIONE OU REMOVA ----------
   Para usar a foto real: coloque o arquivo na pasta "images/"
   com o MESMO nome indicado em "image" (ex.: images/pizza-margherita.jpg).
   Os preços abaixo são apenas EXEMPLOS. */
const CATEGORIES = ["Pizzas", "Hambúrgueres", "Porções", "Bebidas"];

const PRODUCTS = [
  // --- Pizzas ---
  { category: "Pizzas", name: "Margherita", desc: "Molho de tomate, mussarela, tomate fresco e manjericão.", price: 49.9, image: "images/pizza-margherita.jpg" },
  { category: "Pizzas", name: "Calabresa", desc: "Calabresa fatiada, cebola e azeitonas.", price: 52.9, image: "images/pizza-calabresa.jpg" },
  { category: "Pizzas", name: "Quatro Queijos", desc: "Mussarela, provolone, gorgonzola e parmesão.", price: 58.9, image: "images/pizza-quatro-queijos.jpg" },
  { category: "Pizzas", name: "Frango com Catupiry", desc: "Frango desfiado temperado e catupiry cremoso.", price: 56.9, image: "images/pizza-frango-catupiry.jpg" },
  { category: "Pizzas", name: "Portuguesa", desc: "Presunto, ovos, cebola, ervilha e mussarela.", price: 55.9, image: "images/pizza-portuguesa.jpg" },
  { category: "Pizzas", name: "Chocolate com Morango", desc: "Pizza doce com chocolate ao leite e morangos.", price: 54.9, image: "images/pizza-chocolate-morango.jpg" },
  // --- Hambúrgueres ---
  { category: "Hambúrgueres", name: "Clássico Bella", desc: "Burger 160g, queijo, alface, tomate e molho da casa.", price: 28.9, image: "images/burger-classico.jpg" },
  { category: "Hambúrgueres", name: "Cheddar Bacon", desc: "Burger 160g, cheddar cremoso e bacon crocante.", price: 33.9, image: "images/burger-cheddar-bacon.jpg" },
  { category: "Hambúrgueres", name: "Frango Crocante", desc: "Filé de frango empanado, queijo e maionese temperada.", price: 29.9, image: "images/burger-frango.jpg" },
  { category: "Hambúrgueres", name: "Duplo Smash", desc: "Dois smashes, queijo prato e cebola caramelizada.", price: 38.9, image: "images/burger-duplo.jpg" },
  // --- Porções ---
  { category: "Porções", name: "Batata Frita", desc: "Porção crocante e sequinha, com sal e orégano.", price: 24.9, image: "images/porcao-batata-frita.jpg" },
  { category: "Porções", name: "Onion Rings", desc: "Anéis de cebola empanados e dourados.", price: 26.9, image: "images/porcao-onion-rings.jpg" },
  { category: "Porções", name: "Calabresa Acebolada", desc: "Calabresa grelhada com cebola e pão.", price: 34.9, image: "images/porcao-calabresa-acebolada.jpg" },
  { category: "Porções", name: "Frango a Passarinho", desc: "Pedaços de frango fritos e bem temperados.", price: 39.9, image: "images/porcao-frango-a-passarinho.jpg" },
  // --- Bebidas ---
  { category: "Bebidas", name: "Refrigerante Lata", desc: "Lata 350ml, vários sabores.", price: 6.5, image: "images/bebida-refrigerante.jpg" },
  { category: "Bebidas", name: "Refrigerante 2L", desc: "Garrafa 2 litros, ideal para dividir.", price: 14.9, image: "images/bebida-2l.jpg" },
  { category: "Bebidas", name: "Suco Natural", desc: "Copo 400ml. Pergunte os sabores do dia.", price: 9.9, image: "images/bebida-suco.jpg" },
  { category: "Bebidas", name: "Água Mineral", desc: "Garrafa 500ml, com ou sem gás.", price: 4.5, image: "images/bebida-agua.jpg" },
];

/* ---------- 3. FUNÇÕES ---------- */
const $ = (sel) => document.querySelector(sel);

/* Formata número como moeda brasileira: 49.9 -> "R$ 49,90" */
const formatPrice = (value) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/* Monta o link do WhatsApp com a mensagem (já codificada para URL) */
function whatsappLink(message) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* Mensagem automática ao clicar em "Pedir" */
const orderMessage = (product) => `Olá! Gostaria de pedir: ${product.name}. Pode me ajudar?`;

/* Cria o card de um produto */
function createCard(product, index) {
  const card = document.createElement("article");
  card.className = "card";
  card.style.animationDelay = `${index * 50}ms`;

  const img = document.createElement("img");
  img.className = "card__img";
  img.src = product.image;
  img.alt = product.name;
  img.loading = "lazy";
  img.addEventListener("error", () => { img.src = CONFIG.fallbackImage; }, { once: true });

  const body = document.createElement("div");
  body.className = "card__body";
  body.innerHTML = `
    <h3 class="card__name"></h3>
    <p class="card__desc"></p>
    <div class="card__foot">
      <span class="card__price"></span>
      <a class="btn btn--small" target="_blank" rel="noopener noreferrer">Pedir</a>
    </div>`;
  body.querySelector(".card__name").textContent = product.name;
  body.querySelector(".card__desc").textContent = product.desc;
  body.querySelector(".card__price").textContent = formatPrice(product.price);
  const btn = body.querySelector("a");
  btn.href = whatsappLink(orderMessage(product));
  btn.setAttribute("aria-label", `Pedir ${product.name} pelo WhatsApp`);

  card.append(img, body);
  return card;
}

/* Mostra os produtos de uma categoria */
function showCategory(category) {
  const grid = $("#menuGrid");
  grid.replaceChildren(...PRODUCTS.filter((p) => p.category === category).map(createCard));
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.dataset.category === category));
  });
}

/* Cria as abas de categorias */
function buildTabs() {
  const tabs = $("#tabs");
  CATEGORIES.forEach((category) => {
    const tab = document.createElement("button");
    tab.className = "tab";
    tab.type = "button";
    tab.role = "tab";
    tab.textContent = category;
    tab.dataset.category = category;
    tab.addEventListener("click", () => showCategory(category));
    tabs.append(tab);
  });
}

/* Botões gerais de WhatsApp (hero, menu, flutuante, contato) */
function setupWhatsAppLinks() {
  const generic = whatsappLink("Olá! Vim pelo site da Bella Massa e gostaria de fazer um pedido.");
  document.querySelectorAll(".js-whatsapp").forEach((el) => {
    el.href = generic;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
}

/* Botão do Google Maps e telefone exibido */
function setupContact() {
  $("#mapsBtn").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapsQuery)}`;
  $("#phoneText").textContent = CONFIG.phoneDisplay;
}

/* Menu mobile (abre/fecha) */
function setupNav() {
  const toggle = $("#navToggle");
  const nav = $("#nav");
  const header = $("#header");
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });

  /* Fundo do cabeçalho ao rolar a página */
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- 4. INICIALIZAÇÃO ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildTabs();
  showCategory(CATEGORIES[0]);
  setupWhatsAppLinks();
  setupContact();
  setupNav();
  $("#year").textContent = new Date().getFullYear();
});

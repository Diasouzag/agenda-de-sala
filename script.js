/* ====================================
   PARTE FEITA COM GRANDE AJUDA DE IA
==================================== */

/* =========================
   1. PEGAR ELEMENTOS HTML
========================= */

const addButton = document.querySelector(".add-button");
const cards = document.querySelectorAll(".card");
const modal = document.getElementById("modal-add");

const inputTitle = document.getElementById("input-add-title");
const inputDesc = document.getElementById("input-add-desc");
const btnSalvar = document.getElementById("btn-salvar-add");


/* =========================
   2. ESTADO DO SISTEMA
========================= */

// guarda o modo atual (add, edit, delete futuramente)
let modo = null;

// guarda qual card foi clicado
let cardSelecionado = null;


/* =========================
   3. BOTÃO ADICIONAR
========================= */

addButton.addEventListener("click", () => {
  modo = "add";

  // deixa o botão visualmente ativo
  addButton.classList.add("active");

  // adiciona animação de piscar nos cards
  cards.forEach(card => card.classList.add("blinking"));
});


/* =========================
   4. CLIQUE NOS CARDS
========================= */

cards.forEach((card) => {
  card.addEventListener("click", () => {

    // só funciona se estiver no modo ADD
    if (modo === "add") {
      cardSelecionado = card;

      // abre o modal
      modal.style.display = "flex";
    }

  });
});


/* =========================
   5. SALVAR EVENTO
========================= */

btnSalvar.addEventListener("click", () => {
  const titulo = inputTitle.value;
  const descricao = inputDesc.value;

  // só adiciona se tiver um card selecionado
  if (cardSelecionado) {
    cardSelecionado.innerHTML = `
      <strong>${titulo}</strong>
      <small>${descricao}</small>
    `;
  }

  // fecha modal
  modal.style.display = "none";

  // limpa inputs
  inputTitle.value = "";
  inputDesc.value = "";

  // reseta estado
  modo = null;
  cardSelecionado = null;

  // tira o visual ativo do botão
  addButton.classList.remove("active");

  // remove animação de piscar dos cards
  cards.forEach(card => card.classList.remove("blinking"));
});
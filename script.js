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

const cores = document.querySelectorAll(".color-options div");
const warningColor = document.getElementById("warning-color");
/* =========================
   2. ESTADO DO SISTEMA
========================= */

// guarda o modo atual (add, edit, delete futuramente)
let modo = null;

// guarda qual card foi clicado
let cardSelecionado = null;

// nova variável para guardar a cor escolhida
let corSelecionada = null;

/* =========================
   3. BOTÃO ADICIONAR
========================= */

addButton.addEventListener("click", () => {
  modo = "add";

  // deixa o botão visualmente ativo
  addButton.classList.add("active");

  // adiciona animação de piscar nos cards
  cards.forEach((card) => card.classList.add("blinking"));
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
   4.5 SELEÇÃO DE CORES
========================= */

cores.forEach((cor) => {
  cor.addEventListener("click", () => {
    // remove seleção anterior
    cores.forEach((c) => c.classList.remove("selected"));

    // adiciona seleção atual
    cor.classList.add("selected");

    // salva cor
    corSelecionada = cor.classList[0];

    // esconde aviso
    warningColor.style.display = "none";
  });
});

/* =========================
   5. SALVAR EVENTO
========================= */

btnSalvar.addEventListener("click", () => {
  const titulo = inputTitle.value;
  const descricao = inputDesc.value;

  // 🚨 BLOQUEIA SE NÃO ESCOLHER COR
  if (!corSelecionada) {
    warningColor.style.display = "block";
    return;
  }

  // só adiciona se tiver um card selecionado
  if (cardSelecionado) {
    cardSelecionado.innerHTML = `
      <strong>${titulo}</strong>
      <small>${descricao}</small>
    `;

    // remove cores antigas
    cardSelecionado.classList.remove(
      "emerald",
      "ocean",
      "neonviolet",
      "bbp",
      "classic-crimson",
    );

    // aplica nova cor
    cardSelecionado.classList.add(corSelecionada);
  }

  // fecha modal
  modal.style.display = "none";

  // limpa inputs
  inputTitle.value = "";
  inputDesc.value = "";

  // limpa seleção de cor
  corSelecionada = null;
  cores.forEach((c) => c.classList.remove("selected"));

  // esconde aviso
  warningColor.style.display = "none";

  // reseta estado
  modo = null;
  cardSelecionado = null;

  // tira o visual ativo do botão
  addButton.classList.remove("active");

  // remove animação de piscar dos cards
  cards.forEach((card) => card.classList.remove("blinking"));
});

/* =========================
   6. FECHAR MODAL CLICANDO FORA
========================= */

modal.addEventListener("click", (e) => {
  // só fecha se clicar fora do modal-content
  if (e.target === modal) {
    // fecha modal
    modal.style.display = "none";

    // limpa inputs
    inputTitle.value = "";
    inputDesc.value = "";
    
    // limpa seleção de cor
    corSelecionada = null;
    cores.forEach((c) => c.classList.remove("selected"));

    // esconde aviso
    warningColor.style.display = "none";

    // reseta estado
    modo = null;
    cardSelecionado = null;

    // tira o visual ativo do botão
    addButton.classList.remove("active");

    // remove animação de piscar dos cards
    cards.forEach((card) => card.classList.remove("blinking"));
  }
});

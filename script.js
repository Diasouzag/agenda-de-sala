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
const warningInput = document.getElementById("warning-input");

/* =========================
  EXTRAS
========================= */

inputTitle.addEventListener("input", () => {
  warningInput.style.display = "none";
});

inputDesc.addEventListener("input", () => {
  warningInput.style.display = "none";
});

/* =========================
   2. ESTADO DO SISTEMA
========================= */

// guarda o modo atual (add, edit, delete futuramente)
let modo = null;

// guarda qual card foi clicado
let cardSelecionado = null;

// nova variável para guardar a cor escolhida
let corSelecionada = null;

// pega eventos salvos no navegador (ou cria array vazio)
let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

/* =========================
   3. FUNÇÕES AUXILIARES
========================= */

// remove / adiciona blink nos cards
function toggleBlink(ativo) {
  cards.forEach((card) => {
    card.classList.toggle("blinking", ativo);
  });
}

// reseta tudo do modal (evita repetir código)
function resetModal() {
  modal.style.display = "none";

  inputTitle.value = "";
  inputDesc.value = "";

  corSelecionada = null;
  cores.forEach((c) => c.classList.remove("selected"));

  warningColor.style.display = "none";

  warningInput.style.display = "none";

  modo = null;
  cardSelecionado = null;

  addButton.classList.remove("active");
  toggleBlink(false);
}

// limpa todos os cards antes de renderizar
function limparCards() {
  cards.forEach((card) => {
    card.innerHTML = "";
    card.classList.remove(
      "emerald",
      "ocean",
      "lobster",
      "teal",
      "classic-crimson",
    );
  });
}

// renderiza eventos salvos
function renderEventos() {
  limparCards();

  eventos.forEach((evento) => {
    const card = document.querySelector(
      `.card[data-dia="${evento.dia}"][data-horario="${evento.horario}"]`,
    );

    if (card) {
      card.innerHTML = `
        <strong>${evento.titulo}</strong>
        <small>${evento.descricao}</small>
      `;

      card.classList.add(evento.cor);
    }
  });
}

/* =========================
   4. BOTÃO ADICIONAR
========================= */

addButton.addEventListener("click", () => {
  modo = "add";

  // remove active de todos (EVITA BUG VISUAL)
  document.querySelectorAll(".panel-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  addButton.classList.add("active");

  toggleBlink(true);
});

/* =========================
   5. CLIQUE NOS CARDS
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
   6. SELEÇÃO DE CORES
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
   7. SALVAR EVENTO
========================= */

btnSalvar.addEventListener("click", () => {
  const titulo = inputTitle.value;
  const descricao = inputDesc.value;

  // validação de cor
  if (!corSelecionada) {
    warningColor.style.display = "block";
    return;
  }

  // validação de campos vazios
  if (!titulo.trim() || !descricao.trim()) {
    warningInput.style.display = "block";
    return;
  }

  if (cardSelecionado) {
    const dia = cardSelecionado.dataset.dia;
    const horario = cardSelecionado.dataset.horario;

    // remove evento antigo do mesmo lugar (evita duplicação)
    eventos = eventos.filter((e) => !(e.dia === dia && e.horario === horario));

    // adiciona novo evento
    eventos.push({
      dia,
      horario,
      titulo,
      descricao,
      cor: corSelecionada,
    });

    // salva no navegador
    localStorage.setItem("eventos", JSON.stringify(eventos));
  }

  // atualiza tela
  renderEventos();

  // reseta tudo
  resetModal();
});

/* =========================
   8. FECHAR MODAL CLICANDO FORA
========================= */

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    resetModal();
  }
});

/* =========================
   9. INICIALIZAÇÃO
========================= */

// carrega eventos quando abrir o site
renderEventos();

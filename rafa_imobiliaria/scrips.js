const imoveis = [
    { nome: "Casa com quintal", tipo: "Casa", bairro: "Centro", detalhe: "3 quartos • 2 banheiros", preco: 420000, icone: "🏡" },
    { nome: "Casa térrea moderna", tipo: "Casa", bairro: "Jardim Aeroporto", detalhe: "2 quartos • garagem", preco: 310000, icone: "🏠" },
    { nome: "Apartamento compacto", tipo: "Apartamento", bairro: "Centro", detalhe: "2 quartos • varanda", preco: 260000, icone: "🏢" },
    { nome: "Apartamento familiar", tipo: "Apartamento", bairro: "Vila Maria", detalhe: "3 quartos • 1 vaga", preco: 380000, icone: "🏬" },
    { nome: "Terreno plano 300 m²", tipo: "Terreno", bairro: "Novo Bairro", detalhe: "Pronto para construir", preco: 120000, icone: "🌳" },
    { nome: "Terreno de esquina", tipo: "Terreno", bairro: "Jardim Primavera", detalhe: "360 m² • escriturado", preco: 165000, icone: "🌿" }
];

const lista = document.getElementById("lista");
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}
function mostrarImoveis(tipo) {
    const filtrados = tipo === "Todos" ? imoveis : imoveis.filter(i => i.tipo === tipo);
    if (filtrados.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhum imóvel nesta categoria no momento.</p>';
        return;
    }
    lista.innerHTML = filtrados.map(i => `
    <article class="imovel">
      <div class="foto">${i.icone}</div>
      <div class="info">
        <span class="tag">${i.tipo}</span>
        <h3>${i.nome}</h3>
        <p>${i.bairro} — ${i.detalhe}</p>
        <p class="preco">${formatarPreco(i.preco)}</p>
      </div>
    </article>`).join("");
}
document.getElementById("filtros").addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;
    document.querySelectorAll("#filtros button").forEach(b => b.classList.remove("ativo"));
    e.target.classList.add("ativo");
    mostrarImoveis(e.target.dataset.tipo);
});
document.getElementById("formulario").addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const resposta = document.getElementById("resposta");
    if (nome === "" || telefone === "") {
        resposta.textContent = "Preencha seu nome e telefone para enviar.";
        resposta.className = "msg erro";
        return;
    }
    resposta.textContent = "Obrigado, " + nome + "! Entraremos em contato em breve.";
    resposta.className = "msg ok";
    e.target.reset();
});

document.getElementById("ano").textContent = new Date().getFullYear();
mostrarImoveis("Todos");
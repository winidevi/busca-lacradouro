// Salvamento automático dos campos
function salvarCampo(id) {
  const campo = document.getElementById(id);
  campo.addEventListener("input", () => {
    localStorage.setItem(id, campo.value);
  });
}

const campos = ["cep", "logradouro", "bairro", "cidade", "estado", "numero"];
campos.forEach(campo => salvarCampo(campo));

window.addEventListener("load", () => {
  campos.forEach(campo => {
    const valorSalvo = localStorage.getItem(campo);
    if (valorSalvo) document.getElementById(campo).value = valorSalvo;
  });
});
// Busca de CEP para cadastro de endereço
document.getElementById("cep").addEventListener("blur", (evento) => {
  const cepInput = evento.target.value.replace(/\D/g, '').trim();
  if (cepInput.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
    .then(response => response.json())
    .then(data => {
      if (!data.erro) {
        const camposAPI = ["logradouro", "bairro", "cidade", "estado"];
        camposAPI.forEach(id => {
          document.getElementById(id).value = data[id] || "";
          localStorage.setItem(id, data[id] || "");
        });
      } else {
        alert("CEP não encontrado!");
      }
    })
    .catch(err => console.error("Erro ao buscar CEP:", err));
});
// Tema
const botaoTema = document.getElementById("botaotema");

botaoTema.addEventListener("click", () => {
    const temaAtual = localStorage.getItem("tema") || "light";
    const novoTema = temaAtual === "light" ? "dark-mode" : "light";

    document.body.classList.remove("light", "dark-mode");
    document.body.classList.add(novoTema);

    localStorage.setItem("tema", novoTema);

    botaoTema.textContent = novoTema === "dark-mode" ? "☀" : "🌙";
});

window.addEventListener("load", () => {
    const temaSalvo = localStorage.getItem("tema") || "light";
    document.body.classList.add(temaSalvo);
    botaoTema.textContent = temaSalvo === "dark-mode" ? "☀" : "🌙";
});

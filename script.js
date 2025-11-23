
document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;

    if (!(cepInformado.length === 8))
        return;

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('lagradouro').value = data.logradouro || "";
                document.getElementById('bairro').value = data.bairro || "";
                document.getElementById('cidade').value = data.localidade || "";
                document.getElementById('estado').value = data.uf || "";
            } else {
                alert("CEP não encontrado!");
            }
        })
        .catch(error => console.error("Erro ao buscar o CEP informado: ", error));
})
        
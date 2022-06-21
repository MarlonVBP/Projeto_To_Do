function salvarDados() {
    let stringParceiras = JSON.stringify(EMP_PARCEIRAS);
    let stringExparceiras = JSON.stringify(EMP_EXPARCEIRAS);
    localStorage.setItem("PARCEIRAS", stringParceiras);
    localStorage.setItem("EXPARCEIRAS", stringExparceiras);
}
function receberDados(tipo) {
    let dados = localStorage.getItem(tipo);

    if (!dados) {
        return [];
    } else {
        return JSON.parse(dados);
    }
}
function limparStorage(vetor) {
    localStorage.removeItem(vetor);
    location.reload();
}
const parceiras = document.getElementById("parceiras");
const exparceiras = document.getElementById("ex-parceiras");
let EMP_PARCEIRAS = receberDados("PARCEIRAS");
let EMP_EXPARCEIRAS = receberDados("EXPARCEIRAS");
const empresa = document.getElementById("empresa");
const modal = document.querySelector(".modal")
const aliar = document.getElementById("btn-aliar");
aliar.addEventListener("click", () => {
    let emp = empresa.value;
    if(emp.length > 1){
    let id = fazerNovoID();
    EMP_PARCEIRAS.push(
        {
            "id": id,
            "nome": emp
        }
    );
    empresa.value = "";
    exibirModal("none");
} else {
    empresa.onlyread.value = "nome inválido";
    setTimeout(function () {
        empresa.value = "";
    }, 500);
}
    atualizar();
})
function capatarMaiorID(vetor) {
    if (vetor.length > 0) {
        let vetorRanqueado = vetor.sort((a, b) => b.id - a.id);
        return vetorRanqueado[0].id;
    } else {
        return 0;
    }
}
function fazerNovoID() {
    let maiorIDParceiras = capatarMaiorID(EMP_PARCEIRAS);
    let maiorIDExparceiras = capatarMaiorID(EMP_EXPARCEIRAS);
    let novoID = (maiorIDParceiras > maiorIDExparceiras ? maiorIDParceiras : maiorIDExparceiras);
    return novoID + 1;
}
function Terminar(index) {
    let idEmpresa = EMP_PARCEIRAS[index].id;
    let checkBox = document.getElementById("item_" + idEmpresa);
    checkBox.checked = true;
    checkBox.parentElement.classList.add("efeito");
    EMP_EXPARCEIRAS.push(EMP_PARCEIRAS.splice(index, 1)[0]);
    setTimeout(function () {
        atualizar()
    }, 333);
}
function Retornar(index) {
    let idEmpresa = EMP_EXPARCEIRAS[index].id;
    let checkBox = document.getElementById("item_" + idEmpresa);
    checkBox.checked = true;
    checkBox.parentElement.classList.add("efeito");
    EMP_PARCEIRAS.push(EMP_EXPARCEIRAS.splice(index, 1)[0]);
    setTimeout(function () {
        atualizar()
    }, 333);
}
function atualizar() {
    salvarDados();
    parceiras.innerHTML = "";
    EMP_PARCEIRAS.forEach((empresa, i) => {
        let modelo_empresa = `
        <article class="item">
        <input type="checkbox" onchange="Terminar(${i})" id="item_${empresa.id}">
            <label for="item_${empresa.id}">
                ${empresa.nome}
            </label>
        </article>`;
        parceiras.innerHTML += modelo_empresa;
    });
    exparceiras.innerHTML = "";
    EMP_EXPARCEIRAS.forEach((empresa, i) => {
        let modelo_empresa = `
            <article class="item finalizado">
            <input type="checkbox" onchange="Retornar(${i})" id="item_${empresa.id}" checked>
            <label for="item_${empresa.id}">
            ${empresa.nome}
            </label>
        </article>`
        exparceiras.innerHTML += modelo_empresa;
    })
}
function exibirModal(display) {
    modal.style.display = display;
}
atualizar();
exibirModal("none");
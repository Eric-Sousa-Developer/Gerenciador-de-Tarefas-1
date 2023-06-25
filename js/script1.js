const LISTA_PENDENTE = 1;
const LISTA_CONCLUIDA = 2;

let pendentes = JSON.parse(localStorage.getItem("pendentes"));
if (pendentes == null) {
    pendentes = [];
}
let concluidas = JSON.parse(localStorage.getItem("concluidas"));
if (concluidas == null) {
    concluidas = [];
}
let listaAtual = LISTA_PENDENTE;

function salvarDados() {
    localStorage.setItem("pendentes", JSON.stringify(pendentes));
    localStorage.setItem("concluidas", JSON.stringify(concluidas));
}

function exibirPendentes() {
    listaAtual = LISTA_PENDENTE;
    btnPendentes.className = "ativo";
    btnConcluidas.className = "";
    painel.innerHTML = "";
    for (let i = 0; i < pendentes.length;i++) {
        painel.innerHTML +=`<section>
                                <label>${pendentes[i]}</label>
                                <button onclick = "concluirTarefa(this.parentElement)">&#9989;</button>
                                <button onclick = "alterarTarefa(this.parentElement , pendentes)">&#9997;</button>
                                <button onclick = "excluirTarefa(this.parentElement , pendentes)">&#10006;</button>
                            </section>`;     
    };
};
function exibirConcluidas() {
    listaAtual = LISTA_CONCLUIDA;
    painel.innerHTML = "";
    btnPendentes.className = "";
    btnConcluidas.className = "ativo";
    for (let i = 0; i < concluidas.length; i++) {
        painel.innerHTML +=`<section>
                                <label>${concluidas[i]}</label>
                                <button onclick = "desfazerTarefa(this.parentElement)">&#10062;</button>
                                <button onclick = "alterarTarefa(this.parentElement , concluidas)">&#9997;</button>
                                <button onclick = "excluirTarefa(this.parentElement , concluidas)">&#10006;</button>
                            </section>`;     
    };
};
function criarTarefa() {
   let nova = prompt("Informe a tarefa: ");
   if (nova == "" ) {
    alert("não pode adicionar uma tarefa vazia.");
   } else 
     if(nova !=null) {
     pendentes.push(nova);
     salvarDados();
     if (listaAtual == LISTA_PENDENTE) {
        exibirPendentes();
    }
   };
};
function concluirTarefa(container){
    let tarefa = container.querySelector("label").innerHTML;
    concluidas.push(tarefa);
    pendentes.splice(pendentes.indexOf(tarefa), 1);
    salvarDados();
    exibirPendentes();
};
function desfazerTarefa(container){
    let tarefa = container.querySelector("label").innerHTML;
    pendentes.push(tarefa);
    concluidas.splice(concluidas.indexOf(tarefa), 1);
    salvarDados();
    exibirConcluidas();
};

function alterarTarefa(container ,lista) {
    let nova = prompt("Edite a tarefa");
    if (nova == "" ) {
        alert("não pode alterar para uma tarefa vazia.");
       } else 
         if(nova !=null) {
            let tarefa = container.querySelector("label").innerHTML;
            lista[lista.indexOf(tarefa)] = nova;
            salvarDados();
            if (lista == pendentes) {
                exibirPendentes();
            } else {
                exibirConcluidas();
            }
       };
        
}
function excluirTarefa(container ,lista){
    //console.log(container);
    let tarefa = container.querySelector("label").innerHTML;
    if (confirm(`Você realmente quer excluir ${tarefa} ?`)) {
        lista.splice(lista.indexOf(tarefa), 1);
        salvarDados();
        if (lista == pendentes) {
            exibirPendentes();
        } else {
            exibirConcluidas();
        }  
    }
    
};

exibirConcluidas();


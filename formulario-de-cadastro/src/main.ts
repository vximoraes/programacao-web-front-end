import './style.css'

console.log("Carregou o main.ts...");

const nome = document.querySelector<HTMLInputElement>("#nome")!
const email = document.querySelector<HTMLInputElement>("#email")!
const formulario = document.querySelector<HTMLFormElement>("#formulario")!

interface Pessoa {
    nome: string,
    email: string,
    data: Date
}

let pessoas: Pessoa[] = []

function limparFormulario() {
    nome.value = ""
    email.value = ""
}

function imprimirPessoas() {
    let pessoasStorage = localStorage.getItem("pessoas")

    console.clear()
    console.log("|          Pessoas Cadastradas          |");

    if (pessoasStorage) {
        pessoas = JSON.parse(pessoasStorage)
        for(let i = 0; i < pessoas.length; i++) {
            const pessoa = pessoas[i];
            console.log("-----------------------------------------");
            console.log(`Nome: ${pessoa.nome}`);
            console.log(`E-mail: ${pessoa.email}`);
            console.log(`Data/hora: ${pessoa.data}`);
            console.log("-----------------------------------------");
        }
    }
}

function sincronizar() {
    localStorage.setItem("pessoas", JSON.stringify(pessoas))
}

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const pessoa: Pessoa = {
        nome: nome.value,
        email: email.value,
        data: new Date()
    }

    pessoas.push(pessoa);
    // localStorage.setItem("pessoa", JSON.stringify(pessoa))
    sincronizar()
    imprimirPessoas()
    
    limparFormulario();
})

imprimirPessoas()
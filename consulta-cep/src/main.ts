import './style.css'

const cep = document.querySelector<HTMLInputElement>('#cep')!
const logradouro = document.querySelector<HTMLInputElement>('#logradouro')!
const numero = document.querySelector<HTMLInputElement>('#numero')!
const bairro = document.querySelector<HTMLInputElement>('#bairro')!
const estado = document.querySelector<HTMLInputElement>('#estado')!
const estados = document.querySelector<HTMLInputElement>('#estados')!
const cidade = document.querySelector<HTMLInputElement>('#cidade')!
const cidades = document.querySelector<HTMLInputElement>('#cidades')!

cep.addEventListener('blur', () => {
    consultarCep()
})

function limparFormulario() {
    logradouro.value = ''
    numero.value = ''
    bairro.value = ''
    estado.value = ''
    cidade.value = ''
}

async function buscarEstados() {
    const result = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    const body = await result.json()
    body.forEach((estado: { sigla: string, nome: string }) => {
        const estadoOption = document.createElement('option')

        estadoOption.innerHTML = estado.nome
        estados.appendChild(estadoOption)
    })
}

estados.addEventListener('change', async () => {
    const estado = estados.value
    const result = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
    const body = await result.json()

    estados.innerHTML = ''

    body.array.forEach((cidade: { id: number, nome: string }) => {
        const cidadeOption = document.createElement('option')

        cidadeOption.value = cidade.id.toString()
        cidadeOption.textContent = cidade.nome

        cidades.appendChild(cidadeOption)
    });
})

buscarEstados()

async function consultarCep() {
    const result = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep.value}`)
    const body = await result.json()
    limparFormulario()
    numero.focus()
    logradouro.value = body.street
    bairro.value = body.neighborhood
    estado.value = body.state
    cidade.value = body.city
    buscarEstados()
}
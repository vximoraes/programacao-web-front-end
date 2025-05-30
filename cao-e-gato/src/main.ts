import './style.css'

const imagem = document.querySelector<HTMLImageElement>('#imagem')!
const opcoes = document.querySelector<HTMLSelectElement>('#opcoes')!
const recarregar = document.querySelector<HTMLInputElement>('#recarregar')!;

async function main() {
    if (opcoes.value == "cachorro")  {
        const cachorro = await buscarCachorro()
        imagem.src = cachorro.message
    }

    if (opcoes.value == "gato") {
        const gato = await buscarGato()
        imagem.src = gato[0].url
    }
}

recarregar.addEventListener('click', (event) => {
    event.preventDefault()
    main()
})

main()

// Funções utilitárias de requisição.

async function buscarCachorro() {
    const cachorro = await fetch('https://dog.ceo/api/breeds/image/random')
    if (!cachorro.ok) {
        console.error('Erro ao buscar Cachorro')
        return {}
    }
    
    return cachorro.json()
}

async function buscarGato() {
    const gato = await fetch('https://api.thecatapi.com/v1/images/search')
    if (!gato.ok) {
        console.error('Erro ao buscar Gato')
        return {}
    }
    return gato.json()
}
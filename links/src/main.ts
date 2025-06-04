import '../public/assets/css/style.css'

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const imagem = document.querySelector<HTMLImageElement>('#imagem')!
const nome = document.getElementById('nome')!
const linksContainer = document.getElementById('links-container')!
const qrcode = document.querySelector<HTMLImageElement>('#qrcode')!
const imagemContainer = document.getElementById('imagem-container')!
const divNome = document.getElementById('div-nome')!
const qrcodeContainer = document.getElementById('qrcode-container')!

if (!id) {
    mostrarMensagemSemId()
} else {
    inserirInformacoes()
}

// Funções auxiliares.

async function buscarUsuario() {
    const usuario = await fetch(`http://localhost:3000/usuarios/${id}`)
    if(!usuario.ok) {
        console.error('Erro ao buscar usuário.')
        return {}
    }
    const usuarioJson = await usuario.json()
    return usuarioJson
}

function inserirLinks(usuario: any) {
    linksContainer.innerHTML = ''
    usuario.link.forEach((link: any) => {
        const div = document.createElement('div')
        div.style.background = usuario.cor_link
        div.style.borderRadius = usuario.border_radius
        div.onmouseover = () => div.style.background = usuario.cor_hover
        div.onmouseout = () => div.style.background = usuario.cor_link

        const iconeHtml = `<img src="${link.icone}" alt="" style="width:22px;height:22px;margin-right:10px;vertical-align:middle;">`
        
        div.innerHTML = `${iconeHtml}<a href="${link.url}" target="_blank" style="color:${usuario.cor_texto_link || '#fff'}">${link.texto}</a>`
        
        linksContainer.appendChild(div)
    })
}

function mostrarMensagemSemId() {
    if (imagemContainer) imagemContainer.style.display = 'none'
    if (divNome) divNome.style.display = 'none'
    if (linksContainer) linksContainer.style.display = 'none'
    if (qrcodeContainer) qrcodeContainer.style.display = 'none'

    const msg = document.createElement('div')
    msg.style.margin = '40px auto'
    msg.style.fontSize = '1.2rem'
    msg.style.color = '#888'
    msg.style.textAlign = 'center'
    msg.textContent = 'Nenhum usuário selecionado. Por favor, forneça um ID na URL.'
    document.body.appendChild(msg)
}

async function inserirInformacoes() {
    const usuario = await buscarUsuario()

    imagem.src = usuario.imagem
    nome.textContent = usuario.nome
    document.body.style.background = usuario.background
    inserirLinks(usuario)
    qrcode.src = usuario.qrcode
}
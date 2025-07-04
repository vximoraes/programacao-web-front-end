import '../public/assets/css/style.css'

// Menu mobile
const botao = document.querySelector("#botao") as HTMLImageElement
const menu = document.querySelector("#menu") as HTMLUListElement
let menuOpen = false

// Função para alternar menu mobile
function toggleMenu() {
    if (window.innerWidth <= 768) {
        menuOpen = !menuOpen
        menu.classList.toggle("show", menuOpen)
        botao.src = menuOpen ? "./public/assets/images/x.svg" : "./public/assets/images/align-justify.svg"
    }
}

// Event listeners
botao?.addEventListener("click", toggleMenu)

// Fechar menu ao redimensionar
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        menuOpen = false
        menu.classList.remove("show")
        botao.src = "./public/assets/images/align-justify.svg"
    }
})

// Scroll suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute('href')!)
        target?.scrollIntoView({ behavior: 'smooth' })
    })
})
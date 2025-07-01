import '../public/assets/css/style.css'

const botao = document.querySelector<HTMLImageElement>("#botao")!
const menu = document.querySelector<HTMLUListElement>("#menu")!

function isMobile() {
    return window.innerWidth < 768
}

function setMenuState(open: boolean) {
    if (isMobile()) {
        menu.classList.toggle("show", open)
        menu.classList.toggle("hide", !open)
        menu.style.display = open ? "block" : "none"
        botao.src = open
            ? "./public/assets/images/x.svg"
            : "./public/assets/images/align-justify.svg"
    } else {
        menu.classList.remove("show", "hide")
        menu.style.display = "flex"
        botao.src = "./public/assets/images/align-justify.svg"
    }
}

let menuOpen = false

botao.addEventListener("click", (event) => {
    event.preventDefault()
    menuOpen = !menuOpen
    setMenuState(menuOpen)
})

window.addEventListener("resize", () => {
    if (!isMobile()) {
        menuOpen = false
    }
    setMenuState(menuOpen)
})

setMenuState(false)
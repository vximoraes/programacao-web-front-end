import './style.css'
import type { Card } from './models/Card';

const app = document.querySelector<HTMLDivElement>('#app')!

async function carregarCards() {
  const response = await fetch('./cards.json')
  const cards: Card[] = await response.json()

  app.innerHTML = `
  <h1>Projetos Open Source</h1>
  <div id="cards-container" class="cards-container"></div>`

  const cardsContainer = document.querySelector<HTMLDivElement>("#cards-container")!

  cards.forEach(card => {
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')

    cardDiv.innerHTML = `
    <div class="imagem-card" style="background-color: ${card.cor};"><img src="/${card.icone}"></div>
    <div class="titulo-card">${card.titulo}</div>
    <div class="descricao-card">${card.descricao}</div>
    <div class="tags-card">
      ${card.tecnologias.map(tecnologia => `<div class="tag-card">${tecnologia}</div>`)}
    </div>
    <div class="projeto-card"><span>Ver projeto</span></div>
    `

    cardsContainer.appendChild(cardDiv)
  })
}

carregarCards()
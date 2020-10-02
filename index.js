document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container")
    const makeCardForm = document.getElementById("make-card-form")
    const baseURL = "http://localhost:3000/cards"

    const renderCards = (cards) => {
        cards.forEach(card => {
            renderCard(card)
        })
    }

    const renderCard = (card) => {
        let front = card.front
            let back = card.back
            let cardDiv = document.createElement("div")
            cardDiv.className = "flip-card"
            cardDiv.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>${front}</h1>
                </div>
                <div class="flip-card-back">
                    <h1>${back}</h1>
                </div>
            </div>`
        cardContainer.append(cardDiv)
    }

    const fetchCards = () => {
        fetch(baseURL)
        .then(resp => resp.json())
        .then(data => renderCards(data))
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()

        configObj = {
            method: "POST",
            headers:{
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                front: e.target.front.value,
                back: e.target.back.value
            })
        }

        fetch(baseURL, configObj)
        .then(resp => resp.json())
        .then(data => renderCard(data))

        e.target.reset()
    }
            
    const handleClick = (e) => {
        if(e.target.matches(".flip-card-front")){
            let innerCard = e.target.closest(".flip-card-inner");
            innerCard.style.transform = "rotateY(180deg)";
        }
        else if(e.target.matches(".flip-card-back")){
            let innerCard = e.target.closest(".flip-card-inner")
            innerCard.style.transform = ""
        }
    }



    cardContainer.addEventListener("click", (e) => handleClick(e))
    makeCardForm.addEventListener("submit", (e) => handleSubmit(e))
    fetchCards()
})
document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container")
    const makeCardForm = document.getElementById("make-card-form")
    const baseURL = "http://localhost:3000/"

    const renderCard = (card) => {
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
    }

    const renderCards = (cards) => {
        cards.forEach(card => {
            renderCard(card)
        })
    }

    const fetchCards = () => {
        fetch(baseURL)
        .then(data => renderCards(data))
    }

    
    const handleSubmit = (e) => {

        let card = {
            front: e.target.value,
            back: e.target.value
        }

        let configObj = {
            method: "POST",
            headers:{
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(card)
        }

        fetch(baseURL, configObj)
        .then(data => console.log(data))
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
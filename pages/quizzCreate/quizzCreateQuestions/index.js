function createDivAsks() {
    const numberOfAsks = JSON.parse(localStorage.getItem("qntQuestions"));

    for (let i = 0; i < numberOfAsks; i++) {
        const asks = document.querySelector(".asks");
        asks.innerHTML += `
            <div>
                <span>Pergunta ${i+1}</span>
                <ion-icon name="create-outline" onclick='openForm(this)'></ion-icon>
            </div>
        `
    }
}
   
function openForm(icon) {
    const askDiv = icon.parentNode;
    
}

createDivAsks();
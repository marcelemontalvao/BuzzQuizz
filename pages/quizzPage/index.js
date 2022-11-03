import {getQuizzesFromServer} from "../../scripts/api.js";
let quizzData = await getQuizzesFromServer();
<<<<<<< HEAD
=======
let quizzQuestion = [];
>>>>>>> 129543e7dedc69ed796d9777edaa277a5511b924
console.log(quizzData);

function renderQuizz(){
    const quizzImage = document.getElementById('quizzImage');
    const quizzTitle = document.getElementById('quizzTitle');
    const questionContainer = document.getElementById('questionContainer');
    quizzImage.innerHTML +=`<img src="${quizzData[0].image}">`
    quizzTitle.innerHTML +=`<h3>${quizzData[0].title}</h3>`

    for(let i = 0; i < quizzData[0].questions.length; i++){
        quizzQuestion = quizzData[0].questions[i];
        questionContainer.innerHTML += `
        <header class="questionTitle">${quizzQuestion.title}</header>
        <ul class="answersContainer"></ul>`;
    }
    
    let answersContainer = document.querySelectorAll('.answersContainer');

<<<<<<< HEAD
        for (let j = 0; j < quizzData[0].questions[i].answers.length; j++){
            const quizzAnswer = quizzData[0].questions[i].answers[j];
            answersContainer.forEach(element => {
                
                element.innerHTML = '';
                element.innerHTML += ` 
=======
    for (let i = 0; i < quizzQuestion.answers.length; i++){
        const quizzAnswer = quizzQuestion.answers[i];
        answersContainer.forEach(element => {
            console.log(element);
            element.innerHTML += ` 
>>>>>>> 129543e7dedc69ed796d9777edaa277a5511b924
                <li id="answerImageContainer">
                    <img src="${quizzAnswer.image}" id="answerImage">
                    <p>${quizzAnswer.text}</p>
                </li>
                `
     });
    }
}

renderQuizz();
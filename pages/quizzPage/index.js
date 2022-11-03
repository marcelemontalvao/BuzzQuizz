/*Get quizzes do servidor e criação de variáveis */
import {getQuizzesFromServer} from "../../scripts/api.js";
let quizzData = await getQuizzesFromServer();
let quizzQuestion = []; 
let quizzAnswer = [];


/*Função principal - Objetivo: Renderizar as propriedades dos objetos dentro do array de quizzes*/
function renderQuizz(){
    const quizzImage = document.getElementById('quizzImage');
    const quizzTitle = document.getElementById('quizzTitle');
    const questionContainer = document.getElementById('questionContainer');
    

    /*Renderizar imagem e título do quizz - cabeçalho */
    quizzImage.innerHTML +=`<img src="${quizzData[0].image}">`
    quizzTitle.innerHTML +=`<h3>${quizzData[0].title}</h3>`

    /*Renderizar título das perguntas*/
    for(let i = 0; i < quizzData[0].questions.length; i++){
        quizzQuestion = quizzData[0].questions[i];
        questionContainer.innerHTML += `
        <header class="questionTitle">${quizzQuestion.title}</header>
        <ul class="answersContainer"></ul>`;
    }
    /*Isso precisa ficar aqui,  haja vista que a criação da classe answersContainer só existe junto à renderização do título das perguntas*/
    const answersContainer = document.querySelectorAll('.answersContainer');

    console.log(quizzQuestion);

    /*Renderizar as imagens e textos das respostas*/
    for (let i = 0; i < quizzQuestion.answers.length; i++){
        quizzAnswer = quizzQuestion.answers[i];
        answersContainer.forEach(element => {
            element.innerHTML += ` 
                <li id="answerImageContainer">
                    <img src="${quizzAnswer.image}" id="answerImage">
                    <p>${quizzAnswer.text}</p>
                </li>
                `
     });
    }
    
}

/* for( let i = 0; i < quizzQuestion.answers.length; i++){
    let j = Math.floor(Math.random() * (i +1))
    [quizzAnswer[i],quizzAnswer[j]] = [quizzAnswer[j],quizzAnswer[i]]
} */


renderQuizz();

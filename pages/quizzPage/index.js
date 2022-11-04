/*Get quizzes do servidor e criação de variáveis */
import {getQuizzesFromServer} from "../../scripts/api.js";
let quizzData = await getQuizzesFromServer();
let quizzQuestion = []; 
let quizzAnswer = [];
console.log(quizzData);


/*Função principal - Objetivo: Renderizar as propriedades dos objetos dentro do array de quizzes*/
function renderQuizz(){
    const quizzImage = document.getElementById('quizzImage');
    const quizzTitle = document.getElementById('quizzTitle');
    const questionContainer = document.getElementById('questionContainer');
    

    /*Renderizar imagem e título do quizz - cabeçalho */
    quizzImage.innerHTML +=`<img src="${quizzData[6].image}">`
    quizzTitle.innerHTML +=`<h3>${quizzData[6].title}</h3>`

    /*Renderizar título das perguntas*/
    for(let i = 0; i < quizzData[6].questions.length; i++){
        quizzQuestion = quizzData[6].questions[i];
        questionContainer.innerHTML += `
        <header class="questionTitle">${quizzQuestion.title}</header>
        <ul class="answersContainer"></ul>`;
        shuffleAnswers(quizzQuestion.answers); /*Embaralhar as respostas de cada pergunta do quizz*/
    }
    /*Isso precisa ficar aqui,  haja vista que a criação da classe answersContainer só existe junto à renderização do título das perguntas*/
    /*É o correto e ideal? não.*/
    const answersContainer = document.querySelectorAll('.answersContainer');

    /*Renderizar as imagens e textos das respostas*/
    for (let i = 0; i < quizzQuestion.answers.length; i++){
        console.log(quizzQuestion.answers);
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

    /*Algoritmo de Fischer-Yates para 'embaralhar' as respostas de cada pergunta */
    function shuffleAnswers(arr){
        for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}

renderQuizz();

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
    const questionTitle = document.getElementsByClassName('questionTitle');
   
    
    /*Renderizar imagem e título do quizz - cabeçalho */
    quizzImage.innerHTML +=`<img src="${quizzData[8].image}">`
    quizzTitle.innerHTML +=`<h3>${quizzData[8].title}</h3>`

    /*Renderizar título das perguntas*/
    for(let i = 0; i < quizzData[8].questions.length; i++){
        quizzQuestion = quizzData[8].questions[i];
        const backGroundTitleColor = quizzQuestion.color;
        questionContainer.innerHTML += `
        <header class="questionTitle" style="background-color:${backGroundTitleColor}">${quizzQuestion.title}</header>
        <ul class="answersContainer"></ul>`;
       
        shuffleAnswers(quizzQuestion.answers); /*Embaralhar as respostas de cada pergunta do quizz*/
    }
    /*Isso precisa ficar aqui,  haja vista que a criação da classe answersContainer só existe junto à renderização do título das perguntas*/
    const answersContainer = document.querySelectorAll('.answersContainer');

    /*Renderizar as imagens e textos das respostas*/
    for (let i = 0; i < quizzQuestion.answers.length; i++){
        quizzAnswer = quizzQuestion.answers[i];
        const isCorrect = (quizzAnswer.isCorrectAnswer).toString();
        answersContainer.forEach(element => {
            element.innerHTML += ` 
                <li class="answerImageContainer ${isCorrect}">
                    <img src="${quizzAnswer.image}" class="answerImage">
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


/*Comportamento das respostas */

let answers = []
answers = document.querySelectorAll('.answerImageContainer');

answers.forEach(element => {
    element.addEventListener("click", function () {
        const parentNode = element.parentNode;
        console.log(element);
        console.log(parentNode);
        let imagesFromAnswer = parentNode.querySelectorAll(".answerImage");

        for(let i = 0; i < imagesFromAnswer.length; i++){
            imagesFromAnswer[i].classList.add("opacity");
        }
        parentNode.classList.add("noPointerEvents");
        element.children[0].classList.remove("opacity");

        const correctAnswerText = parentNode.querySelectorAll(".true");
        correctAnswerText.forEach(element => {
            element.style.color = 'green'
        });

        const wrongAnswerText = parentNode.querySelectorAll(".false");
        wrongAnswerText.forEach(element => {
            element.style.color = 'red';
        });
        
        const nextQuestion = parentNode.nextElementSibling;
        console.log(nextQuestion);
        setTimeout(() =>{
            nextQuestion.scrollIntoView({behavior: "smooth"})
        },2000);
    });
});










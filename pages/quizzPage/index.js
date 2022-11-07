/*Get quizzes do servidor e criação de variáveis */
import { getQuizzesFromServer } from "../../scripts/api.js";
let quizzData = await getQuizzesFromServer();
let quizzQuestion = [];
let quizzAnswer = [];
let answers = [];
let answeredQuestions = 0;
let correctAnswer = 0;
let numberOfQuestions = 0;
let correctAnswerPercentage = 0;
const id = JSON.parse(localStorage.getItem('id'));
console.log(quizzData);

/*Função principal - Objetivo: Renderizar as propriedades dos objetos dentro do array de quizzes*/
export function renderQuizz() {
    const quizzImage = document.getElementById('quizzImage');
    const quizzTitle = document.getElementById('quizzTitle');
    const questionContainer = document.getElementById('questionContainer');
    const questionTitle = document.getElementsByClassName('questionTitle');
    numberOfQuestions = quizzData[8].questions.length;

    /*Renderizar imagem e título do quizz - cabeçalho */
    quizzImage.innerHTML += `<img src="${id.image}">`
    quizzTitle.innerHTML += `<h3>${id.title}</h3>`

    /*Renderizar título das perguntas*/
    for (let i = 0; i < id.questions.length; i++) {
        quizzQuestion = id.questions[i];
        const backGroundTitleColor = quizzQuestion.color;
        questionContainer.innerHTML += `
        <header class="questionTitle" style="background-color:${backGroundTitleColor}">${quizzQuestion.title}</header>
        <ul class="answersContainer"></ul>`;

        shuffleAnswers(quizzQuestion.answers); /*Embaralhar as respostas de cada pergunta do quizz*/
    }
    /*Isso precisa ficar aqui,  haja vista que a criação da classe answersContainer só existe junto à renderização do título das perguntas*/
    const answersContainer = document.querySelectorAll('.answersContainer');

    /*Renderizar as imagens e textos das respostas*/
    for (let i = 0; i < quizzQuestion.answers.length; i++) {
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
    function shuffleAnswers(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}

renderQuizz();

/*Comportamento das respostas */
answers = document.querySelectorAll('.answerImageContainer');
answers.forEach(element => {

    element.addEventListener("click", function () {
        const parentNode = element.parentNode;
        let imagesFromAnswer = parentNode.querySelectorAll(".answerImage");

        for (let i = 0; i < imagesFromAnswer.length; i++) {
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

        answeredQuestions += 1;
        if (element.classList.contains("true")) {
            correctAnswer += 1;
        }

        const nextQuestion = parentNode.nextElementSibling;
        setTimeout(() => {
            if(nextQuestion == null){return}
            nextQuestion.scrollIntoView({ behavior: "smooth" })
        }, 2000);

        if(answeredQuestions == numberOfQuestions){
            quizzResults();
        }
    });
});


/*Carregar resultados do quizz e renderizar resultados do quizz */
let quizzResultScreen = document.getElementById('quizzResults');
function quizzResults(){
    const quizzLevelObjects = id.levels; 
    correctAnswerPercentage = Math.ceil((correctAnswer/numberOfQuestions)*100);

    for(let i = 0; i < quizzLevelObjects.length - 1 ; i++){
        const resultsTitle = quizzLevelObjects[i].title;
        const maxResultsTitle = quizzLevelObjects[quizzLevelObjects.length -1].title;
        const resultsText = quizzLevelObjects[i].text;
        const maxResultsText = quizzLevelObjects[quizzLevelObjects.length -1].text;
        const resultsImage = quizzLevelObjects[i].image;
        const maxResultsImage = quizzLevelObjects[quizzLevelObjects.length -1].image;

        if(correctAnswerPercentage >= quizzLevelObjects[i].minValue && correctAnswerPercentage < quizzLevelObjects[i+1].minValue){
            quizzResultScreen.innerHTML +=`
                <header class="resultsTitle"><span>${correctAnswerPercentage}% de acerto: ${resultsTitle}</span></header>
                <ul class="resultsContainer"> 
                    <img src="${resultsImage}" class="resultsImage">
                    <p>${resultsText}</p>
                </ul>
                <button class="resetQuiz">Reiniciar Quizz</button>
                <button class="returnHome">Voltar pra home</button>
            `
            const restartButton = document.querySelector('.resetQuiz').addEventListener('click', restartQuizz, false);
            const returnToHome = document.querySelector('.returnHome').addEventListener('click', returnToHomepage, false);
        }
        if(correctAnswerPercentage >= quizzLevelObjects[quizzLevelObjects.length -1].minValue){
            quizzResultScreen.innerHTML +=`
                <header class="resultsTitle"><span>${correctAnswerPercentage}% de acerto: ${maxResultsTitle}</span></header>
                <ul class="resultsContainer"> 
                    <img src="${maxResultsImage}" class="resultsImage">
                    <p>${maxResultsText}</p>
                </ul>
                <button class="resetQuiz">Reiniciar Quizz</button>
                <button class="returnHome">Voltar pra home</button>
            `
            
            const restartButton = document.querySelector('.resetQuiz').addEventListener('click', restartQuizz, false);
            const returnToHome = document.querySelector('.returnHome').addEventListener('click', returnToHomepage, false);
        }
    }
}

function restartQuizz(){
    answers.forEach(element => {
        const parentNode = element.parentNode;
        let imagesFromAnswer = parentNode.querySelectorAll(".answerImage");
        for (let i = 0; i < imagesFromAnswer.length; i++) {
            imagesFromAnswer[i].classList.remove("opacity");
        }
        parentNode.classList.remove("noPointerEvents");

        const correctAnswerText = parentNode.querySelectorAll(".true");
        correctAnswerText.forEach(element => {
            element.style.color = 'black'
        });

        const wrongAnswerText = parentNode.querySelectorAll(".false");
        wrongAnswerText.forEach(element => {
            element.style.color = 'black';
        });

        quizzResultScreen.remove();

        answeredQuestions = 0;
        correctAnswer = 0;
        correctAnswerPercentage = 0;
        location.reload()
    })
}

function returnToHomepage(){
    window.location.href = "https://marcelemontalvao.github.io/BuzzQuizz/"
}

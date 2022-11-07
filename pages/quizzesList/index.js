let arrayQuizzes = []

function callingTheQuizzes(){
const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
promise.then(getQuizzes)
promise.catch(deuErro)
}

callingTheQuizzes();

async function getQuizzes(resposta){
    
    arrayQuizzes = await resposta.data
    console.log(arrayQuizzes);
    const colocarnaT1 = document.querySelector('.allQuizzes')

    for (let i = 0; i < arrayQuizzes.length; i++) {
        const  idElemento = arrayQuizzes[i].id
        colocarnaT1.innerHTML = colocarnaT1.innerHTML + `
        <div class="postado" ${idElemento}" onclick="novaPag()">
        <img src="${arrayQuizzes[i].image}" alt="">
        <p>${arrayQuizzes[i].title}</p>
    </div>
    `
    }
    novaPag()
}

function goToQuizzPage() {
    const quizzPage = document.querySelectorAll('.createQuizzPage');


    quizzPage.forEach(quizz => {
        quizz.addEventListener("click", ()=> {
            window.location.href = 'pages/quizzCreate/quizzBasicInformation/index.html'
        })
    })
}


function novaPag() {
    window.location.href = '/pages/quizzPage/index.html'
}

function deuErro(erro){
    console.log(erro)
} 

goToQuizzPage();
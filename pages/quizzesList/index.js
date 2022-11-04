let arrayQuizzes = []


function callingTheQuizzes(){
const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
promise.then(getQuizzes)
promise.catch(deuErro)
}
callingTheQuizzes();

function getQuizzes(resposta){
   
    
    arrayQuizzes = resposta.data
    console.log(arrayQuizzes);

    const colocarnaT1 = document.querySelector('.allQuizzes')

    for (let i = 0; i < arrayQuizzes.length; i++) {
        const  idElemento = arrayQuizzes[i].id
        colocarnaT1.innerHTML = colocarnaT1.innerHTML + `
        <div class="postado" ${idElemento}" onclick="novaPag(this)">
        <img src="${arrayQuizzes[i].image}" alt="">
        <p>${arrayQuizzes[i].title}</p>
    </div>
    `
    }
}



function deuErro(erro){
    console.log(erro)
} 
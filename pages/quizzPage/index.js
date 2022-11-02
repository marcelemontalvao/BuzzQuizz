import { getQuizzesFromServer} from "../../scripts/api.js";
let quizzData = await getQuizzesFromServer();
console.log(quizzData);

function renderQuizz(){
    const quizzImage = document.getElementById('quizzImage');
    const quizzTitle = document.getElementById('quizzTitle');
    quizzImage.innerHTML +=`<img src="${quizzData[0].image}">`
    quizzTitle.innerHTML +=`<h3>${quizzData[0].title}</h3>`
}

renderQuizz();




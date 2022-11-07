import { postQuizzes } from "../../../scripts/api.js";

const title = JSON.parse(localStorage.getItem("title"));
const urlImage = JSON.parse(localStorage.getItem("urlImage"));
const questions = JSON.parse(localStorage.getItem("questions"));
const levels = JSON.parse(localStorage.getItem("levels"));

function renderInfos(urlImage, title) {
    const img = document.querySelector('img')
    console.log(img);
    img.src = urlImage;

    const span = document.querySelector(".title");
    span.innerHTML = title;
}

async function createObject() {
    const object = {}
    object.title = title;
    object.image = urlImage;
    object.questions = questions;
    object.levels = levels;

    const response = await postQuizzes(object);
    localStorage.setItem("id", JSON.stringify(response.id));
    return {response}
}

function acessToQuizz() {
    const btnQuizz = document.getElementById("toQuizz");
    const img = document.querySelector("img");

    img.addEventListener("click", ()=>{ 
        
        window.location.href = '../../quizzPage/index.html'
    })

    btnQuizz.addEventListener('click', ()=> {
        window.location.href = '../../quizzPage/index.html'
    })
}

function goToHome() {
    const btnHome = document.getElementById("toHome");
    console.log(btnHome);
    btnHome.addEventListener("click", ()=> {
        window.location.href = "../../../index.html"
    })
}

renderInfos(urlImage, title);
createObject()
acessToQuizz();
goToHome()
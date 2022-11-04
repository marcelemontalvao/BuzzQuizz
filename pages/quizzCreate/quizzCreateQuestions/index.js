const questions = [];

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
    askDiv.classList.add("ask");

    icon.style.display = 'none';

    const form = document.createElement("form");

    const textAsk = document.createElement('input');
    textAsk.classList.add('text-ask')
    textAsk.placeholder = 'Texto da pergunta';

    const backgroundColorAsks = document.createElement("input");
    backgroundColorAsks.classList.add('background-color')
    backgroundColorAsks.placeholder = 'Cor de fundo da pergunta';

    const spanAnswer = document.createElement("span");
    spanAnswer.innerText = 'Resposta correta';

    const divAnswer = document.createElement("div");
    
    const answerAsk = document.createElement("input");
    answerAsk.classList.add('answerAsk');
    answerAsk.placeholder = 'Resposta correta'

    const urlImgAnswer = document.createElement("input");
    urlImgAnswer.classList.add('url-answer');
    urlImgAnswer.placeholder = 'URL da imagem'

    const spanIncorrectAnswer = document.createElement("span");
    spanIncorrectAnswer.innerText = 'Respostas incorretas'

    const divIncorrectAnswer1 = document.createElement("div");
    
    const incorrectAnswerAsk1 = document.createElement("input");
    incorrectAnswerAsk1.classList.add("incorrect-answer-1");
    incorrectAnswerAsk1.placeholder = 'Resposta incorreta 1';

    const urlImgIncorrectAnswer1 = document.createElement("input");
    urlImgIncorrectAnswer1.classList.add("incorrect-url-answer-1");
    urlImgIncorrectAnswer1.placeholder = 'URL da imagem 1';

    const divIncorrectAnswer2 = document.createElement("div");
    
    const incorrectAnswerAsk2 = document.createElement("input");
    incorrectAnswerAsk2.classList.add("incorrect-answer-2");
    incorrectAnswerAsk2.placeholder = 'Resposta incorreta 2';

    const urlImgIncorrectAnswer2 = document.createElement("input");
    urlImgIncorrectAnswer2.classList.add("incorrect-url-answer-2");
    urlImgIncorrectAnswer2.placeholder = 'URL da imagem 2';

    const divIncorrectAnswer3 = document.createElement("div");
    
    const incorrectAnswerAsk3 = document.createElement("input");
    incorrectAnswerAsk3.classList.add("incorrect-answer-3");
    incorrectAnswerAsk3.placeholder = 'Resposta incorreta 3';

    const urlImgIncorrectAnswer3 = document.createElement("input");
    urlImgIncorrectAnswer3.classList.add("incorrect-url-answer-3");
    urlImgIncorrectAnswer3.placeholder = 'URL da imagem 3';

    divAnswer.append(answerAsk, urlImgAnswer);

    divIncorrectAnswer1.append(incorrectAnswerAsk1, urlImgIncorrectAnswer1);
    divIncorrectAnswer2.append(incorrectAnswerAsk2, urlImgIncorrectAnswer2);
    divIncorrectAnswer3.append(incorrectAnswerAsk3, urlImgIncorrectAnswer3);

    form.append(textAsk, backgroundColorAsks, spanAnswer, answerAsk, urlImgAnswer, spanIncorrectAnswer, divIncorrectAnswer1, divIncorrectAnswer2, divIncorrectAnswer3);
    askDiv.appendChild(form);
}

function validateAsks(ask) {
    const textAsk = ask.querySelector('.text-ask'); 
    const validationTextAsk = textAsk.value.length >= 20;
    
    const backgroundColor = ask.querySelector('.background-color');
    const colorR = /#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})/g
    const validationColor = backgroundColor.value.match(colorR);

    const answerAskInput = ask.querySelector(".answerAsk");
    const validationAnswerAsk = answerAskInput.value != "";

    const urlImgAnswer = ask.querySelector(".url-answer");
    console.log(urlImgAnswer);
    const urlR = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    const validationImg = urlImgAnswer.value.match(urlR);

    const incorrectAnswer1 = ask.querySelector(".incorrect-answer-1");
    const validationIncorrectAnswer1 = incorrectAnswer1.value != "";

    const incorrectUrlAnswer1 = ask.querySelector(".incorrect-url-answer-1");
    const validationUrlIncorrectAnswer1 = incorrectUrlAnswer1.value.match(urlR);

    const incorrectAnswer2 = ask.querySelector(".incorrect-answer-2");
    const validationIncorrectAnswer2 = incorrectAnswer2.value != "";

    const incorrectUrlAnswer2 = ask.querySelector(".incorrect-url-answer-2");
  
    const validationUrlIncorrectAnswer2 = incorrectUrlAnswer2.value.match(urlR);

    const incorrectAnswer3 = ask.querySelector(".incorrect-answer-3");
    const validationIncorrectAnswer3 = incorrectAnswer3.value != "";

    const incorrectUrlAnswer3 =  ask.querySelector(".incorrect-url-answer-3");
 
    const validationUrlIncorrectAnswer3 = incorrectUrlAnswer3.value.match(urlR);

    let validationTrue = validationTextAsk && validationColor && validationAnswerAsk && validationImg && validationIncorrectAnswer1 && validationIncorrectAnswer2 && validationIncorrectAnswer3 && validationUrlIncorrectAnswer1 && validationUrlIncorrectAnswer2 && validationUrlIncorrectAnswer3;    

    if(validationTextAsk && validationColor && validationAnswerAsk && validationImg && ((validationIncorrectAnswer1 && validationUrlIncorrectAnswer1) || (validationIncorrectAnswer2 && validationUrlIncorrectAnswer2) || (validationIncorrectAnswer3 && validationUrlIncorrectAnswer3))) {
        validationTrue = true;
        let questionObject = {
			title: textAsk.value,
			color: backgroundColor.value,
			answers: [
				{
					text: answerAskInput.value,
					image: urlImgAnswer.value,
					isCorrectAnswer: true
				},
				{
					text: incorrectAnswer1.value,
					image: incorrectUrlAnswer1.value,
					isCorrectAnswer: false
				},
                {
                    text: incorrectAnswer2.value,
					image: incorrectUrlAnswer2.value,
					isCorrectAnswer: false
                },
                {
                    text: incorrectAnswer3.value,
					image: incorrectUrlAnswer3.value,
					isCorrectAnswer: false
                }
			]
		}
        questions.push(questionObject);
    } else{
        validationTrue = false;
    }
    return {validationTrue};
}
 
function validation() {
    const btnToLevelsPage = document.getElementById('toLevelsPage');
    let validationFalse = 0;

    btnToLevelsPage.addEventListener('click', ()=> { 
        const asks = document.querySelectorAll('.asks > div');
        asks.forEach(ask => {
            validationFalse = 0;
            let {validationTrue} = validateAsks(ask);
            if(validationTrue) {
                localStorage.setItem("questions", JSON.stringify(questions));
                window.location.href = '../quizzCreateLevels/index.html';
            } else {
                validationFalse++;
            }
        });

        if(validationFalse >= 1) {
            alert(`Não foi possível gerar as perguntas`);
        }
    })
}

createDivAsks();
validation();
const levels = [];

function createDivLevels() {
    const numberOfLevels = JSON.parse(localStorage.getItem("qntlevels"));
    for (let i = 0; i < numberOfLevels; i++) {
        const levels = document.querySelector(".levels");
        levels.innerHTML += `
            <div>
                <span>Nível ${i+1}</span>
                <ion-icon name="create-outline" onclick='openForm(this)'></ion-icon>
            </div>
        `
    }
}

function openForm(icon) {
    const levelsDiv = icon.parentNode;
    levelsDiv.classList.add("level");

    icon.style.display = 'none';

    const form = document.createElement("form");

    const titleLevel = document.createElement('input');
    titleLevel.classList.add('title-level')
    titleLevel.placeholder = 'Título do nível';

    const hitPercentage = document.createElement("input");
    hitPercentage.classList.add('hit-percentage')
    hitPercentage.placeholder = '% de acerto mínima';
    
    const urlImgLevel = document.createElement("input");
    urlImgLevel.classList.add('url-level');
    urlImgLevel.placeholder = 'URL da imagem do nível'

    const descriptionLevel = document.createElement("input");
    descriptionLevel.classList.add("description-level");
    descriptionLevel.placeholder = 'Descrição do nível';

    form.append(titleLevel, hitPercentage, urlImgLevel, descriptionLevel);
    levelsDiv.appendChild(form);
}

function validateLevels(level) {
    const titleLevel = level.querySelector('.title-level'); 
    const validationTitleLevel = titleLevel.value.length >= 10;
    
    const hitPercentage = level.querySelector('.hit-percentage'); 
    const validationHitPercentage = hitPercentage.value.length >= 0 && hitPercentage.value.length <= 100;

    const urlImgLevel = level.querySelector(".url-level");
    const urlR = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    const validationImg = urlR.test(urlImgLevel.value);

    const descriptionLevel = level.querySelector(".description-level");
    const validationDescriptionLevel = descriptionLevel.value.length >= 30;
    let validationTrue = validationTitleLevel && validationHitPercentage && validationImg && validationDescriptionLevel;
   
    console.log(validationTrue);

    if(validationTrue) {
        let levelObject = {
            title: titleLevel.value,
            image: urlImgLevel.value,
            text:   descriptionLevel.value,
            minValue: hitPercentage.value,
        }
        levels.push(levelObject);
    }

    console.log("Validação do Título do Nível" + validationTitleLevel);
    console.log("Validação da % do Nível" +validationHitPercentage);
    console.log("Validação da Imagem do Nível" +validationImg);
    console.log("Validação da descrição do Nível" +validationDescriptionLevel);
    
    return {validationTrue};
}


function validation() {
    const btntoSucessPage= document.getElementById('toSucessPage');
    let count = 0;
    let validationFalse = 0
    btntoSucessPage.addEventListener('click', ()=> { 
        const levels = document.querySelectorAll('.levels > div');
        levels.forEach(level => {
            validationFalse = 0;
            if(level.querySelector('.hit-percentage').value == 0) {
                count++;
            }    
            console.log("Nível" + level)
            let {validationTrue} = validateLevels(level);
            if(validationTrue) {
                localStorage.setItem("levels", JSON.stringify(levels));
                window.location.href = '../quizzSucessPage/index.html';
            } else {
                validationFalse++;
            }
        });
      
        if(count >= 1) {
            validationTrue = true;
        } else {
            validationTrue = false;
        }

        if(validationFalse >= 1) {
            alert('Não foi possível gerar os níveis do quizz!');
        }
    })
}

createDivLevels();
validation();

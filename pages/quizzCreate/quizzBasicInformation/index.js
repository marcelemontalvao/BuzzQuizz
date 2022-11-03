function validateBasicInformation() {

    const title = document.getElementById('quizz-title');
    const urlImg = document.getElementById('url-img-quizz');
    const qntQuestions = document.getElementById('asks-quizz');
    const qntLevels = document.getElementById('levels-quizz');

    const validationTitle = title.value.length >= 20 && title.value.length <= 65;
    const urlR = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    const validationImg = urlR.test(urlImg.value);
        
    const validationQuestions = qntQuestions.value >= 3;
    const validationLevels = qntLevels.value >=2;
    const validationTrue = validationTitle && validationImg && validationQuestions && validationLevels;

    return {validationTrue};
}
 
function validation() {
    const form = document.getElementById('basic-information-form');
    
    form.addEventListener('submit', (e)=> { 
        e.preventDefault();
        const {validationTrue} = validateBasicInformation();
        if(validationTrue) {
            const qntQuestions = document.getElementById('asks-quizz');
            localStorage.setItem('qntQuestions', JSON.stringify(qntQuestions.value));
            const qntLevels = document.getElementById('levels-quizz');
            localStorage.setItem('qntlevels', JSON.stringify(qntLevels.value));
            const urlImg = document.getElementById('url-img-quizz');
            localStorage.setItem("urlImage", JSON.stringify(urlImg.value));
            window.location.href = '../quizzCreateQuestions/index.html'

        } else {
            alert('Não foi possível gerar o quizz!')
        }   
        
    })  
}

validation();
export function getQuizzesFromServer(){
    let quizzData = [];
    const getQuizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    const quizzesData = getQuizzes.then(getQuizzesResponse);

    function getQuizzesResponse(response){
        return response.data
    }
    
    return quizzesData;
}








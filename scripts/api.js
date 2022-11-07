export function getQuizzesFromServer(){
    let quizzData = [];
    const getQuizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    const quizzesData = getQuizzes.then(getQuizzesResponse);

    function getQuizzesResponse(response){
        return response.data
    }
    return quizzesData;
}


export function postQuizzes(object){
    const postQuizzes = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', object);
    const quizzesData = postQuizzes.then(postQuizzesResponse);

    function postQuizzesResponse(response){
        console.log(response.data)
        return response.data;
    }
    return quizzesData;
}

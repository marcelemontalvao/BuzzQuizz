const questions = JSON.parse(localStorage.getItem('questions'));
console.log(questions)

let arraytemp = [...questions[0].answers]


arraytemp.forEach((arr, index) => {
    if(arr.text == '' || arr.image == '') {
        arraytemp.splice(index, 1);
    }
})

console.log(arraytemp)

questions[0].answers = arraytemp;

console.log(questions);
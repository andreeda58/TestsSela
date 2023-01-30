

const SetValueOfQuestion = (numbersofQuestions) => {
    let questionValue = 100 / numbersofQuestions;
    return questionValue;
}

const CorrectAnswers = (userAnswers) => {
    let count = 0;
    let arrayAswers = []
    let correct = true;

    for (let i = 0; i < userAnswers.length; i++) { arrayAswers.push(userAnswers[i].userAnswers) }
    
    for (let j = 0; j < arrayAswers.length; j++) {
        correct = true;
        arrayAswers[j].forEach(element => {
            
            if (element.correct == false) { correct = false }
        });
        
        if (correct) { count += 1; }
    }
    
    return count;
}

export { SetValueOfQuestion, CorrectAnswers }

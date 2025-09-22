const questions = [
    {
        question: "Wie viele Personen hat die Familie?",
        answers: [
            { text:"4", correct: true },
            { text:"3", correct: false },
            { text:"6", correct: false },
            { text:"5", correct: false },
        ]
    },
    {
        question: "Wo wohnt die Familie?",
        answers: [
            { text:"In einem Garten", correct: false },
            { text:"In einer Wohnung", correct: false },
            { text:"In einer Stadt", correct: false },
            { text:"In einem Haus", correct: true },
        ]
    },
    {
        question: "Haben sie Kinder?",
        answers: [
            { text:"Nein", correct: false },
            { text:"Ja, zwei Kinder", correct: true },
            { text:"Ja, ein Kind", correct: false },
            { text:"Ja, drei Kinder", correct: false },
        ]
    },{
        question: "Arbeitet die Mutter?",
        answers: [
            { text:"Ja, aber nur halbtags", correct: true },
            { text:"Nein, sie ist Hausfrau", correct: false },
            { text:"Ja, sie arbeitet von 9 bis 17 Uhr", correct: false },
            { text:"Davon steht nichts im Text", correct: false },
        ]
    },{
        question: "Wer gehört noch zur Familie?",
        answers: [
            { text:"Eine Katze", correct: false },
            { text:"Oma und Opa", correct: true },
            { text:"Ein kleiner Hund", correct: false },
            { text:"Onkel und Tante", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";    
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})

startQuiz();
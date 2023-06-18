const questions=[
    {
        questions:"During which month and year did BTS debut",
        answer:[
            {text:"June 2013",correct:true},
            {text:"June 2014",correct:false},
            {text:"June 2015",correct:false},
            {text:"June 2016",correct:false},
        ]
    },
    {
        questions:"What does BTS stands for?",
        answer:[
            {text:"Behind the Scene",correct:false},
            {text:"Broccoli Tomato Sausage",correct:false},
            {text:"Bangtan Sonyeondan",correct:true},
            {text:"Burn The Stage",correct:false},
        ]
    },
    {
        questions:"How many members are there in BTS?",
        answer:[
            {text:"Six",correct:false},
            {text:"Seven",correct:true},
            {text:"Eight",correct:false},
            {text:"Ten",correct:false},
        ]
    },
    {
        questions:"Which member is the maknae of the group?",
        answer:[
            {text:"Jimin",correct:false},
            {text:"V",correct:false},
            {text:"J-Hope",correct:false},
            {text:"Kookoo",correct:true},
        ]
    },
];
const questionElement=document.getElementById("question")
const answerButton=document.getElementById("answer-button")
const nextButton=document.getElementById("next-btn")

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next"
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex]
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.questions;

    currentQuestion.answer.forEach(answer=>{
        const button = document.createElement("button")
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
        
    });
}
function resetState(){
    nextButton.style.display="none"
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)

    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct=="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";

}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML=`Play Again`;
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }

}
nextButton.addEventListener("click",()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }

});
startQuiz();

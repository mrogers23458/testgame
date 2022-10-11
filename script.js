//containers
var mainContainerEl = document.getElementById('mainContainer')
var qContainerEl = document.getElementById('qContainer')
var qChoicesEl = document.getElementById('qChoices')

//question title
var qTitleEl = document.getElementById('qTitle')

//question choices
var choice1El = document.getElementById('choice1')
var choice2El = document.getElementById('choice2')
var choice3El = document.getElementById('choice3')

//play
var playBtn = document.getElementById('playBtn')

//timer
var timerEl = document.getElementById('timer')
var counterEl = document.getElementById('counter')

//scores
var scoreboardEl = document.getElementById('scores')
var scoreEl = document.getElementById('currentScore')

//set the amount of time for the quiz as a global variable
var time = 5

//variable to hold the correct chosen asnwers
var currentAnswer;

//keeps track of total questions answered and correct
var totalQuestions = 0
var correct = 0

//variable to hold timer interval
var timerInterval;


//questions array
var questions = [
    {
        question: 'Guess My Favorite Color',
        choices: ['red', 'blue', 'green'],
        answer: 'blue'
    },
    {
        question: 'Guess My Favorite Food',
        choices: ['pizza', 'wings', 'beer'],
        answer: 'pizza'
    },
]

//hides the main screen
function hideMain(){
    mainContainerEl.style.display = "none"
}

//shows questions
function showQ(){
    qContainerEl.style.display = "block"
}

//shows scoreboard and sets text content to be displayed
function showScoreboard(){
    scoreboardEl.style.display = "block"
    scoreEl.innerText = `Number of correct answers ${correct}`
}

//counts down the timer
function handleCountDown () {
    timerEl.innerText = time
    time--

    if (time <= 0) {
        clearInterval(timerInterval)
        timerEl.innerText = 0
        endGame()
       }

}

//ends the game and shows the scoreboard
function endGame(){
    showScoreboard()
}

//starts the timer
function startTimer(){
   timerInterval = setInterval(handleCountDown, 1000)

}

//gets a random question by index
function getRandomQuestion(){
    var randomNum = Math.floor(Math.random() * questions.length)
    return questions[randomNum]
}

//checks the answer, handles score, and gives next question, this should really be 3 functions
function handleAnswerCheck(e){
    var clicked = e.target.innerText
    var answer = currentAnswer
    if (clicked === answer) {
        totalQuestions++
        correct++
        counterEl.innerText = `Number correct ${correct}`
        var nextQuestion = getRandomQuestion()
        displayQuestion(nextQuestion)
    }

    if (clicked !== answer){
        counterEl.innerText = `Number correct ${correct}`
        totalQuestions++
        var nextQuestion = getRandomQuestion()
        displayQuestion(nextQuestion)
    }
}

//adjusts text content of each answer element to be that of the current question
function displayQuestion(questionObj) {
    var title = questionObj.question
    var choices = questionObj.choices
    var answer = questionObj.answer
    currentAnswer = answer

    qTitleEl.innerText = title
    choice1El.innerText = choices[0]
    choice2El.innerText = choices[1]
    choice3El.innerText = choices[2]

    //listesn for which answer was clicked
    qChoicesEl.addEventListener("click", handleAnswerCheck)


}

//starts the game on  button click, which hides main, shows questions, starts the timer, and gets first question
function startGame(e){
    e.preventDefault()
    hideMain()
    showQ()
    startTimer()
    var question = getRandomQuestion()
    displayQuestion(question)

}

//listener on playButton
playBtn.addEventListener("click", startGame)
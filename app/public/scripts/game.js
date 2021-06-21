const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let questions = [{
        question: 'Who won the most champions league?',
        choice1: 'Dortmund',
        choice2: 'FC Bayern',
        choice3: 'Liverpool',
        choice4: 'Real Madrid',
        answer: 4,
    },
    {
        question: "Who is the greatest soccer player, also known as “The King of Soccer”?", 
        choice1: "David Beckham",
        choice2: "Pelé",
        choice3: "Diego Maradona",
        choice4: "Zidane",
        answer: 2,
    },
    {
        question: "How many players in total will be on the field in a typical soccer match?",
        choice1: "11",
        choice2: "22",
        choice3: "33",   
        choice4: "60",
        answer: 2,
    },
    {
        question: "How long does a normal soccer game last?",
        choice1: "45 minutes",
        choice2: "90 minutes",
        choice3: "120 minutes",
        choice4: "430 minutes",
        answer: 2,
    },
    {
        question: "Which player scored the “Hand of God” goal in a match of the 1986 World Cup?",
        choice1: "Rudi Völler",
        choice2: "Cláudio Taffarel",
        choice3: "Diego Maradona",
        choice4: "George Hagi",
        answer: 3,
    },
    {
        question: "Who can add time in a soccer game?",
        choice1: "Referee",
        choice2: "Coach",
        choice3: "Team captain",
        choice4: "Audience",
        answer: 1,
    },

    {
        question: "Who won the most Ballon d’Ors?",
        choice1: "Lionel Messi",
        choice2: "Christiano Ronaldo",
        choice3: "Ronaldo Nazario",
        choice4: "Diego Maradona",
        answer: 1,
    },

    {
        question: "How much did  Cristiano Ronaldo won the Champions League title",
        choice1: "3",
        choice2: "7",
        choice3: "5",
        choice4: "4",
        answer: 3,
    },
    {
        question: "Which of the following country hosted the first Football World Cup?",
        choice1: "America",
        choice2: "Argentina",
        choice3: "Brazil",
        choice4: "Uruguay",
        answer: 4,
    },
    {
        question: "When was first official international football match was played?",
        choice1: "1929",
        choice2: "1872",
        choice3: "1902",
        choice4: "1870",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('./html/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})
incrementScore = num => {
    score += num
    scoreText.innerText = score
}
startGame()

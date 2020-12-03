const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which player has played in the most NBA final games?',
    answers: [
      { text: 'LeBron James', correct: false },
      { text: 'Jerry West', correct: false },
      { text: 'Bill Russell', correct: true },
      { text: 'Clyde Drexler', correct: false }
    ]
  },
  {
    question: 'What year did the Seattle Supersonics win the NBA championship?',
    answers: [
      { text: '1978-79', correct: true },
      { text: '1983-84', correct: false },
      { text: '2002-03', correct: false },
      { text: '1995-96', correct: false }
    ]
  },
  {
    question: 'What team holds the record for the most consecutive NBA titles?',
    answers: [
      { text: 'Golden State Warriors', correct: false },
      { text: 'Boston Celtics', correct: true },
      { text: 'Chicago Bulls', correct: false },
      { text: 'Los Angeles Lakers ', correct: false }
    ]
  },
  {
    question: 'Which player has the most career personal fouls?',
    answers: [
      { text: 'Dwight Howard', correct: false },
      { text: 'Hakeem Olajuwon', correct: false},
      { text: 'Karl Malone', correct: false},
      { text: 'Kareem Abdul-Jabbar', correct: true }
    ]
  },
  {
    question: 'Who is the shortest player of all-time?',
    answers: [
      { text: 'Muggsy Bogues', correct: true },
      { text: 'Spud Webb', correct: false},
      { text: 'Isaiah Thomas', correct: false},
      { text: 'Earl Boykins', correct: false }
    ]
  }

]
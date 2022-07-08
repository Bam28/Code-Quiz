const startButton = document.querySelector('#begin')
const nextButton = document.querySelector('#next')
const questionSectionElement = document.querySelector('#question-section')
const questionElement = document.querySelector('.question')
const answerButtonsElement = document.querySelector('#answer-buttons')
const timeElement = document.querySelector('#time');
const initialsElement = document.querySelector('#initials')

let shuffledQuestions, currentQuestionIndex

let timeLeft= 120;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  timing();
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionSectionElement.classList.remove('hide')
  setNextQuestion()
}

function timing () {
    var timeInterval = setInterval(function(){
    timeLeft--;
    timeElement.textContent = timeLeft;
    if(timeLeft === 0) {
      clearInterval(timeInterval);
      sendMessage();
      questionSectionElement.classList.add('hide');
      showForm();
    }
  }, 1000);
}

function showForm () {
  var input = document.createElement("input");
  var input2 = document.createElement('input');
  input2.type = 'button';
  input2.textContent = 'Sumbit';
  input.type = "text";
  input.className = "css-class-name"; // set the CSS class
  initialsElement.appendChild(input);
  initialsElement.appendChild(input2);
  initialsElement.classList.remove('hide') // put it into the DOM

}

function sendMessage() {
  timeElement.textContent = "Ran out of time ";
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
    } else {
      timeLeft = timeLeft - 5;
      timeElement.textContent = timeLeft;
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
    question: 'What are variables used for in JavaScript?',
    answers: [
      { text: 'For changing lenguage settings.', correct: false },
      { text: 'For changing a value\'s data type.', correct: false },
      { text: 'For storing or holding data', correct: true }
    ]
  },
  {
    question: 'What is string interpolation?',
    answers: [
      { text: 'Using templet literals to embed variables into strings', correct: true },
      { text: 'Joining multiple strings together using operator like +', correct: false },
      { text: 'Changing the value of a variable', correct: false },
      { text: 'Printing a string to the console', correct: false }
    ]
  },
  {
    question: 'What is string concatenation?',
    answers: [
      { text: 'When you assing a string to a variable', correct: false },
      { text: 'When you change a variable\'s value', correct: false },
      { text: 'When you print a string to the console', correct: false },
      { text: 'When you join strings together', correct: true }
    ]
  },
  {
    question: 'If isHungry === true, which of the following expressions evaluates to true?',
    answers: [
      { text: '!isHungry', correct: false },
      { text: 'isHungry !== false', correct: true },
      { text: '!isHungry === true', correct: false},
      { text: 'isHungry === false', correct: false}
    ]
  },
  {
    question: 'Which of the following variables contains a truthy value?', 
    answers: [
        {text: 'let varFour = \' \' ;', correct: false},
        {text: 'let varOne = \' false \';', correct: true},
        {text: 'let varTwo = false;', correct: false},
        {text: 'let varThree = 0;', correct: false}
    ]
  }
]
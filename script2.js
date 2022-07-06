/*
GIVEN I am taking a code quiz
WHEN I click the start button



THEN a timer starts and I am presented with a question



WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
*/

const nextButtonEl = document.querySelector('#begin');
const questionSectionEl = document.querySelector('#question-section');
const timerEl = document.querySelector('#time');
const questionElement = document.querySelector('.question')

let shuffledQuestions, currentQuestionIndex;

const quizMaker = {

    get runQuiz() {
        nextButton.classList.add('hide')
        shuffledQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionSectionEl.classList.remove('hide')
        setNextQuestion()
    },

    get setNextQuestion() {
        resetState()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    },

    showQuestion(question) {
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
      
}

beginQuiz.addEventListener('click', 'nextButtonEl', quizMaker.runQuiz());

'use strict';

const Joi = require('joi');
const questionSets = require('./questionSets');

class Quiz {
  // --------------------------------
  // Dataset
  // --------------------------------
  // Question sets schema
  static questionSetSchema = Joi.object({
    id: Joi.number().required(),
    text: Joi.string().required(),
    image: Joi.string().required(),
    answers: Joi.array().items(Joi.string()).min(2).required(),
    correctAnswer: Joi.string().required(),
    note: Joi.string().required(),
  });

  // Validate the question sets
  static validateQuestionSets(quizSets) {
    const { error } = Joi.array().items(Quiz.questionSetSchema).validate(quizSets);
    if (error) {
      throw new Error(error.details.map((detail) => detail.message).join('\n'));
    }
  }
  // --------------------------------

  constructor(quizSets) {
    this.questionText = document.getElementById('question');
    this.questionImage = document.getElementById('question-image');
    this.answers = document.getElementsByName('answer');
    this.currentQuestionNumber = 1;
    this.correctCount = 0;
    this.questionLength = quizSets.length;
    this.shuffleQuestionSets(quizSets);
  }
  main() {
    this.displayQuestion();
  }

  shuffleQuestionSets(quizSets) {
    // Shuffle the question sets
    this.shuffledQuestionSets = [...quizSets].sort(() => Math.random() - 0.5);
  }

  displayQuestion() {
    const currentQuestion = this.shuffledQuestionSets.pop(); // Retrieve and remove the last question

    // Check if there are no more questions
    if (!currentQuestion) {
      this.gameOver();
      return;
    }

    // Display the current question
    this.questionText.textContent = `${this.currentQuestionNumber}. ${currentQuestion.text}`;
    this.questionImage.src = currentQuestion.image;

    // Create an answer container
    const answerContainer = document.getElementById('answers');
    answerContainer.innerHTML = '';

    // Create radio buttons for the answers
    currentQuestion.answers.forEach((answer, index) => {
      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = 'answer';
      radioButton.id = `mc_answer${index + 1}`;
      radioButton.value = answer;

      const label = document.createElement('label');
      label.htmlFor = `mc_answer${index + 1}`;
      label.textContent = answer;

      answerContainer.appendChild(radioButton);
      answerContainer.appendChild(label);
      answerContainer.appendChild(document.createElement('br'));
    });

    // Set the current question index, correct answer, and note
    this.correctAnswer = currentQuestion.correctAnswer;
    this.note = currentQuestion.note;
  }

  checkAnswer() {
    // Check if the user has selected an answer
    const userAnswer = [...this.answers].find((answer) => answer.checked)?.value;

    // If the user has not selected an answer, display an alert message
    if (!userAnswer) {
      alert('Please select your answer.');
      return;
    }

    // Check if the user's answer is correct
    if (userAnswer === this.correctAnswer) {
      alert('Correct!\n\n' + this.note);
      this.correctCount++;
    } else {
      alert('Incorrect!\n\nCorrect answer: ' + this.correctAnswer + '\n\n' + this.note);
    }

    // Uncheck the radio buttons
    for (const answer of this.answers) {
      answer.checked = false;
    }

    // Display the next question
    this.currentQuestionNumber++;
    this.displayQuestion();
  }

  gameOver() {
    // Display the game over message
    alert(
      'Game Over!\n\nYou answered ' + this.correctCount + ' out of ' + this.questionLength + ' questions correctly.'
    );

    // Reset the game
    this.correctCount = 0;
    this.currentQuestionNumber = 1;
    this.shuffleQuestionSets();
    this.displayQuestion();
  }
}

// --------------------------------

// Validate the question sets
Quiz.validateQuestionSets(questionSets);
console.log('Question sets validated.');

// Create a new Quiz instance
const quiz = new Quiz(questionSets);
document.addEventListener('DOMContentLoaded', () => {
  quiz.main();
});

console.log(questionSets);

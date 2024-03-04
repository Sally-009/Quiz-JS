'use strict';
class Quiz {
  // --------------------------------
  // Dataset
  // the question types
  static QUESTION_TYPES = {
    TRUE_FALSE: 'true_false',
    MULTIPLE_CHOICE: 'multiple_choice',
  };

  // Question sets
  static questionSets = [
    {
      id: 1,
      type: Quiz.QUESTION_TYPES.MULTIPLE_CHOICE,
      text: 'What is the breed of this dog?',
      image: 'images/Yorkie.jpg',
      answers: ['Pomeranian', 'Chihuahua', 'Yorkshire Terrier', 'Shih-Tzu'],
      correctAnswer: 'Yorkshire Terrier',
    },
    {
      id: 2,
      type: Quiz.QUESTION_TYPES.MULTIPLE_CHOICE,
      text: 'What is the breed of this dog?',
      image: 'images/GoldenRetriever.jpg',
      answers: ['Golden Retriever', 'German Shepherd', 'Labrador Retriever', 'Rottweiler'],
      correctAnswer: 'Golden Retriever',
    },
    {
      id: 3,
      type: Quiz.QUESTION_TYPES.MULTIPLE_CHOICE,
      text: 'What is the breed of this dog?',
      image: 'images/Shiba.jpg',
      answers: ['Border Collie', 'ShiBa-Inu', 'Siberian Husky', 'Bulldog'],
      correctAnswer: 'ShiBa-Inu',
    },
  ];

  // --------------------------------

  constructor() {
    this.currentQuestionIndex = 0;
    this.currentQuestion = null;
    this.questionText = document.getElementById('question');
    this.questionImage = document.getElementById('question-image');
    this.answerLabels = document.querySelectorAll('label[for^="mc_answer"]');
    this.answers = document.querySelectorAll('input[name="answer"]');
    this.correctAnswer = null;
  }

  main() {
    // Display the first question
    this.displayQuestion();

    // Add event listener for the submit button
    document.getElementById('submit').addEventListener('click', () => {
      this.checkAnswer();
    });
  }

  displayQuestion() {
    console.log('displayQuestion called');

    // Initialize the question index randomly
    this.currentQuestionIndex = Math.floor(Math.random() * Quiz.questionSets.length);

    // set the current question
    this.currentQuestion = Quiz.questionSets[this.currentQuestionIndex];

    // Set the question text and image
    this.questionText.textContent = this.currentQuestion.text;
    this.questionImage.src = this.currentQuestion.image;

    // Set the answer options
    for (let i = 0; i < this.answerLabels.length; i++) {
      this.answerLabels[i].textContent = this.currentQuestion.answers[i];
      this.answers[i].value = this.currentQuestion.answers[i];
    }

    // Store the correct answer
    this.correctAnswer = this.currentQuestion.correctAnswer;
  }

  checkAnswer() {
    console.log('checkAnswer called');

    // Get the user's answer
    let userAnswer = '';
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].checked) {
        userAnswer = this.answers[i].value;
        break;
      }
    }

    // Check if the user's answer is correct
    if (userAnswer === this.correctAnswer) {
      alert('Correct!');
    } else {
      alert('Incorrect! The correct answer is: ' + this.correctAnswer);
    }

    // Display the next question
    this.displayQuestion();
  }
}

// Create a new Quiz instance
const quiz = new Quiz();
document.addEventListener('DOMContentLoaded', () => {
  quiz.main();
});

'use strict';

document.addEventListener('DOMContentLoaded', displayQuestion());

function displayQuestion() {
  // Initialize the question index randomly
  let currentQuestionIndex = Math.floor(Math.random() * questionSets.length);

  // set the current question
  let currentQuestion = questionSets[currentQuestionIndex];

  // define variables for the question image, text, and answers
  let questionText = document.getElementById('question');
  let questionImage = document.getElementById('question-image');
  let answer1 = document.getElementById('mc_answer1');
  let answer2 = document.getElementById('mc_answer2');
  let answer3 = document.getElementById('mc_answer3');
  let answer4 = document.getElementById('mc_answer4');

  // set the question text and image
  questionText.textContent = currentQuestion.text;
  questionImage.src = currentQuestion.image;
  answer1.textContent = currentQuestion.answers[0];
  answer2.textContent = currentQuestion.answers[1];
  answer3.textContent = currentQuestion.answers[2];
  answer4.textContent = currentQuestion.answers[3];
  let correctAnswer = currentQuestion.correctAnswer;
}

//--------------------------------
// Dataset
// the question types
const QUESTION_TYPES = {
  TRUE_FALSE: 'true_false',
  MULTIPLE_CHOICE: 'multiple_choice',
};

// Question sets
const questionSets = [
  {
    id: 1,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    text: 'What is the breed of this dog?',
    image: 'images/Yorkie.jpg',
    answers: ['Pomeranian', 'Chihuahua', 'Yorkshire Terrier', 'Shih-Tzu'],
    correctAnswer: 'Yorkshire Terrier',
  },
  {
    id: 2,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    text: 'What is the breed of this dog?',
    image: 'images/GoldenRetriever.jpg',
    answers: ['Golden Retriever', 'German Shepherd', 'Labrador Retriever', 'Rottweiler'],
    correctAnswer: 'Golden Retriever',
  },
  {
    id: 3,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    text: 'What is the breed of this dog?',
    image: 'images/Shiba.jpg',
    answers: ['Border Collie', 'Shiba-Inu', 'Siberian Husky', 'Bulldog'],
    correctAnswer: 'ShiBa-Inu',
  },
];

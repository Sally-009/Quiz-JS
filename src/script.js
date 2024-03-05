'use strict';

const questionSets = require('./questionSets');

class Quiz {
  // --------------------------------
  // Dataset
  // --------------------------------
  // Question sets
  static questionSets = [
    {
      id: 1,
      text: 'What is the breed of this dog?',
      image: 'images/Yorkie.jpg',
      answers: ['Pomeranian', 'Chihuahua', 'Yorkshire Terrier', 'Shih-Tzu'],
      correctAnswer: 'Yorkshire Terrier',
      note: 'Yorkshire Terrier is a small dog developed during the 19th century in Yorkshire, England.',
    },
    {
      id: 2,
      text: 'What is the breed of this dog?',
      image: 'images/GoldenRetriever.jpg',
      answers: ['Golden Retriever', 'German Shepherd', 'Labrador Retriever', 'Rottweiler'],
      correctAnswer: 'Golden Retriever',
      note: 'Golden Retriever is a large-sized breed as gun dogs to retrieve shot waterfowl such as ducks and upland game birds during hunting and shooting parties.',
    },
    {
      id: 3,
      text: 'What is the breed of this dog?',
      image: 'images/Shiba.jpg',
      answers: ['Border Collie', 'ShiBa-Inu', 'Siberian Husky', 'Bulldog'],
      correctAnswer: 'ShiBa-Inu',
      note: 'Shiba-Inu is one of the few ancient dog breeds still in existence in the world today.',
    },
    {
      id: 4,
      text: 'Bulldog is an English dog breed.',
      image: 'images/Bulldog.jpg',
      answers: ['True', 'False'],
      correctAnswer: 'True',
      note: 'Bulldog is a medium-sized breed of dog. It is a muscular, hefty dog with a wrinkled face and a distinctive pushed-in nose.',
    },
    {
      id: 5,
      text: 'Australian Shepherd is developed in Australia.',
      image: 'images/AustralianShepherd.jpg',
      answers: ['True', 'False'],
      correctAnswer: 'False',
      note: 'Australian Shepherd is a breed of herding dog that was developed on ranches in the Western United States.',
    },
    {
      id: 6,
      text: 'Is the Shih-Tzu breed originally from China?',
      image: 'images/ShihTzu.jpg',
      answers: ['True', 'False'],
      correctAnswer: 'True',
      note: 'The Shih-Tzu is a toy dog breed developed in Tibet and China.',
    },
    {
      id: 7,
      text: 'Which breed of dog is the smallest in size?',
      image: 'images/img2.jpg',
      answers: ['Chihuahua', 'Pomeranian', 'Shih-Tzu', 'Maltese'],
      correctAnswer: 'Chihuahua',
      note: 'The Chihuahua is the smallest breed of dog in the world. They are known for their tiny size and big personalities.',
    },
    {
      id: 8,
      text: 'Which breed of dog is the largest in size?',
      image: 'images/img1.jpg',
      answers: ['Great Dane', 'Mastiff', 'Saint Bernard', 'Irish Wolfhound'],
      correctAnswer: 'Great Dane',
      note: 'The Great Dane is a German breed of domestic dog known for its large size.',
    },
    {
      id: 9,
      text: 'What is the average body temperature of a dog?',
      image: 'images/img2.jpg',
      answers: ['100.5°F', '101.5°F', '102.5°F', '103.5°F'],
      correctAnswer: '101.5°F',
      note: 'The average body temperature of a dog is 101.5°F.',
    },
    {
      id: 10,
      text: 'What is the term used to describe a group of pugs?',
      image: 'images/grumble.jpg',
      answers: ['A pack', 'A grumble', 'A gaggle', 'A herd'],
      correctAnswer: 'A grumble',
      note: 'A group of pugs is commonly referred to as a "grumble," which is a playful and fitting term for these charming and comical dogs when they gather together.',
    },
  ];
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

  shuffleQuestionSets() {
    // Create a copy of the question sets array
    this.shuffledQuestionSets = [...Quiz.questionSets];

    // Shuffle the copy of question sets
    for (let i = this.shuffledQuestionSets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledQuestionSets[i], this.shuffledQuestionSets[j]] = [
        this.shuffledQuestionSets[j],
        this.shuffledQuestionSets[i],
      ];
    }

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

// Create a new Quiz instance
const quiz = new Quiz(questionSets);
document.addEventListener('DOMContentLoaded', () => {
  quiz.main();
});
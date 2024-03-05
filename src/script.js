'use strict';
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

  constructor() {
    this.currentQuestionIndex = 0;
    this.currentQuestion = null;
    this.questionText = document.getElementById('question');
    this.questionImage = document.getElementById('question-image');
    this.answers = document.getElementsByName('answer');
    this.correctAnswer = null;
    this.note = '';
    this.correctCount = 0;
    this.questionLength = Quiz.questionSets.length;
  }

  main() {
    // Display the first question
    this.displayQuestion();
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
    const answerContainer = document.getElementById('answers');
    answerContainer.innerHTML = ''; // Clear previous answer options

    // Add each answer option dynamically
    this.currentQuestion.answers.forEach((answer, index) => {
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
      answerContainer.appendChild(document.createElement('br')); // Add line break between options
    });

    // Store the correct answer
    this.correctAnswer = this.currentQuestion.correctAnswer;

    // Store the note
    this.note = this.currentQuestion.note;
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

    // Check if the user's answer is selected
    if (userAnswer === '') {
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

    // Clear the user's answer
    for (let i = 0; i < this.answers.length; i++) {
      this.answers[i].checked = false;
    }

    // Remove the current question from the question set
    Quiz.questionSets.splice(this.currentQuestionIndex, 1);

    // Check if the game is over
    if (Quiz.questionSets.length === 0) {
      this.gameOver();
      return;
    }

    // Display the next question
    this.displayQuestion();
  }

  // Quiz game over
  gameOver() {
    console.log('gameOver called');
    // Display the game over message and show how many questions the user answered correctly
    alert(
      'Game Over!\n\nYou answered ' + this.correctCount + ' out of ' + this.questionLength + ' questions correctly.'
    );

    // Reset the game
    this.correctCount = 0;
    this.displayQuestion();
  }
}

// Create a new Quiz instance
const quiz = new Quiz();
document.addEventListener('DOMContentLoaded', () => {
  quiz.main();
});

// the question types
const QUESTION_TYPES = {
  TRUE_FALSE: 'true_false',
  MULTIPLE_CHOICE: 'multiple_choice',
};

// question sets
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

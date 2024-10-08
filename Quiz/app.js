// Client-side code
// import dotenv from "dotenv";
import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";
import { Key } from "./gemini.mjs";
const genAI = new GoogleGenerativeAI(Key());
const totalQuestions = 5;
let answers = [];
let gen; // Store gender for conditional options display

// Array of questions
const questions = [
  {
    id: 1,
    question: "What is your gender?",
    options: [
      { value: "male", label: "Male", img: "images/male.png" },
      { value: "female", label: "Female", img: "images/female.png" }
    ]
  },
  {
    id: 2,
    question: "What is your skin tone?",
    options: [
      { value: "neutral", label: "Neutral", img: "images/neutral.png" },
      { value: "warm", label: "Warm", img: "images/warm.png" },
      { value: "cold", label: "Cold", img: "images/cold.png" }
    ]
  },
  {
    id: 3,
    question: "What is your body type?",
    options: (gender) => gender === "male" ? [
      { value: "rectangle", label: "Rectangle", img: "images/male_rectangle.png" },
      { value: "trapezoid", label: "Trapezoid", img: "images/male_trapezoid.png" },
      { value: "oval", label: "Oval", img: "images/male_oval.png" }
    ] : [
      { value: "hourglass", label: "Hourglass", img: "images/female_hourglass.png" },
      { value: "triangle", label: "Triangle", img: "images/female_triangle.png" },
      { value: "pear", label: "Pear", img: "images/female_pear.png" }
    ]
  },
  {
    id: 4,
    question: "What type of style do you want?",
    options: (gender) => gender === "male" ? [
      { value: "classic", label: "Classic", img: "images/male_classic.png" },
      { value: "casual", label: "Casual", img: "images/male_casual.png" },
      { value: "trendy", label: "Trendy", img: "images/male_trendy.png" }
    ] : [
      { value: "bohemian", label: "Bohemian", img: "images/female_bohemian.png" },
      { value: "preppy", label: "Preppy", img: "images/female_preppy.png" },
      { value: "glamorous", label: "Glamorous", img: "images/female_glamorous.png" }
    ]
  },
  {
    id: 5,
    question: "For what type of occasion do you want to be styled?",
    options: (gender) => gender === "male" ? [
      { value: "business", label: "Business Meeting", img: "images/male_business.png" },
      { value: "date", label: "Date Night", img: "images/male_date.png" },
      { value: "weekend", label: "Weekend Outing", img: "images/male_weekend.png" }
    ] : [
      { value: "cocktail", label: "Cocktail Party", img: "images/female_cocktail.png" },
      { value: "wedding", label: "Wedding Guest", img: "images/female_wedding.png" },
      { value: "brunch", label: "Sunday Brunch", img: "images/female_brunch.png" }
    ]
  }
];

function renderQuiz() {
  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = ''; // Clear existing content
  
  // Add progress bar
  quizContainer.innerHTML = `
    <div class="progress-container">
      <div id="progress-bar" class="progress-bar"></div>
    </div>
  `;
  
  questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.id = `question-${q.id}`;
    questionDiv.style.display = index === 0 ? 'block' : 'none';

    const options = typeof q.options === "function" ? q.options(gen) : q.options;

    questionDiv.innerHTML = `
      <h2>Q${q.id}: ${q.question}</h2>
      <div class="options">
        ${options.map(option => `
          <label class="option">
            <input type="radio" name="question-${q.id}" value="${option.value}">
            <div class="option-content">
              <img src="${option.img}" alt="${option.label}">
              <span>${option.label}</span>
            </div>
          </label>
        `).join('')}
      </div>
    `;

    quizContainer.appendChild(questionDiv);
  });
  
  // Add event listeners for option selection
  quizContainer.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
      const radio = option.querySelector('input[type="radio"]');
      radio.checked = true;
      option.closest('.question').querySelectorAll('.option').forEach(opt => {
        opt.classList.toggle('selected', opt === option);
      });
      nextQuestion();
    });
  });

  updateProgressBar(1);
}

function nextQuestion() {
  const currentQuestion = document.querySelector('.question:not([style*="display: none"])');
  const currentQuestionNum = parseInt(currentQuestion.id.split('-')[1]);
  const selectedOption = currentQuestion.querySelector('input[type="radio"]:checked');

  if (!selectedOption) {
    return; // Don't proceed if no option is selected
  }

  storeAnswer(currentQuestionNum, selectedOption.value);

  currentQuestion.style.display = 'none';
  const nextQuestionNum = currentQuestionNum + 1;

  if (document.getElementById(`question-${nextQuestionNum}`)) {
    const nextQuestion = document.getElementById(`question-${nextQuestionNum}`);
    
    // Update options for gender-dependent questions
    if (nextQuestionNum >= 3) {
      updateGenderSpecificOptions(nextQuestion, nextQuestionNum);
    }
    
    nextQuestion.style.display = 'block';
    updateProgressBar(nextQuestionNum);
  } else {
    handleSubmit();
  }
}

function updateGenderSpecificOptions(questionDiv, questionNum) {
  const options = questions[questionNum - 1].options(gen);
  const optionsContainer = questionDiv.querySelector('.options');
  optionsContainer.innerHTML = options.map(option => `
    <label class="option">
      <input type="radio" name="question-${questionNum}" value="${option.value}">
      <div class="option-content">
        <img src="${option.img}" alt="${option.label}">
        <span>${option.label}</span>
      </div>
    </label>
  `).join('');

  // Re-add event listeners for new options
  questionDiv.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
      const radio = option.querySelector('input[type="radio"]');
      radio.checked = true;
      questionDiv.querySelectorAll('.option').forEach(opt => {
        opt.classList.toggle('selected', opt === option);
      });
      nextQuestion();
    });
  });
}

function updateProgressBar(questionNumber) {
  const progressBar = document.getElementById('progress-bar');
  const progressPercentage = (questionNumber / totalQuestions) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

function storeAnswer(questionNumber, answer) {
  const questionKeys = ['gender', 'skinTone', 'bodyType', 'styleType', 'occasion'];
  if (questionNumber === 1) {
    gen = answer;
  }
  answers[questionNumber - 1] = { [questionKeys[questionNumber - 1]]: answer };
}

async function handleSubmit() {
  const styleRequest = Object.assign({}, ...answers);
  console.log("Style request:", styleRequest);
  const prompt=`Based answers, can you help me style my cloths based on skintype, bodytype and ocassion style preferences: ${Object.entries(styleRequest).map(([key, value]) => `${key}: ${value} , u`).join('')} `
  const htmlContent = await run(prompt);
  const md = window.markdownit();
  const html = md.render(htmlContent);
  // console.log(htmlContent);
  displayStyleSuggestion(html);
  // console.log(html);
  // displayStyleSuggestion(styleRequest);
}
async function run(prompt) {
  const model = genAI.getGenerativeModel({model:"gemini-pro"});
  // const prompt="Write about importence of hardwork"
  const result=await model.generateContent(prompt)
  const response = await result.response;
  const text= response.text();
  // console.log(text);
  return text;
}

function displayStyleSuggestion(htmlContent) {
  const suggestionDiv = document.createElement('div');
  suggestionDiv.innerHTML = htmlContent;

  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = '';
  quizContainer.appendChild(suggestionDiv);
}

document.addEventListener('DOMContentLoaded', function () {
  renderQuiz();
});
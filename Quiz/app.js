// Client-side code
// import dotenv from "dotenv";
import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";
import { Key } from "./gemini.mjs";
const genAI = new GoogleGenerativeAI(Key());
// const totalQuestions = 5;
// let answers = [];
// let gen; // Store gender for conditional options display

// // Array of questions
// const questions = [
//   {
//     id: 1,
//     question: "What is your gender?",
//     options: [
//       { value: "male", label: "Male", img: "./images/male.jpg" },
//       { value: "female", label: "Female", img: "./images/female.jpg" }
//     ]
//   },
//   {
//     id: 2,
//     question: "What is your skin tone?",
//     options: (gender) => gender   !== "male" ? [
//       { value: "neutral", label: "Neutral", img:"./images/Screenshot 2024-10-19 133908.png"  },
//       { value: "warm", label: "Warm", img: "./images/war.png" },
//       { value: "cold", label: "Cold", img: "./images/co.png" }
//     ] :  [
//       { value: "neutral", label: "Neutral", img:"./images/neturalMen.png"  },
//       { value: "warm", label: "Warm", img: "./images/warmMen.png" },
//       { value: "cold", label: "Cold", img: "./images/coolMen.png" }
//     ]
//   },
//   {
//     id: 3,
//     question: "What is your body type?",
//     options: (gender) => gender === "male" ? [
//       { value: "rectangle", label: "Rectangle", img: "./images/trapiod.jpg" },
//       { value: "trapezoid", label: "Trapezoid", img: "./images/rectrancle.jpg" },
//       { value: "oval", label: "Oval", img: "./images/oval.jpg" }
//     ] : [
//       { value: "hourglass", label: "Hourglass", img:"./images/hourglass.jpg" },
//       { value: "triangle", label: "Triangle", img:"./images/triangle-women.jpg" },
//       { value: "pear", label: "Pear", img: "images/female_pear.png" }
//     ]
//   },
//   {
//     id: 4,
//     question: "What type of style do you want?",
//     options: (gender) => gender === "male" ? [
//       { value: "Formal", label: "Classic", img: "./images/formal.jpg" },
//       { value: "casual", label: "Casual", img:  "./images/formal.jpg" },
//       { value: "trendy", label: "Trendy", img:  "./images/formal.jpg" }
//     ] : [
//       { value: "bohemian", label: "Bohemian", img: "./images/formal.jpg"},
//       { value: "preppy", label: "Preppy", img:  "./images/formal.jpg"},
//       { value: "glamorous", label: "Glamorous", img:  "./images/formal.jpg" }
//     ]
//   },
//   {
//     id: 5,
//     question: "For what type of occasion do you want to be styled?",
//     options: (gender) => gender === "male" ? [
//       { value: "business", label: "Business Meeting", img: "./images/formal.jpg" },
//       { value: "date", label: "Date Night", img:  "./images/formal.jpg"},
//       { value: "weekend", label: "Weekend Outing", img: "./images/formal.jpg" }
//     ] : [
//       { value: "cocktail", label: "Cocktail Party", img: "./images/traditional.jpg" },
//       { value: "wedding", label: "Wedding Guest", img: "./images/formal.jpg" },
//       { value: "brunch", label: "Sunday Brunch", img:  "./images/formal.jpg" }
//     ]
//   }
// ];

// function renderQuiz() {
//   const quizContainer = document.querySelector('.quiz-container');
//   quizContainer.innerHTML = ''; // Clear existing content
  
//   // Add progress bar
//   quizContainer.innerHTML = `
//     <div class="progress-container">
//       <div id="progress-bar" class="progress-bar"></div>
//     </div>
//   `;
  
//   questions.forEach((q, index) => {
//     const questionDiv = document.createElement('div');
//     questionDiv.className = 'question';
//     questionDiv.id = `question-${q.id}`;
//     questionDiv.style.display = index === 0 ? 'block' : 'none';

//     const options = typeof q.options === "function" ? q.options(gen) : q.options;

//     questionDiv.innerHTML = `
//       <h2>Q${q.id}: ${q.question}</h2>
//       <div class="options">
//         ${options.map(option => `
//           <label class="option">
//             <input type="radio" name="question-${q.id}" value="${option.value}">
//             <div class="option-content">
//               <img src="${option.img}" alt="${option.label}">
//               <span>${option.label}</span>
//             </div>
//           </label>
//         `).join('')}
//       </div>
//     `;

//     quizContainer.appendChild(questionDiv);
//   });
  
//   // Add event listeners for option selection
//   quizContainer.querySelectorAll('.option').forEach(option => {
//     option.addEventListener('click', () => {
//       const radio = option.querySelector('input[type="radio"]');
//       radio.checked = true;
//       option.closest('.question').querySelectorAll('.option').forEach(opt => {
//         opt.classList.toggle('selected', opt === option);
//       });
//       nextQuestion();
//     });
//   });

//   updateProgressBar(1);
// }

// function nextQuestion() {
//   const currentQuestion = document.querySelector('.question:not([style*="display: none"])');
//   const currentQuestionNum = parseInt(currentQuestion.id.split('-')[1]);
//   const selectedOption = currentQuestion.querySelector('input[type="radio"]:checked');

//   if (!selectedOption) {
//     return; // Don't proceed if no option is selected
//   }

//   storeAnswer(currentQuestionNum, selectedOption.value);

//   currentQuestion.style.display = 'none';
//   const nextQuestionNum = currentQuestionNum + 1;

//   if (document.getElementById(`question-${nextQuestionNum}`)) {
//     const nextQuestion = document.getElementById(`question-${nextQuestionNum}`);
    
//     // Update options for gender-dependent questions
//     if (nextQuestionNum >= 3) {
//       updateGenderSpecificOptions(nextQuestion, nextQuestionNum);
//     }
    
//     nextQuestion.style.display = 'block';
//     updateProgressBar(nextQuestionNum);
//   } else {
//     handleSubmit();
//   }
// }

// function updateGenderSpecificOptions(questionDiv, questionNum) {
//   const options = questions[questionNum - 1].options(gen);
//   const optionsContainer = questionDiv.querySelector('.options');
//   optionsContainer.innerHTML = options.map(option => `
//     <label class="option">
//       <input type="radio" name="question-${questionNum}" value="${option.value}">
//       <div class="option-content">
//         <img src="${option.img}" alt="${option.label}">
//         <span>${option.label}</span>
//       </div>
//     </label>
//   `).join('');

//   // Re-add event listeners for new options
//   questionDiv.querySelectorAll('.option').forEach(option => {
//     option.addEventListener('click', () => {
//       const radio = option.querySelector('input[type="radio"]');
//       radio.checked = true;
//       questionDiv.querySelectorAll('.option').forEach(opt => {
//         opt.classList.toggle('selected', opt === option);
//       });
//       nextQuestion();
//     });
//   });
// }

// function updateProgressBar(questionNumber) {
//   const progressBar = document.getElementById('progress-bar');
//   const progressPercentage = (questionNumber / totalQuestions) * 100;
//   progressBar.style.width = `${progressPercentage}%`;
// }

// function storeAnswer(questionNumber, answer) {
//   const questionKeys = ['gender', 'skinTone', 'bodyType', 'styleType', 'occasion'];
//   if (questionNumber === 1) {
//     gen = answer;
//   }
//   answers[questionNumber - 1] = { [questionKeys[questionNumber - 1]]: answer };
// }
const totalQuestions = 5;
let answers = []; // Store user's answers
let gen; // To store selected gender for conditional options display

// Array of questions
const questions = [
  {
    id: 1,
    question: "What is your gender?",
    options: [
      { value: "male", label: "Male", img: "./images/male.jpg" },
      { value: "female", label: "Female", img: "./images/female.jpg" }
    ]
  },
  {
    id: 2,
    question: "What is your skin tone?",
    options: (gender) =>
      gender !== "male"
        ? [
            { value: "neutral", label: "Neutral", img: "./images/Screenshot 2024-10-19 133908.png" },
            { value: "warm", label: "Warm", img: "./images/war.png" },
            { value: "cold", label: "Cold", img: "./images/co.png" }
          ]
        : [
            { value: "neutral", label: "Neutral", img: "./images/neturalMen.png" },
            { value: "warm", label: "Warm", img: "./images/warmMen.png" },
            { value: "cold", label: "Cold", img: "./images/coolMen.png" }
          ]
  },
  {
    id: 3,
    question: "What is your body type?",
    options: (gender) =>
      gender === "male"
        ? [
            { value: "rectangle", label: "Rectangle", img: "./images/trapiod.jpg" },
            { value: "trapezoid", label: "Trapezoid", img: "./images/rectrancle.jpg" },
            { value: "oval", label: "Oval", img: "./images/oval.jpg" }
          ]
        : [
            { value: "hourglass", label: "Hourglass", img: "./images/hourglass.jpg" },
            { value: "triangle", label: "Triangle", img: "./images/triangle-women.jpg" },
            { value: "Oval", label: "Oval", img: "./images/Oval.png" }
          ]
  },
  {
    id: 4,
    question: "What type of style do you want?",
    options: (gender) =>
      gender === "male"
        ? [
            { value: "Formal", label: "Formal", img: "./images/formal.jpg" },
            { value: "casual", label: "Casual", img: "https://images.unsplash.com/photo-1518723276788-e08d67cf8927?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhc3VhbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D" },
            { value: "trendy", label: "Trendy", img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVuZHklMjBtYW58ZW58MHx8MHx8fDA%3D" },
            { value: "Athleisure", label: "Athleisure", img: "https://images.unsplash.com/photo-1679768763201-e07480531b49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF0aGxldGljJTIwbWFufGVufDB8fDB8fHww" }
          ]
        : [
            { value: "Traditional", label: "Traditional", img: "./images/tradtionalWomen.jpg" },
            { value: "Formal", label: "Formal", img: "./images/formalWomen.jpg" },
            { value: "glamorous", label: "Glamorous", img: "https://images.unsplash.com/photo-1616847220575-31b062a4cd05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww" },
            { value: "Athleisure", label: "Athleisure", img: "./images/Athlisure.png" }
          ]
  },
  {
    id: 5,
    question: "For what type of occasion do you want to be styled?",
    options: (gender) =>
      gender === "male"
        ? [
            { value: "business", label: "Business Meeting", img: "https://images.unsplash.com/photo-1626105985445-6430a31f6f96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJ1c2luZXNzJTIwbWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D" },
            { value: "date", label: "Date", img: "https://images.unsplash.com/photo-1617335048933-4efb94f812f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RGF0ZXxlbnwwfHwwfHx8MA%3D%3D" },
            { value: "weekend", label: "Weekend Outing", img: "./images/WeekendMen.jpg" },
            { value: "wedding", label: "Wedding Guest", img: "./images/weddingMen.jpg" }
          ]
        : [
            { value: "cocktail", label: "Cocktail Party", img: "./images/partyWomen.jpg" },
            { value: "date", label: "Date", img: "https://images.unsplash.com/photo-1617335048933-4efb94f812f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RGF0ZXxlbnwwfHwwfHx8MA%3D%3D" },
            { value: "wedding", label: "Wedding Guest", img: "./images/etnical.jpg" },
            { value: "brunch", label: "Sunday Brunch", img: "https://images.unsplash.com/photo-1528812969535-4bcefc071532?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGF0aGxlc3VyZSUyMHdvbWVufGVufDB8fDB8fHww" }
          ]
  }
];

function renderQuiz() {
  const quizContainer = document.querySelector(".quiz-container");
  quizContainer.innerHTML = ""; // Clear existing content

  // Add progress bar
  quizContainer.innerHTML = `
    <div class="progress-container">
      <div id="progress-bar" class="progress-bar"></div>
    </div>
  `;

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.id = `question-${q.id}`;
    questionDiv.style.display = index === 0 ? "block" : "none";

    const options = typeof q.options === "function" ? q.options(gen) : q.options;

    questionDiv.innerHTML = `
      <h2>Q${q.id}: ${q.question}</h2>
      <div class="options">
        ${options
          .map(
            (option) => `
          <label class="option">
            <input type="radio" name="question-${q.id}" value="${option.value}">
            <div class="option-content">
              <img src="${option.img}" alt="${option.label}">
              <span>${option.label}</span>
            </div>
          </label>
        `
          )
          .join("")}
      </div>
    `;

    quizContainer.appendChild(questionDiv);
  });

  attachOptionListeners();
  updateProgressBar(1);
}

function attachOptionListeners() {
  const quizContainer = document.querySelector(".quiz-container");

  quizContainer.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () => {
      const radio = option.querySelector('input[type="radio"]');
      radio.checked = true;

      option
        .closest(".question")
        .querySelectorAll(".option")
        .forEach((opt) => {
          opt.classList.toggle("selected", opt === option);
        });

      nextQuestion();
    });
  });
}

function nextQuestion() {
  const currentQuestion = document.querySelector('.question:not([style*="display: none"])');
  const currentQuestionNum = parseInt(currentQuestion.id.split("-")[1]);
  const selectedOption = currentQuestion.querySelector('input[type="radio"]:checked');

  if (!selectedOption) return; // Ensure an option is selected

  const answer = selectedOption.value;
  storeAnswer(currentQuestionNum, answer);

  currentQuestion.style.display = "none";
  const nextQuestionNum = currentQuestionNum + 1;

  if (document.getElementById(`question-${nextQuestionNum}`)) {
    const nextQuestion = document.getElementById(`question-${nextQuestionNum}`);
    if (typeof questions[nextQuestionNum - 1].options === "function") {
      updateGenderSpecificOptions(nextQuestion, nextQuestionNum);
    }
    nextQuestion.style.display = "block";
    updateProgressBar(nextQuestionNum);
  } else {
    handleSubmit();
  }
}

function updateGenderSpecificOptions(questionDiv, questionNum) {
  const options = questions[questionNum - 1].options(gen);
  const optionsContainer = questionDiv.querySelector(".options");

  optionsContainer.innerHTML = options
    .map(
      (option) => `
      <label class="option">
        <input type="radio" name="question-${questionNum}" value="${option.value}">
        <div class="option-content">
          <img src="${option.img}" alt="${option.label}">
          <span>${option.label}</span>
        </div>
      </label>
    `
    )
    .join("");

  attachOptionListeners(); // Rebind event listeners
}

function updateProgressBar(questionNumber) {
  const progressBar = document.getElementById("progress-bar");
  const progressPercentage = (questionNumber / totalQuestions) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

function storeAnswer(questionNumber, answer) {
  const questionKeys = ["gender", "skinTone", "bodyType", "styleType", "occasion"];
  if (questionNumber === 1) gen = answer; // Update gender
  answers[questionNumber - 1] = { [questionKeys[questionNumber - 1]]: answer };
}
async function handleSubmit() {
  const styleRequest = Object.assign({}, ...answers);
  console.log("Style request:", styleRequest);

  // Show the loading spinner
  toggleLoadingSpinner(true);

  const prompt = `Based answers, can you help me style my clothes based on skintype, bodytype and occasion style preferences: ${Object.entries(styleRequest).map(([key, value]) => `${key}: ${value}`).join(', ')} `;
  try {
    const htmlContent = await run(prompt);

    const md = window.markdownit();
    const html = md.render(htmlContent);
    const spinner = document.getElementById('pic');
    spinner.classList.remove('hidden');
    displayStyleSuggestion(html);
  } catch (error) {
    console.error("Error fetching style suggestions:", error);
  } finally {
    // Hide the loading spinner
    toggleLoadingSpinner(false);
  }
}

async function run(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error; // Re-throw the error for handling in handleSubmit
  }
}

// Function to toggle the loading spinner
function toggleLoadingSpinner(show) {
  const spinner = document.getElementById('loading-spinner');
  if (show) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
}


function displayStyleSuggestion(htmlContent) {
  const suggestionDiv = document.createElement('div');
  suggestionDiv.innerHTML = htmlContent;

  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = '';
  // const div=document.createElement("div")
  // const input=document.createElement("input")
  quizContainer.appendChild(suggestionDiv);
}

document.addEventListener('DOMContentLoaded', function () {
  renderQuiz();
});
async function getColorName(r, g, b) {
  try {
      const response = await fetch(`https://www.thecolorapi.com/id?rgb=${r},${g},${b}`);
      const data = await response.json();
      return { name: data.name.value, hex: data.hex.value };
  } catch (error) {
      console.error('Color API Error:', error);
      return { name: `RGB(${r},${g},${b})`, hex: rgbToHex(r, g, b) };
  }
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function downscaleCanvas(scale = 0.2) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width * scale;
  tempCanvas.height = canvas.height * scale;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
  return tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
}

function extractColorsFromMask(imageData) {
  const colorCount = {};
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue; // Skip transparent pixels

      const r = data[i], g = data[i + 1], b = data[i + 2];
      const color = `rgb(${r},${g},${b})`;

      colorCount[color] = (colorCount[color] || 0) + 1;
  }
  return colorCount;
}

async function batchColorNames(colors) {
  const batchedNames = {};
  for (const color of colors) {
      const [r, g, b] = color.match(/\d+/g).map(Number);
      batchedNames[color] = await getColorName(r, g, b);
  }
  return batchedNames;
}

// Image Processing
async function processColorsOptimized() {
  const scaledData = downscaleCanvas();
  const colorCount = extractColorsFromMask(scaledData);
  const totalPixels = Object.values(colorCount).reduce((a, b) => a + b, 0);

  const sortedColors = Object.entries(colorCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

  const colorNames = await batchColorNames(sortedColors.map(([color]) => color));

  sortedColors.forEach(([color, count]) => {
      const percentage = ((count / totalPixels) * 100).toFixed(2);
      const [r, g, b] = color.match(/\d+/g).map(Number);

      const colorBox = document.createElement('div');
      colorBox.className = 'color-box';
      colorBox.style.backgroundColor = `rgb(${r},${g},${b})`;

      const colorInfo = colorNames[color];
      colorBox.innerHTML = `
          <strong>${colorInfo.name}</strong><br>
          RGB: (${r},${g},${b})<br>
          HEX: ${colorInfo.hex}<div class="color-percentage">${percentage}%</div>
      `;

      colorDisplay.appendChild(colorBox);
  });
}

function detectSkinTone(imageData) {
  const skinTones = [];
  const skinColorRanges = [
      { min: [180, 100, 80], max: [255, 170, 140], name: 'Light' },
      { min: [150, 100, 70], max: [180, 130, 110], name: 'Medium Light' },
      { min: [130, 80, 60], max: [150, 110, 90], name: 'Medium' },
      { min: [100, 60, 40], max: [130, 90, 70], name: 'Medium Dark' },
      { min: [70, 40, 20], max: [100, 70, 50], name: 'Dark' }
  ];

  for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] === 0) continue;

      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];

      const skinTone = skinColorRanges.find(range =>
          r >= range.min[0] && r <= range.max[0] &&
          g >= range.min[1] && g <= range.max[1] &&
          b >= range.min[2] && b <= range.max[2]
      );

      if (skinTone) skinTones.push({ r, g, b, tone: skinTone.name });
  }

  return skinTones;
}

async function processSkinTones(skinTones) {
  if (skinTones.length === 0) {
      skinToneDisplay.innerHTML = '<p>No skin tones detected</p>';
      return;
  }

  const skinToneGroups = {};
  skinTones.forEach(({ tone, r, g, b }) => {
      if (!skinToneGroups[tone]) skinToneGroups[tone] = [];
      skinToneGroups[tone].push({ r, g, b });
  });

  for (const [tone, tones] of Object.entries(skinToneGroups)) {
      const avgColor = tones.reduce((acc, { r, g, b }) => ({
          r: acc.r + r, g: acc.g + g, b: acc.b + b
      }), { r: 0, g: 0, b: 0 });
      avgColor.r = Math.round(avgColor.r / tones.length);
      avgColor.g = Math.round(avgColor.g / tones.length);
      avgColor.b = Math.round(avgColor.b / tones.length);

      const percentage = ((tones.length / skinTones.length) * 100).toFixed(2);
      const colorInfo = await getColorName(avgColor.r, avgColor.g, avgColor.b);

      const skinToneBox = document.createElement('div');
      skinToneBox.className = 'color-box';
      skinToneBox.style.backgroundColor = `rgb(${avgColor.r},${avgColor.g},${avgColor.b})`;
      skinToneBox.innerHTML = `
          <strong>${tone} Skin Tone</strong><br>
          RGB: (${avgColor.r},${avgColor.g},${avgColor.b})<br>
          HEX: ${colorInfo.hex}<div class="color-percentage">${percentage}%</div>
      `;

      skinToneDisplay.appendChild(skinToneBox);
  }
}

// Event Listener
const imageUploader = document.getElementById('imageUploader');
const uploadedImage = document.getElementById('uploadedImage');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const colorDisplay = document.getElementById('colorDisplay');
const skinToneDisplay = document.getElementById('skinToneDisplay');

imageUploader.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);
  uploadedImage.src = imageUrl;
  uploadedImage.style.display = 'block';

  uploadedImage.onload = async () => {
      canvas.width = uploadedImage.width;
      canvas.height = uploadedImage.height;
      ctx.drawImage(uploadedImage, 0, 0);

      await processColorsOptimized();

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const skinTones = detectSkinTone(imageData);
      await processSkinTones(skinTones);
      const styleMatch=document.getElementById("styleMatch");
      styleMatch.innerHTML=`<h2>Style Matches ${getRandomPercentage()}</h2>`
  };
  function getRandomPercentage() {
    const min = 60; // Minimum percentage
    const max = 85; // Maximum percentage
    const random = Math.random() * (max - min) + min;
    return random.toFixed(2) + "%"; // Format to 2 decimal places and append "%"
}
});
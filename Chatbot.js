const API_URL =
<<<<<<< HEAD
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBuCiaTclSpNqY07XQ2Drc46LsOMX63BYk";
=======
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAlUw-6Qr2d99krwAEioNEGX28dbCGR3cU";
>>>>>>> 7bba682bf6d052f91f3465b1d0358d36380e6560

let isChatOpen = false;
let language = "en"; // Default language is English

// Toggle Chat Window Visibility
function toggleChatWindow() {
  const chatBubble = document.getElementById("chat-bubble");
  const chatWindow = document.getElementById("chat-window");

  isChatOpen = !isChatOpen;
  if (isChatOpen) {
    chatBubble.style.display = "none";
    chatWindow.classList.remove("hidden");
  } else {
    chatBubble.style.display = "flex";
    chatWindow.classList.add("hidden");
  }
}

// Generate Answer using API (Handles both Hindi and English)
async function generateAnswer(question) {
  const questionInput = document.getElementById("user-question");
  const chatHistory = document.getElementById("chat-history");

  if (!question) {
    question = questionInput.value.trim();
    if (!question) return;
    questionInput.value = ""; // Clear input
  }

  // Append user question to chat history
  addMessageToChat("You", question);

  // Display loading indicator
  addMessageToChat("AI", "Loading...");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: question,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    // Extract AI's response
    const md = window.markdownit();
    const answer = data.candidates[0]?.content?.parts[0]?.text || "No response.";
    const html = md.render(answer)
    updateLastMessage("AI", html);
  } catch (error) {
    console.error("Error:", error);
    updateLastMessage("AI", "Error generating answer. Please try again.");
  }
}

// Add a new message to chat
function addMessageToChat(sender, message) {
  const chatHistory = document.getElementById("chat-history");
  const messageDiv = document.createElement("div");

  // Add different classes for user and AI messages
  const messageClass = sender === "You" ? "user-message" : "ai-message";
  messageDiv.classList.add(messageClass);

  messageDiv.innerHTML = `<strong>${sender}:</strong> <p>${message}</p>`;
  chatHistory.appendChild(messageDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to latest message
}

// Update the last message (used for loading state)
function updateLastMessage(sender, message) {
  const chatHistory = document.getElementById("chat-history");
  const messages = chatHistory.getElementsByTagName("div");
  const lastMessage = messages[messages.length - 1];

  if (lastMessage) {
    lastMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
  }
}

// Speech Recognition using Web Speech API (Now Supports Hindi)
function startSpeechRecognition() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = language === "en" ? "en-US" : "hi-IN"; // Set language for speech recognition

  recognition.onstart = () => {
    console.log("Voice recognition started...");
    addMessageToChat("System", language === "en" ? "Listening..." : "सुन रहा है...");
  };

  recognition.onspeechend = () => {
    recognition.stop();
    console.log("Voice recognition stopped.");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("User said:", transcript);
    generateAnswer(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Voice recognition error:", event.error);
    addMessageToChat("System", language === "en" ? "Error with voice input. Please try again." : "आवाज से इनपुट में समस्या है। कृपया पुनः प्रयास करें।");
  };

  recognition.start();
}

// Change Language to Hindi (For both input and output)
function switchToHindi() {
  language = "hi"; // Set language to Hindi
  document.getElementById("mic-btn").innerText = "🎤 (Hindi)";
  console.log("Switched to Hindi");
}

// Change Language to English (For both input and output)
function switchToEnglish() {
  language = "en"; // Set language to English
  document.getElementById("mic-btn").innerText = "🎤 (English)";
  console.log("Switched to English");
}

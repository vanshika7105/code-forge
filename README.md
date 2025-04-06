# 🚀 Code Forge

**Code Forge** is an AI-powered coding practice platform designed to enhance programming skills through dynamically generated quizzes and real-time chatbot assistance. Built using Firebase and integrated with Gemini AI, it offers personalized learning experiences with interactive features and educational resources.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [How It Works](#how-it-works)
- [Future Enhancements](#future-enhancements)
- [Highlighted Features](#highlighted-features)

---

## 🧠 Overview

**Code Forge** empowers coders to:
- Select coding topics and receive AI-generated quizzes
- Interact with an AI chatbot to solve programming problems
- Access both text and optional video-based solutions
- Track learning progress with a personalized dashboard

User authentication and data storage are managed via Firebase, ensuring secure and separate profiles for each user.

---

## ✨ Features

- 🔐 User login/signup with Firebase Authentication  
- 🧠 Dynamic quiz generation using Gemini AI  
- 💬 AI chatbot for coding queries with real-time responses  
- 🎥 Optional video references based on user demand  
- 📊 Personalized dashboards with activity stats  
- ☁️ Real-time data storage and syncing with Firestore  
- 🔄 Unique questions each session – never the same twice!

---

## 🧱 Architecture

```
Frontend (React.js + Tailwind CSS)
        |
Firebase Auth ⟷ Firestore Database
        |
Gemini API (Quiz Generation & Chatbot)
        |
YouTube API (Optional Video Solutions)
```

---

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Firebase Authentication, Firestore  
- **AI Integration**: Gemini API  
- **Video Integration**: YouTube API  
- **Platform**: Google IDX / VS Code

---

## ⚙️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/code-forge.git
   cd code-forge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_key
   REACT_APP_GEMINI_API_KEY=your_gemini_key
   REACT_APP_YOUTUBE_API_KEY=your_youtube_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

---

## 🔄 How It Works

1. User signs up or logs in  
2. Chooses a coding topic  
3. Gemini AI generates a new set of questions  
4. User interacts with the chatbot for help  
5. Gets text or video explanations  
6. Progress is stored and displayed on the dashboard

---

## 🔮 Future Enhancements

- Voice-based chatbot input  
- Difficulty level selection for quizzes  
- Gamification with leaderboards and rewards  
- Exportable performance reports  
- Mentor mode for peer-to-peer guidance  

---

## 🌟 Highlighted Features

### ✅ Multi-Language Support
- Practice in Python, Java, C++, JavaScript & more  
- Choose your preferred language for quizzes and chatbot

### 🧠 AI Code Explanation & Debugging
- Paste code to get AI-generated explanations  
- AI suggests improvements and fixes errors

### 📱 PWA (Progressive Web App) Support
- Works like a native app  
- Full offline access with data sync when online

### 🌙☀️ Dark/Light Mode UI
- Toggle for visual comfort  
- Enhances user accessibility and experience

---

> Made with 💡 and 💻 by **Vanshika Dhingra**

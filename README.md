# Save the README content into a README.md file

readme_content = """
# 🚀 Code Forge

**Code Forge** is an AI-powered coding platform that helps learners practice programming through dynamically generated quizzes and real-time chatbot assistance. It combines the power of Gemini AI and Firebase to create a personalized, engaging, and scalable learning environment for coders.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [How It Works](#how-it-works)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## 🧠 Overview

**Code Forge** allows users to:
- Select a coding topic of interest
- Get AI-generated quizzes using the Gemini API
- Ask coding queries to an AI chatbot
- Receive answers in text and optionally video format
- Track their learning progress on a personalized dashboard

Each user has a separate account with secure data storage using Firebase Authentication and Firestore.

---

## ✨ Features

- 🔐 **User Authentication** – Signup/Login with Firebase Auth
- 🧩 **Dynamic Quiz Generator** – Fresh questions every session using Gemini AI
- 💬 **AI Chatbot Support** – Solve doubts instantly via chat
- 📺 **Video Reference Support** – Get optional video tutorials
- 📊 **User Dashboard** – Personalized learning analytics
- ☁️ **Real-time Sync** – Seamless experience with Firebase Firestore

---

## 🧱 Architecture

```plaintext
Frontend (React.js + Tailwind CSS)
       |
Firebase Auth ⟷ Firestore Database
       |
Gemini API (Quiz + Chatbot)
       |
YouTube API (Video Support)

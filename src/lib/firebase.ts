
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: " ",
  authDomain: " ",
  projectId: " ",
  storageBucket: " ",
  messagingSenderId: " ",
  appId: " ",
  measurementId: " "
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* 
  Important Firebase Setup Instructions:
  
  1. Make sure to enable Email/Password authentication in the Firebase Console:
     - Go to Authentication > Sign-in method > Email/Password > Enable
  
  2. Set up Firestore Security Rules:
     - Go to Firestore Database > Rules
     - Use these rules as a starting point:
  
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      // Allow users to read and write their own data
      match /users/{userId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
        
        // Allow users to read and write their own quizzes
        match /quizzes/{quizId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
        
        // Allow users to read and write their own chat messages
        match /chats/{chatId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
      
      // Allow access to public AI configuration
      match /ai-config/{configId} {
        allow read: if true;
      }
    }
  }
*/

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

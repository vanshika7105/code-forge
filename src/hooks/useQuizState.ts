
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QuizQuestion, Quiz, QuizResults } from '@/types/quiz';
import { generateAIQuestions } from '@/utils/quizUtils';

// Define local User type to avoid dependency on AuthContext
type User = {
  id: string;
  email: string | null;
  name: string | null;
};

export const useQuizState = (user: User | null) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizResults, setQuizResults] = useState<QuizResults>({
    correct: 0,
    total: 0,
    completed: false
  });

  const generateQuiz = async (topic: string) => {
    setLoadingQuiz(true);
    try {
      const questions = await generateAIQuestions(topic);
      
      const newQuiz: Quiz = {
        id: 'quiz-' + Date.now(),
        title: `AI Generated Quiz on ${topic}`,
        topic: topic,
        questions: questions,
        createdAt: new Date(),
        createdBy: user?.id || 'anonymous'
      };
      
      setCurrentQuiz(newQuiz);
      setUserAnswers({});
      setQuizResults({
        correct: 0,
        total: newQuiz.questions.length,
        completed: false
      });
      
      // Save the quiz to Firestore if the user is logged in
      if (user) {
        try {
          await addDoc(collection(db, 'users', user.id, 'quizzes'), {
            ...newQuiz,
            createdAt: serverTimestamp()
          });
        } catch (error) {
          console.error("Error saving quiz to Firestore:", error);
        }
      }
    } catch (error) {
      console.error("Quiz generation error:", error);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const submitAnswer = (questionId: string, answer: string): boolean => {
    // Update user's answer
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    // Check if the answer is correct
    if (currentQuiz) {
      const question = currentQuiz.questions.find(q => q.id === questionId);
      if (question) {
        const isCorrect = question.correctAnswer === answer;
        
        // Update quiz results
        if (isCorrect) {
          setQuizResults(prev => ({
            ...prev,
            correct: prev.correct + 1
          }));
        }
        
        // Check if this was the last question
        const answeredCount = Object.keys(userAnswers).length + 1;
        if (answeredCount >= currentQuiz.questions.length) {
          setQuizResults(prev => ({
            ...prev,
            completed: true
          }));
        }
        
        return isCorrect;
      }
    }
    return false;
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setUserAnswers({});
    setQuizResults({
      correct: 0,
      total: 0,
      completed: false
    });
  };

  const fetchUserQuizzes = async () => {
    if (!user) return;
    
    try {
      const q = query(
        collection(db, 'users', user.id, 'quizzes'),
        where('createdBy', '==', user.id)
      );
      
      const querySnapshot = await getDocs(q);
      const fetchedQuizzes: Quiz[] = [];
      
      querySnapshot.forEach((doc) => {
        fetchedQuizzes.push({ id: doc.id, ...doc.data() } as Quiz);
      });
      
      setQuizzes(fetchedQuizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  return {
    quizzes,
    currentQuiz,
    loadingQuiz,
    generateQuiz,
    submitAnswer,
    userAnswers,
    quizResults,
    resetQuiz,
    fetchUserQuizzes
  };
};


import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { QuizContextType } from '@/types/quiz';
import { useAuth } from './AuthContext';
import { useQuizState } from '@/hooks/useQuizState';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const {
    quizzes,
    currentQuiz,
    loadingQuiz,
    generateQuiz,
    submitAnswer,
    userAnswers,
    quizResults,
    resetQuiz,
    fetchUserQuizzes
  } = useQuizState(user);

  // Fetch user's quizzes when user changes
  useEffect(() => {
    if (user) {
      fetchUserQuizzes();
    }
  }, [user]);

  return (
    <QuizContext.Provider 
      value={{ 
        quizzes, 
        currentQuiz, 
        loadingQuiz, 
        generateQuiz, 
        submitAnswer,
        userAnswers, 
        quizResults,
        resetQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export { type QuizQuestion, type Quiz } from '@/types/quiz';

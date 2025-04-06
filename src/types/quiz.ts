
import { Timestamp } from "firebase/firestore";

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};

export type Quiz = {
  id: string;
  title: string; // Added title property
  topic: string;
  questions: QuizQuestion[];
  createdAt: Date;
  createdBy: string; // Added createdBy property
};

export type QuizResults = {
  correct: number;
  total: number;
  completed: boolean;
};

export type QuizContextType = {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  loadingQuiz: boolean;
  generateQuiz: (topic: string) => Promise<void>;
  submitAnswer: (questionId: string, answer: string) => boolean;
  userAnswers: Record<string, string>;
  quizResults: QuizResults;
  resetQuiz: () => void;
};

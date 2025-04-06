import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { getGeminiResponse } from '@/utils/quizUtils';

type Message = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
};

type ChatContextType = {
  messages: Message[];
  sendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  clearChat: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// We've moved the getGeminiResponse function to quizUtils.ts for better organization

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I'm your CodeForge assistant. Ask me anything about programming, algorithms, or specific coding challenges you're facing.",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's chat history when component mounts
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!user) return;
      
      try {
        const chatQuery = query(
          collection(db, 'users', user.id, 'chats'),
          orderBy('timestamp', 'asc')
        );
        
        const querySnapshot = await getDocs(chatQuery);
        const chatHistory: Message[] = [];
        
        // Only load chat history if there are messages
        if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            chatHistory.push({
              id: doc.id,
              sender: data.sender,
              text: data.text,
              timestamp: data.timestamp.toDate()
            });
          });
          
          setMessages(chatHistory);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
        // Keep default welcome message if error occurs
      }
    };
    
    fetchChatHistory();
  }, [user]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Save user message to Firebase if user is logged in
      if (user) {
        try {
          await addDoc(collection(db, 'users', user.id, 'chats'), {
            sender: 'user',
            text,
            timestamp: serverTimestamp()
          });
        } catch (error) {
          console.error('Failed to save message to Firebase:', error);
          // Continue with local message even if Firebase save fails
        }
      }
      
      // Call Gemini API for response (using our utility function)
      const aiResponse = await getGeminiResponse(text);
      
      const assistantMessage: Message = {
        id: 'msg-' + Date.now(),
        sender: 'assistant',
        text: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Save assistant message to Firebase if user is logged in
      if (user) {
        try {
          await addDoc(collection(db, 'users', user.id, 'chats'), {
            sender: 'assistant',
            text: aiResponse,
            timestamp: serverTimestamp()
          });
        } catch (error) {
          console.error('Failed to save assistant message to Firebase:', error);
        }
      }
    } catch (error) {
      console.error('Failed to get AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: 'error-' + Date.now(),
        sender: 'assistant',
        text: "I'm sorry, I couldn't process your request. Please try again.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      toast.error("Failed to get AI response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: "Hello! I'm your CodeForge assistant. Ask me anything about programming, algorithms, or specific coding challenges you're facing.",
        timestamp: new Date()
      }
    ]);
    
    // Clear chat history in Firebase if user is logged in
    // Note: In a production app, you might want to add a confirmation dialog
    if (user) {
      // We're not actually deleting the chat history from Firebase here
      // as that would require multiple delete operations
      // In a real app, you would implement this functionality
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

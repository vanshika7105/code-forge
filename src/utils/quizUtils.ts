
import { QuizQuestion } from "@/types/quiz";
import sampleQuizzes from "@/data/sampleQuizzes";

/**
 * Helper function to generate quiz questions using Gemini AI
 * 
 * NOTE: This is currently using mock data. To use actual Gemini AI:
 * 1. Create a Firebase Cloud Function or backend service
 * 2. Make API requests to Gemini from the secure backend
 * 3. Return the generated questions to the frontend
 * 
 * @param topic - The topic to generate questions about
 * @returns Promise resolving to an array of quiz questions
 */
export const generateAIQuestions = async (topic: string): Promise<QuizQuestion[]> => {
  try {
    // IMPLEMENTATION GUIDANCE:
    // In a production environment, you would:
    // 1. Make a fetch request to your backend API:
    //    const response = await fetch('/api/generate-quiz', {
    //      method: 'POST',
    //      headers: { 'Content-Type': 'application/json' },
    //      body: JSON.stringify({ topic })
    //    });
    //    const data = await response.json();
    //    return data.questions;
    
    // For now, we're using sample questions with randomization to simulate AI generation
    console.log(`[Mock Gemini] Generating quiz for topic: ${topic}`);
    
    // Get the relevant questions for the topic or default to JavaScript Basics
    const availableQuestions = sampleQuizzes[topic] || sampleQuizzes['JavaScript Basics'];
    
    // Create a copy and shuffle the questions to simulate AI generation
    const shuffledQuestions = [...availableQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5); // Take 5 questions
      
    // Add unique IDs to each question
    return shuffledQuestions.map(q => ({
      ...q,
      id: 'ai-' + Math.random().toString(36).substring(2, 9)
    }));
  } catch (error) {
    console.error('Error generating AI questions:', error);
    // Fall back to sample questions if AI generation fails
    return sampleQuizzes[topic] || sampleQuizzes['JavaScript Basics'];
  }
};

/**
 * Helper function to get a response from Gemini AI for the chat
 * 
 * NOTE: This is currently using mock data. To use actual Gemini AI:
 * 1. Create a Firebase Cloud Function or backend service
 * 2. Make API requests to Gemini from the secure backend
 * 3. Return the generated response to the frontend
 * 
 * @param prompt - The user's message/prompt
 * @returns Promise resolving to the AI's response
 */
export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    console.log(`[Mock Gemini] Received prompt: ${prompt}`);
    
    // Fallback responses in case API call fails or for development
    const aiResponses: Record<string, string> = {
      default: "I'm your CodeForge assistant. I can help with programming concepts, explain code, and provide solutions to coding problems. What would you like to know?",
      
      javascript: "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It's commonly used for web development to create interactive elements.",
      
      'for loop': "A for loop repeats until a specified condition evaluates to false. In JavaScript, it has the syntax:\n```javascript\nfor (initialization; condition; afterthought) {\n  // code to execute\n}\n```",
      
      'react hooks': "React Hooks are functions that let you use state and other React features without writing a class. Some common hooks include:\n- useState: Adds state to functional components\n- useEffect: Handles side effects\n- useContext: Accesses context\n- useRef: Creates mutable references",
      
      'recursion': "Recursion is when a function calls itself, directly or indirectly. It's useful for tasks that can be broken down into similar subtasks. Every recursive solution needs a base case to prevent infinite recursion.\n```javascript\nfunction factorial(n) {\n  if (n <= 1) return 1; // base case\n  return n * factorial(n - 1); // recursive case\n}\n```",
    };
    
    // IMPLEMENTATION GUIDANCE:
    // In a production environment, you would:
    // 1. Make a fetch request to your backend API:
    //    const response = await fetch('/api/chat', {
    //      method: 'POST',
    //      headers: { 'Content-Type': 'application/json' },
    //      body: JSON.stringify({ prompt })
    //    });
    //    const data = await response.json();
    //    return data.response;
    
    // Check for specific keywords in the user's message
    const message = prompt.toLowerCase();
    
    // Simulate processing delay for realism
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (const [key, response] of Object.entries(aiResponses)) {
      if (message.includes(key.toLowerCase())) {
        return response;
      }
    }
    
    // If no specific match is found, provide a general response based on the query
    if (message.includes('help') || message.includes('how')) {
      return "I'd be happy to help! Could you provide more details about what you're trying to learn or accomplish with coding?";
    }
    
    if (message.includes('error') || message.includes('bug')) {
      return "Debugging is an essential skill! To help with your error, I would need to see the code and the specific error message. Could you share those details?";
    }
    
    // Return a default response for messages with no specific matches
    return "That's an interesting coding question! I'm designed to help with programming topics. Could you provide more context or clarify what programming concept you'd like to explore?";
  } catch (error) {
    console.error('Error calling AI API:', error);
    return "I encountered an issue processing your request. Please try again later.";
  }
};

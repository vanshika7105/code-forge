
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuiz } from "@/contexts/QuizContext";
import { useChat } from "@/contexts/ChatContext";
import { Brain, MessageSquare, ArrowRight, BookOpen, Code } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { quizzes } = useQuiz();
  const { messages } = useChat();
  const navigate = useNavigate();

  // Extract user questions from chat history
  const userQuestions = messages
    .filter(msg => msg.sender === 'user')
    .slice(-3)
    .reverse();

  const topics = [
    { id: 'js', name: 'JavaScript Basics', icon: Code },
    { id: 'ds', name: 'Data Structures', icon: BookOpen },
    { id: 'algo', name: 'Algorithms', icon: Brain },
    { id: 'react', name: 'React', icon: Code },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">
            Continue your coding journey with quizzes and personalized assistance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>Coding Quizzes</span>
              </CardTitle>
              <CardDescription>
                Test your knowledge with AI-generated quizzes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {quizzes.length === 0 
                    ? "You haven't taken any quizzes yet." 
                    : `You've completed ${quizzes.length} ${quizzes.length === 1 ? 'quiz' : 'quizzes'}.`}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {topics.map(topic => (
                  <Button 
                    key={topic.id}
                    variant="outline"
                    className="justify-start gap-2"
                    onClick={() => navigate('/quiz')}
                  >
                    <topic.icon className="h-4 w-4" />
                    <span className="text-sm">{topic.name}</span>
                  </Button>
                ))}
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => navigate('/quiz')}
              >
                Start a New Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Coding Assistant</span>
              </CardTitle>
              <CardDescription>
                Get help with coding problems and questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {userQuestions.length === 0 
                    ? "You haven't asked any questions yet." 
                    : "Your recent questions:"}
                </p>
                
                {userQuestions.length > 0 ? (
                  <ul className="space-y-2">
                    {userQuestions.map(question => (
                      <li key={question.id} className="text-sm border border-border p-2 rounded-md">
                        {question.text.length > 60 
                          ? `${question.text.substring(0, 60)}...` 
                          : question.text}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => navigate('/chat')}
              >
                Ask a Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Learning Resources</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/50 rounded-md">
              <h3 className="font-medium mb-2">Array Methods Tutorial</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Master JavaScript array methods like map, filter, and reduce.
              </p>
              <Button variant="link" className="px-0">
                View Tutorial
              </Button>
            </div>
            <div className="p-4 bg-secondary/50 rounded-md">
              <h3 className="font-medium mb-2">Big O Notation Guide</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Learn about time complexity and algorithm efficiency.
              </p>
              <Button variant="link" className="px-0">
                View Guide
              </Button>
            </div>
            <div className="p-4 bg-secondary/50 rounded-md">
              <h3 className="font-medium mb-2">React Hooks Explained</h3>
              <p className="text-sm text-muted-foreground mb-3">
                A practical guide to using React hooks effectively.
              </p>
              <Button variant="link" className="px-0">
                View Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

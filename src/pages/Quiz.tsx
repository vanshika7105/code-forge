
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";
import { useQuiz, QuizQuestion } from "@/contexts/QuizContext";
import { useAuth } from "@/contexts/AuthContext";
import { Check, X, ArrowRight, Loader2, Trophy, Brain } from "lucide-react";
import { toast } from "sonner";

const topics = [
  { id: "JavaScript Basics", label: "JavaScript Basics" },
  { id: "Data Structures", label: "Data Structures" },
  { id: "Algorithms", label: "Algorithms" },
  { id: "React", label: "React" },
  { id: "Python", label: "Python" },
  { id: "Web Development", label: "Web Development" },
];

const Quiz = () => {
  const { 
    currentQuiz, 
    loadingQuiz, 
    generateQuiz, 
    submitAnswer, 
    userAnswers, 
    quizResults, 
    resetQuiz 
  } = useQuiz();
  
  const { user } = useAuth();
  
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    if (selectedTopic) {
      try {
        await generateQuiz(selectedTopic);
        setCurrentQuestionIndex(0);
        setSelectedAnswer("");
        setAnswerSubmitted(false);
        setIsCorrect(null);
      } catch (error) {
        console.error("Error generating quiz:", error);
        toast.error("Failed to start quiz. Please try again.");
      }
    }
  };

  const handleSelectAnswer = (answer: string) => {
    if (!answerSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer && currentQuiz) {
      const question = currentQuiz.questions[currentQuestionIndex];
      const correct = submitAnswer(question.id, selectedAnswer);
      setIsCorrect(correct);
      setAnswerSubmitted(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setAnswerSubmitted(false);
      setIsCorrect(null);
    } else if (currentQuiz) {
      // If this was the last question, mark the quiz as completed
      toast.success("Quiz completed!");
    }
  };

  const handleResetQuiz = () => {
    resetQuiz();
    setSelectedTopic("");
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setAnswerSubmitted(false);
    setIsCorrect(null);
  };

  const currentQuestion: QuizQuestion | undefined = 
    currentQuiz?.questions[currentQuestionIndex];

  // Debug information
  console.log("Quiz state:", {
    currentQuiz: currentQuiz ? "exists" : "null",
    loadingQuiz,
    quizResults,
    questionIndex: currentQuestionIndex,
    userAnswersCount: Object.keys(userAnswers).length,
    currentQuestion: currentQuestion ? "exists" : "undefined",
  });

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">CodeForge AI Quiz</h1>
            <p className="text-muted-foreground">
              Test your knowledge with AI-generated quizzes on various programming topics
            </p>
          </div>

          {!currentQuiz && !loadingQuiz && (
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Select a Topic</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {topics.map((topic) => (
                    <Button
                      key={topic.id}
                      variant={selectedTopic === topic.id ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setSelectedTopic(topic.id)}
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      {topic.label}
                    </Button>
                  ))}
                </div>
                <Button 
                  className="w-full" 
                  disabled={!selectedTopic} 
                  onClick={handleStartQuiz}
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          )}

          {loadingQuiz && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-xl">Generating your quiz...</p>
              <p className="text-muted-foreground mt-2">
                Creating challenging questions on {selectedTopic}
              </p>
            </div>
          )}

          {currentQuiz && !quizResults.completed && (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                  </span>
                  <span className="text-sm font-medium">{currentQuiz.topic}</span>
                </div>
                <Progress 
                  value={((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100} 
                  className="h-2"
                />
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {currentQuestion?.question}
                  </h2>

                  <RadioGroup 
                    value={selectedAnswer} 
                    className="space-y-3 mb-6"
                  >
                    {currentQuestion?.options.map((option, i) => (
                      <div key={i} className={`
                        flex items-center space-x-2 rounded-md border p-3 
                        ${answerSubmitted && option === currentQuestion.correctAnswer ? 'border-green-500 bg-green-500/10' : ''}
                        ${answerSubmitted && option === selectedAnswer && option !== currentQuestion.correctAnswer ? 'border-red-500 bg-red-500/10' : ''}
                        ${!answerSubmitted && option === selectedAnswer ? 'border-primary' : ''}
                      `}>
                        <RadioGroupItem 
                          value={option} 
                          id={`option-${i}`} 
                          onClick={() => handleSelectAnswer(option)}
                          disabled={answerSubmitted}
                        />
                        <Label 
                          htmlFor={`option-${i}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                        {answerSubmitted && option === currentQuestion.correctAnswer && (
                          <Check className="h-5 w-5 text-green-500" />
                        )}
                        {answerSubmitted && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    ))}
                  </RadioGroup>

                  {answerSubmitted && currentQuestion?.explanation && (
                    <div className="mb-6 p-4 bg-secondary/50 rounded-md">
                      <p className="font-medium mb-1">Explanation:</p>
                      <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                    </div>
                  )}

                  {!answerSubmitted ? (
                    <Button 
                      className="w-full" 
                      disabled={!selectedAnswer}
                      onClick={handleSubmitAnswer}
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex >= currentQuiz.questions.length - 1}
                    >
                      {currentQuestionIndex >= currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {currentQuiz && quizResults.completed && (
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    <Trophy className="h-16 w-16 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
                  <p className="text-muted-foreground mb-6">
                    You scored {quizResults.correct} out of {quizResults.total}
                  </p>
                  
                  <div className="mb-8">
                    <Progress 
                      value={(quizResults.correct / quizResults.total) * 100} 
                      className="h-4 mb-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      {quizResults.correct / quizResults.total >= 0.7 
                        ? "Great job! You're doing well." 
                        : "Keep practicing to improve your score!"}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={handleResetQuiz}
                  >
                    Take Another Quiz
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      if (user) {
                        navigate('/dashboard');
                      } else {
                        navigate('/');
                      }
                    }}
                  >
                    {user ? 'Back to Dashboard' : 'Back to Home'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;

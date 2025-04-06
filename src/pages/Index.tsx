
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Code, Brain, MessageSquare, CheckCircle } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Code size={60} className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Become a Better Developer with <span className="text-primary">AI-Powered</span> Learning
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Master coding concepts through interactive quizzes and get help with our intelligent coding assistant
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => navigate("/signup")} className="text-lg">
                Get Started For Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="text-lg">
                Log In
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex justify-center mb-4">
                <Brain size={40} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">AI-Generated Quizzes</h3>
              <p className="text-muted-foreground">
                Test your knowledge with unique quizzes tailored to your selected programming topics
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex justify-center mb-4">
                <MessageSquare size={40} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Coding Assistant</h3>
              <p className="text-muted-foreground">
                Get help with code problems, learn new concepts, and find tutorials with our AI chatbot
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex justify-center mb-4">
                <CheckCircle size={40} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Track Your Progress</h3>
              <p className="text-muted-foreground">
                Monitor your learning journey with detailed performance analytics and history
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to level up your coding skills?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of developers who are mastering coding concepts faster than ever
            </p>
            <Button size="lg" onClick={() => navigate("/signup")}>
              Start Learning Now
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

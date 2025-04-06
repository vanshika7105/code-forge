
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { useChat } from "@/contexts/ChatContext";
import { Send, User, Bot, RefreshCw, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Chat = () => {
  const { messages, sendMessage, isLoading, clearChat } = useChat();
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">CodeForge AI Assistant</h1>
            <p className="text-muted-foreground">
              Ask questions about programming concepts, get help with code, or request tutorials
            </p>
          </div>

          <Card className="border relative flex flex-col h-[calc(100vh-280px)] min-h-[500px]">
            <div className="p-3 border-b flex justify-between items-center bg-card">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">CodeForge Assistant</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearChat}
                className="h-8 gap-1"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Clear Chat</span>
              </Button>
            </div>

            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex max-w-[80%] rounded-lg p-4",
                      message.sender === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "bg-secondary"
                    )}
                  >
                    <div className="flex-shrink-0 mr-3">
                      {message.sender === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="whitespace-pre-wrap">
                        {message.text.split("```").map((part, i) => {
                          // Odd indices are code blocks
                          if (i % 2 === 1) {
                            return (
                              <pre key={i} className="code-block my-2">
                                <code>{part}</code>
                              </pre>
                            );
                          }
                          
                          // Replace inline code with styled spans
                          const inlineCodeRegex = /`([^`]+)`/g;
                          const textWithInlineCode = part.split(inlineCodeRegex);
                          
                          return (
                            <span key={i}>
                              {textWithInlineCode.map((text, j) => {
                                // Odd indices are inline code
                                if (j % 2 === 1) {
                                  return <code key={j} className="code-inline">{text}</code>;
                                }
                                return text;
                              })}
                            </span>
                          );
                        })}
                      </div>
                      <div className="text-xs opacity-50 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex bg-secondary max-w-[80%] rounded-lg p-4">
                    <div className="flex-shrink-0 mr-3">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-3 border-t">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder="Ask a coding question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!input.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </Card>

          <div className="mt-6">
            <h2 className="text-lg font-medium mb-3">Quick Prompts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="justify-start h-auto py-2 px-3"
                onClick={() => {
                  const prompt = "Explain how to implement a binary search algorithm";
                  setInput(prompt);
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <span className="text-left text-sm">Explain how to implement a binary search algorithm</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-2 px-3"
                onClick={() => {
                  const prompt = "What are React hooks and how do I use them?";
                  setInput(prompt);
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <span className="text-left text-sm">What are React hooks and how do I use them?</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-2 px-3"
                onClick={() => {
                  const prompt = "Help me understand closures in JavaScript";
                  setInput(prompt);
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <span className="text-left text-sm">Help me understand closures in JavaScript</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;

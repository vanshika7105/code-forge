
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Code, Brain, MessageSquare, User, LogOut } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-border bg-card py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code size={28} className="text-primary" />
          <Link to={user ? "/dashboard" : "/"} className="text-xl font-bold">
            CodeForge
          </Link>
        </div>

        {user ? (
          <nav className="flex items-center space-x-6">
            <Link 
              to="/quiz" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Brain size={18} />
              <span>Quiz</span>
            </Link>
            <Link 
              to="/chat" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageSquare size={18} />
              <span>Chat</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center space-x-1">
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          </nav>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


import { ReactNode } from "react";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
        <div className="container">
          <p>© {new Date().getFullYear()} CodeForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

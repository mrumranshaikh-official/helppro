import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/theme-toggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={() => window.open('https://helppro.com', '_blank')}
                className="cursor-pointer"
              >
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  HelpPro
                </h1>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
                How it Works
              </a>
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#community" className="text-foreground hover:text-primary transition-colors">
                Community
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Sign In
            </Button>
            <Button 
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
              onClick={() => {
                const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                if (emailInput) {
                  emailInput.scrollIntoView({ behavior: 'smooth' });
                  emailInput.focus();
                }
              }}
            >
              Join Waitlist
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-lg rounded-lg mt-2 border border-border">
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </a>
              <a
                href="#features"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#community"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <div className="px-3 py-2 space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  onClick={() => {
                    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                    if (emailInput) {
                      emailInput.scrollIntoView({ behavior: 'smooth' });
                      emailInput.focus();
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
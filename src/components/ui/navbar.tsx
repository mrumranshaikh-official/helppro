import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, LogOut, Users, MessageSquare, Coins, TrendingUp, CircleHelp } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CoinsWidget from "@/components/coins-widget";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={() => window.open('https://helppro.lovable.app/', '_blank')}
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
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-colors" 
                onClick={() => navigate('/community')}
              >
                <Users size={18} className="mr-2" />
                Community
              </Button>
              {user && (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-foreground hover:text-primary transition-colors" 
                    onClick={() => navigate('/help-requests')}
                  >
                    <CircleHelp size={18} className="mr-2" />
                    Help Requests
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-foreground hover:text-primary transition-colors" 
                    onClick={() => navigate('/messages')}
                  >
                    <MessageSquare size={18} className="mr-2" />
                    Messages
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-foreground hover:text-primary transition-colors" 
                    onClick={() => navigate('/coins')}
                  >
                    <Coins size={18} className="mr-2" />
                    HT Coins
                  </Button>
                </>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-foreground hover:text-primary transition-colors p-0 h-auto font-normal">
                    <Menu size={20} className="mr-2" />
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-card/95 backdrop-blur-lg border border-border">
                  <DropdownMenuItem onClick={() => navigate('/')}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="#how-it-works" className="w-full cursor-pointer hover:text-primary transition-colors">
                      How it Works
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="#features" className="w-full cursor-pointer hover:text-primary transition-colors">
                      Features
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/community')}>
                    Top Community
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="#about" className="w-full cursor-pointer hover:text-primary transition-colors">
                      About
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {user && <CoinsWidget />}
            <ThemeToggle />
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {user.email?.split('@')[0]}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => navigate(`/profile/${user.id}`)}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={signOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button variant="ghost" className="text-foreground hover:text-primary" onClick={() => navigate('/auth')}>
                      Sign In
                    </Button>
                    <Button 
                      className="bg-gradient-primary hover:opacity-90 transition-opacity"
                      onClick={() => navigate('/auth')}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </>
            )}
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
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/community');
                  setIsMenuOpen(false);
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                Community
              </Button>
              {user && (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/help-requests');
                      setIsMenuOpen(false);
                    }}
                  >
                    <CircleHelp className="mr-2 h-4 w-4" />
                    Help Requests
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/messages');
                      setIsMenuOpen(false);
                    }}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/coins');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Coins className="mr-2 h-4 w-4" />
                    HT Coins
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
              >
                All
              </Button>
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
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate('/community');
                  setIsMenuOpen(false);
                }}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Top Community
              </Button>
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
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <div className="px-3 py-2 text-sm text-muted-foreground border-t border-border">
                          Signed in as {user.email?.split('@')[0]}
                        </div>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => {
                            navigate(`/profile/${user.id}`);
                            setIsMenuOpen(false);
                          }}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/auth')}>
                          Sign In
                        </Button>
                        <Button 
                          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                          onClick={() => navigate('/auth')}
                        >
                          Get Started
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, LogOut, Users, Coins, PlusCircle } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CoinsWidget from "@/components/coins-widget";
import CreateRequestDialog from "@/components/create-request-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    } else {
      // If not on home page, navigate there first
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      setIsMenuOpen(false);
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
                onClick={() => navigate('/')}
                className="cursor-pointer"
              >
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  HelpPro
                </h1>
              </button>
            </div>
          </div>

          {/* Desktop Navigation - 5 Clean Tabs */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-colors font-medium" 
                onClick={() => navigate('/')}
              >
                Home
              </Button>
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-colors font-medium" 
                onClick={() => navigate('/find-experts')}
              >
                Find Experts
              </Button>
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-colors font-medium" 
                onClick={() => navigate('/community')}
              >
                Community
              </Button>
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-primary transition-colors font-medium" 
                onClick={() => navigate('/coins')}
              >
                HP Coins
              </Button>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <CoinsWidget />
                <Button 
                  className="bg-gradient-primary hover:opacity-90 transition-opacity"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  <PlusCircle size={18} className="mr-2" />
                  Request Help
                </Button>
              </>
            )}
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
                        My Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/help-requests')}>
                        Help Requests
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/messages')}>
                        Messages
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
                      Sign Up
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - 5 Clean Tabs */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-lg rounded-lg mt-2 border border-border">
              <Button
                variant="ghost"
                className="w-full justify-start font-medium"
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium"
                onClick={() => {
                  navigate('/find-experts');
                  setIsMenuOpen(false);
                }}
              >
                Find Experts
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium"
                onClick={() => {
                  navigate('/community');
                  setIsMenuOpen(false);
                }}
              >
                Community
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium"
                onClick={() => {
                  navigate('/coins');
                  setIsMenuOpen(false);
                }}
              >
                HP Coins
              </Button>

              {user && (
                <>
                  <div className="border-t border-border my-2" />
                  <Button
                    variant="default"
                    className="w-full justify-start bg-gradient-primary"
                    onClick={() => {
                      setIsCreateDialogOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Request Help
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate('/help-requests');
                      setIsMenuOpen(false);
                    }}
                  >
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
                    Messages
                  </Button>
                </>
              )}

              <div className="border-t border-border my-2" />
              {!loading && (
                <>
                  {user ? (
                    <>
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        Signed in as {user.email?.split('@')[0]}
                      </div>
                      <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => {
                        navigate('/auth');
                        setIsMenuOpen(false);
                      }}>
                        Sign In
                      </Button>
                      <Button 
                        className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                        onClick={() => {
                          navigate('/auth');
                          setIsMenuOpen(false);
                        }}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      <CreateRequestDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={() => {
          setIsCreateDialogOpen(false);
          navigate('/help-requests');
        }}
      />
    </nav>
  );
};

export default Navbar;

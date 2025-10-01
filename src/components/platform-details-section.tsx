import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Clock, 
  Award, 
  TrendingUp, 
  Users, 
  Shield,
  Zap,
  Target,
  Heart,
  UserPlus,
  HandHeart,
  Coins,
  CheckCircle,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const PlatformDetailsSection = () => {
  const [activeSection, setActiveSection] = useState("features");
  const [activeItem, setActiveItem] = useState("borderless");

  const sections = {
    features: {
      title: "Core Platform Features",
      icon: Zap,
      color: "text-primary",
      items: {
        borderless: {
          icon: Globe,
          title: "Borderless Network",
          subtitle: "Global Reach",
          description: "Connect with IT professionals worldwide without geographical limitations. Access expertise from any timezone, any location.",
          details: [
            "24/7 global network coverage",
            "Multi-language support",
            "Cross-timezone collaboration",
            "Regional expertise matching"
          ]
        },
        realtime: {
          icon: Clock,
          title: "Real-time Assistance",
          subtitle: "Instant Support",
          description: "Get help when you need it most. Our network operates around the clock for immediate support.",
          details: [
            "Instant expert matching",
            "Live chat and video support",
            "Priority queue system",
            "Average response time: 15 minutes"
          ]
        },
        verified: {
          icon: Award,
          title: "Verified Expertise",
          subtitle: "Trusted Professionals",
          description: "Every member is LinkedIn-verified with comprehensive skill assessments.",
          details: [
            "LinkedIn profile verification",
            "Technical skill assessments",
            "Peer review system",
            "Continuous credibility tracking"
          ]
        },
        fairpoints: {
          icon: TrendingUp,
          title: "Fair Point System",
          subtitle: "Transparent Economy",
          description: "A balanced points economy ensures fair exchange of expertise and services.",
          details: [
            "Earn points by helping others",
            "Spend points when you need help",
            "Transparent pricing structure",
            "No hidden fees or charges"
          ]
        },
        matching: {
          icon: Zap,
          title: "AI-Powered Matching",
          subtitle: "Smart Connections",
          description: "Advanced algorithms connect you with the perfect expert for your specific needs.",
          details: [
            "Skills-based routing",
            "Expertise level matching",
            "Availability optimization",
            "Success rate tracking"
          ]
        },
        security: {
          icon: Shield,
          title: "Security & Privacy",
          subtitle: "Protected Data",
          description: "Enterprise-grade security ensures your data and conversations remain confidential.",
          details: [
            "End-to-end encryption",
            "GDPR compliant",
            "Secure payment processing",
            "Regular security audits"
          ]
        }
      }
    },
    howworks: {
      title: "How HelpPro Works",
      icon: Target,
      color: "text-accent",
      items: {
        join: {
          icon: UserPlus,
          title: "Join & Get Verified",
          subtitle: "Step 1: Onboarding",
          description: "Begin your journey with a simple verification process that establishes your professional credentials.",
          details: [
            "Connect your LinkedIn profile",
            "Complete skill assessments",
            "Verify your professional experience",
            "Set your availability preferences"
          ]
        },
        help: {
          icon: HandHeart,
          title: "Help Others & Earn Points",
          subtitle: "Step 2: Contribute",
          description: "Use your expertise to assist fellow professionals and build your points balance.",
          details: [
            "Browse help requests in your domain",
            "Accept tasks that match your skills",
            "Earn points for every hour of help",
            "Build your reputation and credibility"
          ]
        },
        spend: {
          icon: Coins,
          title: "Spend Points When Needed",
          subtitle: "Step 3: Get Help",
          description: "When you need assistance, use your earned points to access expert help immediately.",
          details: [
            "Post your help request",
            "Get matched with available experts",
            "Spend points based on task complexity",
            "Receive quality assistance quickly"
          ]
        },
        balance: {
          icon: CheckCircle,
          title: "Maintain Balance",
          subtitle: "Step 4: Sustain",
          description: "The system ensures fairness through balanced contribution and credibility tracking.",
          details: [
            "Automatic balance monitoring",
            "Mandatory payback system",
            "Reputation score tracking",
            "Community feedback integration"
          ]
        }
      }
    },
    mission: {
      title: "Our Mission",
      icon: Heart,
      color: "text-success",
      items: {
        vision: {
          icon: Target,
          title: "Our Vision",
          subtitle: "The Future We Build",
          description: "Creating the first real-time borderless human safety net for the tech industry.",
          details: [
            "Turn spare time into shared success",
            "Eliminate professional isolation",
            "Build sustainable work-life balance",
            "Foster global tech community"
          ]
        },
        problem: {
          icon: Users,
          title: "The Problem We Solve",
          subtitle: "Current Challenges",
          description: "IT burnout costs billions annually, and too many professionals work in isolation.",
          details: [
            "Rising burnout rates in tech",
            "Limited access to immediate help",
            "Expensive consulting alternatives",
            "Lack of peer support networks"
          ]
        },
        solution: {
          icon: Shield,
          title: "Our Solution",
          subtitle: "How We Help",
          description: "A transparent, points-based ecosystem where helping others creates value.",
          details: [
            "Fair exchange of expertise",
            "No corporate politics",
            "Community-driven support",
            "Sustainable professional growth"
          ]
        },
        values: {
          icon: Heart,
          title: "Core Values",
          subtitle: "What Drives Us",
          description: "Building a fairer, more humane professional world through collaboration.",
          details: [
            "Transparency in all transactions",
            "Fairness in point distribution",
            "Trust through verification",
            "Community over competition"
          ]
        }
      }
    }
  };

  const currentSection = sections[activeSection as keyof typeof sections];
  const currentItem = currentSection.items[activeItem as keyof typeof currentSection.items] as {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Platform Overview
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Know About HelpPro
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our platform features, understand how the system works, and learn about our mission to transform professional collaboration.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-4">
            <Card className="sticky top-8 bg-gradient-card border-border">
              <CardContent className="p-6">
                {/* Main Section Navigation */}
                <div className="space-y-2 mb-6">
                  {Object.entries(sections).map(([key, section]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveSection(key);
                        setActiveItem(Object.keys(section.items)[0]);
                      }}
                      className={cn(
                        "w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center justify-between group",
                        activeSection === key
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <section.icon className={cn("w-5 h-5", activeSection === key ? "text-primary-foreground" : section.color)} />
                        <span className="font-semibold">{section.title}</span>
                      </div>
                      <ChevronRight className={cn(
                        "w-5 h-5 transition-transform",
                        activeSection === key ? "rotate-90" : ""
                      )} />
                    </button>
                  ))}
                </div>

                {/* Sub-items Navigation */}
                <div className="border-t border-border pt-4 space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                    {currentSection.title}
                  </p>
                  {Object.entries(currentSection.items).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setActiveItem(key)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center space-x-3",
                        activeItem === key
                          ? "bg-secondary text-secondary-foreground"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <item.icon className={cn("w-4 h-4", activeItem === key ? "text-primary" : "text-muted-foreground")} />
                      <span className={cn("text-sm", activeItem === key ? "font-semibold" : "")}>{item.title}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8">
            <Card className="bg-gradient-card border-border min-h-[600px]">
              <CardContent className="p-8 md:p-12">
                {/* Content Header */}
                <div className="mb-8">
                  <Badge variant="outline" className="mb-4">
                    {currentItem.subtitle}
                  </Badge>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
                      <currentItem.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold">{currentItem.title}</h3>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>

                {/* Details List */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold mb-4">Key Features:</h4>
                  {currentItem.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-foreground leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>

                {/* Additional Info Card */}
                <div className="mt-8 p-6 rounded-xl bg-gradient-primary/5 border border-primary/20">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Professional Grade Solution
                      </p>
                      <p className="text-sm text-muted-foreground">
                        All features are designed with enterprise-level security, reliability, and scalability to support your professional growth.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformDetailsSection;

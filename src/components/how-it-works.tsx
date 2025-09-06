import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  HandHeart, 
  Coins, 
  CheckCircle, 
  ArrowRight,
  Shield
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Join & Get Verified",
      description: "Sign up with your LinkedIn profile and complete our skills verification process. We ensure every member is a qualified IT professional.",
      badge: "Verification",
      color: "text-primary"
    },
    {
      icon: HandHeart,
      title: "Help Others & Earn Points",
      description: "Use your spare time to help fellow professionals with real tasks. Every hour of help earns you points in our transparent system.",
      badge: "Earn",
      color: "text-accent"
    },
    {
      icon: Coins,
      title: "Spend Points When You Need Help",
      description: "When you need assistance, spend your earned points to get help from the community. Fair exchange, no corporate politics.",
      badge: "Spend",
      color: "text-warning"
    },
    {
      icon: CheckCircle,
      title: "Maintain Balance & Credibility", 
      description: "The system ensures fairness through mandatory payback and credibility tracking. Generosity becomes a valued part of professional life.",
      badge: "Balance",
      color: "text-success"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Transparent Process
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How <span className="bg-gradient-primary bg-clip-text text-transparent">HelpPro</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A simple, fair system that turns professional expertise into a reliable safety net. 
            No hierarchy, no recruiters, just skilled professionals helping each other.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full bg-gradient-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50 ${step.color} mb-6 mt-4`}>
                    <step.icon className="w-8 h-8" />
                  </div>

                  {/* Badge */}
                  <Badge variant="outline" className="mb-4">
                    {step.badge}
                  </Badge>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {/* Arrow connector (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
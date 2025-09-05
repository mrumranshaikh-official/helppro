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
  const workflowSteps = [
    {
      icon: UserPlus,
      title: "Professional Verification",
      description: "Join our community with LinkedIn verification and skills assessment. We maintain quality by ensuring every member is a qualified IT professional.",
      details: ["LinkedIn profile verification", "Skills assessment test", "Professional background check"],
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-500",
      step: "01"
    },
    {
      icon: HandHeart,
      title: "Help & Earn System",
      description: "Share your expertise during spare time to help fellow professionals. Our transparent point system rewards every contribution fairly.",
      details: ["Choose your availability", "Set your expertise areas", "Earn points for helping"],
      color: "bg-green-50 border-green-200",
      iconBg: "bg-green-500",
      step: "02"
    },
    {
      icon: Coins,
      title: "Request Professional Help",
      description: "When you need assistance, use your earned points to get quality help from the community. No corporate politics, just peer support.",
      details: ["Post your challenge", "Match with experts", "Use earned points"],
      color: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-500",
      step: "03"
    },
    {
      icon: CheckCircle,
      title: "Maintain Community Balance",
      description: "Our system ensures fairness through balanced giving and receiving. Build credibility while contributing to a supportive professional ecosystem.",
      details: ["Track contribution balance", "Build professional credibility", "Access premium features"],
      color: "bg-purple-50 border-purple-200", 
      iconBg: "bg-purple-500",
      step: "04"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-orange-600 border-orange-200 bg-orange-50">
            <Shield className="w-4 h-4 mr-2" />
            Simple & Transparent Process
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            How Does <span className="text-orange-500">HelpPro</span> Work?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A straightforward four-step process that transforms professional expertise into a reliable 
            support network, built on fairness and mutual growth.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workflowSteps.map((step, index) => (
            <Card key={index} className={`p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${step.color} relative overflow-hidden`}>
              {/* Step Number */}
              <div className="absolute top-6 right-6">
                <div className="text-3xl font-bold text-muted-foreground/20">
                  {step.step}
                </div>
              </div>
              
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-14 h-14 ${step.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                {step.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium text-foreground">{detail}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
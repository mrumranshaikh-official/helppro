import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Sparkles, 
  Clock, 
  Users, 
  CheckCircle,
  Loader2,
  Zap,
  Code,
  Database,
  Server,
  Smartphone,
  Shield
} from "lucide-react";

const InteractiveHelpForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    urgency: "",
    points: "25"
  });

  const categories = [
    { value: "frontend", label: "Frontend Development", icon: Code, color: "text-blue-500" },
    { value: "backend", label: "Backend Development", icon: Server, color: "text-green-500" },
    { value: "database", label: "Database & SQL", icon: Database, color: "text-purple-500" },
    { value: "mobile", label: "Mobile Development", icon: Smartphone, color: "text-pink-500" },
    { value: "devops", label: "DevOps & Cloud", icon: Shield, color: "text-orange-500" },
    { value: "other", label: "Other", icon: Sparkles, color: "text-gray-500" }
  ];

  const exampleRequests = [
    "Need debugging for Node.js API issue - memory leak in production",
    "React performance optimization - component re-rendering too frequently",
    "PostgreSQL query optimization - slow joins on large tables",
    "AWS Lambda cold start issues - need architecture review",
    "Docker container networking - services can't communicate",
    "iOS app crash on device rotation - Swift debugging needed"
  ];

  const urgencyLevels = [
    { value: "low", label: "Low Priority", points: "10", color: "text-green-500", description: "Within 24 hours" },
    { value: "medium", label: "Medium Priority", points: "25", color: "text-yellow-500", description: "Within 4 hours" },
    { value: "high", label: "High Priority", points: "40", color: "text-orange-500", description: "Within 1 hour" },
    { value: "urgent", label: "Urgent", points: "60", color: "text-red-500", description: "ASAP - Production issue" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
      setFormData({ title: "", description: "", category: "", urgency: "", points: "25" });
    }, 3000);
  };

  const fillExample = (example: string) => {
    const [title, ...descParts] = example.split(" - ");
    setFormData({
      ...formData,
      title: title,
      description: descParts.join(" - ")
    });
  };

  return (
    <section id="help-form" className="py-20 bg-gradient-to-br from-muted/30 to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Send className="w-4 h-4 mr-2" />
            Request Help
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Help from <span className="bg-gradient-hero bg-clip-text text-transparent">Real Professionals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Describe your challenge and get matched with experienced professionals who can help.
          </p>
        </div>

        {/* Interactive Form Card */}
        <Card className="bg-gradient-card border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Request Professional Help</CardTitle>
                      <p className="text-muted-foreground mt-1">Click to describe your challenge</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge className="mr-4">
                      <Users className="w-3 h-3 mr-1" />
                      47 helpers online
                    </Badge>
                    {isOpen ? (
                      <ChevronUp className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <CardContent className="pt-0">
                {isSubmitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="w-20 h-20 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-success" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-success">Request Submitted!</h3>
                    <p className="text-muted-foreground mb-6">
                      We're matching you with the best professionals for your needs.
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        Avg. response: 15 min
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-success" />
                        95% success rate
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Example Requests */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Quick Examples (click to use):</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exampleRequests.slice(0, 4).map((example, index) => (
                          <Button
                            key={index}
                            type="button"
                            variant="outline"
                            className="h-auto p-3 text-left text-xs hover:bg-primary/10 hover:border-primary/30 transition-all"
                            onClick={() => fillExample(example)}
                          >
                            <Sparkles className="w-3 h-3 mr-2 text-primary flex-shrink-0" />
                            <span className="truncate">{example}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">What do you need help with?</label>
                      <Input
                        placeholder="e.g., React performance optimization"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="text-base"
                        required
                      />
                    </div>

                    {/* Category and Urgency */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Category</label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                <div className="flex items-center">
                                  <category.icon className={`w-4 h-4 mr-2 ${category.color}`} />
                                  {category.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Urgency Level</label>
                        <Select 
                          value={formData.urgency} 
                          onValueChange={(value) => {
                            const level = urgencyLevels.find(l => l.value === value);
                            setFormData({ 
                              ...formData, 
                              urgency: value, 
                              points: level?.points || "25" 
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            {urgencyLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                <div className="flex items-center justify-between w-full">
                                  <span className={level.color}>{level.label}</span>
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {level.points} pts
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Detailed Description</label>
                      <Textarea
                        placeholder="Describe your issue in detail. Include error messages, what you've tried, and any relevant context..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>

                    {/* Cost Display */}
                    {formData.urgency && (
                      <Card className="bg-muted/30 border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Request Cost</h4>
                              <p className="text-sm text-muted-foreground">
                                {urgencyLevels.find(l => l.value === formData.urgency)?.description}
                              </p>
                            </div>
                            <Badge className="bg-primary text-primary-foreground text-lg px-3 py-1">
                              {formData.points} points
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 text-lg py-6 hover-scale group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Finding helpers...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                          Submit Help Request
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </section>
  );
};

export default InteractiveHelpForm;
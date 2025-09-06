import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import LiveActivitySection from "@/components/live-activity-section";
import AdvancedFeaturesSection from "@/components/advanced-features-section";
import HowItWorks from "@/components/how-it-works";
import GamificationSection from "@/components/gamification-section";
import HelpSystemSection from "@/components/help-system-section";
import ValidationSection from "@/components/validation-section";
import AboutSection from "@/components/about-section";

const SectionsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sections = [
    {
      id: "live-activity",
      title: "Live Community",
      description: "See real-time professional support in action",
      component: <LiveActivitySection />,
      category: "Community"
    },
    {
      id: "features",
      title: "Core Features", 
      description: "Powerful tools for professional collaboration",
      component: <AdvancedFeaturesSection />,
      category: "Features"
    },
    {
      id: "how-it-works",
      title: "How It Works",
      description: "Simple steps to get professional help",
      component: <HowItWorks />,
      category: "Process"
    },
    {
      id: "gamification",
      title: "Rewards System",
      description: "Earn recognition for helping others",
      component: <GamificationSection />,
      category: "Engagement"
    },
    {
      id: "help-system",
      title: "Smart Matching",
      description: "AI-powered expert recommendation system",
      component: <HelpSystemSection />,
      category: "Technology"
    },
    {
      id: "validation",
      title: "Why Choose Us",
      description: "See what makes HelpPro different",
      component: <ValidationSection />,
      category: "Validation"
    },
    {
      id: "about",
      title: "Our Mission",
      description: "Building the future of professional support",
      component: <AboutSection />,
      category: "About"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sections.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSection = sections[currentSlide];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {currentSection.category}
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {currentSection.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentSection.description}
          </p>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 h-2 bg-primary rounded-full"
                  : "w-2 h-2 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Main Carousel Content */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent"
            onClick={nextSlide}
            disabled={currentSlide === sections.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Slide Content */}
          <Card className="min-h-[600px] border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="animate-fade-in">
                {currentSection.component}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={prevSlide} disabled={currentSlide === 0}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground">
              {currentSlide + 1} of {sections.length}
            </span>
          </div>
          
          <Button variant="outline" onClick={nextSlide} disabled={currentSlide === sections.length - 1}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Section Preview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mt-12">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => goToSlide(index)}
              className={`p-3 rounded-lg text-center transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-muted/30 hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              <div className="text-xs font-medium">{section.title}</div>
              <Circle className={`h-2 w-2 mx-auto mt-1 ${
                index === currentSlide ? "fill-current" : ""
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionsCarousel;
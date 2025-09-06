import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import LiveActivitySection from "@/components/live-activity-section";
import AdvancedFeaturesSection from "@/components/advanced-features-section";
import HowItWorks from "@/components/how-it-works";
import GamificationSection from "@/components/gamification-section";
import HelpSystemSection from "@/components/help-system-section";
import ValidationSection from "@/components/validation-section";
import AboutSection from "@/components/about-section";

const SectionsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const sections = [
    {
      id: "live-activity",
      title: "Live Community",
      description: "See real-time professional support in action",
      component: <LiveActivitySection />,
    },
    {
      id: "features", 
      title: "Core Features",
      description: "Powerful tools for professional collaboration",
      component: <AdvancedFeaturesSection />,
    },
    {
      id: "how-it-works",
      title: "How It Works", 
      description: "Simple steps to get professional help",
      component: <HowItWorks />,
    },
    {
      id: "gamification",
      title: "Rewards System",
      description: "Earn recognition for helping others", 
      component: <GamificationSection />,
    },
    {
      id: "help-system",
      title: "Smart Matching",
      description: "AI-powered expert recommendation system",
      component: <HelpSystemSection />,
    },
    {
      id: "validation",
      title: "Why Choose Us",
      description: "See what makes HelpPro different",
      component: <ValidationSection />,
    },
    {
      id: "about",
      title: "Our Mission", 
      description: "Building the future of professional support",
      component: <AboutSection />,
    }
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="py-16 bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Explore Our Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover all the features and benefits HelpPro offers
          </p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <span className="text-sm text-muted-foreground">
              {current} of {count}
            </span>
            <div className="flex gap-2">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`transition-all duration-300 ${
                    index === current - 1
                      ? "w-8 h-2 bg-primary rounded-full"
                      : "w-2 h-2 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Professional Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <Carousel 
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {sections.map((section, index) => (
                <CarouselItem key={section.id} className="pl-4">
                  <div className="relative">
                    <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden shadow-lg">
                      {section.component}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation Buttons */}
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm border-border/50 hover:bg-accent shadow-lg" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm border-border/50 hover:bg-accent shadow-lg" />
          </Carousel>
        </div>

        {/* Quick Navigation */}
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {sections.map((section, index) => (
            <Button
              key={section.id}
              variant={index === current - 1 ? "default" : "outline"}
              size="sm"
              onClick={() => api?.scrollTo(index)}
              className="text-xs"
            >
              {section.title}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionsCarousel;
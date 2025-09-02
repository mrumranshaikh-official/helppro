import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatSimulation = () => {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const messages = [
    {
      id: 1,
      sender: "Sarah Chen",
      avatar: "SC",
      message: "I need assistance with setting up an API endpoint",
      time: "2:14 PM",
      isSeeker: true
    },
    {
      id: 2,
      sender: "Mike Rodriguez",
      avatar: "MR", 
      message: "Sure, I can guide you through it. Let's get started 🚀",
      time: "2:15 PM",
      isSeeker: false
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleMessages < messages.length) {
        if (visibleMessages === 0) {
          // Show first message immediately
          setVisibleMessages(1);
        } else {
          // Show typing indicator before second message
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setVisibleMessages(2);
          }, 1500);
        }
      } else {
        // Restart animation after a pause
        setTimeout(() => {
          setVisibleMessages(0);
        }, 3000);
      }
    }, visibleMessages === 0 ? 1000 : 2500);

    return () => clearTimeout(timer);
  }, [visibleMessages, messages.length]);

  return (
    <div className="max-w-md mx-auto bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-primary/5 border-b border-border px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-sm">Professional Help Network</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="p-4 space-y-4 min-h-[200px]">
        {messages.slice(0, visibleMessages).map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.isSeeker ? 'justify-end' : 'justify-start'} animate-fade-in`}
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <div className={`flex items-end space-x-2 max-w-[80%] ${message.isSeeker ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Avatar className="w-8 h-8">
                <AvatarFallback className={`text-xs font-semibold ${
                  message.isSeeker 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-accent text-accent-foreground'
                }`}>
                  {message.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className={`rounded-2xl px-4 py-2 ${
                  message.isSeeker
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-muted text-muted-foreground rounded-bl-sm'
                }`}>
                  <p className="text-sm">{message.message}</p>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground/60 mr-2">
                    {message.sender}
                  </span>
                  <span className="text-xs text-muted-foreground/60">
                    {message.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex items-end space-x-2 max-w-[80%]">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs font-semibold bg-accent text-accent-foreground">
                  MR
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="rounded-2xl px-4 py-2 bg-muted rounded-bl-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground/60 mr-2">
                    Mike Rodriguez
                  </span>
                  <span className="text-xs text-muted-foreground/60">typing...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSimulation;
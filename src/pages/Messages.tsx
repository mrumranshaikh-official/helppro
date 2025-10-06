import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  ArrowLeft,
  Archive,
  CheckCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/navbar";

interface HelpRequest {
  id: string;
  title: string;
  status: string;
  requester_id: string;
  helper_id: string | null;
  profiles?: {
    full_name: string;
    avatar_url: string | null;
  };
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  file_url: string | null;
  file_type: string | null;
}

const Messages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversations, setConversations] = useState<HelpRequest[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<HelpRequest | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      subscribeToMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('help_requests')
        .select(`
          id,
          title,
          status,
          requester_id,
          helper_id
        `)
        .or(`requester_id.eq.${user?.id},helper_id.eq.${user?.id}`)
        .in('status', ['in_progress', 'completed'])
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Fetch profiles separately
      const conversationsWithProfiles = await Promise.all(
        (data || []).map(async (conv) => {
          const otherUserId = conv.requester_id === user?.id ? conv.helper_id : conv.requester_id;
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', otherUserId)
            .single();
          
          return {
            ...conv,
            profiles: profile || { full_name: 'Unknown User', avatar_url: null }
          };
        })
      );

      setConversations(conversationsWithProfiles);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    }
  };

  const fetchMessages = async (helpRequestId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('help_request_id', helpRequestId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const subscribeToMessages = (helpRequestId: string) => {
    const channel = supabase
      .channel(`messages:${helpRequestId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `help_request_id=eq.${helpRequestId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          help_request_id: selectedConversation.id,
          sender_id: user.id,
          content: newMessage.trim(),
        });

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async () => {
    if (!selectedConversation) return;

    try {
      const { error } = await supabase
        .from('help_requests')
        .update({ status: 'completed' })
        .eq('id', selectedConversation.id);

      if (error) throw error;

      toast({
        title: "Conversation Archived",
        description: "This conversation has been archived.",
      });

      setSelectedConversation(null);
      fetchConversations();
    } catch (error) {
      console.error('Error archiving conversation:', error);
      toast({
        title: "Error",
        description: "Failed to archive conversation",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-180px)]">
          {/* Conversations List */}
          <Card className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Messages</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-260px)]">
              {conversations.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No conversations yet</p>
                  <Button
                    onClick={() => navigate('/community')}
                    className="mt-4"
                    variant="outline"
                  >
                    Find Help
                  </Button>
                </div>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 cursor-pointer hover:bg-accent/50 transition-colors border-b ${
                      selectedConversation?.id === conv.id ? 'bg-accent' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={conv.profiles?.avatar_url || undefined} />
                        <AvatarFallback>
                          {conv.profiles?.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{conv.title}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {conv.profiles?.full_name || 'User'}
                        </p>
                      </div>
                      <Badge variant={conv.status === 'completed' ? 'secondary' : 'default'}>
                        {conv.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </Card>

          {/* Chat Area */}
          <Card className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <Avatar>
                      <AvatarImage src={selectedConversation.profiles?.avatar_url || undefined} />
                      <AvatarFallback>
                        {selectedConversation.profiles?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{selectedConversation.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.profiles?.full_name || 'User'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" disabled>
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" disabled>
                      <Video className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleArchive}>
                      <Archive className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => {
                      const isOwn = msg.sender_id === user?.id;
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isOwn
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <p className="text-xs opacity-70">
                                {new Date(msg.created_at).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                              {isOwn && (
                                <CheckCheck className="w-3 h-3 opacity-70" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                {selectedConversation.status !== 'completed' ? (
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" disabled>
                        <Paperclip className="w-5 h-5" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        disabled={loading}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!newMessage.trim() || loading}
                        size="icon"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-t text-center text-muted-foreground">
                    <Archive className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>This conversation has been archived</p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Send className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Messages;

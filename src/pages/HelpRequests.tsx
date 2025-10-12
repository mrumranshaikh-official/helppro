import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  CircleHelp,
  Coins,
  Clock,
  User as UserIcon,
  Plus,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import type { Database } from "@/integrations/supabase/types";
import CreateRequestDialog from "@/components/create-request-dialog";

type HelpRequest = Database["public"]["Tables"]["help_requests"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface HelpRequestWithProfile extends HelpRequest {
  requester: Profile;
}

const CATEGORIES = ["All", "Frontend", "Backend", "DevOps", "Web", "Mobile", "System Admin"];
const URGENCY_LEVELS = ["All", "Low", "Medium", "High", "Urgent"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "reward", label: "Highest Reward" },
  { value: "urgent", label: "Most Urgent" }
];

const URGENCY_COLORS = {
  urgent: "bg-red-500 text-white",
  high: "bg-orange-500 text-white",
  medium: "bg-yellow-500 text-white",
  low: "bg-green-500 text-white"
};

const HelpRequests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<HelpRequestWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [urgencyFilter, setUrgencyFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedRequest, setSelectedRequest] = useState<HelpRequestWithProfile | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    fetchHelpRequests();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('help_requests_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'help_requests' },
        () => {
          fetchHelpRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchHelpRequests = async () => {
    try {
      const { data: helpRequests, error } = await supabase
        .from('help_requests')
        .select(`
          *,
          requester:profiles!help_requests_requester_id_fkey(*)
        `)
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRequests(helpRequests as HelpRequestWithProfile[]);
    } catch (error) {
      console.error('Error fetching help requests:', error);
      toast.error('Failed to load help requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (request: HelpRequestWithProfile) => {
    if (!user) {
      toast.error('Please sign in to accept requests');
      navigate('/auth');
      return;
    }

    if (request.requester_id === user.id) {
      toast.error('You cannot accept your own request');
      return;
    }

    try {
      // Update help request
      const { error: updateError } = await supabase
        .from('help_requests')
        .update({
          helper_id: user.id,
          status: 'in_progress',
          accepted_at: new Date().toISOString()
        })
        .eq('id', request.id);

      if (updateError) throw updateError;

      // Create initial message
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      await supabase.from('messages').insert({
        help_request_id: request.id,
        sender_id: user.id,
        content: `${profile?.full_name || 'A helper'} has accepted your request!`
      });

      toast.success('Request accepted! Start chatting in Messages');
      setIsDetailsOpen(false);
      navigate('/messages');
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error('Failed to accept request');
    }
  };

  // Filter and sort requests
  const filteredRequests = requests
    .filter(req => {
      // Search filter
      const searchMatch =
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const categoryMatch = categoryFilter === "All" || req.category === categoryFilter;

      // Urgency filter
      const urgencyMatch = urgencyFilter === "All" || req.urgency === urgencyFilter.toLowerCase();

      return searchMatch && categoryMatch && urgencyMatch;
    })
    .sort((a, b) => {
      if (sortBy === "reward") {
        return (b.coin_reward || 0) - (a.coin_reward || 0);
      } else if (sortBy === "urgent") {
        const urgencyOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      }
      // newest (default)
      return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime();
    });

  const viewRequestDetails = (request: HelpRequestWithProfile) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Browse <span className="bg-gradient-warm bg-clip-text text-transparent">Help Requests</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {filteredRequests.length} active {filteredRequests.length === 1 ? 'request' : 'requests'} available
            </p>
          </div>
          {user && (
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gradient-warm hover:shadow-lg transition-all text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Request
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Urgency Filter */}
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  {URGENCY_LEVELS.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Options */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              {SORT_OPTIONS.map(option => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requests Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-48 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredRequests.length === 0 ? (
          <Card className="bg-card">
            <CardContent className="p-12 text-center">
              <CircleHelp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">
                {requests.length === 0 ? 'No help requests yet' : 'No requests match your filters'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {requests.length === 0 ? 'Be the first to post a help request!' : 'Try adjusting your search criteria'}
              </p>
              {user && requests.length === 0 && (
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-gradient-warm hover:shadow-lg transition-all text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create First Request
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request) => (
              <Card
                key={request.id}
                className="bg-card hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
                onClick={() => viewRequestDetails(request)}
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg line-clamp-2 flex-1">
                      {request.title}
                    </h3>
                    {request.coin_reward && request.coin_reward > 0 && (
                      <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full ml-2">
                        <Coins className="w-4 h-4 text-primary" />
                        <span className="font-bold text-primary">{request.coin_reward}</span>
                      </div>
                    )}
                  </div>

                  {/* Requester Info */}
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={request.requester?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {request.requester?.full_name?.split(' ').map(n => n[0]).join('') || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <span>{request.requester?.full_name || 'Anonymous'}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{formatDistanceToNow(new Date(request.created_at!), { addSuffix: true })}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {request.category && (
                      <Badge variant="outline" className="text-xs">
                        {request.category}
                      </Badge>
                    )}
                    <Badge className={`text-xs ${URGENCY_COLORS[request.urgency]}`}>
                      {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                    </Badge>
                  </div>

                  {/* Description Preview */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {request.description}
                  </p>

                  {/* Tech Stack */}
                  {request.tech_stack && request.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {request.tech_stack.slice(0, 3).map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {request.tech_stack.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{request.tech_stack.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    className="w-full bg-gradient-warm hover:shadow-lg transition-all text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!user) {
                        toast.error('Please sign in to accept requests');
                        navigate('/auth');
                      } else {
                        viewRequestDetails(request);
                      }
                    }}
                  >
                    Accept & Help
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Request Dialog */}
      <CreateRequestDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchHelpRequests}
      />

      {/* Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedRequest.title}
              </DialogTitle>
            </DialogHeader>

            {/* Requester Profile */}
            <Card className="bg-muted/50 border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedRequest.requester?.avatar_url || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedRequest.requester?.full_name?.split(' ').map(n => n[0]).join('') || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-bold">{selectedRequest.requester?.full_name || 'Anonymous'}</p>
                    {selectedRequest.requester?.headline && (
                      <p className="text-sm text-muted-foreground">{selectedRequest.requester.headline}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Points</p>
                    <p className="font-bold">{selectedRequest.requester?.points || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Posted</p>
                <p className="font-medium">
                  {formatDistanceToNow(new Date(selectedRequest.created_at!), { addSuffix: true })}
                </p>
              </div>

              <div className="flex gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <Badge variant="outline">{selectedRequest.category || 'Uncategorized'}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Urgency</p>
                  <Badge className={URGENCY_COLORS[selectedRequest.urgency]}>
                    {selectedRequest.urgency.charAt(0).toUpperCase() + selectedRequest.urgency.slice(1)}
                  </Badge>
                </div>
                {selectedRequest.coin_reward && selectedRequest.coin_reward > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Reward</p>
                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded">
                      <Coins className="w-4 h-4 text-primary" />
                      <span className="font-bold text-primary">{selectedRequest.coin_reward}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="whitespace-pre-wrap">{selectedRequest.description}</p>
              </div>

              {selectedRequest.tech_stack && selectedRequest.tech_stack.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequest.tech_stack.map((tech, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 space-y-2">
                <Button
                  className="w-full bg-gradient-warm hover:shadow-lg transition-all text-white"
                  size="lg"
                  onClick={() => handleAcceptRequest(selectedRequest)}
                  disabled={!user || selectedRequest.requester_id === user?.id}
                >
                  {!user ? 'Sign in to Accept' : selectedRequest.requester_id === user?.id ? 'Cannot Accept Own Request' : 'Accept & Help'}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate(`/profile/${selectedRequest.requester_id}`)}
                >
                  <UserIcon className="w-4 h-4 mr-2" />
                  View Requester Profile
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default HelpRequests;

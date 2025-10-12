import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Coins, X, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CreateRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const CATEGORIES = ["Frontend", "Backend", "DevOps", "Web", "Mobile", "System Admin"];
const COIN_OPTIONS = [0, 25, 50, 100, 200, 500];

const URGENCY_OPTIONS = [
  { value: "low", label: "Low", description: "Can wait a few days" },
  { value: "medium", label: "Medium", description: "Need help within 24 hours" },
  { value: "high", label: "High", description: "Need help today" },
  { value: "urgent", label: "Urgent", description: "Need help now!" }
];

const CreateRequestDialog = ({ open, onOpenChange, onSuccess }: CreateRequestDialogProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [userBalance, setUserBalance] = useState(0);

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("medium");
  const [description, setDescription] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [coinReward, setCoinReward] = useState(0);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (open && user) {
      fetchUserBalance();
    }
  }, [open, user]);

  const fetchUserBalance = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_coins')
        .select('balance')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setUserBalance(data?.balance || 0);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && techStackInput.trim()) {
      e.preventDefault();
      if (!techStack.includes(techStackInput.trim())) {
        setTechStack([...techStack, techStackInput.trim()]);
      }
      setTechStackInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (title.trim().length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }
    if (title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }
    if (!category) {
      newErrors.category = "Please select a category";
    }
    if (description.trim().length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    }
    if (description.trim().length > 1000) {
      newErrors.description = "Description must be less than 1000 characters";
    }
    if (coinReward > userBalance) {
      newErrors.coinReward = "Insufficient balance";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please sign in to create a request');
      navigate('/auth');
      return;
    }

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setSubmitting(true);

    try {
      // Insert help request
      const { data: newRequest, error: requestError } = await supabase
        .from('help_requests')
        .insert({
          requester_id: user.id,
          title: title.trim(),
          category,
          urgency,
          description: description.trim(),
          tech_stack: techStack.length > 0 ? techStack : null,
          coin_reward: coinReward || null,
          status: 'open'
        })
        .select()
        .single();

      if (requestError) throw requestError;

      // If coin reward is set, deduct from balance and create transaction
      if (coinReward > 0) {
        // Update user balance
        const { error: balanceError } = await supabase
          .from('user_coins')
          .update({
            balance: userBalance - coinReward,
            total_spent: supabase.rpc('increment', { x: coinReward })
          })
          .eq('user_id', user.id);

        if (balanceError) throw balanceError;

        // Create transaction record
        const { error: transactionError } = await supabase
          .from('coin_transactions')
          .insert({
            user_id: user.id,
            amount: -coinReward,
            transaction_type: 'help_request_posted',
            description: `Posted help request: ${title.trim()}`,
            help_request_id: newRequest.id
          });

        if (transactionError) throw transactionError;
      }

      toast.success('Help request posted! Waiting for helpers...');

      // Reset form
      setTitle("");
      setCategory("");
      setUrgency("medium");
      setDescription("");
      setTechStack([]);
      setTechStackInput("");
      setCoinReward(0);
      setErrors({});

      onOpenChange(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating help request:', error);
      toast.error('Failed to create help request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Help Request</DialogTitle>
          <DialogDescription>
            Post a help request to get assistance from the community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="What do you need help with?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              className={errors.title ? "border-destructive" : ""}
            />
            <div className="flex justify-between items-start">
              {errors.title && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.title}
                </p>
              )}
              <p className="text-xs text-muted-foreground ml-auto">
                {title.length}/100
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-destructive">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.category}
              </p>
            )}
          </div>

          {/* Urgency */}
          <div className="space-y-2">
            <Label>
              Urgency <span className="text-destructive">*</span>
            </Label>
            <RadioGroup value={urgency} onValueChange={setUrgency} className="space-y-2">
              {URGENCY_OPTIONS.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="font-normal cursor-pointer flex-1">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-muted-foreground text-sm ml-2">- {option.description}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Explain your problem in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              rows={6}
              className={errors.description ? "border-destructive" : ""}
            />
            <div className="flex justify-between items-start">
              {errors.description && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-muted-foreground ml-auto">
                {description.length}/1000
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <Label htmlFor="tech-stack">Tech Stack (Optional)</Label>
            <Input
              id="tech-stack"
              placeholder="e.g., React, Node.js, PostgreSQL (press Enter to add)"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              onKeyDown={handleAddTech}
            />
            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {techStack.map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="gap-1">
                    {tech}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => handleRemoveTech(tech)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Coin Reward */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Coin Reward (Optional)</Label>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Coins className="w-4 h-4" />
                <span>Balance: {userBalance}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {COIN_OPTIONS.map(amount => (
                <Button
                  key={amount}
                  type="button"
                  variant={coinReward === amount ? "default" : "outline"}
                  onClick={() => setCoinReward(amount)}
                  disabled={amount > userBalance}
                  className="h-12"
                >
                  {amount === 0 ? "Free" : amount}
                </Button>
              ))}
            </div>
            {errors.coinReward && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.coinReward}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-primary underline"
                  onClick={() => {
                    onOpenChange(false);
                    navigate('/coins');
                  }}
                >
                  Buy Coins
                </Button>
              </p>
            )}
            {coinReward === 0 && (
              <p className="text-xs text-muted-foreground">
                Tip: Offering coins increases your chances of getting help faster
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-warm hover:shadow-lg transition-all text-white"
              disabled={submitting}
            >
              {submitting ? 'Posting...' : 'Post Help Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRequestDialog;

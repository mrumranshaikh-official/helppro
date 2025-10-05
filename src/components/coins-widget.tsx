import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Plus, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CoinsWidget = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBalance();
    }
  }, [user]);

  const fetchBalance = async () => {
    try {
      const { data, error } = await supabase
        .from('user_coins')
        .select('balance')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setBalance(data?.balance || 0);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyCoins = () => {
    toast({
      title: "Coming Soon",
      description: "Coin purchase feature will be available soon!",
    });
  };

  if (!user) return null;

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">HelpPro Coins</p>
              {loading ? (
                <div className="h-8 w-20 bg-muted animate-pulse rounded" />
              ) : (
                <p className="text-3xl font-black text-primary">{balance}</p>
              )}
            </div>
          </div>
          <Button
            onClick={handleBuyCoins}
            size="sm"
            className="bg-gradient-warm hover:shadow-lg transition-all text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Buy Coins
          </Button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>Use coins to post urgent help requests</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinsWidget;
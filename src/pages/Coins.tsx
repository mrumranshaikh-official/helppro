import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, TrendingUp, History, Gift } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import BuyCoinsDialog from "@/components/buy-coins-dialog";

const CoinsPage = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Please Sign In</h1>
            <p className="text-muted-foreground">You need to be signed in to view your HT Coins balance.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BuyCoinsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onPurchaseComplete={fetchBalance}
      />
      
      <div className="pt-32 px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-warm bg-clip-text text-transparent">
              Your HT Coins
            </h1>
            <p className="text-muted-foreground text-lg">
              Use HT Coins to post urgent help requests and unlock premium features
            </p>
          </div>

          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Coins className="w-8 h-8 text-primary" />
                </div>
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading ? (
                <div className="h-20 w-40 bg-muted animate-pulse rounded" />
              ) : (
                <p className="text-6xl font-black text-primary">{balance}</p>
              )}
              <Button
                onClick={() => setDialogOpen(true)}
                size="lg"
                className="bg-gradient-warm hover:shadow-lg transition-all text-white w-full sm:w-auto"
              >
                <Coins className="w-5 h-5 mr-2" />
                Buy More Coins
              </Button>
            </CardContent>
          </Card>

          {/* Info Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  How to Earn Coins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Help Others</p>
                    <p className="text-sm text-muted-foreground">Earn coins by completing help requests</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Daily Rewards</p>
                    <p className="text-sm text-muted-foreground">Get bonus coins for daily login streaks</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <History className="w-5 h-5 text-primary" />
                  How to Use Coins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Urgent Requests</p>
                    <p className="text-sm text-muted-foreground">Post high-priority help requests</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Coins className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Premium Features</p>
                    <p className="text-sm text-muted-foreground">Access exclusive platform features</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinsPage;

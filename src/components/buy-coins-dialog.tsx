import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coins, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface BuyCoinsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchaseComplete: () => void;
}

const coinPackages = [
  { id: 1, amount: 100, price: 4.99, popular: false },
  { id: 2, amount: 250, price: 9.99, popular: true, bonus: 25 },
  { id: 3, amount: 500, price: 19.99, popular: false, bonus: 100 },
  { id: 4, amount: 1000, price: 34.99, popular: false, bonus: 250 },
];

const BuyCoinsDialog = ({ open, onOpenChange, onPurchaseComplete }: BuyCoinsDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const handlePurchase = async (pkg: typeof coinPackages[0]) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const totalCoins = pkg.amount + (pkg.bonus || 0);
      
      // Get current balance
      const { data: currentData } = await supabase
        .from('user_coins')
        .select('balance, total_earned')
        .eq('user_id', user.id)
        .single();

      // Update balance
      const { error: updateError } = await supabase
        .from('user_coins')
        .update({
          balance: (currentData?.balance || 0) + totalCoins,
          total_earned: (currentData?.total_earned || 0) + totalCoins,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('coin_transactions')
        .insert({
          user_id: user.id,
          amount: totalCoins,
          transaction_type: 'purchase',
          description: `Purchased ${pkg.amount} coins${pkg.bonus ? ` (+${pkg.bonus} bonus)` : ''}`,
        });

      if (transactionError) throw transactionError;

      toast({
        title: "Purchase Successful!",
        description: `You received ${totalCoins} HelpPro Coins`,
      });

      onPurchaseComplete();
      onOpenChange(false);
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Coins className="w-6 h-6 text-primary" />
            Buy HelpPro Coins
          </DialogTitle>
          <DialogDescription>
            Choose a coin package to unlock premium features and post urgent help requests
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {coinPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedPackage === pkg.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:ring-1 hover:ring-border'
              } ${pkg.popular ? 'border-primary' : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-primary px-3 py-1 rounded-full text-xs font-bold text-primary-foreground">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Coins className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-3xl font-black text-primary">{pkg.amount}</p>
                    {pkg.bonus && (
                      <p className="text-sm text-success font-semibold">+{pkg.bonus} Bonus!</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-2xl font-bold">${pkg.price}</p>
                  {pkg.bonus && (
                    <p className="text-xs text-muted-foreground">
                      Total: {pkg.amount + pkg.bonus} coins
                    </p>
                  )}
                </div>

                <Button
                  className="w-full"
                  variant={selectedPackage === pkg.id ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePurchase(pkg);
                  }}
                  disabled={loading}
                >
                  {selectedPackage === pkg.id && (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  {loading && selectedPackage === pkg.id ? 'Processing...' : 'Purchase'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">What can you do with coins?</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Post urgent help requests to get faster responses</li>
            <li>• Reward helpers with coins for exceptional assistance</li>
            <li>• Unlock premium features and priority support</li>
            <li>• Build your reputation in the community</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyCoinsDialog;

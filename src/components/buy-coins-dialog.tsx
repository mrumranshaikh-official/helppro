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
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase coins.",
        variant: "destructive",
      });
      return;
    }

    setSelectedPackage(pkg.id);
    setLoading(true);

    try {
      const totalCoins = pkg.amount + (pkg.bonus || 0);
      
      // Call secure RPC function to purchase coins
      const { data, error } = await supabase.rpc('purchase_coins', {
        p_amount: totalCoins,
        p_price: pkg.price,
        p_payment_reference: `DEMO-${Date.now()}` // In production, use real payment processor reference
      });

      if (error) throw error;
      
      const result = data as { success?: boolean; error?: string; new_balance?: number };
      
      if (result.error) {
        throw new Error(result.error);
      }

      toast({
        title: "Purchase Successful!",
        description: `You received ${totalCoins} HelpPro Coins. New balance: ${result.new_balance}`,
      });

      onPurchaseComplete();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: error.message || "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setSelectedPackage(null);
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

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MapPin, Trophy, CheckCircle } from "lucide-react";
import { useMatchHelpers, MatchedHelper } from "@/hooks/useMatchHelpers";

interface MatchedHelpersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  helpRequestId: string;
  onSelectHelper?: (helper: MatchedHelper) => void;
}

export const MatchedHelpersDialog = ({
  open,
  onOpenChange,
  helpRequestId,
  onSelectHelper
}: MatchedHelpersDialogProps) => {
  const { matches, isLoading, findMatches } = useMatchHelpers();

  useEffect(() => {
    if (open && helpRequestId) {
      findMatches(helpRequestId);
    }
  }, [open, helpRequestId]);

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-blue-600 dark:text-blue-400";
    if (score >= 40) return "text-yellow-600 dark:text-yellow-400";
    return "text-orange-600 dark:text-orange-400";
  };

  const getMatchScoreBadge = (score: number) => {
    if (score >= 80) return { text: "Excellent Match", variant: "default" as const };
    if (score >= 60) return { text: "Good Match", variant: "secondary" as const };
    if (score >= 40) return { text: "Fair Match", variant: "outline" as const };
    return { text: "Possible Match", variant: "outline" as const };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Matched Helpers</DialogTitle>
          <DialogDescription>
            Found {matches.length} professionals with matching skills for your request
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No matching helpers found. Try adding more skills to your request.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((helper) => {
              const scoreBadge = getMatchScoreBadge(helper.match_score);
              
              return (
                <Card key={helper.user_id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <Avatar className="w-16 h-16 flex-shrink-0">
                        <AvatarImage src={helper.avatar_url || undefined} alt={helper.full_name} />
                        <AvatarFallback className="bg-gradient-primary text-white text-lg">
                          {helper.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{helper.full_name}</h3>
                            {helper.headline && (
                              <p className="text-sm text-muted-foreground">{helper.headline}</p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <div className={`text-2xl font-bold ${getMatchScoreColor(helper.match_score)}`}>
                              {helper.match_score}%
                            </div>
                            <Badge variant={scoreBadge.variant} className="text-xs whitespace-nowrap">
                              {scoreBadge.text}
                            </Badge>
                          </div>
                        </div>

                        {/* Location & Points */}
                        <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-muted-foreground">
                          {helper.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{helper.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">{helper.points} points</span>
                          </div>
                        </div>

                        {/* Matched Skills */}
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Matching Skills:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {helper.matched_skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                                {helper.proficiency_levels[index] && (
                                  <span className="ml-1 text-muted-foreground">
                                    ({helper.proficiency_levels[index]})
                                  </span>
                                )}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        {onSelectHelper && (
                          <Button
                            onClick={() => onSelectHelper(helper)}
                            className="w-full sm:w-auto"
                          >
                            Request Help
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp } from "lucide-react";
import type { PlayerRecommendation } from "@shared/schema";

interface RecommendationCardProps {
  recommendation: PlayerRecommendation;
  onAddPlayer?: (recommendation: PlayerRecommendation) => void;
}

export function RecommendationCard({ recommendation, onAddPlayer }: RecommendationCardProps) {
  const { player, reason, valueScore } = recommendation;

  return (
    <Card className="p-4 hover:bg-muted/30 transition-colors" data-testid={`card-recommendation-${player.id}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-sm font-semibold">
              {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-foreground" data-testid={`text-recommendation-name-${player.id}`}>
              {player.name}
            </h4>
            <span className="text-sm text-muted-foreground" data-testid={`text-recommendation-position-${player.id}`}>
              {player.position} - {player.team}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-primary" data-testid={`text-recommendation-price-${player.id}`}>
            €{player.price}
          </span>
          <div className="flex items-center text-xs text-chart-2 font-medium">
            <TrendingUp className="w-3 h-3 mr-1" />
            {Math.round(valueScore * 100)}% valore
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mb-3" data-testid={`text-recommendation-reason-${player.id}`}>
        {reason}
      </div>
      
      {onAddPlayer && (
        <Button 
          className="w-full" 
          onClick={() => onAddPlayer(recommendation)}
          data-testid={`button-add-recommendation-${player.id}`}
        >
          Aggiungi alla Rosa
        </Button>
      )}
    </Card>
  );
}

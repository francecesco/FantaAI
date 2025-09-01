import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Player } from "@shared/schema";

interface PlayerCardProps {
  player: Player;
  onAction?: (player: Player) => void;
  actionLabel?: string;
  actionVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  showStats?: boolean;
  purchasePrice?: number;
}

export function PlayerCard({ 
  player, 
  onAction, 
  actionLabel = "Acquista",
  actionVariant = "default",
  showStats = false,
  purchasePrice
}: PlayerCardProps) {
  const getPositionColor = (position: string) => {
    switch (position) {
      case "P": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "D": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "C": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "A": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow" data-testid={`card-player-${player.id}`}>
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="text-sm font-semibold">
            {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h5 className="font-medium text-foreground" data-testid={`text-player-name-${player.id}`}>
              {player.name}
            </h5>
            <span className="text-sm font-bold text-primary" data-testid={`text-player-price-${player.id}`}>
              {purchasePrice || player.price}FM
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
            <div className="flex items-center space-x-2">
              <span 
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPositionColor(player.position)}`}
                data-testid={`text-player-position-${player.id}`}
              >
                {player.position}
              </span>
              <span data-testid={`text-player-team-${player.id}`}>{player.team}</span>
            </div>
            <span data-testid={`text-player-rating-${player.id}`}>⭐ {player.rating}</span>
          </div>

          {showStats && (
            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
              <span data-testid={`text-player-goals-${player.id}`}>🥅 {player.goals}</span>
              <span data-testid={`text-player-assists-${player.id}`}>🎯 {player.assists}</span>
              <span data-testid={`text-player-matches-${player.id}`}>⚽ {player.matchesPlayed}</span>
            </div>
          )}
        </div>
      </div>

      {onAction && (
        <Button 
          className="w-full mt-3" 
          variant={actionVariant}
          onClick={() => onAction(player)}
          data-testid={`button-${actionLabel.toLowerCase()}-${player.id}`}
        >
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}

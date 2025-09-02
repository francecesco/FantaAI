import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, EyeOff } from "lucide-react";

interface FormationPlayer {
  position: string;
  name: string;
  number: number;
}

interface Formation {
  formation: string;
  players: FormationPlayer[];
}

interface Formations {
  home: Formation;
  away: Formation;
}

interface FormationViewerProps {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
}

export function FormationViewer({ matchId, homeTeam, awayTeam }: FormationViewerProps) {
  const [showFormations, setShowFormations] = useState(false);

  const { data: formations, isLoading } = useQuery<Formations>({
    queryKey: [`/api/matches/${matchId}/formations`],
    enabled: showFormations,
  });

  const getPositionColor = (position: string) => {
    switch (position) {
      case "GK":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "DEF":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "MID":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "ATT":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getPositionLabel = (position: string) => {
    switch (position) {
      case "GK":
        return "P";
      case "DEF":
        return "D";
      case "MID":
        return "C";
      case "ATT":
        return "A";
      default:
        return position;
    }
  };

  if (!showFormations) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowFormations(true)}
        className="mt-2"
      >
        <Eye className="h-4 w-4 mr-2" />
        Mostra Formazioni
      </Button>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-4 p-4 border rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!formations) {
    return (
      <div className="mt-4 p-4 border rounded-lg text-center text-muted-foreground">
        Formazioni non disponibili
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Formazioni</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFormations(false)}
        >
          <EyeOff className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Home Team Formation */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" />
              {homeTeam}
              <Badge variant="outline" className="ml-auto">
                {formations.home.formation}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2">
              {formations.home.players.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded border"
                >
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getPositionColor(player.position)}`}
                  >
                    {getPositionLabel(player.position)}
                  </Badge>
                  <span className="text-xs font-medium">{player.number}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {player.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Away Team Formation */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" />
              {awayTeam}
              <Badge variant="outline" className="ml-auto">
                {formations.away.formation}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2">
              {formations.away.players.map((player, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 rounded border"
                >
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getPositionColor(player.position)}`}
                  >
                    {getPositionLabel(player.position)}
                  </Badge>
                  <span className="text-xs font-medium">{player.number}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {player.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

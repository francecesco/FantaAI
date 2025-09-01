import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Trophy, MapPin } from "lucide-react";
import type { Match } from "@shared/schema";

export default function Calendar() {
  const { isAuthenticated, isLoading } = useAuth();
  const [selectedRound, setSelectedRound] = useState<number | null>(null);

  const { data: matches = [], isLoading: matchesLoading } = useQuery<Match[]>({
    queryKey: ["/api/calendar"],
  });

  if (isLoading || matchesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Caricamento calendario...</p>
        </div>
      </div>
    );
  }

  // Raggruppa le partite per giornata
  const matchesByRound = matches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {} as Record<number, Match[]>);

  const rounds = Object.keys(matchesByRound).map(Number).sort((a, b) => a - b);
  const displayedRounds = selectedRound ? [selectedRound] : rounds;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('it-IT', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "finished":
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Terminata</Badge>;
      case "live":
        return <Badge variant="destructive" className="animate-pulse">Live</Badge>;
      case "scheduled":
        return <Badge variant="outline">Programmata</Badge>;
      case "postponed":
        return <Badge variant="secondary">Rinviata</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Calendario Serie A</h1>
              <p className="text-muted-foreground">Partite, risultati e formazioni 2025/26</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Filtro per giornata */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedRound === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRound(null)}
              data-testid="button-all-rounds"
            >
              Tutte le giornate
            </Button>
            {rounds.map((round) => (
              <Button
                key={round}
                variant={selectedRound === round ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRound(round)}
                data-testid={`button-round-${round}`}
              >
                {round}ª Giornata
              </Button>
            ))}
          </div>
        </div>

        {/* Lista delle giornate */}
        <div className="space-y-6">
          {displayedRounds.map((round) => (
            <Card key={round} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span>{round}ª Giornata</span>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {matchesByRound[round].filter(m => m.status === "finished").length}/{matchesByRound[round].length} completate
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {matchesByRound[round]
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((match) => (
                    <div 
                      key={match.id} 
                      className="p-4 hover:bg-muted/50 transition-colors"
                      data-testid={`match-${match.fantacalcioId}`}
                    >
                      <div className="flex items-center justify-between">
                        {/* Teams and Score */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-4">
                              <span className="text-lg font-semibold min-w-20 text-right" data-testid={`team-home-${match.fantacalcioId}`}>
                                {match.homeTeam}
                              </span>
                              
                              {match.status === "finished" ? (
                                <div className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg">
                                  <span className="text-xl font-bold" data-testid={`score-home-${match.fantacalcioId}`}>
                                    {match.homeScore}
                                  </span>
                                  <span className="text-muted-foreground">-</span>
                                  <span className="text-xl font-bold" data-testid={`score-away-${match.fantacalcioId}`}>
                                    {match.awayScore}
                                  </span>
                                </div>
                              ) : (
                                <div className="px-4 py-2 bg-muted/30 rounded-lg">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                              
                              <span className="text-lg font-semibold min-w-20" data-testid={`team-away-${match.fantacalcioId}`}>
                                {match.awayTeam}
                              </span>
                            </div>
                          </div>
                          
                          {/* Match Info */}
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span data-testid={`date-${match.fantacalcioId}`}>
                                {formatDate(match.date)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>Stadium {match.homeTeam}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="ml-4">
                          {getStatusBadge(match.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {matches.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nessuna partita disponibile</h3>
              <p className="text-muted-foreground">Il calendario verrà aggiornato presto con le partite di Serie A.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Trophy, Target, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { TeamStats, UserTeam, Player } from "@shared/schema";

interface SimulationResult {
  userFormation: string;
  opponentTeam: string;
  userScore: number;
  opponentScore: number;
  fantasyPoints: number;
  topPerformer: Player;
  matchEvents: string[];
}

export default function Simulation() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/api/login";
    }
  }, [isAuthenticated, isLoading]);

  const { data: teamStats } = useQuery<TeamStats>({
    queryKey: ["/api/team", user?.id, "stats"],
    enabled: !!user?.id,
  });

  const { data: userTeam = [] } = useQuery<(UserTeam & { player: Player })[]>({
    queryKey: ["/api/team", user?.id],
    enabled: !!user?.id,
  });

  if (!user?.id) {
    return null;
  }

  const serieATeams = [
    "Inter", "Milan", "Juventus", "Napoli", "Atalanta", "Roma", "Lazio", 
    "Fiorentina", "Bologna", "Torino", "Udinese", "Sassuolo", "Verona", 
    "Genoa", "Cagliari", "Empoli", "Venezia", "Spezia", "Salernitana", "Monza"
  ];

  const simulateMatch = () => {
    if (userTeam.length < 11) {
      toast({
        title: "Rosa incompleta",
        description: "Ti servono almeno 11 giocatori per simulare una partita",
        variant: "destructive",
      });
      return;
    }

    setIsSimulating(true);
    
    // Simulate match after 2 seconds
    setTimeout(() => {
      const opponentTeam = serieATeams[Math.floor(Math.random() * serieATeams.length)];
      
      // Calculate team strength based on average rating
      const teamStrength = teamStats?.averageRating || 6.5;
      const opponentStrength = 6.0 + Math.random() * 2; // Random between 6.0-8.0
      
      // Simulate goals (0-4 each team)
      const userGoalChance = Math.max(0.1, (teamStrength - 5) / 4);
      const opponentGoalChance = Math.max(0.1, (opponentStrength - 5) / 4);
      
      const userScore = Math.floor(Math.random() * 5 * userGoalChance);
      const opponentScore = Math.floor(Math.random() * 5 * opponentGoalChance);
      
      // Calculate fantasy points based on individual player performance
      let fantasyPoints = 0;
      const matchEvents: string[] = [];
      
      // Get best 11 players for simulation
      const bestEleven = userTeam
        .sort((a, b) => parseFloat(b.player.rating) - parseFloat(a.player.rating))
        .slice(0, 11);
      
      bestEleven.forEach(ut => {
        const player = ut.player;
        const rating = parseFloat(player.rating);
        const basePoints = Math.max(4, rating); // Base points from rating
        
        // Random performance variation
        const performance = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
        const playerPoints = Math.round(basePoints * performance);
        fantasyPoints += playerPoints;
        
        // Generate some match events
        if (Math.random() < 0.3 && player.position === 'A') {
          matchEvents.push(`⚽ Gol di ${player.name}!`);
        }
        if (Math.random() < 0.2) {
          matchEvents.push(`🎯 Assist di ${player.name}`);
        }
        if (Math.random() < 0.1) {
          matchEvents.push(`🟨 Ammonizione per ${player.name}`);
        }
      });
      
      const topPerformer = bestEleven.reduce((best, ut) => 
        parseFloat(ut.player.rating) > parseFloat(best.player.rating) ? ut : best
      ).player;
      
      const result: SimulationResult = {
        userFormation: "4-3-3", // Default formation
        opponentTeam,
        userScore,
        opponentScore,
        fantasyPoints: Math.round(fantasyPoints),
        topPerformer,
        matchEvents: matchEvents.slice(0, 5)
      };
      
      setSimulationResult(result);
      setIsSimulating(false);
      
      // Show result toast
      const resultText = userScore > opponentScore ? "Vittoria!" : 
                        userScore === opponentScore ? "Pareggio!" : "Sconfitta!";
      
      toast({
        title: `${resultText} ${userScore}-${opponentScore}`,
        description: `Hai totalizzato ${fantasyPoints} punti fantacalcio`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Simulazione Partite</h2>
              <p className="text-muted-foreground mt-1">Testa la tua squadra contro avversari di Serie A</p>
            </div>
          </div>

          {/* Team Readiness */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Stato Squadra
              </CardTitle>
              <CardDescription>Verifica se la tua rosa è pronta per giocare</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    {userTeam.length}/25
                  </div>
                  <div className="text-sm text-muted-foreground">Giocatori Totali</div>
                  <Progress 
                    value={(userTeam.length / 25) * 100} 
                    className="mt-2"
                    data-testid="progress-total-players"
                  />
                </div>
                
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {teamStats?.averageRating?.toFixed(1) || "0.0"}
                  </div>
                  <div className="text-sm text-muted-foreground">Media Voti</div>
                  <div className={`text-xs mt-1 ${(teamStats?.averageRating || 0) >= 6.5 ? 'text-green-600' : 'text-orange-600'}`}>
                    {(teamStats?.averageRating || 0) >= 6.5 ? 'Buona qualità' : 'Migliorabile'}
                  </div>
                </div>
                
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-chart-1">
                    {Math.min(11, userTeam.length)}/11
                  </div>
                  <div className="text-sm text-muted-foreground">Titolari Disponibili</div>
                  <div className={`text-xs mt-1 ${userTeam.length >= 11 ? 'text-green-600' : 'text-orange-600'}`}>
                    {userTeam.length >= 11 ? 'Pronto per giocare' : 'Servono altri giocatori'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simulation Controls */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Simula Partita
              </CardTitle>
              <CardDescription>
                Gioca una partita virtuale contro una squadra di Serie A
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Button 
                  size="lg"
                  onClick={simulateMatch}
                  disabled={isSimulating || userTeam.length < 11}
                  className="px-8 py-4"
                  data-testid="button-simulate-match"
                >
                  {isSimulating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Simulazione in corso...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Gioca Partita
                    </>
                  )}
                </Button>
                
                {userTeam.length < 11 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Ti servono almeno 11 giocatori per simulare una partita
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Simulation Result */}
          {simulationResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Risultato Partita
                </CardTitle>
                <CardDescription>
                  La tua squadra vs {simulationResult.opponentTeam}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Score */}
                  <div className="text-center py-6 bg-muted rounded-lg">
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {simulationResult.userScore} - {simulationResult.opponentScore}
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold">{user.firstName || user.email}</span>
                      <span className="text-muted-foreground mx-2">vs</span>
                      <span className="font-semibold">{simulationResult.opponentTeam}</span>
                    </div>
                    <Badge 
                      variant={
                        simulationResult.userScore > simulationResult.opponentScore ? "default" : 
                        simulationResult.userScore === simulationResult.opponentScore ? "secondary" : "destructive"
                      }
                      className="mt-2"
                    >
                      {simulationResult.userScore > simulationResult.opponentScore ? "VITTORIA" : 
                       simulationResult.userScore === simulationResult.opponentScore ? "PAREGGIO" : "SCONFITTA"}
                    </Badge>
                  </div>

                  {/* Fantasy Points */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-primary/10 rounded-lg">
                      <div className="text-3xl font-bold text-primary">
                        {simulationResult.fantasyPoints}
                      </div>
                      <div className="text-sm text-muted-foreground">Punti Fantacalcio</div>
                      <div className={`text-xs mt-1 ${simulationResult.fantasyPoints >= 70 ? 'text-green-600' : simulationResult.fantasyPoints >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {simulationResult.fantasyPoints >= 70 ? 'Eccellente' : simulationResult.fantasyPoints >= 60 ? 'Buono' : 'Migliorabile'}
                      </div>
                    </div>

                    <div className="text-center p-6 bg-chart-2/10 rounded-lg">
                      <div className="text-lg font-bold text-chart-2">
                        ⭐ {simulationResult.topPerformer.name}
                      </div>
                      <div className="text-sm text-muted-foreground">Migliore in Campo</div>
                      <div className="text-xs mt-1 text-chart-2">
                        Rating {simulationResult.topPerformer.rating}
                      </div>
                    </div>
                  </div>

                  {/* Match Events */}
                  {simulationResult.matchEvents.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Eventi Partita</h4>
                      <div className="space-y-2">
                        {simulationResult.matchEvents.map((event, index) => (
                          <div 
                            key={index} 
                            className="flex items-center space-x-2 p-2 bg-muted rounded"
                            data-testid={`match-event-${index}`}
                          >
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">{event}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={simulateMatch}
                      disabled={isSimulating}
                      data-testid="button-simulate-again"
                    >
                      Simula Altra Partita
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setLocation("/roster")}
                      data-testid="button-improve-team"
                    >
                      Migliora Squadra
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Formation Suggestions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Suggerimenti Tattici
              </CardTitle>
              <CardDescription>
                Consigli per migliorare le performance della tua squadra
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Punti di Forza</h4>
                  <div className="space-y-2">
                    {teamStats && teamStats.averageRating >= 7.0 && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm">Ottima qualità media ({teamStats.averageRating.toFixed(1)})</span>
                      </div>
                    )}
                    {teamStats && teamStats.totalGoals >= 10 && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm">Attacco prolifico ({teamStats.totalGoals} gol)</span>
                      </div>
                    )}
                    {userTeam.length >= 20 && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm">Rosa completa e profonda</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Aree di Miglioramento</h4>
                  <div className="space-y-2">
                    {userTeam.length < 15 && (
                      <div className="flex items-center space-x-2 text-orange-600">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span className="text-sm">Serve più profondità nella rosa</span>
                      </div>
                    )}
                    {teamStats && teamStats.averageRating < 6.5 && (
                      <div className="flex items-center space-x-2 text-orange-600">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span className="text-sm">Qualità media migliorabile</span>
                      </div>
                    )}
                    {teamStats && (teamStats.totalGoals + teamStats.totalAssists) < 15 && (
                      <div className="flex items-center space-x-2 text-orange-600">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span className="text-sm">Servono più giocatori offensivi</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
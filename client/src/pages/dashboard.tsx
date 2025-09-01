import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PlayerCard } from "@/components/player-card";
import { RecommendationCard } from "@/components/recommendation-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Target, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { TeamStats, UserTeam, Player, PlayerRecommendation, MarketActivity } from "@shared/schema";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const { data: recommendations = [] } = useQuery<PlayerRecommendation[]>({
    queryKey: ["/api/recommendations", user?.id],
    enabled: !!user?.id,
  });

  const { data: marketActivity = [] } = useQuery<MarketActivity[]>({
    queryKey: ["/api/market/activity"],
  });

  const addPlayerMutation = useMutation({
    mutationFn: async ({ playerId, price }: { playerId: string; price: number }) => {
      const response = await apiRequest("POST", `/api/team/${user?.id}/players`, {
        playerId,
        purchasePrice: price,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/team", user?.id, "stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/recommendations", user?.id] });
      toast({
        title: "Giocatore aggiunto",
        description: "Il giocatore è stato aggiunto alla tua rosa!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Impossibile aggiungere il giocatore",
        variant: "destructive",
      });
    },
  });

  if (!user?.id) {
    return null;
  }

  const handleAddRecommendation = (recommendation: PlayerRecommendation) => {
    // Check if user has enough credits
    if (!teamStats || teamStats.remainingCredits < recommendation.player.price) {
      toast({
        title: "Crediti insufficienti",
        description: `Ti servono €${recommendation.player.price} ma hai solo €${teamStats?.remainingCredits || 0}`,
        variant: "destructive",
      });
      return;
    }

    addPlayerMutation.mutate({
      playerId: recommendation.player.id,
      price: recommendation.player.price,
    });
  };

  const groupPlayersByPosition = (players: (UserTeam & { player: Player })[]) => {
    return players.reduce((acc, ut) => {
      const position = ut.player.position;
      if (!acc[position]) acc[position] = [];
      acc[position].push(ut);
      return acc;
    }, {} as Record<string, (UserTeam & { player: Player })[]>);
  };

  const playersByPosition = groupPlayersByPosition(userTeam);
  const positionNames = { P: "Portieri", D: "Difensori", C: "Centrocampisti", A: "Attaccanti" };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
              <p className="text-muted-foreground mt-1">Gestisci la tua squadra per la Serie A 2025/26 con dati reali aggiornati</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Button 
                onClick={() => setLocation("/market")}
                data-testid="button-add-player"
              >
                Aggiungi Giocatore
              </Button>
            </div>
          </div>

          {/* Tutorial per Principianti */}
          {userTeam.length === 0 && (
            <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎓 Guida per Principianti
                </CardTitle>
                <CardDescription>
                  Benvenuto nel Fantacalcio! Ecco come iniziare:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">🏗️ Come costruire la squadra:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>3 Portieri</strong> - Almeno uno titolare forte</li>
                      <li>• <strong>8 Difensori</strong> - Mix di titolari e riserve</li>
                      <li>• <strong>8 Centrocampisti</strong> - I più versatili</li>
                      <li>• <strong>6 Attaccanti</strong> - I bomber che segnano</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">💡 Consigli per vincere:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Il <strong>voto</strong> è tutto: più alto = più punti</li>
                      <li>• <strong>Gol e assist</strong> danno bonus speciali</li>
                      <li>• Scegli giocatori che <strong>giocano sempre</strong></li>
                      <li>• Bilancia: <strong>campioni costosi + affari</strong></li>
                    </ul>
                  </div>
                </div>
                <Button 
                  onClick={() => setLocation("/market")}
                  className="w-full mt-4"
                  data-testid="button-start-building"
                >
                  🚀 Inizia a Costruire la Squadra
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Giocatori in Rosa</p>
                    <p className="text-2xl font-bold text-foreground" data-testid="text-player-count">
                      {teamStats?.playerCount || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    <span className="text-chart-2 font-medium">Max: 25</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Crediti Residui</p>
                    <p className="text-2xl font-bold text-foreground" data-testid="text-remaining-credits">
                      €{teamStats?.remainingCredits || user.totalCredits}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-chart-1/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-chart-1" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    <span className="text-muted-foreground">Spesi: </span>
                    <span className="text-accent font-medium ml-1" data-testid="text-spent-credits">
                      €{teamStats?.spentCredits || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Media Voti</p>
                    <p className="text-2xl font-bold text-foreground" data-testid="text-average-rating">
                      {teamStats?.averageRating?.toFixed(1) || "0.0"}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-chart-2/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-chart-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gol + Assist</p>
                    <p className="text-2xl font-bold text-foreground" data-testid="text-total-goals-assists">
                      {(teamStats?.totalGoals || 0) + (teamStats?.totalAssists || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-chart-4/10 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-chart-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Team Roster */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>La Mia Rosa</CardTitle>
                <CardDescription>I tuoi giocatori divisi per ruolo</CardDescription>
              </CardHeader>
              <CardContent>
                {userTeam.length === 0 ? (
                  <div className="text-center py-8" data-testid="empty-roster">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nessun giocatore in rosa</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => setLocation("/market")}
                      data-testid="button-go-to-market"
                    >
                      Vai al Mercato
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(positionNames).map(([position, name]) => {
                      const players = playersByPosition[position] || [];
                      if (players.length === 0) return null;
                      
                      return (
                        <div key={position}>
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                            {name} ({players.length})
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {players.slice(0, 3).map((userTeam) => (
                              <PlayerCard
                                key={userTeam.id}
                                player={userTeam.player}
                                purchasePrice={userTeam.purchasePrice}
                                showStats={true}
                              />
                            ))}
                          </div>
                          {players.length > 3 && (
                            <div className="mt-3 text-center">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setLocation("/roster")}
                                data-testid={`button-show-more-${position}`}
                              >
                                Mostra tutti i {name.toLowerCase()} ({players.length - 3} rimanenti)
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Player Recommendations */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">🤖 Consigli AI per Principianti</CardTitle>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                    Intelligenza Artificiale
                  </span>
                </div>
                <CardDescription>
                  L'AI analizza tutti i giocatori e ti consiglia i migliori per la tua squadra
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.slice(0, 3).map((recommendation) => (
                    <RecommendationCard
                      key={recommendation.player.id}
                      recommendation={recommendation}
                      onAddPlayer={handleAddRecommendation}
                    />
                  ))}
                  {recommendations.length === 0 && (
                    <div className="text-center py-6" data-testid="no-recommendations">
                      <p className="text-muted-foreground mb-2">Nessun consiglio disponibile</p>
                      <p className="text-xs text-muted-foreground">Aggiungi alcuni giocatori per ricevere consigli personalizzati</p>
                    </div>
                  )}
                  {recommendations.length > 0 && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setLocation("/market")}
                      data-testid="button-see-all-recommendations"
                    >
                      Vedi Tutti i Consigli nel Mercato
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Consigli Tattici */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">⚽ Consigli Tattici</CardTitle>
                <CardDescription>
                  Strategie per massimizzare i punti della tua squadra
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      🏆 Formazione 3-5-2 (Consigliata)
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      La formazione più equilibrata: 3 difensori, 5 centrocampisti, 2 attaccanti. 
                      Perfetta per principianti perché i centrocampisti prendono voti più stabili.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      💰 Gestione Budget
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Regola d'oro: spendi €200-250M per 2-3 campioni, poi completa con giocatori da €5-15M. 
                      Non comprare solo stelle costose!
                    </p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                      🎯 Priorità Acquisti
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      1° Portiere titolare forte, 2° Attaccanti che segnano sempre, 
                      3° Centrocampisti jolly, 4° Difensori delle big.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mercato Live</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketActivity.slice(0, 3).map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
                      data-testid={`market-activity-${activity.id}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                        <div>
                          <span className="text-sm font-medium text-foreground">
                            {activity.playerName}
                          </span>
                          <div className="text-xs text-muted-foreground">
                            {activity.fromTeam} → {activity.toTeam}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-accent">
                          €{(activity.price / 1000000).toFixed(0)}M
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Math.floor((Date.now() - new Date(activity.timestamp).getTime()) / 60000)} min fa
                        </div>
                      </div>
                    </div>
                  ))}
                  {marketActivity.length === 0 && (
                    <p className="text-center text-muted-foreground py-4" data-testid="no-market-activity">
                      Nessuna attività di mercato
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

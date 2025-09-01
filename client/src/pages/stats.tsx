import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Target, Users, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { TeamPerformanceChart } from "@/components/team-performance-chart";
import type { TeamStats, UserTeam, Player, Transaction } from "@shared/schema";

export default function Stats() {
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

  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions", user?.id],
    enabled: !!user?.id,
  });

  const refreshPlayersMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/admin/refresh-players", {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/players"] });
      queryClient.invalidateQueries({ queryKey: ["/api/recommendations", user?.id] });
      toast({
        title: "Dati aggiornati",
        description: "Rose e statistiche Serie A 2025/26 aggiornate con dati reali",
      });
    },
    onError: () => {
      toast({
        title: "Errore aggiornamento",
        description: "Impossibile aggiornare i dati dei giocatori",
        variant: "destructive",
      });
    },
  });

  if (!user?.id) {
    return null;
  }

  // Position distribution
  const positionCounts = userTeam.reduce((acc, ut) => {
    acc[ut.player.position] = (acc[ut.player.position] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const positionData = [
    { position: "P", name: "Portieri", count: positionCounts.P || 0, min: 3, max: 3, color: "bg-blue-500" },
    { position: "D", name: "Difensori", count: positionCounts.D || 0, min: 8, max: 8, color: "bg-green-500" },
    { position: "C", name: "Centrocampisti", count: positionCounts.C || 0, min: 8, max: 8, color: "bg-yellow-500" },
    { position: "A", name: "Attaccanti", count: positionCounts.A || 0, min: 6, max: 6, color: "bg-red-500" },
  ];

  // Top performers
  const topPerformers = userTeam
    .sort((a, b) => parseFloat(b.player.rating) - parseFloat(a.player.rating))
    .slice(0, 5);

  // Recent transactions
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Statistiche Avanzate</h2>
              <p className="text-muted-foreground mt-1">Analisi dettagliata della tua squadra</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Button 
                onClick={() => refreshPlayersMutation.mutate()}
                disabled={refreshPlayersMutation.isPending}
                data-testid="button-refresh-data"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshPlayersMutation.isPending ? 'animate-spin' : ''}`} />
                Aggiorna da Serie A
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" data-testid="tab-overview">Panoramica</TabsTrigger>
              <TabsTrigger value="formations" data-testid="tab-formations">Formazioni</TabsTrigger>
              <TabsTrigger value="performance" data-testid="tab-performance">Performance</TabsTrigger>
              <TabsTrigger value="transactions" data-testid="tab-transactions">Transazioni</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Position Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Distribuzione Ruoli
                    </CardTitle>
                    <CardDescription>Composizione della tua rosa per ruolo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {positionData.map(({ position, name, count, min, max, color }) => (
                        <div key={position} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{name}</span>
                            <span className={`text-sm ${count >= min ? 'text-green-600' : 'text-orange-600'}`}>
                              {count}/{max}
                            </span>
                          </div>
                          <Progress 
                            value={(count / max) * 100} 
                            className="h-2"
                            data-testid={`progress-${position}`}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Minimo: {min}</span>
                            <span className={count >= min ? 'text-green-600' : 'text-orange-600'}>
                              {count >= min ? '✓ Completo' : `Servono ${min - count}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Team Value Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Analisi Valore Rosa
                    </CardTitle>
                    <CardDescription>Investimenti e rendimento della squadra</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {teamStats?.spentCredits || 0}FM
                          </div>
                          <div className="text-sm text-muted-foreground">Spesi</div>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-chart-2">
                            {teamStats?.remainingCredits || 500}FM
                          </div>
                          <div className="text-sm text-muted-foreground">Disponibili</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Budget utilizzato</span>
                          <span>{Math.round(((teamStats?.spentCredits || 0) / 500) * 100)}%</span>
                        </div>
                        <Progress 
                          value={((teamStats?.spentCredits || 0) / 500) * 100} 
                          className="h-2"
                          data-testid="progress-budget"
                        />
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-semibold text-foreground">
                          Media Valore: {userTeam.length > 0 ? Math.round((teamStats?.spentCredits || 0) / userTeam.length) : 0}FM
                        </div>
                        <div className="text-sm text-muted-foreground">per giocatore</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Formations Tab */}
            <TabsContent value="formations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Formazioni Tattiche</CardTitle>
                  <CardDescription>
                    Configura le formazioni per ottimizzare la tua squadra
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {['3-5-2', '4-4-2', '4-3-3', '3-4-3', '5-3-2', '4-5-1'].map((formation) => (
                      <Card key={formation} className="cursor-pointer hover:bg-muted/30 transition-colors">
                        <CardContent className="p-6 text-center">
                          <div className="text-2xl font-bold text-primary mb-2">{formation}</div>
                          <div className="text-sm text-muted-foreground mb-4">
                            {formation === '3-5-2' && 'Equilibrata - Controllo a centrocampo'}
                            {formation === '4-4-2' && 'Classica - Solidità difensiva'}
                            {formation === '4-3-3' && 'Offensiva - Ampiezza sulle fasce'}
                            {formation === '3-4-3' && 'Aggressiva - Pressing alto'}
                            {formation === '5-3-2' && 'Difensiva - Contropiede'}
                            {formation === '4-5-1' && 'Conservativa - Mediana folta'}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            data-testid={`button-formation-${formation}`}
                          >
                            Seleziona
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="mt-6">
              <div className="space-y-8">
                {/* Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Analisi Performance per Ruolo
                    </CardTitle>
                    <CardDescription>Statistiche comparative dei tuoi giocatori</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TeamPerformanceChart userTeam={userTeam} />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Top Performers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Top Performers
                      </CardTitle>
                      <CardDescription>I migliori giocatori della tua rosa</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topPerformers.map((ut, index) => (
                          <div 
                            key={ut.id} 
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                            data-testid={`top-performer-${index}`}
                          >
                            <div className="flex items-center space-x-3">
                              <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                                {index + 1}
                              </Badge>
                              <div>
                                <div className="font-medium">{ut.player.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {ut.player.position} - {ut.player.team}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary">⭐ {ut.player.rating}</div>
                              <div className="text-sm text-muted-foreground">
                                {ut.player.goals}G + {ut.player.assists}A
                              </div>
                            </div>
                          </div>
                        ))}
                        {topPerformers.length === 0 && (
                          <p className="text-center text-muted-foreground py-4" data-testid="no-top-performers">
                            Nessun giocatore in rosa
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Metriche Performance
                      </CardTitle>
                      <CardDescription>Statistiche dettagliate della squadra</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-chart-1">
                              {teamStats?.totalGoals || 0}
                            </div>
                            <div className="text-sm text-muted-foreground">Gol Totali</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-chart-2">
                              {teamStats?.totalAssists || 0}
                            </div>
                            <div className="text-sm text-muted-foreground">Assist Totali</div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Efficienza Offensiva</span>
                            <span className="text-sm text-chart-1 font-bold">
                              {userTeam.length > 0 ? 
                                (((teamStats?.totalGoals || 0) + (teamStats?.totalAssists || 0)) / userTeam.length).toFixed(1)
                                : "0.0"
                              }
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Cartellini per Partita</span>
                            <span className="text-sm text-chart-3 font-bold">
                              {userTeam.length > 0 ? 
                                (userTeam.reduce((sum, ut) => sum + ut.player.yellowCards + ut.player.redCards * 2, 0) / userTeam.length).toFixed(1)
                                : "0.0"
                              }
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Costo Medio Giocatore</span>
                            <span className="text-sm text-primary font-bold">
                              {userTeam.length > 0 ? Math.round((teamStats?.spentCredits || 0) / userTeam.length) : 0}FM
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Storico Transazioni</CardTitle>
                  <CardDescription>
                    Tutti gli acquisti e le vendite della tua squadra
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentTransactions.length === 0 ? (
                    <div className="text-center py-8" data-testid="no-transactions">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">Nessuna transazione effettuata</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => {
                        const player = userTeam.find(ut => ut.playerId === transaction.playerId)?.player;
                        return (
                          <div 
                            key={transaction.id} 
                            className="flex items-center justify-between p-4 bg-muted rounded-lg"
                            data-testid={`transaction-${transaction.id}`}
                          >
                            <div className="flex items-center space-x-3">
                              <Badge 
                                variant={transaction.type === "BUY" ? "default" : "destructive"}
                                className="min-w-[60px]"
                              >
                                {transaction.type === "BUY" ? "Acquisto" : "Vendita"}
                              </Badge>
                              <div>
                                <div className="font-medium">
                                  {player?.name || "Giocatore sconosciuto"}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {player?.team} • {new Date(transaction.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-bold ${transaction.type === "BUY" ? "text-red-600" : "text-green-600"}`}>
                                {transaction.type === "BUY" ? "-" : "+"}{transaction.amount}FM
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
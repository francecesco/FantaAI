import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PlayerCard } from "@/components/player-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { UserTeam, Player } from "@shared/schema";

export default function Roster() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPosition, setSelectedPosition] = useState("all");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/api/login";
    }
  }, [isAuthenticated, isLoading]);

  const { data: userTeam = [], isLoading: isLoadingTeam } = useQuery<(UserTeam & { player: Player })[]>({
    queryKey: ["/api/team", user?.id],
    enabled: !!user?.id,
  });

  const removePlayerMutation = useMutation({
    mutationFn: async (playerId: string) => {
      const response = await apiRequest("DELETE", `/api/team/${user?.id}/players/${playerId}`, {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/team", user?.id, "stats"] });
      toast({
        title: "Giocatore venduto",
        description: "Il giocatore è stato rimosso dalla tua rosa",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Errore",
        description: error.message || "Impossibile rimuovere il giocatore",
        variant: "destructive",
      });
    },
  });

  if (!user?.id) {
    return null;
  }

  const handleRemovePlayer = (player: Player) => {
    if (confirm(`Sei sicuro di voler vendere ${player.name}?`)) {
      removePlayerMutation.mutate(player.id);
    }
  };

  const filteredPlayers = selectedPosition === "all" 
    ? userTeam 
    : userTeam.filter(ut => ut.player.position === selectedPosition);

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
  const positionCounts = {
    P: playersByPosition.P?.length || 0,
    D: playersByPosition.D?.length || 0,
    C: playersByPosition.C?.length || 0,
    A: playersByPosition.A?.length || 0,
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">La Mia Rosa</h2>
              <p className="text-muted-foreground mt-1">Gestisci i tuoi giocatori e le formazioni</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Button onClick={() => setLocation("/market")} data-testid="button-add-player">
                Aggiungi Giocatore
              </Button>
            </div>
          </div>

          {/* Position Tabs */}
          <Tabs value={selectedPosition} onValueChange={setSelectedPosition} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" data-testid="tab-all">
                Tutti ({userTeam.length})
              </TabsTrigger>
              <TabsTrigger value="P" data-testid="tab-goalkeeper">
                P ({positionCounts.P})
              </TabsTrigger>
              <TabsTrigger value="D" data-testid="tab-defender">
                D ({positionCounts.D})
              </TabsTrigger>
              <TabsTrigger value="C" data-testid="tab-midfielder">
                C ({positionCounts.C})
              </TabsTrigger>
              <TabsTrigger value="A" data-testid="tab-forward">
                A ({positionCounts.A})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedPosition} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedPosition === "all" 
                      ? "Tutti i Giocatori" 
                      : `${positionNames[selectedPosition as keyof typeof positionNames]}`
                    }
                  </CardTitle>
                  <CardDescription>
                    {selectedPosition === "all" 
                      ? `${userTeam.length} giocatori in rosa`
                      : `${filteredPlayers.length} ${positionNames[selectedPosition as keyof typeof positionNames]?.toLowerCase()}`
                    }
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {isLoadingTeam ? (
                    <div className="text-center py-8" data-testid="loading-roster">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="text-muted-foreground mt-2">Caricamento rosa...</p>
                    </div>
                  ) : filteredPlayers.length === 0 ? (
                    <div className="text-center py-8" data-testid="empty-roster">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        {selectedPosition === "all" 
                          ? "Nessun giocatore in rosa"
                          : `Nessun ${positionNames[selectedPosition as keyof typeof positionNames]?.toLowerCase()?.slice(0, -1)}e in rosa`
                        }
                      </p>
                      <Button onClick={() => setLocation("/market")} data-testid="button-go-to-market">
                        Vai al Mercato
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="roster-grid">
                      {filteredPlayers.map((userTeam) => (
                        <PlayerCard
                          key={userTeam.id}
                          player={userTeam.player}
                          purchasePrice={userTeam.purchasePrice}
                          onAction={handleRemovePlayer}
                          actionLabel="Vendi"
                          actionVariant="destructive"
                          showStats={true}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Position Requirements Info */}
        {userTeam.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Requisiti Formazione
              </CardTitle>
              <CardDescription>
                Assicurati di avere abbastanza giocatori per ogni ruolo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(positionNames).map(([position, name]) => {
                  const count = positionCounts[position as keyof typeof positionCounts];
                  const minRequired = position === "P" ? 3 : position === "D" ? 8 : position === "C" ? 8 : 6;
                  const isComplete = count >= minRequired;
                  
                  return (
                    <div 
                      key={position} 
                      className={`p-4 rounded-lg border ${isComplete ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' : 'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800'}`}
                      data-testid={`position-requirement-${position}`}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {count}/{minRequired}
                        </div>
                        <div className="text-sm font-medium">{name}</div>
                        <div className={`text-xs mt-1 ${isComplete ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                          {isComplete ? 'Completo' : `Servono ${minRequired - count}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
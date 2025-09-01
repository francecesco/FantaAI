import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PlayerSearch } from "@/components/player-search";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Player, UserTeam, TeamStats } from "@shared/schema";

export default function Market() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  const { data: userTeam = [] } = useQuery<(UserTeam & { player: Player })[]>({
    queryKey: ["/api/team", user?.id],
    enabled: !!user,
  });

  const { data: teamStats } = useQuery<TeamStats>({
    queryKey: ["/api/team", user?.id, "stats"],
    enabled: !!user,
  });

  const addPlayerMutation = useMutation({
    mutationFn: async (player: Player) => {
      const response = await apiRequest("POST", "/api/team/add-player", {
        userId: user?.id,
        playerId: player.id,
        purchasePrice: player.price,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/team", user?.id, "stats"] });
      toast({
        title: "Giocatore acquistato",
        description: "Il giocatore è stato aggiunto alla tua rosa!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Acquisto fallito",
        description: error.message || "Impossibile acquistare il giocatore",
        variant: "destructive",
      });
    },
  });

  if (!user) {
    return null;
  }

  const handlePlayerSelect = (player: Player) => {
    // Check if user has enough credits
    if (!teamStats || teamStats.remainingCredits < player.price) {
      toast({
        title: "Crediti insufficienti",
        description: `Ti servono €${player.price} ma hai solo €${teamStats?.remainingCredits || 0}`,
        variant: "destructive",
      });
      return;
    }

    // Check if player is already in team
    const alreadyOwned = userTeam.some(ut => ut.player.id === player.id);
    if (alreadyOwned) {
      toast({
        title: "Giocatore già in rosa",
        description: "Questo giocatore è già nella tua squadra",
        variant: "destructive",
      });
      return;
    }

    addPlayerMutation.mutate(player);
  };

  const ownedPlayerIds = userTeam.map(ut => ut.player.id);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Mercato</h2>
              <p className="text-muted-foreground mt-1">Trova i migliori giocatori per la tua rosa</p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <div className="bg-muted px-4 py-2 rounded-lg">
                <span className="text-sm text-muted-foreground">Crediti disponibili: </span>
                <span className="text-lg font-semibold text-primary" data-testid="text-available-credits">
                  €{teamStats?.remainingCredits || user.totalCredits}
                </span>
              </div>
            </div>
          </div>

          {/* Market Info Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Informazioni Mercato</CardTitle>
              <CardDescription>
                Consigli per gli acquisti e regole del fantacalcio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-roster-count">
                    {userTeam.length}/25
                  </div>
                  <div className="text-sm text-muted-foreground">Giocatori in rosa</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-2">
                    €{teamStats?.averageRating?.toFixed(1) || "0.0"}
                  </div>
                  <div className="text-sm text-muted-foreground">Media voti squadra</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-chart-4">
                    {(teamStats?.totalGoals || 0) + (teamStats?.totalAssists || 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Gol + Assist totali</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Player Search */}
          <PlayerSearch
            onPlayerSelect={handlePlayerSelect}
            excludePlayerIds={ownedPlayerIds}
            actionLabel="Acquista"
            actionVariant="default"
          />
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

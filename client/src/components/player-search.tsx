import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { PlayerCard } from "./player-card";
import { PurchaseModal } from "./purchase-modal";
import type { Player } from "@shared/schema";

interface PlayerSearchProps {
  onPlayerSelect?: (player: Player, customPrice?: number) => void;
  excludePlayerIds?: string[];
  actionLabel?: string;
  actionVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  userCredits?: number;
}

export function PlayerSearch({ 
  onPlayerSelect, 
  excludePlayerIds = [],
  actionLabel = "Acquista",
  actionVariant = "default",
  userCredits = 0
}: PlayerSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [position, setPosition] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [visiblePlayers, setVisiblePlayers] = useState(12);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const { data: players = [], isLoading } = useQuery<Player[]>({
    queryKey: ["/api/players", { 
      search: searchTerm || undefined,
      position: position !== "all" ? position : undefined,
      minPrice: priceRange === "1-10" ? 1 : priceRange === "11-25" ? 11 : priceRange === "26-50" ? 26 : priceRange === "50+" ? 50 : undefined,
      maxPrice: priceRange === "1-10" ? 10 : priceRange === "11-25" ? 25 : priceRange === "26-50" ? 50 : undefined,
    }],
  });

  const filteredPlayers = players.filter(player => !excludePlayerIds.includes(player.id));

  const handleLoadMore = () => {
    setVisiblePlayers(prev => prev + 12);
  };

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setIsPurchaseModalOpen(true);
  };

  const handlePurchaseConfirm = (player: Player, customPrice: number) => {
    if (onPlayerSelect) {
      onPlayerSelect(player, customPrice);
    }
  };

  // Reset visible players when filters change
  useEffect(() => {
    setVisiblePlayers(12);
  }, [searchTerm, position, priceRange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Ricerca Giocatori
        </CardTitle>
        <CardDescription>
          Trova i migliori giocatori per la tua rosa
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Cerca per nome o squadra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-player-search"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger className="w-full sm:w-40" data-testid="select-position">
              <SelectValue placeholder="Ruolo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i ruoli</SelectItem>
              <SelectItem value="P">Portiere</SelectItem>
              <SelectItem value="D">Difensore</SelectItem>
              <SelectItem value="C">Centrocampista</SelectItem>
              <SelectItem value="A">Attaccante</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-full sm:w-40" data-testid="select-price-range">
              <SelectValue placeholder="Prezzo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le fasce</SelectItem>
              <SelectItem value="1-10">1-10FM</SelectItem>
              <SelectItem value="11-25">11-25FM</SelectItem>
              <SelectItem value="26-50">26-50FM</SelectItem>
              <SelectItem value="50+">50+FM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-8" data-testid="loading-players">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Caricamento giocatori...</p>
          </div>
        ) : filteredPlayers.length === 0 ? (
          <div className="text-center py-8" data-testid="no-players">
            <p className="text-muted-foreground">Nessun giocatore trovato</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="players-grid">
            {filteredPlayers.slice(0, visiblePlayers).map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onAction={handlePlayerClick}
                actionLabel={actionLabel}
                actionVariant={actionVariant}
                showStats={true}
              />
            ))}
          </div>
        )}

        {filteredPlayers.length > visiblePlayers && (
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={handleLoadMore}
              data-testid="button-load-more"
            >
              Carica altri giocatori ({filteredPlayers.length - visiblePlayers} rimanenti)
            </Button>
          </div>
        )}
      </CardContent>

      {/* Purchase Modal */}
      <PurchaseModal
        player={selectedPlayer}
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        onConfirm={handlePurchaseConfirm}
        userCredits={userCredits}
      />
    </Card>
  );
}

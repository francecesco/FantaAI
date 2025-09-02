import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Player } from "@shared/schema";

interface PurchaseModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (player: Player, customPrice: number) => void;
  userCredits: number;
}

export function PurchaseModal({ 
  player, 
  isOpen, 
  onClose, 
  onConfirm, 
  userCredits 
}: PurchaseModalProps) {
  const [customPrice, setCustomPrice] = useState<string>("");

  if (!player) return null;

  const handleConfirm = () => {
    const price = parseInt(customPrice) || player.price;
    if (price > userCredits) {
      return; // L'errore sarà gestito dal componente padre
    }
    onConfirm(player, price);
    setCustomPrice("");
    onClose();
  };

  const handleClose = () => {
    setCustomPrice("");
    onClose();
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case "P": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "D": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "C": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "A": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const isPriceValid = () => {
    const price = parseInt(customPrice);
    return !isNaN(price) && price > 0 && price <= userCredits;
  };

  const getPriceError = () => {
    const price = parseInt(customPrice);
    if (isNaN(price)) return "Inserisci un prezzo valido";
    if (price <= 0) return "Il prezzo deve essere maggiore di 0";
    if (price > userCredits) return `Crediti insufficienti (hai ${userCredits}FM)`;
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Acquista Giocatore</DialogTitle>
          <DialogDescription>
            Inserisci il prezzo che vuoi pagare per questo giocatore durante l'asta
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Player Info */}
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-sm font-semibold">
                {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{player.name}</h4>
                <Badge className={getPositionColor(player.position)}>
                  {player.position}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                <span>{player.team}</span>
                <span>⭐ {player.rating}</span>
              </div>
            </div>
          </div>

          {/* Price Input */}
          <div className="space-y-2">
            <Label htmlFor="custom-price">Prezzo di acquisto (Fantamilioni)</Label>
            <div className="space-y-2">
              <Input
                id="custom-price"
                type="number"
                placeholder={`Quotazione: ${player.price}FM`}
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                min="1"
                max={userCredits}
                className={getPriceError() ? "border-red-500" : ""}
              />
              <div className="text-sm text-muted-foreground">
                Quotazione di mercato: <span className="font-medium">{player.price}FM</span>
              </div>
              {getPriceError() && (
                <div className="text-sm text-red-500">
                  {getPriceError()}
                </div>
              )}
            </div>
          </div>

          {/* Credits Info */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="text-sm">
              <div className="flex justify-between">
                <span>Crediti disponibili:</span>
                <span className="font-medium">{userCredits}FM</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Crediti rimanenti:</span>
                <span className="font-medium">
                  {userCredits - (parseInt(customPrice) || player.price)}FM
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Annulla
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!isPriceValid()}
          >
            Acquista per {parseInt(customPrice) || player.price}FM
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

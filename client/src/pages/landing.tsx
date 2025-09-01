import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, TrendingUp, Target, Play } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-chart-2/5">
      <div className="flag-accent"></div>
      
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              ⚽ Fantasy Football Serie A
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              FantaCalcio
              <span className="text-primary"> Serie A</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Crea la tua squadra dei sogni, acquista i migliori giocatori della Serie A 
              e sfida gli amici nel campionato di fantacalcio più avvincente d'Italia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => window.location.href = "/login"}
                data-testid="button-login"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Accedi con Google
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
                data-testid="button-learn-more"
              >
                Scopri di più
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Tutte le funzionalità che ti servono
          </h2>
          <p className="text-lg text-muted-foreground">
            Un'esperienza completa per gestire la tua squadra di fantacalcio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Gestione Rosa</CardTitle>
              <CardDescription>
                Acquista e vendi giocatori, gestisci la tua formazione
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-chart-1" />
              </div>
              <CardTitle>Statistiche Live</CardTitle>
              <CardDescription>
                Dati in tempo reale della Serie A e analisi avanzate
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-chart-2" />
              </div>
              <CardTitle>Consigli AI</CardTitle>
              <CardDescription>
                Raccomandazioni intelligenti per migliorare la squadra
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Play className="w-6 h-6 text-chart-3" />
              </div>
              <CardTitle>Simulazione</CardTitle>
              <CardDescription>
                Testa la tua squadra con partite simulate
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Pronto a dominare la Serie A?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Inizia con 500FM di budget e costruisci la squadra perfetta
          </p>
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg"
            onClick={() => window.location.href = "/api/login"}
            data-testid="button-start-now"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Inizia Ora - È Gratis!
          </Button>
        </div>
      </div>
    </div>
  );
}
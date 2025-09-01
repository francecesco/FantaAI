import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { TeamStats } from "@shared/schema";

export function Header() {
  const { user } = useAuth();
  const [location] = useLocation();

  const { data: teamStats } = useQuery<TeamStats>({
    queryKey: ["/api/team", user?.id, "stats"],
    enabled: !!user?.id,
  });

  if (!user?.id) {
    return null;
  }

  const navigation = [
    { name: "Dashboard", href: "/", active: location === "/" },
    { name: "Rosa", href: "/roster", active: location === "/roster" },
    { name: "Mercato", href: "/market", active: location === "/market" },
    { name: "Statistiche", href: "/stats", active: location === "/stats" },
    { name: "Simula", href: "/simulation", active: location === "/simulation" },
  ];

  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="flag-accent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-foreground">Fantacalcio Serie A</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a 
                  className={`${
                    item.active 
                      ? "text-primary font-medium border-b-2 border-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  } px-1 pb-2 transition-colors`}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-sm">
                  {(user.firstName || user.email)?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground hidden sm:block" data-testid="text-username">
                {user.firstName || user.email}
              </span>
            </div>
            
            <div className="bg-muted px-3 py-1 rounded-full">
              <span className="text-sm font-semibold text-primary" data-testid="text-credits">
                €{teamStats?.remainingCredits || 500}
              </span>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.location.href = "/api/logout"}
              data-testid="button-logout"
            >
              Esci
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
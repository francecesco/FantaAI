import { Link, useLocation } from "wouter";
import { BarChart3, Home, Search, Users } from "lucide-react";

export function MobileNav() {
  const [location] = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home, active: location === "/" },
    { name: "Rosa", href: "/roster", icon: Users, active: location === "/roster" },
    { name: "Mercato", href: "/market", icon: Search, active: location === "/market" },
    { name: "Stats", href: "/stats", icon: BarChart3, active: location === "/stats" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="grid grid-cols-4 text-center">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href}>
              <a 
                className={`flex flex-col items-center py-3 ${
                  item.active ? "text-primary" : "text-muted-foreground"
                }`}
                data-testid={`mobile-nav-${item.name.toLowerCase()}`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

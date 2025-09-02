import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import Dashboard from "@/pages/dashboard";
import Roster from "@/pages/roster";
import Market from "@/pages/market";
import Stats from "@/pages/stats";

import Calendar from "@/pages/calendar";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const [location, setLocation] = useLocation();

  // Reindirizzamento automatico quando l'utente è autenticato
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Se l'utente è autenticato e sta sulla landing page, reindirizza alla dashboard
      if (location === "/") {
        setLocation("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, location, setLocation]);

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Login} />
        </>
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/roster" component={Roster} />
          <Route path="/market" component={Market} />
          <Route path="/stats" component={Stats} />
          <Route path="/calendar" component={Calendar} />

        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minuti
    refetchOnWindowFocus: true, // Ricarica quando la finestra torna attiva
    refetchOnMount: true, // Ricarica sempre al mount
  });

  // Funzione per invalidare la cache dell'utente
  const invalidateUser = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    invalidateUser,
  };
}
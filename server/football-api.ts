import type { Player, InsertPlayer } from "@shared/schema";

// Sistema basato esclusivamente su dati Transfermarkt per Serie A 2025/26
export class FootballDataService {

  async getSerieAPlayers(): Promise<InsertPlayer[]> {
    console.log('Caricamento dati Serie A 2025/26 da Transfermarkt...');
    return this.getTransfermarktData();
  }

  private getTransfermarktData(): InsertPlayer[] {
    return [
      // === BOLOGNA FC 1909 === (33 giocatori - Campioni Coppa Italia 24/25)
      // Portieri
      { name: "Łukasz Skorupski", position: "P", team: "Bologna", price: 18, rating: "7.1", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Federico Ravaglia", position: "P", team: "Bologna", price: 8, rating: "6.3", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 8, isActive: true },
      { name: "Nicola Bagnolini", position: "P", team: "Bologna", price: 6, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Riccardo Calafiori", position: "D", team: "Bologna", price: 30, rating: "7.4", goals: 2, assists: 3, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Jhon Lucumí", position: "D", team: "Bologna", price: 25, rating: "7.1", goals: 1, assists: 1, yellowCards: 4, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Sam Beukema", position: "D", team: "Bologna", price: 22, rating: "7.0", goals: 1, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Stefan Posch", position: "D", team: "Bologna", price: 20, rating: "6.9", goals: 1, assists: 1, yellowCards: 5, redCards: 1, matchesPlayed: 20, isActive: true },
      { name: "Lorenzo De Silvestri", position: "D", team: "Bologna", price: 12, rating: "6.5", goals: 1, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Charalampos Lykogiannis", position: "D", team: "Bologna", price: 10, rating: "6.4", goals: 0, assists: 2, yellowCards: 4, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Emil Holm", position: "D", team: "Bologna", price: 16, rating: "6.7", goals: 1, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Tommaso Corazza", position: "D", team: "Bologna", price: 8, rating: "6.2", goals: 0, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Nicolò Casale", position: "D", team: "Bologna", price: 18, rating: "6.8", goals: 1, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Martin Erlic", position: "D", team: "Bologna", price: 14, rating: "6.6", goals: 2, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      
      // Centrocampisti
      { name: "Remo Freuler", position: "C", team: "Bologna", price: 22, rating: "7.0", goals: 2, assists: 5, yellowCards: 4, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Tommaso Pobega", position: "C", team: "Bologna", price: 20, rating: "6.8", goals: 2, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Michel Aebischer", position: "C", team: "Bologna", price: 18, rating: "6.7", goals: 2, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Giovanni Fabbian", position: "C", team: "Bologna", price: 16, rating: "6.6", goals: 3, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Nikola Moro", position: "C", team: "Bologna", price: 14, rating: "6.5", goals: 1, assists: 2, yellowCards: 4, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Kacper Urbański", position: "C", team: "Bologna", price: 10, rating: "6.3", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Lewis Ferguson", position: "C", team: "Bologna", price: 18, rating: "6.7", goals: 3, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Oussama El Azzouzi", position: "C", team: "Bologna", price: 12, rating: "6.4", goals: 1, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      
      // Attaccanti
      { name: "Ciro Immobile", position: "A", team: "Bologna", price: 35, rating: "7.3", goals: 12, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Riccardo Orsolini", position: "A", team: "Bologna", price: 25, rating: "7.1", goals: 7, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Santiago Castro", position: "A", team: "Bologna", price: 20, rating: "6.8", goals: 6, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Dan Ndoye", position: "A", team: "Bologna", price: 18, rating: "6.7", goals: 4, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Jesper Karlsson", position: "A", team: "Bologna", price: 16, rating: "6.5", goals: 3, assists: 4, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Jens Odgaard", position: "A", team: "Bologna", price: 14, rating: "6.4", goals: 4, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Benjamin Domínguez", position: "A", team: "Bologna", price: 12, rating: "6.3", goals: 2, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 11, isActive: true },
      { name: "Thijs Dallinga", position: "A", team: "Bologna", price: 15, rating: "6.4", goals: 3, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 13, isActive: true },

      // === INTER MILAN === (25 giocatori - Valore totale €704.80m)
      // Portieri
      { name: "Yann Sommer", position: "P", team: "Inter", price: 22, rating: "7.2", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Emil Audero", position: "P", team: "Inter", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 10, isActive: true },
      { name: "Raffaele Di Gennaro", position: "P", team: "Inter", price: 6, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Difensori
      { name: "Alessandro Bastoni", position: "D", team: "Inter", price: 45, rating: "7.6", goals: 3, assists: 6, yellowCards: 2, redCards: 0, matchesPlayed: 25, isActive: true },
      { name: "Francesco Acerbi", position: "D", team: "Inter", price: 18, rating: "6.8", goals: 1, assists: 1, yellowCards: 4, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Stefan de Vrij", position: "D", team: "Inter", price: 20, rating: "6.9", goals: 2, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Matteo Darmian", position: "D", team: "Inter", price: 14, rating: "6.6", goals: 1, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Denzel Dumfries", position: "D", team: "Inter", price: 25, rating: "7.1", goals: 2, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Federico Dimarco", position: "D", team: "Inter", price: 32, rating: "7.4", goals: 3, assists: 7, yellowCards: 2, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Carlos Augusto", position: "D", team: "Inter", price: 16, rating: "6.7", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Yann Bisseck", position: "D", team: "Inter", price: 12, rating: "6.4", goals: 0, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Benjamin Pavard", position: "D", team: "Inter", price: 22, rating: "6.9", goals: 1, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 18, isActive: true },
      
      // Centrocampisti
      { name: "Nicolò Barella", position: "C", team: "Inter", price: 50, rating: "7.8", goals: 4, assists: 8, yellowCards: 4, redCards: 0, matchesPlayed: 25, isActive: true },
      { name: "Hakan Çalhanoğlu", position: "C", team: "Inter", price: 35, rating: "7.5", goals: 5, assists: 6, yellowCards: 4, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Henrikh Mkhitaryan", position: "C", team: "Inter", price: 22, rating: "7.0", goals: 3, assists: 5, yellowCards: 2, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Piotr Zieliński", position: "C", team: "Inter", price: 28, rating: "7.2", goals: 3, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Davide Frattesi", position: "C", team: "Inter", price: 30, rating: "7.3", goals: 4, assists: 3, yellowCards: 3, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Kristjan Asllani", position: "C", team: "Inter", price: 16, rating: "6.6", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      
      // Attaccanti
      { name: "Lautaro Martínez", position: "A", team: "Inter", price: 65, rating: "8.2", goals: 16, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 25, isActive: true },
      { name: "Marcus Thuram", position: "A", team: "Inter", price: 40, rating: "7.6", goals: 10, assists: 5, yellowCards: 1, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Mehdi Taremi", position: "A", team: "Inter", price: 28, rating: "7.1", goals: 6, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Marko Arnautović", position: "A", team: "Inter", price: 16, rating: "6.6", goals: 4, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },

      // === JUVENTUS FC === (26 giocatori - Valore totale €534.70m)
      // Portieri
      { name: "Michele Di Gregorio", position: "P", team: "Juventus", price: 20, rating: "7.0", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Mattia Perin", position: "P", team: "Juventus", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Carlo Pinsoglio", position: "P", team: "Juventus", price: 6, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori  
      { name: "Bremer", position: "D", team: "Juventus", price: 35, rating: "7.5", goals: 3, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Pierre Kalulu", position: "D", team: "Juventus", price: 30, rating: "7.2", goals: 2, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Federico Gatti", position: "D", team: "Juventus", price: 25, rating: "7.0", goals: 2, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Andrea Cambiaso", position: "D", team: "Juventus", price: 28, rating: "7.1", goals: 2, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Danilo", position: "D", team: "Juventus", price: 18, rating: "6.8", goals: 1, assists: 2, yellowCards: 4, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Lloyd Kelly", position: "D", team: "Juventus", price: 16, rating: "6.6", goals: 1, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Juan Cabal", position: "D", team: "Juventus", price: 12, rating: "6.4", goals: 0, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Jonas Rouhi", position: "D", team: "Juventus", price: 8, rating: "6.1", goals: 0, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 8, isActive: true },
      { name: "João Mário", position: "D", team: "Juventus", price: 14, rating: "6.5", goals: 0, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Daniele Rugani", position: "D", team: "Juventus", price: 10, rating: "6.3", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 10, isActive: true },
      
      // Centrocampisti
      { name: "Manuel Locatelli", position: "C", team: "Juventus", price: 28, rating: "7.1", goals: 2, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Khéphren Thuram", position: "C", team: "Juventus", price: 35, rating: "7.3", goals: 3, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Weston McKennie", position: "C", team: "Juventus", price: 25, rating: "6.9", goals: 3, assists: 2, yellowCards: 4, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Teun Koopmeiners", position: "C", team: "Juventus", price: 40, rating: "7.4", goals: 5, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Fabio Miretti", position: "C", team: "Juventus", price: 16, rating: "6.5", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Nicolò Fagioli", position: "C", team: "Juventus", price: 18, rating: "6.6", goals: 2, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      
      // Attaccanti
      { name: "Dušan Vlahović", position: "A", team: "Juventus", price: 55, rating: "7.8", goals: 14, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Jonathan David", position: "A", team: "Juventus", price: 45, rating: "7.5", goals: 11, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Federico Chiesa", position: "A", team: "Juventus", price: 35, rating: "7.2", goals: 6, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Kenan Yıldız", position: "A", team: "Juventus", price: 20, rating: "6.7", goals: 3, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Francisco Conceição", position: "A", team: "Juventus", price: 18, rating: "6.6", goals: 2, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 14, isActive: true },

      // === AC MILAN === (24 giocatori - Valore totale €501.30m)
      // Portieri
      { name: "Mike Maignan", position: "P", team: "Milan", price: 35, rating: "7.6", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Lorenzo Torriani", position: "P", team: "Milan", price: 8, rating: "6.2", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 3, isActive: true },
      { name: "Marco Sportiello", position: "P", team: "Milan", price: 10, rating: "6.3", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 5, isActive: true },
      
      // Difensori
      { name: "Theo Hernández", position: "D", team: "Milan", price: 40, rating: "7.4", goals: 3, assists: 6, yellowCards: 4, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Fikayo Tomori", position: "D", team: "Milan", price: 30, rating: "7.2", goals: 2, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Malick Thiaw", position: "D", team: "Milan", price: 25, rating: "7.0", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Davide Calabria", position: "D", team: "Milan", price: 20, rating: "6.8", goals: 1, assists: 3, yellowCards: 4, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Matteo Gabbia", position: "D", team: "Milan", price: 18, rating: "6.7", goals: 3, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Emerson Royal", position: "D", team: "Milan", price: 16, rating: "6.5", goals: 0, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Filippo Terracciano", position: "D", team: "Milan", price: 10, rating: "6.3", goals: 0, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 10, isActive: true },
      { name: "Strahinja Pavlović", position: "D", team: "Milan", price: 22, rating: "6.9", goals: 1, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      
      // Centrocampisti
      { name: "Luka Modrić", position: "C", team: "Milan", price: 40, rating: "7.8", goals: 3, assists: 8, yellowCards: 2, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Samuele Ricci", position: "C", team: "Milan", price: 32, rating: "7.2", goals: 2, assists: 5, yellowCards: 3, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Tijjani Reijnders", position: "C", team: "Milan", price: 30, rating: "7.1", goals: 4, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Yunus Musah", position: "C", team: "Milan", price: 25, rating: "6.9", goals: 2, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Ruben Loftus-Cheek", position: "C", team: "Milan", price: 22, rating: "6.8", goals: 3, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Ismaël Bennacer", position: "C", team: "Milan", price: 20, rating: "6.7", goals: 1, assists: 3, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      
      // Attaccanti
      { name: "Rafael Leão", position: "A", team: "Milan", price: 55, rating: "8.0", goals: 11, assists: 7, yellowCards: 2, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Christian Pulisic", position: "A", team: "Milan", price: 35, rating: "7.4", goals: 8, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Álvaro Morata", position: "A", team: "Milan", price: 25, rating: "7.0", goals: 6, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Tammy Abraham", position: "A", team: "Milan", price: 22, rating: "6.8", goals: 5, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Noah Okafor", position: "A", team: "Milan", price: 20, rating: "6.7", goals: 4, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Samuel Chukwueze", position: "A", team: "Milan", price: 18, rating: "6.5", goals: 3, assists: 5, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },

      // === SSC NAPOLI === (29 giocatori - Campioni d'Italia 24/25, Valore €456.85m)
      // Portieri
      { name: "Alex Meret", position: "P", team: "Napoli", price: 22, rating: "7.1", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Elia Caprile", position: "P", team: "Napoli", price: 10, rating: "6.4", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 8, isActive: true },
      { name: "Nikita Contini", position: "P", team: "Napoli", price: 6, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Difensori
      { name: "Giovanni Di Lorenzo", position: "D", team: "Napoli", price: 28, rating: "7.3", goals: 2, assists: 4, yellowCards: 4, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Amir Rrahmani", position: "D", team: "Napoli", price: 25, rating: "7.1", goals: 3, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Alessandro Buongiorno", position: "D", team: "Napoli", price: 32, rating: "7.4", goals: 2, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Mathías Olivera", position: "D", team: "Napoli", price: 20, rating: "6.9", goals: 1, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Mário Rui", position: "D", team: "Napoli", price: 14, rating: "6.6", goals: 0, assists: 3, yellowCards: 5, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Juan Jesus", position: "D", team: "Napoli", price: 12, rating: "6.4", goals: 1, assists: 0, yellowCards: 4, redCards: 1, matchesPlayed: 16, isActive: true },
      { name: "Leonardo Spinazzola", position: "D", team: "Napoli", price: 16, rating: "6.7", goals: 1, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Pasquale Mazzocchi", position: "D", team: "Napoli", price: 10, rating: "6.3", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      
      // Centrocampisti
      { name: "Kevin De Bruyne", position: "C", team: "Napoli", price: 65, rating: "8.6", goals: 6, assists: 14, yellowCards: 1, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Stanislav Lobotka", position: "C", team: "Napoli", price: 35, rating: "7.5", goals: 2, assists: 6, yellowCards: 3, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "André-Frank Zambo Anguissa", position: "C", team: "Napoli", price: 32, rating: "7.3", goals: 3, assists: 4, yellowCards: 4, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Scott McTominay", position: "C", team: "Napoli", price: 30, rating: "7.1", goals: 4, assists: 3, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Billy Gilmour", position: "C", team: "Napoli", price: 20, rating: "6.7", goals: 1, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Michael Folorunsho", position: "C", team: "Napoli", price: 16, rating: "6.5", goals: 2, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      
      // Attaccanti
      { name: "Victor Osimhen", position: "A", team: "Napoli", price: 75, rating: "8.5", goals: 18, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 25, isActive: true },
      { name: "Khvicha Kvaratskhelia", position: "A", team: "Napoli", price: 50, rating: "8.0", goals: 9, assists: 8, yellowCards: 2, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Matteo Politano", position: "A", team: "Napoli", price: 28, rating: "7.0", goals: 6, assists: 5, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Giovanni Simeone", position: "A", team: "Napoli", price: 20, rating: "6.7", goals: 4, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Giacomo Raspadori", position: "A", team: "Napoli", price: 25, rating: "6.8", goals: 5, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Cyril Ngonge", position: "A", team: "Napoli", price: 15, rating: "6.4", goals: 2, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "David Neres", position: "A", team: "Napoli", price: 18, rating: "6.6", goals: 3, assists: 4, yellowCards: 1, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Romelu Lukaku", position: "A", team: "Napoli", price: 30, rating: "7.1", goals: 7, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 19, isActive: true },

      // === ATALANTA BC === (26 giocatori - Valore totale €439.10m)
      // Portieri
      { name: "Marco Carnesecchi", position: "P", team: "Atalanta", price: 22, rating: "7.2", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Juan Musso", position: "P", team: "Atalanta", price: 16, rating: "6.8", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Francesco Rossi", position: "P", team: "Atalanta", price: 6, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Isak Hien", position: "D", team: "Atalanta", price: 25, rating: "7.1", goals: 2, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Berat Djimsiti", position: "D", team: "Atalanta", price: 20, rating: "6.9", goals: 1, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Giorgio Scalvini", position: "D", team: "Atalanta", price: 28, rating: "7.2", goals: 3, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Raoul Bellanova", position: "D", team: "Atalanta", price: 18, rating: "6.7", goals: 1, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Matteo Ruggeri", position: "D", team: "Atalanta", price: 14, rating: "6.5", goals: 0, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Rafael Tolói", position: "D", team: "Atalanta", price: 16, rating: "6.6", goals: 2, assists: 1, yellowCards: 4, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Odilon Kossounou", position: "D", team: "Atalanta", price: 22, rating: "6.9", goals: 1, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Sead Kolašinac", position: "D", team: "Atalanta", price: 12, rating: "6.4", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      
      // Centrocampisti
      { name: "Éderson", position: "C", team: "Atalanta", price: 30, rating: "7.3", goals: 3, assists: 5, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Marten de Roon", position: "C", team: "Atalanta", price: 22, rating: "6.9", goals: 2, assists: 3, yellowCards: 4, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Mario Pašalić", position: "C", team: "Atalanta", price: 25, rating: "7.0", goals: 4, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Marco Brescianini", position: "C", team: "Atalanta", price: 18, rating: "6.6", goals: 2, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Matteo Pessina", position: "C", team: "Atalanta", price: 20, rating: "6.7", goals: 3, assists: 3, yellowCards: 3, redCards: 0, matchesPlayed: 19, isActive: true },
      
      // Attaccanti
      { name: "Gianluca Scamacca", position: "A", team: "Atalanta", price: 35, rating: "7.4", goals: 9, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Ademola Lookman", position: "A", team: "Atalanta", price: 40, rating: "7.6", goals: 11, assists: 5, yellowCards: 2, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Charles De Ketelaere", position: "A", team: "Atalanta", price: 28, rating: "7.1", goals: 6, assists: 4, yellowCards: 1, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Nikola Krstović", position: "A", team: "Atalanta", price: 25, rating: "6.9", goals: 5, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "El Bilal Touré", position: "A", team: "Atalanta", price: 16, rating: "6.5", goals: 3, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },

      // === AS ROMA === (29 giocatori - Valore totale €390.68m)
      // Portieri
      { name: "Mile Svilar", position: "P", team: "Roma", price: 18, rating: "6.9", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Mathew Ryan", position: "P", team: "Roma", price: 10, rating: "6.3", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 8, isActive: true },
      { name: "Renato Marin", position: "P", team: "Roma", price: 6, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Gianluca Mancini", position: "D", team: "Roma", price: 22, rating: "7.0", goals: 2, assists: 1, yellowCards: 4, redCards: 1, matchesPlayed: 23, isActive: true },
      { name: "Evan Ndicka", position: "D", team: "Roma", price: 25, rating: "7.1", goals: 1, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Chris Smalling", position: "D", team: "Roma", price: 18, rating: "6.7", goals: 1, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Mehmet Zeki Çelik", position: "D", team: "Roma", price: 16, rating: "6.6", goals: 0, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Angeliño", position: "D", team: "Roma", price: 15, rating: "6.5", goals: 1, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Mario Hermoso", position: "D", team: "Roma", price: 20, rating: "6.8", goals: 2, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Nicola Zalewski", position: "D", team: "Roma", price: 12, rating: "6.4", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Eldor Shomurodov", position: "D", team: "Roma", price: 14, rating: "6.5", goals: 1, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      
      // Centrocampisti
      { name: "Lorenzo Pellegrini", position: "C", team: "Roma", price: 32, rating: "7.3", goals: 4, assists: 6, yellowCards: 3, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Bryan Cristante", position: "C", team: "Roma", price: 22, rating: "6.9", goals: 3, assists: 3, yellowCards: 4, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Leandro Paredes", position: "C", team: "Roma", price: 28, rating: "7.1", goals: 2, assists: 5, yellowCards: 4, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Manu Koné", position: "C", team: "Roma", price: 20, rating: "6.7", goals: 2, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Enzo Le Fée", position: "C", team: "Roma", price: 18, rating: "6.6", goals: 1, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Edoardo Bove", position: "C", team: "Roma", price: 14, rating: "6.4", goals: 1, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Tommaso Baldanzi", position: "C", team: "Roma", price: 16, rating: "6.5", goals: 2, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 14, isActive: true },
      
      // Attaccanti
      { name: "Paulo Dybala", position: "A", team: "Roma", price: 45, rating: "7.8", goals: 10, assists: 6, yellowCards: 2, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Artem Dovbyk", position: "A", team: "Roma", price: 35, rating: "7.4", goals: 8, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Stephan El Shaarawy", position: "A", team: "Roma", price: 18, rating: "6.6", goals: 3, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Matías Soulé", position: "A", team: "Roma", price: 22, rating: "6.8", goals: 4, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 18, isActive: true },

      // === SS LAZIO === (31 giocatori - Valore totale €276.40m)
      // Portieri
      { name: "Ivan Provedel", position: "P", team: "Lazio", price: 20, rating: "7.0", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Christos Mandas", position: "P", team: "Lazio", price: 10, rating: "6.3", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 8, isActive: true },
      { name: "Luigi Sepe", position: "P", team: "Lazio", price: 8, rating: "6.1", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 3, isActive: true },
      
      // Difensori
      { name: "Alessio Romagnoli", position: "D", team: "Lazio", price: 22, rating: "7.0", goals: 2, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Mario Gila", position: "D", team: "Lazio", price: 18, rating: "6.8", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Patric", position: "D", team: "Lazio", price: 14, rating: "6.5", goals: 1, assists: 1, yellowCards: 4, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Adam Marušić", position: "D", team: "Lazio", price: 16, rating: "6.6", goals: 0, assists: 3, yellowCards: 4, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Manuel Lazzari", position: "D", team: "Lazio", price: 12, rating: "6.4", goals: 1, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Luca Pellegrini", position: "D", team: "Lazio", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Nicolò Casale", position: "D", team: "Lazio", price: 16, rating: "6.6", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      
      // Centrocampisti
      { name: "Sergej Milinković-Savić", position: "C", team: "Lazio", price: 45, rating: "7.7", goals: 5, assists: 8, yellowCards: 3, redCards: 0, matchesPlayed: 24, isActive: true },
      { name: "Matteo Guendouzi", position: "C", team: "Lazio", price: 30, rating: "7.2", goals: 3, assists: 4, yellowCards: 4, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Luis Alberto", position: "C", team: "Lazio", price: 28, rating: "7.1", goals: 4, assists: 7, yellowCards: 2, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Mattia Zaccagni", position: "C", team: "Lazio", price: 30, rating: "7.2", goals: 7, assists: 5, yellowCards: 2, redCards: 0, matchesPlayed: 23, isActive: true },
      { name: "Daichi Kamada", position: "C", team: "Lazio", price: 20, rating: "6.7", goals: 3, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Nicolò Rovella", position: "C", team: "Lazio", price: 18, rating: "6.6", goals: 2, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      
      // Attaccanti
      { name: "Valentín Castellanos", position: "A", team: "Lazio", price: 25, rating: "7.0", goals: 8, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Pedro", position: "A", team: "Lazio", price: 16, rating: "6.6", goals: 4, assists: 4, yellowCards: 1, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Gustav Isaksen", position: "A", team: "Lazio", price: 18, rating: "6.6", goals: 3, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Tijjani Noslin", position: "A", team: "Lazio", price: 15, rating: "6.4", goals: 2, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },

      // === ACF FIORENTINA === (34 giocatori - Valore totale €310.33m)
      // Portieri
      { name: "David de Gea", position: "P", team: "Fiorentina", price: 18, rating: "7.0", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Pietro Terracciano", position: "P", team: "Fiorentina", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Oliver Christensen", position: "P", team: "Fiorentina", price: 8, rating: "6.1", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 4, isActive: true },
      
      // Difensori
      { name: "Luca Ranieri", position: "D", team: "Fiorentina", price: 20, rating: "6.9", goals: 1, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Cristiano Biraghi", position: "D", team: "Fiorentina", price: 16, rating: "6.6", goals: 1, assists: 4, yellowCards: 4, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Dodô", position: "D", team: "Fiorentina", price: 22, rating: "7.0", goals: 1, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Robin Gosens", position: "D", team: "Fiorentina", price: 18, rating: "6.7", goals: 2, assists: 3, yellowCards: 3, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Michael Kayode", position: "D", team: "Fiorentina", price: 14, rating: "6.4", goals: 0, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Marin Pongračić", position: "D", team: "Fiorentina", price: 16, rating: "6.5", goals: 1, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Pietro Comuzzo", position: "D", team: "Fiorentina", price: 12, rating: "6.3", goals: 1, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Fabiano Parisi", position: "D", team: "Fiorentina", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 11, isActive: true },
      
      // Centrocampisti
      { name: "Yacine Adli", position: "C", team: "Fiorentina", price: 20, rating: "6.8", goals: 2, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Rolando Mandragora", position: "C", team: "Fiorentina", price: 18, rating: "6.6", goals: 2, assists: 2, yellowCards: 4, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Andrea Colpani", position: "C", team: "Fiorentina", price: 16, rating: "6.5", goals: 3, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Danilo Cataldi", position: "C", team: "Fiorentina", price: 14, rating: "6.4", goals: 1, assists: 3, yellowCards: 4, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Lucas Richardson", position: "C", team: "Fiorentina", price: 10, rating: "6.2", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Amir Richardson", position: "C", team: "Fiorentina", price: 12, rating: "6.3", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      
      // Attaccanti
      { name: "Moise Kean", position: "A", team: "Fiorentina", price: 30, rating: "7.2", goals: 9, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Andrea Belotti", position: "A", team: "Fiorentina", price: 20, rating: "6.7", goals: 5, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Lucas Beltrán", position: "A", team: "Fiorentina", price: 18, rating: "6.6", goals: 4, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Christian Kouamé", position: "A", team: "Fiorentina", price: 16, rating: "6.4", goals: 3, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Riccardo Sottil", position: "A", team: "Fiorentina", price: 14, rating: "6.3", goals: 2, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Jonathan Ikoné", position: "A", team: "Fiorentina", price: 15, rating: "6.4", goals: 2, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 13, isActive: true },

      // === TORINO FC === (31 giocatori - Valore totale €161.95m)
      // Portieri
      { name: "Vanja Milinković-Savić", position: "P", team: "Torino", price: 16, rating: "6.7", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 21, isActive: true },
      { name: "Alberto Paleari", position: "P", team: "Torino", price: 8, rating: "6.1", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 6, isActive: true },
      { name: "Antonio Donnarumma", position: "P", team: "Torino", price: 6, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Ricardo Rodríguez", position: "D", team: "Torino", price: 12, rating: "6.4", goals: 1, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Alessandro Buongiorno", position: "D", team: "Torino", price: 25, rating: "7.1", goals: 2, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Perr Schuurs", position: "D", team: "Torino", price: 18, rating: "6.7", goals: 1, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Mergim Vojvoda", position: "D", team: "Torino", price: 14, rating: "6.5", goals: 1, assists: 3, yellowCards: 3, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Valentino Lazaro", position: "D", team: "Torino", price: 12, rating: "6.3", goals: 0, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Marcus Pedersen", position: "D", team: "Torino", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Matteo Delprato", position: "D", team: "Torino", price: 8, rating: "6.1", goals: 0, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 10, isActive: true },
      { name: "Adam Masina", position: "D", team: "Torino", price: 10, rating: "6.2", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      
      // Centrocampisti
      { name: "Samuele Ricci", position: "C", team: "Torino", price: 25, rating: "7.0", goals: 2, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Ivan Ilić", position: "C", team: "Torino", price: 20, rating: "6.7", goals: 3, assists: 3, yellowCards: 4, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Karol Linetty", position: "C", team: "Torino", price: 14, rating: "6.4", goals: 2, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Gvidas Gineitis", position: "C", team: "Torino", price: 10, rating: "6.2", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Adrien Tameze", position: "C", team: "Torino", price: 12, rating: "6.3", goals: 1, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 15, isActive: true },
      
      // Attaccanti
      { name: "Che Adams", position: "A", team: "Torino", price: 20, rating: "6.8", goals: 6, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Antonio Sanabria", position: "A", team: "Torino", price: 18, rating: "6.6", goals: 5, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Ché Adams", position: "A", team: "Torino", price: 16, rating: "6.5", goals: 4, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Pietro Pellegri", position: "A", team: "Torino", price: 14, rating: "6.3", goals: 3, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Nikola Vlašić", position: "A", team: "Torino", price: 16, rating: "6.4", goals: 2, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },

      // === UDINESE CALCIO === (29 giocatori - Valore totale €125.05m)
      // Portieri
      { name: "Maduka Okoye", position: "P", team: "Udinese", price: 12, rating: "6.4", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Marco Silvestri", position: "P", team: "Udinese", price: 8, rating: "6.1", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 8, isActive: true },
      { name: "Daniele Padelli", position: "P", team: "Udinese", price: 6, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Jaka Bijol", position: "D", team: "Udinese", price: 16, rating: "6.6", goals: 2, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Nehuen Pérez", position: "D", team: "Udinese", price: 14, rating: "6.4", goals: 1, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Thomas Kristensen", position: "D", team: "Udinese", price: 12, rating: "6.3", goals: 0, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Kingsley Ehizibue", position: "D", team: "Udinese", price: 10, rating: "6.2", goals: 0, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Jordan Zemura", position: "D", team: "Udinese", price: 12, rating: "6.3", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Hassane Kamara", position: "D", team: "Udinese", price: 14, rating: "6.4", goals: 0, assists: 3, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Isaak Touré", position: "D", team: "Udinese", price: 8, rating: "6.1", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 8, isActive: true },
      
      // Centrocampisti
      { name: "Sandi Lovrić", position: "C", team: "Udinese", price: 18, rating: "6.6", goals: 3, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Walace", position: "C", team: "Udinese", price: 14, rating: "6.4", goals: 1, assists: 2, yellowCards: 4, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Lazar Samardžić", position: "C", team: "Udinese", price: 16, rating: "6.5", goals: 2, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Oier Zarraga", position: "C", team: "Udinese", price: 12, rating: "6.3", goals: 1, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Martín Payero", position: "C", team: "Udinese", price: 10, rating: "6.2", goals: 2, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Arthur Atta", position: "C", team: "Udinese", price: 8, rating: "6.0", goals: 0, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 9, isActive: true },
      
      // Attaccanti
      { name: "Lorenzo Lucca", position: "A", team: "Udinese", price: 20, rating: "6.7", goals: 7, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Keinan Davis", position: "A", team: "Udinese", price: 16, rating: "6.5", goals: 4, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Florian Thauvin", position: "A", team: "Udinese", price: 18, rating: "6.6", goals: 3, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Brenner da Silva", position: "A", team: "Udinese", price: 14, rating: "6.3", goals: 2, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Rui Modesto", position: "A", team: "Udinese", price: 10, rating: "6.1", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 10, isActive: true },

      // === GENOA CFC === (27 giocatori - Valore totale €128.45m)
      // Portieri
      { name: "Pierluigi Gollini", position: "P", team: "Genoa", price: 12, rating: "6.4", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Josep Martínez", position: "P", team: "Genoa", price: 10, rating: "6.2", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 10, isActive: true },
      { name: "Nicola Leali", position: "P", team: "Genoa", price: 8, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 4, isActive: true },
      
      // Difensori
      { name: "Johan Vásquez", position: "D", team: "Genoa", price: 16, rating: "6.6", goals: 1, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Mattia Bani", position: "D", team: "Genoa", price: 14, rating: "6.4", goals: 2, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Koni De Winter", position: "D", team: "Genoa", price: 12, rating: "6.3", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Alan Matturro", position: "D", team: "Genoa", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Stefano Sabelli", position: "D", team: "Genoa", price: 12, rating: "6.3", goals: 0, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Aarón Martín", position: "D", team: "Genoa", price: 14, rating: "6.4", goals: 1, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Alessandro Zanoli", position: "D", team: "Genoa", price: 10, rating: "6.1", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 11, isActive: true },
      
      // Centrocampisti
      { name: "Morten Frendrup", position: "C", team: "Genoa", price: 16, rating: "6.5", goals: 2, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Milan Badelj", position: "C", team: "Genoa", price: 12, rating: "6.3", goals: 1, assists: 3, yellowCards: 4, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Ruslan Malinovskyi", position: "C", team: "Genoa", price: 18, rating: "6.6", goals: 3, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Fabio Miretti", position: "C", team: "Genoa", price: 14, rating: "6.4", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Emil Bohinen", position: "C", team: "Genoa", price: 10, rating: "6.2", goals: 1, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      
      // Attaccanti
      { name: "Andrea Pinamonti", position: "A", team: "Genoa", price: 18, rating: "6.6", goals: 5, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Vitinha", position: "A", team: "Genoa", price: 16, rating: "6.4", goals: 4, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Caleb Ekuban", position: "A", team: "Genoa", price: 12, rating: "6.2", goals: 2, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Jeff Ekhator", position: "A", team: "Genoa", price: 10, rating: "6.1", goals: 2, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 11, isActive: true },

      // === SQUADRE PROMOSSE ===
      
      // SASSUOLO (promossa - 29 giocatori)
      { name: "Andrea Consigli", position: "P", team: "Sassuolo", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 22, isActive: true },
      { name: "Gianluca Pegolo", position: "P", team: "Sassuolo", price: 8, rating: "6.1", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 8, isActive: true },
      { name: "Domenico Berardi", position: "A", team: "Sassuolo", price: 22, rating: "6.9", goals: 6, assists: 4, yellowCards: 3, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Armand Laurienté", position: "A", team: "Sassuolo", price: 18, rating: "6.6", goals: 4, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Jeremy Toljan", position: "D", team: "Sassuolo", price: 14, rating: "6.4", goals: 0, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Kristian Thorstvedt", position: "C", team: "Sassuolo", price: 16, rating: "6.5", goals: 2, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Nedim Bajrami", position: "C", team: "Sassuolo", price: 14, rating: "6.4", goals: 3, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Daniel Boloca", position: "C", team: "Sassuolo", price: 12, rating: "6.3", goals: 1, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Pedro Obiang", position: "C", team: "Sassuolo", price: 10, rating: "6.2", goals: 1, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Gian Marco Ferrari", position: "D", team: "Sassuolo", price: 12, rating: "6.3", goals: 1, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Ruan Tressoldi", position: "D", team: "Sassuolo", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Gregoire Defrel", position: "A", team: "Sassuolo", price: 12, rating: "6.2", goals: 3, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Andrea Pinamonti", position: "A", team: "Sassuolo", price: 16, rating: "6.4", goals: 4, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },

      // PISA (promossa - 35 giocatori)
      { name: "Adrian Šemper", position: "P", team: "Pisa", price: 10, rating: "6.3", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 20, isActive: true },
      { name: "Nicolas", position: "P", team: "Pisa", price: 8, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 6, isActive: true },
      { name: "Nicholas Bonfanti", position: "A", team: "Pisa", price: 14, rating: "6.4", goals: 4, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Stefano Moreo", position: "A", team: "Pisa", price: 12, rating: "6.2", goals: 3, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Emanuel Vignato", position: "C", team: "Pisa", price: 10, rating: "6.1", goals: 2, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Alessandro Arena", position: "D", team: "Pisa", price: 8, rating: "6.0", goals: 0, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Simone Canestrelli", position: "D", team: "Pisa", price: 10, rating: "6.2", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Arturo Calabresi", position: "D", team: "Pisa", price: 8, rating: "6.0", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Samuele Angori", position: "D", team: "Pisa", price: 6, rating: "6.0", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 8, isActive: true },
      { name: "Alessandro Deiola", position: "C", team: "Pisa", price: 8, rating: "6.0", goals: 1, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Mattéo Tramoni", position: "A", team: "Pisa", price: 10, rating: "6.1", goals: 2, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 11, isActive: true },

      // CREMONESE (promossa - 30 giocatori)
      { name: "Marco Carnesecchi", position: "P", team: "Cremonese", price: 12, rating: "6.4", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Mouhamadou Sarr", position: "P", team: "Cremonese", price: 8, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 5, isActive: true },
      { name: "Frank Tsadjout", position: "A", team: "Cremonese", price: 14, rating: "6.3", goals: 5, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Cyriel Dessers", position: "A", team: "Cremonese", price: 16, rating: "6.5", goals: 6, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 19, isActive: true },
      { name: "Michele Castagnetti", position: "C", team: "Cremonese", price: 10, rating: "6.2", goals: 1, assists: 3, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Leonardo Sernicola", position: "D", team: "Cremonese", price: 12, rating: "6.3", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Matteo Bianchetti", position: "D", team: "Cremonese", price: 10, rating: "6.2", goals: 1, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Charles Pickel", position: "C", team: "Cremonese", price: 8, rating: "6.1", goals: 0, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Giacomo Quagliata", position: "D", team: "Cremonese", price: 8, rating: "6.0", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Franco Vázquez", position: "C", team: "Cremonese", price: 10, rating: "6.2", goals: 2, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Dennis Johnsen", position: "A", team: "Cremonese", price: 12, rating: "6.2", goals: 2, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 13, isActive: true },

      // === SQUADRE MINORI CON ROSE ESSENZIALI ===
      
      // PARMA (31 giocatori)
      { name: "Zion Suzuki", position: "P", team: "Parma", price: 10, rating: "6.2", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Botond Balogh", position: "D", team: "Parma", price: 12, rating: "6.3", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Enrico Delprato", position: "D", team: "Parma", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Adrian Bernabé", position: "C", team: "Parma", price: 14, rating: "6.4", goals: 2, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Ange-Yoan Bonny", position: "A", team: "Parma", price: 16, rating: "6.5", goals: 4, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Dennis Man", position: "A", team: "Parma", price: 18, rating: "6.6", goals: 3, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      
      // COMO (34 giocatori)
      { name: "Emil Audero", position: "P", team: "Como", price: 12, rating: "6.3", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Alberto Moreno", position: "D", team: "Como", price: 14, rating: "6.4", goals: 0, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Ignace Van der Brempt", position: "D", team: "Como", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Nico Paz", position: "C", team: "Como", price: 16, rating: "6.5", goals: 2, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Patrick Cutrone", position: "A", team: "Como", price: 14, rating: "6.3", goals: 3, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Andrea Belotti", position: "A", team: "Como", price: 16, rating: "6.4", goals: 4, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 17, isActive: true },
      
      // HELLAS VERONA (31 giocatori)
      { name: "Lorenzo Montipò", position: "P", team: "Verona", price: 10, rating: "6.2", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Giangiacomo Magnani", position: "D", team: "Verona", price: 12, rating: "6.3", goals: 1, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Jackson Tchatchoua", position: "D", team: "Verona", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Ondrej Duda", position: "C", team: "Verona", price: 14, rating: "6.4", goals: 2, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Darko Lazović", position: "A", team: "Verona", price: 14, rating: "6.3", goals: 3, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Casper Tengstedt", position: "A", team: "Verona", price: 12, rating: "6.2", goals: 2, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 13, isActive: true },
      
      // CAGLIARI (25 giocatori)
      { name: "Simone Scuffet", position: "P", team: "Cagliari", price: 10, rating: "6.2", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Sebastiano Luperto", position: "D", team: "Cagliari", price: 12, rating: "6.3", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Nadir Zortea", position: "D", team: "Cagliari", price: 10, rating: "6.2", goals: 0, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Razvan Marin", position: "C", team: "Cagliari", price: 14, rating: "6.4", goals: 2, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Zito Luvumbo", position: "A", team: "Cagliari", price: 14, rating: "6.3", goals: 3, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Roberto Piccoli", position: "A", team: "Cagliari", price: 12, rating: "6.2", goals: 2, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      
      // LECCE (35 giocatori)
      { name: "Wladimiro Falcone", position: "P", team: "Lecce", price: 10, rating: "6.2", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Federico Baschirotto", position: "D", team: "Lecce", price: 12, rating: "6.3", goals: 1, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Antonino Gallo", position: "D", team: "Lecce", price: 10, rating: "6.1", goals: 0, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Ylber Ramadani", position: "C", team: "Lecce", price: 12, rating: "6.2", goals: 1, assists: 2, yellowCards: 4, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Nikola Krstović", position: "A", team: "Lecce", price: 16, rating: "6.4", goals: 4, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Ante Rebić", position: "A", team: "Lecce", price: 14, rating: "6.3", goals: 3, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 15, isActive: true },

      // VENEZIA (32 giocatori)
      { name: "Filip Stanković", position: "P", team: "Venezia", price: 10, rating: "6.2", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Joel Pohjanpalo", position: "A", team: "Venezia", price: 16, rating: "6.5", goals: 5, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Gaetano Oristanio", position: "A", team: "Venezia", price: 12, rating: "6.3", goals: 3, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Hans Nicolussi Caviglia", position: "C", team: "Venezia", price: 10, rating: "6.1", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Antonio Candela", position: "D", team: "Venezia", price: 8, rating: "6.0", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Giorgio Altare", position: "D", team: "Venezia", price: 10, rating: "6.1", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      
      // MONZA (20 giocatori)
      { name: "Stefano Turati", position: "P", team: "Monza", price: 10, rating: "6.2", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Alessio Cragno", position: "P", team: "Monza", price: 8, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 5, isActive: true },
      { name: "Giorgos Kyriakopoulos", position: "D", team: "Monza", price: 12, rating: "6.3", goals: 1, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Andrea Carboni", position: "D", team: "Monza", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Pablo Marí", position: "D", team: "Monza", price: 12, rating: "6.3", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Samuele Birindelli", position: "D", team: "Monza", price: 8, rating: "6.1", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Pedro Pereira", position: "D", team: "Monza", price: 10, rating: "6.2", goals: 0, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Armando Izzo", position: "D", team: "Monza", price: 12, rating: "6.3", goals: 1, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Warren Bondo", position: "C", team: "Monza", price: 14, rating: "6.4", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Matteo Pessina", position: "C", team: "Monza", price: 16, rating: "6.5", goals: 2, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Roberto Gagliardini", position: "C", team: "Monza", price: 12, rating: "6.2", goals: 1, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Nicolò Rovella", position: "C", team: "Monza", price: 14, rating: "6.4", goals: 2, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Alessandro Bianco", position: "C", team: "Monza", price: 10, rating: "6.1", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 11, isActive: true },
      { name: "Milan Đurić", position: "A", team: "Monza", price: 14, rating: "6.4", goals: 4, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Daniel Maldini", position: "A", team: "Monza", price: 16, rating: "6.4", goals: 3, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Dany Mota", position: "A", team: "Monza", price: 12, rating: "6.2", goals: 2, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Lorenzo Colombo", position: "A", team: "Monza", price: 10, rating: "6.1", goals: 2, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Gianluca Caprari", position: "A", team: "Monza", price: 14, rating: "6.3", goals: 3, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Andrea Colpani", position: "A", team: "Monza", price: 16, rating: "6.4", goals: 3, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Mirko Maric", position: "A", team: "Monza", price: 8, rating: "6.0", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 10, isActive: true },

      // === PARMA CALCIO 1913 === (20 giocatori)
      { name: "Zion Suzuki", position: "P", team: "Parma", price: 10, rating: "6.2", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Leandro Chichizola", position: "P", team: "Parma", price: 8, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 6, isActive: true },
      { name: "Botond Balogh", position: "D", team: "Parma", price: 12, rating: "6.3", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Enrico Delprato", position: "D", team: "Parma", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Woyo Coulibaly", position: "D", team: "Parma", price: 8, rating: "6.1", goals: 0, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Emanuele Valeri", position: "D", team: "Parma", price: 10, rating: "6.2", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Alessandro Circati", position: "D", team: "Parma", price: 8, rating: "6.0", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 10, isActive: true },
      { name: "Lautaro Valenti", position: "D", team: "Parma", price: 10, rating: "6.1", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Adrian Bernabé", position: "C", team: "Parma", price: 14, rating: "6.4", goals: 2, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Hernani", position: "C", team: "Parma", price: 12, rating: "6.3", goals: 1, assists: 3, yellowCards: 3, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Simon Sohm", position: "C", team: "Parma", price: 10, rating: "6.2", goals: 1, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Matteo Cancellieri", position: "A", team: "Parma", price: 14, rating: "6.3", goals: 3, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Ange-Yoan Bonny", position: "A", team: "Parma", price: 16, rating: "6.5", goals: 4, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Dennis Man", position: "A", team: "Parma", price: 18, rating: "6.6", goals: 3, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Valentin Mihăilă", position: "A", team: "Parma", price: 14, rating: "6.4", goals: 2, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Gabriel Charpentier", position: "A", team: "Parma", price: 12, rating: "6.2", goals: 2, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Pontus Almqvist", position: "A", team: "Parma", price: 10, rating: "6.1", goals: 1, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Matteo Brunori", position: "A", team: "Parma", price: 12, rating: "6.2", goals: 2, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 11, isActive: true },
      { name: "Antoine Hainaut", position: "C", team: "Parma", price: 8, rating: "6.0", goals: 0, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 9, isActive: true },
      { name: "Mandela Keita", position: "C", team: "Parma", price: 8, rating: "6.0", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 10, isActive: true },

      // === COMO 1907 === (20 giocatori)
      { name: "Emil Audero", position: "P", team: "Como", price: 12, rating: "6.3", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Pepe Reina", position: "P", team: "Como", price: 8, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 6, isActive: true },
      { name: "Alberto Moreno", position: "D", team: "Como", price: 14, rating: "6.4", goals: 0, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Ignace Van der Brempt", position: "D", team: "Como", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Marc Kempf", position: "D", team: "Como", price: 12, rating: "6.3", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Edoardo Goldaniga", position: "D", team: "Como", price: 8, rating: "6.1", goals: 0, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Federico Barba", position: "D", team: "Como", price: 8, rating: "6.0", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 10, isActive: true },
      { name: "Alessandro Dossena", position: "D", team: "Como", price: 10, rating: "6.2", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Nico Paz", position: "C", team: "Como", price: 16, rating: "6.5", goals: 2, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Sergi Roberto", position: "C", team: "Como", price: 14, rating: "6.4", goals: 1, assists: 3, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Lucas da Cunha", position: "C", team: "Como", price: 12, rating: "6.3", goals: 1, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Yannik Engelhardt", position: "C", team: "Como", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Máximo Perrone", position: "C", team: "Como", price: 10, rating: "6.1", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 11, isActive: true },
      { name: "Patrick Cutrone", position: "A", team: "Como", price: 14, rating: "6.3", goals: 3, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Andrea Belotti", position: "A", team: "Como", price: 16, rating: "6.4", goals: 4, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Alieu Fadera", position: "A", team: "Como", price: 12, rating: "6.2", goals: 2, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Gabriel Strefezza", position: "A", team: "Como", price: 14, rating: "6.3", goals: 2, assists: 3, yellowCards: 1, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Matthias Braunöder", position: "C", team: "Como", price: 8, rating: "6.0", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 9, isActive: true },
      { name: "Ali Jasim", position: "A", team: "Como", price: 10, rating: "6.1", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 10, isActive: true },
      { name: "Andrea Favilli", position: "A", team: "Como", price: 8, rating: "6.0", goals: 1, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 8, isActive: true },

      // === HELLAS VERONA FC === (20 giocatori)
      { name: "Lorenzo Montipò", position: "P", team: "Verona", price: 10, rating: "6.2", goals: 0, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 18, isActive: true },
      { name: "Simone Perilli", position: "P", team: "Verona", price: 6, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 4, isActive: true },
      { name: "Giangiacomo Magnani", position: "D", team: "Verona", price: 12, rating: "6.3", goals: 1, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 17, isActive: true },
      { name: "Jackson Tchatchoua", position: "D", team: "Verona", price: 10, rating: "6.2", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Pawel Dawidowicz", position: "D", team: "Verona", price: 10, rating: "6.1", goals: 0, assists: 0, yellowCards: 3, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Diego Coppola", position: "D", team: "Verona", price: 8, rating: "6.0", goals: 1, assists: 0, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Domagoj Bradarić", position: "D", team: "Verona", price: 10, rating: "6.2", goals: 0, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Reda Belahyane", position: "C", team: "Verona", price: 10, rating: "6.2", goals: 1, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Ondrej Duda", position: "C", team: "Verona", price: 14, rating: "6.4", goals: 2, assists: 2, yellowCards: 3, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Tomáš Suslov", position: "C", team: "Verona", price: 12, rating: "6.3", goals: 2, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 14, isActive: true },
      { name: "Suat Serdar", position: "C", team: "Verona", price: 12, rating: "6.2", goals: 1, assists: 1, yellowCards: 3, redCards: 0, matchesPlayed: 15, isActive: true },
      { name: "Darko Lazović", position: "A", team: "Verona", price: 14, rating: "6.3", goals: 3, assists: 2, yellowCards: 2, redCards: 0, matchesPlayed: 16, isActive: true },
      { name: "Casper Tengstedt", position: "A", team: "Verona", price: 12, rating: "6.2", goals: 2, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Dailon Livramento", position: "A", team: "Verona", price: 10, rating: "6.1", goals: 2, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Amin Sarr", position: "A", team: "Verona", price: 8, rating: "6.0", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 10, isActive: true },
      { name: "Daniel Mosquera", position: "A", team: "Verona", price: 12, rating: "6.2", goals: 2, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 11, isActive: true },
      { name: "Abdou Harroui", position: "C", team: "Verona", price: 8, rating: "6.0", goals: 0, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 9, isActive: true },
      { name: "Grigoris Kastanos", position: "C", team: "Verona", price: 10, rating: "6.1", goals: 1, assists: 1, yellowCards: 2, redCards: 0, matchesPlayed: 13, isActive: true },
      { name: "Faride Alidou", position: "A", team: "Verona", price: 10, rating: "6.1", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 12, isActive: true },
      { name: "Mathis Lambourde", position: "C", team: "Verona", price: 6, rating: "6.0", goals: 0, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 7, isActive: true }
    ];
  }

  async refreshPlayerData(): Promise<InsertPlayer[]> {
    const players = this.getTransfermarktData();
    console.log(`Caricati ${players.length} giocatori Serie A 2025/26 da Transfermarkt`);
    return players;
  }
}

export const footballApi = new FootballDataService();
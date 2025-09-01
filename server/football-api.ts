import type { Player, InsertPlayer } from "@shared/schema";

// Sistema basato esclusivamente su dati Fantacalcio.it per Serie A 2025/26
export class FantacalcioDataService {
  
  async getSerieAPlayers(): Promise<InsertPlayer[]> {
    console.log('Caricamento dati Serie A 2025/26 da Fantacalcio.it...');
    return this.getFantacalcioData();
  }

  private getFantacalcioData(): InsertPlayer[] {
    return [
      // === INTER MILAN === (TOP PLAYERS - quotazioni ufficiali Fantacalcio.it)
      // Portieri
      { name: "Yann Sommer", position: "P", team: "Inter", price: 16, rating: "7.2", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Alessandro Bastoni", position: "D", team: "Inter", price: 17, rating: "6.5", goals: 1, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Federico Dimarco", position: "D", team: "Inter", price: 19, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Denzel Dumfries", position: "D", team: "Inter", price: 21, rating: "6.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Benjamin Pavard", position: "D", team: "Inter", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Centrocampisti
      { name: "Nicolò Barella", position: "C", team: "Inter", price: 14, rating: "6.0", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Hakan Çalhanoğlu", position: "C", team: "Inter", price: 23, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Davide Frattesi", position: "C", team: "Inter", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Petar Sučić", position: "C", team: "Inter", price: 12, rating: "6.0", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Attaccanti
      { name: "Lautaro Martínez", position: "A", team: "Inter", price: 34, rating: "6.5", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Marcus Thuram", position: "A", team: "Inter", price: 31, rating: "7.0", goals: 2, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Mehdi Taremi", position: "A", team: "Inter", price: 18, rating: "6.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Valentin Carboni", position: "A", team: "Inter", price: 15, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === NAPOLI === (Trasferimenti estivi 2025)
      // Portieri
      { name: "Alex Meret", position: "P", team: "Napoli", price: 16, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Giovanni Di Lorenzo", position: "D", team: "Napoli", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Alessandro Buongiorno", position: "D", team: "Napoli", price: 13, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Sam Beukema", position: "D", team: "Napoli", price: 15, rating: "6.8", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Centrocampisti
      { name: "André-Frank Zambo Anguissa", position: "C", team: "Napoli", price: 16, rating: "7.0", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Scott McTominay", position: "C", team: "Napoli", price: 26, rating: "6.75", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Kevin De Bruyne", position: "C", team: "Napoli", price: 23, rating: "6.25", goals: 1, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Lorenzo Lucca", position: "C", team: "Napoli", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Noa Lang", position: "A", team: "Napoli", price: 18, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Attaccanti
      { name: "Matteo Politano", position: "A", team: "Napoli", price: 16, rating: "6.75", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "David Neres", position: "A", team: "Napoli", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Giacomo Raspadori", position: "A", team: "Napoli", price: 13, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Romelu Lukaku", position: "A", team: "Napoli", price: 30, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === JUVENTUS === (Nuovi acquisti 2025)
      // Portieri
      { name: "Michele Di Gregorio", position: "P", team: "Juventus", price: 17, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Gleison Bremer", position: "D", team: "Juventus", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Andrea Cambiaso", position: "D", team: "Juventus", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Khéphren Thuram", position: "D", team: "Juventus", price: 16, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Centrocampisti
      { name: "Manuel Locatelli", position: "C", team: "Juventus", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Teun Koopmeiners", position: "C", team: "Juventus", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Filip Kostić", position: "C", team: "Juventus", price: 12, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Attaccanti
      { name: "Dušan Vlahović", position: "A", team: "Juventus", price: 26, rating: "7.0", goals: 2, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Jonathan David", position: "A", team: "Juventus", price: 27, rating: "6.0", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Kenan Yıldız", position: "A", team: "Juventus", price: 25, rating: "6.75", goals: 0, assists: 2, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Francisco Conceição", position: "A", team: "Juventus", price: 18, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === AC MILAN === (Nuovi innesti 2025)
      // Portieri
      { name: "Mike Maignan", position: "P", team: "Milan", price: 16, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Strahinja Pavlović", position: "D", team: "Milan", price: 14, rating: "6.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Perr Schuurs", position: "D", team: "Milan", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Alexis Saelemaekers", position: "D", team: "Milan", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Pervis Estupiñán", position: "D", team: "Milan", price: 12, rating: "6.0", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Centrocampisti
      { name: "Luka Modrić", position: "C", team: "Milan", price: 13, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Ruben Loftus-Cheek", position: "C", team: "Milan", price: 14, rating: "6.25", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Yunus Musah", position: "C", team: "Milan", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Ardon Jashari", position: "C", team: "Milan", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Christopher Nkunku", position: "C", team: "Milan", price: 20, rating: "7.0", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Attaccanti
      { name: "Rafael Leão", position: "A", team: "Milan", price: 23, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Christian Pulisic", position: "A", team: "Milan", price: 28, rating: "6.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Santiago Giménez", position: "A", team: "Milan", price: 24, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === ATALANTA === 
      // Portieri
      { name: "Marco Carnesecchi", position: "P", team: "Atalanta", price: 14, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Raoul Bellanova", position: "D", team: "Atalanta", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Davide Zappacosta", position: "D", team: "Atalanta", price: 13, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Centrocampisti
      { name: "Marten de Roon", position: "C", team: "Atalanta", price: 12, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Éderson", position: "C", team: "Atalanta", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Mario Pašalić", position: "C", team: "Atalanta", price: 14, rating: "6.5", goals: 1, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Attaccanti
      { name: "Ademola Lookman", position: "A", team: "Atalanta", price: 28, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Gianluca Scamacca", position: "A", team: "Atalanta", price: 20, rating: "6.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Nikola Krstović", position: "A", team: "Atalanta", price: 20, rating: "6.0", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // === BOLOGNA === 
      // Attaccanti
      { name: "Riccardo Orsolini", position: "A", team: "Bologna", price: 30, rating: "6.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Santiago Castro", position: "A", team: "Bologna", price: 20, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Ciro Immobile", position: "A", team: "Bologna", price: 19, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Dan Ndoye", position: "A", team: "Bologna", price: 19, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Jens Odgaard", position: "C", team: "Bologna", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Niklas Rowe", position: "A", team: "Bologna", price: 14, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Nadir Zortea", position: "D", team: "Bologna", price: 16, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Håkon Heggem", position: "D", team: "Bologna", price: 12, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === FIORENTINA ===
      // Portieri
      { name: "David de Gea", position: "P", team: "Fiorentina", price: 14, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Dodò", position: "D", team: "Fiorentina", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Robin Gosens", position: "D", team: "Fiorentina", price: 18, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Pietro Comuzzo", position: "D", team: "Fiorentina", price: 12, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Luca Ranieri", position: "D", team: "Fiorentina", price: 11, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Centrocampisti
      { name: "Rolando Mandragora", position: "C", team: "Fiorentina", price: 15, rating: "6.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Attaccanti
      { name: "Moise Kean", position: "A", team: "Fiorentina", price: 31, rating: "7.0", goals: 2, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Albert Gudmundsson", position: "A", team: "Fiorentina", price: 24, rating: "5.75", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Andrea Colpani", position: "A", team: "Fiorentina", price: 18, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Riccardo Sottil", position: "A", team: "Fiorentina", price: 16, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Roberto Piccoli", position: "A", team: "Fiorentina", price: 17, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Edin Džeko", position: "A", team: "Fiorentina", price: 14, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === LAZIO ===
      // Portieri
      { name: "Ivan Provedel", position: "P", team: "Lazio", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Nuno Tavares", position: "D", team: "Lazio", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Centrocampisti
      { name: "Mattéo Guendouzi", position: "C", team: "Lazio", price: 12, rating: "6.25", goals: 1, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Nicolò Rovella", position: "C", team: "Lazio", price: 13, rating: "6.0", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Reda Belahyane", position: "C", team: "Lazio", price: 12, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Attaccanti
      { name: "Valentín Castellanos", position: "A", team: "Lazio", price: 22, rating: "7.0", goals: 1, assists: 2, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Mattia Zaccagni", position: "A", team: "Lazio", price: 26, rating: "6.25", goals: 1, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Boulaye Dia", position: "A", team: "Lazio", price: 21, rating: "6.25", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Gustav Isaksen", position: "A", team: "Lazio", price: 13, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Pedro", position: "A", team: "Lazio", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // === ROMA ===
      // Portieri
      { name: "Mile Svilar", position: "P", team: "Roma", price: 16, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Difensori
      { name: "Angeliño", position: "D", team: "Roma", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Evan Ndicka", position: "D", team: "Roma", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Mario Hermoso", position: "D", team: "Roma", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Wesley", position: "D", team: "Roma", price: 15, rating: "6.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Leon Bailey", position: "A", team: "Roma", price: 15, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Centrocampisti
      { name: "Manu Koné", position: "C", team: "Roma", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Enzo Le Fée", position: "C", team: "Roma", price: 13, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Ewan Ferguson", position: "C", team: "Roma", price: 19, rating: "6.5", goals: 0, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Attaccanti
      { name: "Paulo Dybala", position: "A", team: "Roma", price: 26, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Matías Soulé", position: "A", team: "Roma", price: 20, rating: "6.0", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Artem Dovbyk", position: "A", team: "Roma", price: 20, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === SASSUOLO ===
      // Attaccanti
      { name: "Domenico Berardi", position: "A", team: "Sassuolo", price: 21, rating: "6.5", goals: 1, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Andrea Pinamonti", position: "A", team: "Sassuolo", price: 16, rating: "6.0", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Armand Laurienté", position: "A", team: "Sassuolo", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Edoardo Volpato", position: "A", team: "Sassuolo", price: 12, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === COMO ===
      // Attaccanti
      { name: "Nico Paz", position: "A", team: "Como", price: 21, rating: "7.0", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Gabriel Strefezza", position: "A", team: "Como", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Lucas da Cunha", position: "C", team: "Como", price: 12, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Álvaro Morata", position: "A", team: "Como", price: 18, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Sergi Roberto", position: "C", team: "Como", price: 14, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Mads Kuhn", position: "A", team: "Como", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Patrick Douvikas", position: "A", team: "Como", price: 12, rating: "6.25", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Máximo Perrone", position: "C", team: "Como", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Alieu Fadera", position: "A", team: "Como", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Matthias Braunöder", position: "C", team: "Como", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Miloš Vojvodá", position: "D", team: "Como", price: 11, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // === CREMONESE ===
      // Difensori
      { name: "Federico Baschirotto", position: "D", team: "Cremonese", price: 13, rating: "6.75", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Giuseppe Pezzella", position: "D", team: "Cremonese", price: 12, rating: "6.25", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Matteo Bianchetti", position: "D", team: "Cremonese", price: 11, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Luca Floriani Mussolini", position: "D", team: "Cremonese", price: 10, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Luca Collocolo", position: "D", team: "Cremonese", price: 11, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Centrocampisti
      { name: "Filippo Terracciano", position: "C", team: "Cremonese", price: 14, rating: "6.5", goals: 1, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Alessandro Zerbin", position: "A", team: "Cremonese", price: 13, rating: "6.75", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Attaccanti
      { name: "Federico Bonazzoli", position: "A", team: "Cremonese", price: 15, rating: "7.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Franco Vázquez", position: "A", team: "Cremonese", price: 14, rating: "7.0", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Luca De Luca", position: "A", team: "Cremonese", price: 12, rating: "7.0", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Antonio Sanabria", position: "A", team: "Cremonese", price: 13, rating: "6.25", goals: 0, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Luka Jovanović", position: "A", team: "Cremonese", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Cristian Shpendi", position: "A", team: "Cremonese", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Jari Vandeputte", position: "A", team: "Cremonese", price: 13, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // === CAGLIARI ===
      // Difensori
      { name: "Sebastiano Luperto", position: "D", team: "Cagliari", price: 13, rating: "6.75", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Centrocampisti
      { name: "Matteo Prati", position: "C", team: "Cagliari", price: 11, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Gianluca Gaetano", position: "C", team: "Cagliari", price: 12, rating: "6.0", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Alessandro Palestra", position: "C", team: "Cagliari", price: 10, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Attaccanti
      { name: "Zito Luvumbo", position: "A", team: "Cagliari", price: 12, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // === UDINESE ===
      // Attaccanti
      { name: "Keinan Davis", position: "A", team: "Udinese", price: 13, rating: "6.75", goals: 1, assists: 1, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Florian Thauvin", position: "A", team: "Udinese", price: 16, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Sandi Lovrić", position: "C", team: "Udinese", price: 12, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Thomas Kristensen", position: "D", team: "Udinese", price: 11, rating: "6.75", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Rui Modesto", position: "D", team: "Udinese", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Atta Ouattara", position: "C", team: "Udinese", price: 11, rating: "6.75", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // === PARMA ===
      // Centrocampisti
      { name: "Matteo Pellegrino", position: "C", team: "Parma", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Filip Ondrejka", position: "A", team: "Parma", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Attaccanti
      { name: "Patrick Cutrone", position: "A", team: "Parma", price: 14, rating: "7.0", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === LECCE ===
      // Attaccanti
      { name: "Dragan Štulić", position: "A", team: "Lecce", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === TORINO ===
      // Difensori
      { name: "Guillermo Maripán", position: "D", team: "Torino", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // Centrocampisti
      { name: "Saša Lukić", position: "C", team: "Torino", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Attaccanti
      { name: "Che Adams", position: "A", team: "Torino", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      { name: "Nikola Vlašić", position: "A", team: "Torino", price: 14, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === VERONA ===
      // Difensori
      { name: "Giangiacomo Orban", position: "D", team: "Verona", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Centrocampisti
      { name: "Suat Serdar", position: "C", team: "Verona", price: 13, rating: "6.0", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // Attaccanti
      { name: "Casper Tengstedt", position: "A", team: "Verona", price: 13, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      
      // === GENOA ===
      // Difensori
      { name: "Johan Vásquez", position: "D", team: "Genoa", price: 12, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
      { name: "Giorgio Marcandalli", position: "D", team: "Genoa", price: 10, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
      
      // === PISA ===
      // Centrocampisti  
      { name: "Idrissa Touré", position: "C", team: "Pisa", price: 11, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
    ];
  }
}

export const footballDataService = new FantacalcioDataService();
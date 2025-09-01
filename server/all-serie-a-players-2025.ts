// Database unificato giocatori Serie A 2025/26
// Dati aggiornati da Fantacalcio.it - Settembre 2025
// Organizzati per ruolo: P (Portieri), D (Difensori), C (Centrocampisti), A (Attaccanti)
// Senza duplicati - Dati mercato estivo 2025

import { attaccantiSerieA2025 } from './attaccanti-serie-a-2025';

export const allSerieAPlayers2025 = [
  // === PORTIERI (P) ===
  // Inter
  { name: "Yann Sommer", position: "P", team: "Inter", price: 16, rating: "7.2", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Emil Audero", position: "P", team: "Inter", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  { name: "Raffaele Di Gennaro", position: "P", team: "Inter", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Napoli
  { name: "Alex Meret", position: "P", team: "Napoli", price: 16, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Hubert Idasiak", position: "P", team: "Napoli", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  { name: "Gennaro Contini", position: "P", team: "Napoli", price: 9, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Juventus
  { name: "Michele Di Gregorio", position: "P", team: "Juventus", price: 17, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Mattia Perin", position: "P", team: "Juventus", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  { name: "Wojciech Szczęsny", position: "P", team: "Juventus", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Milan
  { name: "Mike Maignan", position: "P", team: "Milan", price: 16, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Antonio Mirante", position: "P", team: "Milan", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  { name: "Marco Sportiello", position: "P", team: "Milan", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Atalanta
  { name: "Marco Carnesecchi", position: "P", team: "Atalanta", price: 14, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Francesco Rossi", position: "P", team: "Atalanta", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  { name: "Juan Musso", position: "P", team: "Atalanta", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Bologna
  { name: "Łukasz Skorupski", position: "P", team: "Bologna", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Federico Ravaglia", position: "P", team: "Bologna", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Fiorentina
  { name: "David de Gea", position: "P", team: "Fiorentina", price: 14, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Pietro Terracciano", position: "P", team: "Fiorentina", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  { name: "Tommaso Martinelli", position: "P", team: "Fiorentina", price: 9, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Lazio
  { name: "Ivan Provedel", position: "P", team: "Lazio", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Christos Mandas", position: "P", team: "Lazio", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  { name: "Alessio Furlanetto", position: "P", team: "Lazio", price: 9, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Roma
  { name: "Mile Svilar", position: "P", team: "Roma", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Rui Patrício", position: "P", team: "Roma", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  { name: "Mauro Bordin", position: "P", team: "Roma", price: 9, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Torino
  { name: "Vanja Milinković-Savić", position: "P", team: "Torino", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Luca Gemello", position: "P", team: "Torino", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  { name: "Dženan Radončić", position: "P", team: "Torino", price: 9, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Genoa
  { name: "Josep Martínez", position: "P", team: "Genoa", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Nicola Leali", position: "P", team: "Genoa", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  { name: "Alessandro Sorrentino", position: "P", team: "Genoa", price: 9, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Lecce
  { name: "Wladimiro Falcone", position: "P", team: "Lecce", price: 11, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Marco Bleve", position: "P", team: "Lecce", price: 9, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  { name: "Samuele Longo", position: "P", team: "Lecce", price: 8, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },

  // === DIFENSORI (D) ===
  // Inter
  { name: "Alessandro Bastoni", position: "D", team: "Inter", price: 17, rating: "6.5", goals: 1, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Federico Dimarco", position: "D", team: "Inter", price: 19, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Denzel Dumfries", position: "D", team: "Inter", price: 21, rating: "6.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Benjamin Pavard", position: "D", team: "Inter", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Stefan de Vrij", position: "D", team: "Inter", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Matteo Darmian", position: "D", team: "Inter", price: 13, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Tajon Buchanan", position: "D", team: "Inter", price: 16, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Yann Bisseck", position: "D", team: "Inter", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  
  // Napoli
  { name: "Giovanni Di Lorenzo", position: "D", team: "Napoli", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Alessandro Buongiorno", position: "D", team: "Napoli", price: 13, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Sam Beukema", position: "D", team: "Napoli", price: 15, rating: "6.8", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Mário Rui", position: "D", team: "Napoli", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Mathías Olivera", position: "D", team: "Napoli", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Amir Rrahmani", position: "D", team: "Napoli", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Leo Østigård", position: "D", team: "Napoli", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Juan Jesus", position: "D", team: "Napoli", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Juventus
  { name: "Gleison Bremer", position: "D", team: "Juventus", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Andrea Cambiaso", position: "D", team: "Juventus", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Khéphren Thuram", position: "D", team: "Juventus", price: 16, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Danilo", position: "D", team: "Juventus", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Alex Sandro", position: "D", team: "Juventus", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Federico Gatti", position: "D", team: "Juventus", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Dean Huijsen", position: "D", team: "Juventus", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Milan
  { name: "Strahinja Pavlović", position: "D", team: "Milan", price: 14, rating: "6.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Perr Schuurs", position: "D", team: "Milan", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Alexis Saelemaekers", position: "D", team: "Milan", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Pervis Estupiñán", position: "D", team: "Milan", price: 12, rating: "6.0", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Theo Hernández", position: "D", team: "Milan", price: 18, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Davide Calabria", position: "D", team: "Milan", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Fikayo Tomori", position: "D", team: "Milan", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Malick Thiaw", position: "D", team: "Milan", price: 13, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  
  // Atalanta
  { name: "Raoul Bellanova", position: "D", team: "Atalanta", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Davide Zappacosta", position: "D", team: "Atalanta", price: 13, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Berat Djimsiti", position: "D", team: "Atalanta", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Sead Kolašinac", position: "D", team: "Atalanta", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Giorgio Scalvini", position: "D", team: "Atalanta", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Rafael Tolói", position: "D", team: "Atalanta", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Emil Holm", position: "D", team: "Atalanta", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Bologna
  { name: "Nadir Zortea", position: "D", team: "Bologna", price: 16, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Håkon Heggem", position: "D", team: "Bologna", price: 12, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Lorenzo De Silvestri", position: "D", team: "Bologna", price: 11, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Stefan Posch", position: "D", team: "Bologna", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Jhon Lucumí", position: "D", team: "Bologna", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Victor Kristiansen", position: "D", team: "Bologna", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  
  // Fiorentina
  { name: "Dodò", position: "D", team: "Fiorentina", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Robin Gosens", position: "D", team: "Fiorentina", price: 18, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Pietro Comuzzo", position: "D", team: "Fiorentina", price: 12, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Luca Ranieri", position: "D", team: "Fiorentina", price: 11, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Nikola Milenković", position: "D", team: "Fiorentina", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Lucas Martínez Quarta", position: "D", team: "Fiorentina", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Cristiano Biraghi", position: "D", team: "Fiorentina", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Michael Kayode", position: "D", team: "Fiorentina", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Lazio
  { name: "Nuno Tavares", position: "D", team: "Lazio", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Alessio Romagnoli", position: "D", team: "Lazio", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Patric", position: "D", team: "Lazio", price: 11, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Adam Marušić", position: "D", team: "Lazio", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Manuel Lazzari", position: "D", team: "Lazio", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Mario Gila", position: "D", team: "Lazio", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Nicolò Casale", position: "D", team: "Lazio", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  
  // Roma
  { name: "Rick Karsdorp", position: "D", team: "Roma", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Evan Ndicka", position: "D", team: "Roma", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Gianluca Mancini", position: "D", team: "Roma", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Diego Llorente", position: "D", team: "Roma", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Leonardo Spinazzola", position: "D", team: "Roma", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Zeki Çelik", position: "D", team: "Roma", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  
  // Torino
  { name: "Koffi Djidji", position: "D", team: "Torino", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Valentino Lazaro", position: "D", team: "Torino", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Adam Masina", position: "D", team: "Torino", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Genoa
  { name: "Stefano Sabelli", position: "D", team: "Genoa", price: 11, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Johan Vásquez", position: "D", team: "Genoa", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Mattia Bani", position: "D", team: "Genoa", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Alessandro Vogliacco", position: "D", team: "Genoa", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Aarón Martín", position: "D", team: "Genoa", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Ridgeciano Haps", position: "D", team: "Genoa", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Lecce
  { name: "Valentin Gendrey", position: "D", team: "Lecce", price: 10, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Federico Baschirotto", position: "D", team: "Lecce", price: 11, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Marin Pongračić", position: "D", team: "Lecce", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Antonino Gallo", position: "D", team: "Lecce", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Ahmed Touba", position: "D", team: "Lecce", price: 9, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },

  // === CENTROCAMPISTI (C) ===
  // Inter
  { name: "Nicolò Barella", position: "C", team: "Inter", price: 14, rating: "6.0", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Hakan Çalhanoğlu", position: "C", team: "Inter", price: 23, rating: "7.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Davide Frattesi", position: "C", team: "Inter", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Petar Sučić", position: "C", team: "Inter", price: 12, rating: "6.0", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Henrikh Mkhitaryan", position: "C", team: "Inter", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Kristjan Asllani", position: "C", team: "Inter", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Lucien Agoumé", position: "C", team: "Inter", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Napoli
  { name: "André-Frank Zambo Anguissa", position: "C", team: "Napoli", price: 16, rating: "7.0", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Scott McTominay", position: "C", team: "Napoli", price: 26, rating: "6.75", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Kevin De Bruyne", position: "C", team: "Napoli", price: 23, rating: "6.25", goals: 1, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Lorenzo Lucca", position: "C", team: "Napoli", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Stanislav Lobotka", position: "C", team: "Napoli", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Eljif Elmas", position: "C", team: "Napoli", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Jens Cajuste", position: "C", team: "Napoli", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  
  // Juventus
  { name: "Manuel Locatelli", position: "C", team: "Juventus", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Teun Koopmeiners", position: "C", team: "Juventus", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Filip Kostić", position: "C", team: "Juventus", price: 12, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Weston McKennie", position: "C", team: "Juventus", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Adrien Rabiot", position: "C", team: "Juventus", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Fabio Miretti", position: "C", team: "Juventus", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Nicolò Fagioli", position: "C", team: "Juventus", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Milan
  { name: "Luka Modrić", position: "C", team: "Milan", price: 13, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Ruben Loftus-Cheek", position: "C", team: "Milan", price: 14, rating: "6.25", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Yunus Musah", position: "C", team: "Milan", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Ardon Jashari", position: "C", team: "Milan", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Christopher Nkunku", position: "C", team: "Milan", price: 20, rating: "7.0", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Tijjani Reijnders", position: "C", team: "Milan", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Ismaël Bennacer", position: "C", team: "Milan", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Tommaso Pobega", position: "C", team: "Milan", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Atalanta
  { name: "Marten de Roon", position: "C", team: "Atalanta", price: 12, rating: "6.25", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Éderson", position: "C", team: "Atalanta", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Mario Pašalić", position: "C", team: "Atalanta", price: 14, rating: "6.5", goals: 1, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Charles De Ketelaere", position: "C", team: "Atalanta", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Mitchel Bakker", position: "C", team: "Atalanta", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Hans Hateboer", position: "C", team: "Atalanta", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Bologna
  { name: "Jens Odgaard", position: "C", team: "Bologna", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Lewis Ferguson", position: "C", team: "Bologna", price: 16, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Remo Freuler", position: "C", team: "Bologna", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Nicolò Dominguez", position: "C", team: "Bologna", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Giovanni Fabbian", position: "C", team: "Bologna", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Michel Aebischer", position: "C", team: "Bologna", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  
  // Fiorentina
  { name: "Rolando Mandragora", position: "C", team: "Fiorentina", price: 15, rating: "6.5", goals: 1, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Giacomo Bonaventura", position: "C", team: "Fiorentina", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Alfred Duncan", position: "C", team: "Fiorentina", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Maxime López", position: "C", team: "Fiorentina", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Antonín Barák", position: "C", team: "Fiorentina", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Gaetano Castrovilli", position: "C", team: "Fiorentina", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Arthur Melo", position: "C", team: "Fiorentina", price: 13, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  
  // Lazio
  { name: "Mattéo Guendouzi", position: "C", team: "Lazio", price: 12, rating: "6.25", goals: 1, assists: 0, yellowCards: 1, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Nicolò Rovella", position: "C", team: "Lazio", price: 13, rating: "6.0", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Reda Belahyane", position: "C", team: "Lazio", price: 12, rating: "6.5", goals: 0, assists: 1, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Luis Alberto", position: "C", team: "Lazio", price: 15, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Felipe Anderson", position: "C", team: "Lazio", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Matías Vecino", position: "C", team: "Lazio", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Daichi Kamada", position: "C", team: "Lazio", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Toma Bašić", position: "C", team: "Lazio", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Roma
  { name: "Bryan Cristante", position: "C", team: "Roma", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Leandro Paredes", position: "C", team: "Roma", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Edoardo Bove", position: "C", team: "Roma", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Houssem Aouar", position: "C", team: "Roma", price: 13, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Renato Sanches", position: "C", team: "Roma", price: 12, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Lorenzo Pellegrini", position: "C", team: "Roma", price: 14, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Nicola Zalewski", position: "C", team: "Roma", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  
  // Torino
  { name: "Ivan Ilić", position: "C", team: "Torino", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Samuele Ricci", position: "C", team: "Torino", price: 11, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Karol Linetty", position: "C", team: "Torino", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Saba Sazonov", position: "C", team: "Torino", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Demba Seck", position: "C", team: "Torino", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Genoa
  { name: "Milan Badelj", position: "C", team: "Genoa", price: 11, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Morten Frendrup", position: "C", team: "Genoa", price: 12, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Kevin Strootman", position: "C", team: "Genoa", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Filip Jagiello", position: "C", team: "Genoa", price: 11, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Silvan Hefti", position: "C", team: "Genoa", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },
  
  // Lecce
  { name: "Ylber Ramadani", position: "C", team: "Lecce", price: 10, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Joan Gonzàlez", position: "C", team: "Lecce", price: 11, rating: "6.5", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 2, isActive: true },
  { name: "Mohamed Kaba", position: "C", team: "Lecce", price: 9, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Rémi Oudin", position: "C", team: "Lecce", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 1, isActive: true },
  { name: "Gabriel Strefezza", position: "C", team: "Lecce", price: 10, rating: "6.0", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matchesPlayed: 0, isActive: true },

  // === ATTACCANTI (A) ===
  ...attaccantiSerieA2025,
];

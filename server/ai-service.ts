import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Player, UserTeam, TeamStats, PlayerRecommendation } from '@shared/schema';

export interface AIPlayerAnalysis {
  recommendation: string;
  reasoning: string;
  valueScore: number;
  strengths: string[];
  weaknesses: string[];
  tacticalFit: string;
  priceAnalysis: string;
}

export interface AITeamAnalysis {
  overallAssessment: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  formation: string;
  budgetAdvice: string;
}

export class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️ GEMINI_API_KEY non configurata. AI disabilitata.');
      this.genAI = null as any;
      this.model = null;
      return;
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log('🤖 Servizio AI Gemini inizializzato con successo!');
  }

  async analyzePlayer(player: Player, userTeam: UserTeam[], teamStats: TeamStats): Promise<AIPlayerAnalysis> {
    if (!this.model) {
      console.log('❌ Modello AI non disponibile, uso fallback');
      return this.getFallbackAnalysis(player);
    }

    try {
      const prompt = this.buildPlayerAnalysisPrompt(player, userTeam, teamStats);
      console.log(`🤖 Analizzando ${player.name} (${player.team}) con Gemini AI...`);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log(`✅ Analisi completata per ${player.name}`);
      return this.parsePlayerAnalysis(text, player);
    } catch (error) {
      console.error(`❌ Errore AI per ${player.name}:`, error.message);
      return this.getFallbackAnalysis(player);
    }
  }

  async analyzeTeam(userTeam: UserTeam[], teamStats: TeamStats, availablePlayers: Player[]): Promise<AITeamAnalysis> {
    if (!this.model) {
      return this.getFallbackTeamAnalysis(userTeam, teamStats);
    }

    try {
      const prompt = this.buildTeamAnalysisPrompt(userTeam, teamStats, availablePlayers);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseTeamAnalysis(text);
    } catch (error) {
      console.error('Errore nell\'analisi AI della squadra:', error);
      return this.getFallbackTeamAnalysis(userTeam, teamStats);
    }
  }

  private buildPlayerAnalysisPrompt(player: Player, userTeam: UserTeam[], teamStats: TeamStats): string {
    const positionNames = { P: "Portiere", D: "Difensore", C: "Centrocampista", A: "Attaccante" };
    const userTeamPositions = userTeam.map(ut => ut.player?.position || 'Unknown');
    
    // Analisi posizione necessaria
    const positionNeeds = this.getPositionNeeds(userTeam);
    const isPositionNeeded = positionNeeds[player.position] > 0;
    
    return `
Sei un esperto di Fantacalcio Serie A. Analizza questo giocatore per un principiante e dai un consiglio strategico.

📊 GIOCATORE:
- Nome: ${player.name}
- Ruolo: ${positionNames[player.position as keyof typeof positionNames]} (${player.position})
- Squadra: ${player.team}
- Prezzo: ${player.price}FM
- Voto medio: ${player.rating}/10
- Partite: ${player.matchesPlayed}
- Gol: ${player.goals} | Assist: ${player.assists}

🏆 SQUADRA UTENTE:
- Giocatori: ${userTeam.length}/25
- Budget rimanente: ${teamStats?.remainingCredits || 500}FM
- Posizioni attuali: ${userTeamPositions.join(', ') || 'Nessuna'}
- Necessità per ${player.position}: ${isPositionNeeded ? 'ALTA' : 'BASSA'}

⚽ REGOLE FANTACALCIO:
- Budget totale: 500FM
- Formazioni: 3-5-2 (equilibrata) o 4-3-3 (offensiva)
- Voti: 4-10 (6.5+ = buono, 7.5+ = ottimo)
- Prezzi: 5-15FM (economici), 16-30FM (medi), 31+FM (top)
- Punti: voto base + bonus gol/assist + bonus parate (portieri)

🎯 ANALISI RICHIESTA:
Considera: rapporto qualità-prezzo, necessità posizione, affidabilità, potenziale punti.

RISPONDI SOLO IN JSON:
{
  "recommendation": "Consiglio breve e diretto (max 80 caratteri)",
  "reasoning": "Spiegazione strategica (max 150 caratteri)",
  "valueScore": 85,
  "strengths": ["Punto forte 1", "Punto forte 2"],
  "weaknesses": ["Debolezza 1", "Debolezza 2"],
  "tacticalFit": "Adattamento formazione (max 100 caratteri)",
  "priceAnalysis": "Valutazione prezzo (max 80 caratteri)"
}

Usa emoji, sii pratico e orientato ai principianti. Focus su: vale la pena comprarlo?
`;
  }

  private getPositionNeeds(userTeam: UserTeam[]): Record<string, number> {
    const positionCounts = userTeam.reduce((acc, ut) => {
      const pos = ut.player?.position || 'Unknown';
      acc[pos] = (acc[pos] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const targets = { P: 3, D: 8, C: 8, A: 6 };
    const needs: Record<string, number> = {};
    
    for (const [pos, target] of Object.entries(targets)) {
      needs[pos] = Math.max(0, target - (positionCounts[pos] || 0));
    }
    
    return needs;
  }

  private buildTeamAnalysisPrompt(userTeam: UserTeam[], teamStats: TeamStats, availablePlayers: Player[]): string {
    const positionCounts = userTeam.reduce((acc, ut) => {
      const pos = ut.player?.position || 'Unknown';
      acc[pos] = (acc[pos] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const positionNeeds = this.getPositionNeeds(userTeam);
    const totalNeeded = Object.values(positionNeeds).reduce((sum, need) => sum + need, 0);

    return `
Sei un esperto di Fantacalcio Serie A. Analizza questa squadra e dai consigli strategici per un principiante.

🏆 SQUADRA ATTUALE:
- Giocatori: ${userTeam.length}/25
- Budget rimanente: ${teamStats?.remainingCredits || 500}FM
- Distribuzione: P:${positionCounts.P || 0}/3, D:${positionCounts.D || 0}/8, C:${positionCounts.C || 0}/8, A:${positionCounts.A || 0}/6
- Mancano: ${totalNeeded} giocatori

⚽ OBIETTIVI FANTACALCIO:
- Formazione completa: 3 portieri, 8 difensori, 8 centrocampisti, 6 attaccanti
- Budget totale: 500FM
- Priorità: giocatori affidabili che giocano sempre
- Formazioni: 3-5-2 (equilibrata) o 4-3-3 (offensiva)

🎯 ANALISI RICHIESTA:
Valuta: completezza squadra, distribuzione budget, priorità acquisti, formazione ottimale.

RISPONDI SOLO IN JSON:
{
  "overallAssessment": "Valutazione generale squadra (max 120 caratteri)",
  "strengths": ["Punto forte 1", "Punto forte 2"],
  "weaknesses": ["Debolezza 1", "Debolezza 2"],
  "recommendations": ["Consiglio 1", "Consiglio 2", "Consiglio 3"],
  "formation": "Formazione consigliata (es: 3-5-2)",
  "budgetAdvice": "Consiglio budget (max 80 caratteri)"
}

Usa emoji, sii pratico e orientato ai principianti. Focus su: cosa fare ora?
`;
  }

  private parsePlayerAnalysis(text: string, player: Player): AIPlayerAnalysis {
    try {
      // Estrae JSON dal testo
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          recommendation: parsed.recommendation || `📈 ${player.name} è una buona scelta`,
          reasoning: parsed.reasoning || `Voto ${player.rating}, prezzo ${player.price}FM`,
          valueScore: parsed.valueScore || 75,
          strengths: parsed.strengths || ['Affidabile', 'Buon rapporto qualità-prezzo'],
          weaknesses: parsed.weaknesses || ['Nessuna debolezza evidente'],
          tacticalFit: parsed.tacticalFit || 'Si adatta bene alla squadra',
          priceAnalysis: parsed.priceAnalysis || 'Prezzo ragionevole'
        };
      }
    } catch (error) {
      console.error('Errore nel parsing dell\'analisi AI:', error);
    }

    return this.getFallbackAnalysis(player);
  }

  private parseTeamAnalysis(text: string): AITeamAnalysis {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          overallAssessment: parsed.overallAssessment || 'Squadra in costruzione',
          strengths: parsed.strengths || ['Buon inizio'],
          weaknesses: parsed.weaknesses || ['Da completare'],
          recommendations: parsed.recommendations || ['Continua a costruire'],
          formation: parsed.formation || '3-5-2',
          budgetAdvice: parsed.budgetAdvice || 'Gestisci bene il budget'
        };
      }
    } catch (error) {
      console.error('Errore nel parsing dell\'analisi squadra AI:', error);
    }

    return this.getFallbackTeamAnalysis([], { playerCount: 0, remainingCredits: 500, averageRating: 0, totalGoals: 0, totalAssists: 0 });
  }

  private getFallbackAnalysis(player: Player): AIPlayerAnalysis {
    const rating = parseFloat(player.rating);
    let recommendation = '📈 Buona scelta';
    let reasoning = `Voto ${rating}, prezzo ${player.price}FM`;

    if (rating >= 7.5 && player.price <= 35) {
      recommendation = '🌟 Campione accessibile';
      reasoning = `${player.name} è top player ma costa solo ${player.price}FM!`;
    } else if (rating >= 7.0 && player.price <= 20) {
      recommendation = '💎 Affare incredibile';
      reasoning = `Voto ${rating} a ${player.price}FM. Ottimo rapporto qualità-prezzo!`;
    } else if (player.price <= 8 && rating >= 6.0) {
      recommendation = '🎯 Perfetto per budget';
      reasoning = `Costa pochissimo (${player.price}FM) ma è affidabile (voto ${rating})`;
    }

    return {
      recommendation,
      reasoning,
      valueScore: Math.min(95, Math.max(60, rating * 10 + (player.goals + player.assists) * 5)),
      strengths: ['Affidabile', 'Buon rapporto qualità-prezzo'],
      weaknesses: ['Nessuna debolezza evidente'],
      tacticalFit: 'Si adatta bene alla squadra',
      priceAnalysis: player.price <= 15 ? 'Prezzo economico' : player.price <= 30 ? 'Prezzo medio' : 'Prezzo alto'
    };
  }

  private getFallbackTeamAnalysis(userTeam: UserTeam[], teamStats: TeamStats): AITeamAnalysis {
    const playerCount = userTeam.length;
    let assessment = 'Squadra in costruzione';
    
    if (playerCount === 0) {
      assessment = '🚀 Inizia a costruire la tua squadra!';
    } else if (playerCount < 10) {
      assessment = '📈 Buon inizio, continua così!';
    } else if (playerCount < 20) {
      assessment = '⚡ Squadra in crescita, quasi completa!';
    } else {
      assessment = '🏆 Squadra quasi completa, ottimo lavoro!';
    }

    return {
      overallAssessment: assessment,
      strengths: ['Buon inizio', 'Budget ben gestito'],
      weaknesses: ['Da completare', 'Mancano giocatori'],
      recommendations: ['Continua a costruire', 'Bilancia le posizioni', 'Gestisci il budget'],
      formation: '3-5-2',
      budgetAdvice: `Ti rimangono ${teamStats.remainingCredits}FM`
    };
  }

  isAvailable(): boolean {
    return this.model !== null;
  }
}

export const aiService = new AIService();

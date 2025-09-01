import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { UserTeam, Player } from "@shared/schema";

interface TeamPerformanceChartProps {
  userTeam: (UserTeam & { player: Player })[];
}

export function TeamPerformanceChart({ userTeam }: TeamPerformanceChartProps) {
  // Group players by position and calculate stats
  const positionStats = userTeam.reduce((acc, ut) => {
    const position = ut.player.position;
    const positionName = {
      P: 'Portieri',
      D: 'Difensori', 
      C: 'Centrocampisti',
      A: 'Attaccanti'
    }[position] || position;
    
    if (!acc[positionName]) {
      acc[positionName] = {
        position: positionName,
        count: 0,
        totalRating: 0,
        totalGoals: 0,
        totalAssists: 0,
        totalCost: 0,
      };
    }
    
    acc[positionName].count += 1;
    acc[positionName].totalRating += parseFloat(ut.player.rating);
    acc[positionName].totalGoals += ut.player.goals;
    acc[positionName].totalAssists += ut.player.assists;
    acc[positionName].totalCost += ut.purchasePrice;
    
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(positionStats).map((stats: any) => ({
    position: stats.position,
    'Media Rating': (stats.totalRating / stats.count).toFixed(1),
    'Gol + Assist': stats.totalGoals + stats.totalAssists,
    'Costo Medio': Math.round(stats.totalCost / stats.count),
    'Giocatori': stats.count,
  }));

  if (chartData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nessun dato disponibile per il grafico
      </div>
    );
  }

  return (
    <div className="w-full h-64" data-testid="team-performance-chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="position" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [value, name]}
            labelFormatter={(label) => `Ruolo: ${label}`}
          />
          <Legend />
          <Bar dataKey="Media Rating" fill="hsl(var(--primary))" />
          <Bar dataKey="Gol + Assist" fill="hsl(var(--chart-1))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HealthMetric } from '@/pages/Dashboard';

interface TrendChartProps {
  data: HealthMetric[];
  type: 'blood_pressure' | 'combined';
}

export const TrendChart = ({ data, type }: TrendChartProps) => {
  const processedData = data
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .map(metric => ({
      date: new Date(metric.timestamp).toLocaleDateString(),
      timestamp: metric.timestamp,
      ...metric
    }));

  if (type === 'blood_pressure') {
    const bpData = processedData.filter(d => d.type === 'blood_pressure');
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={bpData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            className="text-muted-foreground"
          />
          <YAxis 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            className="text-muted-foreground"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="systolic" 
            stroke="hsl(var(--health-warning))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--health-warning))', strokeWidth: 2, r: 4 }}
            name="Systolic"
          />
          <Line 
            type="monotone" 
            dataKey="diastolic" 
            stroke="hsl(var(--health-normal))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--health-normal))', strokeWidth: 2, r: 4 }}
            name="Diastolic"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  const combinedData = processedData.reduce((acc, item) => {
    const date = item.date;
    const existing = acc.find(d => d.date === date);
    
    if (existing) {
      if (item.type === 'heart_rate') existing.heartRate = item.value;
      if (item.type === 'blood_sugar') existing.bloodSugar = item.value;
    } else {
      acc.push({
        date,
        heartRate: item.type === 'heart_rate' ? item.value : undefined,
        bloodSugar: item.type === 'blood_sugar' ? item.value : undefined,
      });
    }
    
    return acc;
  }, [] as any[]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={combinedData}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="date" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="text-muted-foreground"
        />
        <YAxis 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="text-muted-foreground"
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="heartRate" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          name="Heart Rate (bpm)"
          connectNulls={false}
        />
        <Line 
          type="monotone" 
          dataKey="bloodSugar" 
          stroke="hsl(var(--accent))" 
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
          name="Blood Sugar (mg/dL)"
          connectNulls={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
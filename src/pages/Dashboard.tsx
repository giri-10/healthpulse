import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, Activity, Scale, Plus, Settings } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { TrendChart } from "@/components/TrendChart";
import { LogMetricDialog } from "@/components/LogMetricDialog";
import { HealthAlerts } from "@/components/HealthAlerts";
import { HealthGoals } from "@/components/HealthGoals";
import { HealthInsights } from "@/components/HealthInsights";
import { HealthSummary } from "@/components/HealthSummary";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

export interface HealthMetric {
  id: string;
  type: 'blood_pressure' | 'blood_sugar' | 'heart_rate' | 'bmi';
  value: number;
  systolic?: number; // for blood pressure
  diastolic?: number; // for blood pressure
  timestamp: Date;
  status: 'excellent' | 'normal' | 'warning' | 'critical';
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      id: '1',
      type: 'blood_pressure',
      value: 120,
      systolic: 120,
      diastolic: 80,
      timestamp: new Date(Date.now() - 86400000),
      status: 'normal'
    },
    {
      id: '2', 
      type: 'blood_sugar',
      value: 95,
      timestamp: new Date(Date.now() - 43200000),
      status: 'normal'
    },
    {
      id: '3',
      type: 'heart_rate',
      value: 72,
      timestamp: new Date(Date.now() - 21600000),
      status: 'excellent'
    },
    {
      id: '4',
      type: 'bmi',
      value: 23.5,
      timestamp: new Date(Date.now() - 172800000),
      status: 'normal'
    }
  ]);

  const [isLogDialogOpen, setIsLogDialogOpen] = useState(false);

  const addMetric = (newMetric: Omit<HealthMetric, 'id'>) => {
    const metric: HealthMetric = {
      ...newMetric,
      id: Date.now().toString()
    };
    setMetrics(prev => [metric, ...prev]);
  };

  const getLatestMetric = (type: HealthMetric['type']) => {
    return metrics.filter(m => m.type === type).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];
  };

  const getMetricIcon = (type: HealthMetric['type']) => {
    switch (type) {
      case 'blood_pressure': return Heart;
      case 'blood_sugar': return TrendingUp;
      case 'heart_rate': return Activity;
      case 'bmi': return Scale;
    }
  };

  const getMetricTitle = (type: HealthMetric['type']) => {
    switch (type) {
      case 'blood_pressure': return 'Blood Pressure';
      case 'blood_sugar': return 'Blood Sugar';
      case 'heart_rate': return 'Heart Rate';
      case 'bmi': return 'BMI';
    }
  };

  const getMetricUnit = (type: HealthMetric['type']) => {
    switch (type) {
      case 'blood_pressure': return 'mmHg';
      case 'blood_sugar': return 'mg/dL';
      case 'heart_rate': return 'bpm';
      case 'bmi': return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="animate-fade-in">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">HealthPulse</h1>
              <p className="text-muted-foreground mt-2">Track your vital signs and stay healthy</p>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button 
              onClick={() => setIsLogDialogOpen(true)}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 hover-scale"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Log Metrics</span>
              <span className="sm:hidden">Log</span>
            </Button>
          </div>
        </div>

        {/* Health Alerts */}
        <HealthAlerts metrics={metrics} />

        {/* Health Summary */}
        <HealthSummary metrics={metrics} />

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {(['blood_pressure', 'blood_sugar', 'heart_rate', 'bmi'] as const).map((type) => {
            const latest = getLatestMetric(type);
            const Icon = getMetricIcon(type);
            
            return (
              <MetricCard
                key={type}
                icon={Icon}
                title={getMetricTitle(type)}
                value={latest?.value || 0}
                systolic={latest?.systolic}
                diastolic={latest?.diastolic}
                unit={getMetricUnit(type)}
                status={latest?.status || 'normal'}
                timestamp={latest?.timestamp}
              />
            );
          })}
        </div>

        {/* Goals and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <HealthGoals metrics={metrics} />
          <HealthInsights metrics={metrics} />
        </div>

        {/* Trend Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Blood Pressure Trends</CardTitle>
              <CardDescription>Your blood pressure readings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <TrendChart 
                data={metrics.filter(m => m.type === 'blood_pressure')}
                type="blood_pressure"
              />
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Heart Rate & Blood Sugar</CardTitle>
              <CardDescription>Monitor your cardiovascular health</CardDescription>
            </CardHeader>
            <CardContent>
              <TrendChart 
                data={metrics.filter(m => m.type === 'heart_rate' || m.type === 'blood_sugar')}
                type="combined"
              />
            </CardContent>
          </Card>
        </div>

        {/* Log Metric Dialog */}
        <LogMetricDialog 
          open={isLogDialogOpen}
          onOpenChange={setIsLogDialogOpen}
          onSubmit={addMetric}
        />
      </div>
    </div>
  );
};

export default Dashboard;
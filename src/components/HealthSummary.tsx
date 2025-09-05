import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, TrendingUp, Activity, Heart } from "lucide-react";
import { HealthMetric } from "@/pages/Dashboard";

interface HealthSummaryProps {
  metrics: HealthMetric[];
}

export const HealthSummary = ({ metrics }: HealthSummaryProps) => {
  const getWeeklySummary = () => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weeklyMetrics = metrics.filter(m => new Date(m.timestamp) >= weekAgo);
    
    const summary = {
      totalReadings: weeklyMetrics.length,
      excellentReadings: weeklyMetrics.filter(m => m.status === 'excellent').length,
      normalReadings: weeklyMetrics.filter(m => m.status === 'normal').length,
      warningReadings: weeklyMetrics.filter(m => m.status === 'warning').length,
      criticalReadings: weeklyMetrics.filter(m => m.status === 'critical').length,
    };
    
    return summary;
  };

  const getMonthlySummary = () => {
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const monthlyMetrics = metrics.filter(m => new Date(m.timestamp) >= monthAgo);
    
    return {
      totalReadings: monthlyMetrics.length,
      averagePerWeek: Math.round(monthlyMetrics.length / 4.3),
      consistency: monthlyMetrics.length >= 20 ? 'excellent' : 
                  monthlyMetrics.length >= 12 ? 'good' : 
                  monthlyMetrics.length >= 4 ? 'fair' : 'needs improvement'
    };
  };

  const getHealthScore = () => {
    if (metrics.length === 0) return 0;
    
    const recentMetrics = metrics
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
    
    const scores = {
      excellent: 100,
      normal: 80,
      warning: 60,
      critical: 30
    };
    
    const totalScore = recentMetrics.reduce((sum, metric) => sum + scores[metric.status], 0);
    return Math.round(totalScore / recentMetrics.length);
  };

  const weekly = getWeeklySummary();
  const monthly = getMonthlySummary();
  const healthScore = getHealthScore();

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'health-excellent';
    if (score >= 75) return 'health-normal';
    if (score >= 60) return 'health-warning';
    return 'health-critical';
  };

  const getConsistencyColor = (consistency: string) => {
    switch (consistency) {
      case 'excellent': return 'health-excellent';
      case 'good': return 'health-normal';
      case 'fair': return 'health-warning';
      default: return 'health-critical';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Health Score */}
      <Card className="animate-fade-in hover-scale">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Health Score</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className={`text-4xl font-bold text-${getScoreColor(healthScore)}`}>
              {healthScore}
            </div>
            <div className="flex-1">
              <Badge 
                variant="outline" 
                className={`text-${getScoreColor(healthScore)} border-${getScoreColor(healthScore)}/20`}
              >
                {healthScore >= 90 ? 'Excellent' : 
                 healthScore >= 75 ? 'Good' : 
                 healthScore >= 60 ? 'Fair' : 'Needs Attention'}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Based on recent readings
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card className="animate-fade-in hover-scale">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">This Week</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{weekly.totalReadings}</span>
              <span className="text-sm text-muted-foreground">Total Readings</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-health-excellent"></div>
                <span>{weekly.excellentReadings} excellent</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-health-normal"></div>
                <span>{weekly.normalReadings} normal</span>
              </div>
              {weekly.warningReadings > 0 && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-health-warning"></div>
                  <span>{weekly.warningReadings} warning</span>
                </div>
              )}
              {weekly.criticalReadings > 0 && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-health-critical"></div>
                  <span>{weekly.criticalReadings} critical</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Consistency */}
      <Card className="animate-fade-in hover-scale">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Consistency</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge 
                variant="outline" 
                className={`text-${getConsistencyColor(monthly.consistency)} border-${getConsistencyColor(monthly.consistency)}/20`}
              >
                {monthly.consistency}
              </Badge>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Monthly readings:</span>
                <span className="font-medium">{monthly.totalReadings}</span>
              </div>
              <div className="flex justify-between">
                <span>Average per week:</span>
                <span className="font-medium">{monthly.averagePerWeek}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
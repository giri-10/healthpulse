import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";
import { HealthMetric } from "@/pages/Dashboard";

interface HealthInsightsProps {
  metrics: HealthMetric[];
}

export const HealthInsights = ({ metrics }: HealthInsightsProps) => {
  const generateInsights = () => {
    const insights = [];
    
    // Blood pressure trends
    const bpMetrics = metrics
      .filter(m => m.type === 'blood_pressure')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 7);
    
    if (bpMetrics.length >= 3) {
      const recent = bpMetrics.slice(0, 3);
      const avgSystolic = recent.reduce((sum, m) => sum + (m.systolic || 0), 0) / recent.length;
      
      if (avgSystolic > 140) {
        insights.push({
          type: 'warning',
          title: 'Blood Pressure Trend',
          message: 'Your recent blood pressure readings are elevated. Consider consulting your doctor.',
          icon: AlertCircle,
          color: 'health-warning'
        });
      } else if (avgSystolic < 120) {
        insights.push({
          type: 'positive',
          title: 'Excellent Blood Pressure',
          message: 'Your blood pressure is in the optimal range. Keep up the great work!',
          icon: CheckCircle,
          color: 'health-excellent'
        });
      }
    }
    
    // Heart rate variability
    const hrMetrics = metrics
      .filter(m => m.type === 'heart_rate')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
    
    if (hrMetrics.length >= 3) {
      const values = hrMetrics.map(m => m.value);
      const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
      const variance = values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;
      
      if (variance > 100) {
        insights.push({
          type: 'info',
          title: 'Heart Rate Variability',
          message: 'Your heart rate shows good variability, indicating healthy cardiovascular function.',
          icon: TrendingUp,
          color: 'health-normal'
        });
      }
    }
    
    // Blood sugar stability
    const bsMetrics = metrics
      .filter(m => m.type === 'blood_sugar')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 7);
    
    if (bsMetrics.length >= 3) {
      const recent = bsMetrics.slice(0, 3);
      const isStable = recent.every(m => m.value >= 70 && m.value <= 140);
      
      if (isStable) {
        insights.push({
          type: 'positive',
          title: 'Blood Sugar Control',
          message: 'Your blood sugar levels are well-controlled and stable.',
          icon: CheckCircle,
          color: 'health-excellent'
        });
      } else {
        const hasHighReadings = recent.some(m => m.value > 140);
        if (hasHighReadings) {
          insights.push({
            type: 'warning',
            title: 'Blood Sugar Alert',
            message: 'Some recent readings are elevated. Monitor your diet and activity levels.',
            icon: TrendingUp,
            color: 'health-warning'
          });
        }
      }
    }
    
    // BMI trend
    const bmiMetrics = metrics
      .filter(m => m.type === 'bmi')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 3);
    
    if (bmiMetrics.length >= 2) {
      const latest = bmiMetrics[0];
      const previous = bmiMetrics[1];
      const change = latest.value - previous.value;
      
      if (Math.abs(change) > 0.5) {
        insights.push({
          type: change > 0 ? 'warning' : 'positive',
          title: 'BMI Trend',
          message: `Your BMI has ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change).toFixed(1)} points recently.`,
          icon: change > 0 ? TrendingUp : TrendingDown,
          color: change > 0 ? 'health-warning' : 'health-normal'
        });
      }
    }
    
    // Weekly summary
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weeklyMetrics = metrics.filter(m => new Date(m.timestamp) >= weekAgo);
    
    if (weeklyMetrics.length >= 5) {
      insights.push({
        type: 'positive',
        title: 'Great Tracking Habit',
        message: `You've logged ${weeklyMetrics.length} health metrics this week. Consistency is key to better health!`,
        icon: CheckCircle,
        color: 'health-excellent'
      });
    }
    
    return insights.slice(0, 4); // Limit to 4 insights
  };

  const insights = generateInsights();

  if (insights.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle>Health Insights</CardTitle>
          </div>
          <CardDescription>AI-powered analysis of your health trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Log more health metrics to get personalized insights!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <CardTitle>Health Insights</CardTitle>
        </div>
        <CardDescription>AI-powered analysis of your health trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30 border">
              <div className={`p-2 rounded-lg bg-${insight.color}/10`}>
                <insight.icon className={`h-4 w-4 text-${insight.color}`} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{insight.title}</h4>
                  <Badge 
                    variant="outline" 
                    className={`text-${insight.color} border-${insight.color}/20`}
                  >
                    {insight.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
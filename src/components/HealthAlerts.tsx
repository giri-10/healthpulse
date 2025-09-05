import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Heart, TrendingDown, Activity } from "lucide-react";
import { HealthMetric } from "@/pages/Dashboard";

interface HealthAlertsProps {
  metrics: HealthMetric[];
}

export const HealthAlerts = ({ metrics }: HealthAlertsProps) => {
  const getRecentAlerts = () => {
    const recentMetrics = metrics.filter(metric => {
      const daysSinceReading = (Date.now() - new Date(metric.timestamp).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceReading <= 7 && (metric.status === 'warning' || metric.status === 'critical');
    });

    return recentMetrics.map(metric => {
      const recommendations = getRecommendations(metric);
      return {
        ...metric,
        recommendations
      };
    });
  };

  const getRecommendations = (metric: HealthMetric) => {
    const recommendations = {
      immediate: [] as string[],
      doctor: [] as string[],
      lifestyle: [] as string[]
    };

    switch (metric.type) {
      case 'blood_pressure':
        if (metric.status === 'critical') {
          recommendations.immediate.push("Seek immediate medical attention");
          recommendations.doctor.push("Schedule urgent appointment with cardiologist");
        } else if (metric.status === 'warning') {
          recommendations.lifestyle.push("Reduce sodium intake");
          recommendations.lifestyle.push("Increase physical activity");
          recommendations.doctor.push("Discuss with your primary care physician");
        }
        break;

      case 'blood_sugar':
        if (metric.status === 'critical') {
          recommendations.immediate.push("Monitor closely and contact your doctor");
          recommendations.doctor.push("Adjust medication with endocrinologist");
        } else if (metric.status === 'warning') {
          recommendations.lifestyle.push("Review your diet with a nutritionist");
          recommendations.lifestyle.push("Monitor blood sugar more frequently");
        }
        break;

      case 'heart_rate':
        if (metric.status === 'warning') {
          recommendations.lifestyle.push("Avoid caffeine and stimulants");
          recommendations.doctor.push("Consider EKG evaluation");
        }
        break;

      case 'bmi':
        if (metric.status === 'critical') {
          recommendations.doctor.push("Consult with weight management specialist");
          recommendations.lifestyle.push("Create structured diet and exercise plan");
        } else if (metric.status === 'warning') {
          recommendations.lifestyle.push("Focus on balanced nutrition");
          recommendations.lifestyle.push("Increase daily physical activity");
        }
        break;
    }

    return recommendations;
  };

  const getMetricName = (type: HealthMetric['type']) => {
    switch (type) {
      case 'blood_pressure': return 'Blood Pressure';
      case 'blood_sugar': return 'Blood Sugar';
      case 'heart_rate': return 'Heart Rate';
      case 'bmi': return 'BMI';
    }
  };

  const getAlertIcon = (type: HealthMetric['type']) => {
    switch (type) {
      case 'blood_pressure': return Heart;
      case 'blood_sugar': return TrendingDown;
      case 'heart_rate': return Activity;
      case 'bmi': return AlertTriangle;
    }
  };

  const alerts = getRecentAlerts();

  if (alerts.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-health-critical/5 via-health-warning/5 to-health-normal/5 border-health-warning/20 animate-fade-in">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-health-warning" />
          <CardTitle className="text-health-warning">Health Alerts</CardTitle>
        </div>
        <CardDescription>Important health notifications and recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const Icon = getAlertIcon(alert.type);
            const isCritical = alert.status === 'critical';
            
            return (
              <Alert 
                key={`${alert.type}-${index}`}
                className={`border-2 ${
                  isCritical 
                    ? 'border-health-critical/50 bg-health-critical/5' 
                    : 'border-health-warning/50 bg-health-warning/5'
                }`}
              >
                <Icon className={`h-4 w-4 ${
                  isCritical ? 'text-health-critical' : 'text-health-warning'
                }`} />
                <AlertTitle className="flex items-center gap-2">
                  {isCritical ? 'Critical' : 'Warning'}: {getMetricName(alert.type)}
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    isCritical 
                      ? 'bg-health-critical/20 text-health-critical' 
                      : 'bg-health-warning/20 text-health-warning'
                  }`}>
                    {alert.type === 'blood_pressure' && alert.systolic && alert.diastolic 
                      ? `${alert.systolic}/${alert.diastolic} mmHg`
                      : `${alert.value} ${
                          alert.type === 'blood_sugar' ? 'mg/dL' :
                          alert.type === 'heart_rate' ? 'bpm' : ''
                        }`
                    }
                  </span>
                </AlertTitle>
                <AlertDescription className="mt-2 space-y-2">
                  {alert.recommendations.immediate.length > 0 && (
                    <div>
                      <p className="font-medium text-health-critical">Immediate Actions:</p>
                      <ul className="list-disc list-inside ml-2 text-sm">
                        {alert.recommendations.immediate.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {alert.recommendations.doctor.length > 0 && (
                    <div>
                      <p className="font-medium text-primary">Doctor Recommendations:</p>
                      <ul className="list-disc list-inside ml-2 text-sm">
                        {alert.recommendations.doctor.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {alert.recommendations.lifestyle.length > 0 && (
                    <div>
                      <p className="font-medium text-health-normal">Lifestyle Suggestions:</p>
                      <ul className="list-disc list-inside ml-2 text-sm">
                        {alert.recommendations.lifestyle.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
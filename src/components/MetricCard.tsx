import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  systolic?: number;
  diastolic?: number;
  unit: string;
  status: 'excellent' | 'normal' | 'warning' | 'critical';
  timestamp?: Date;
}

export const MetricCard = ({
  icon: Icon,
  title,
  value,
  systolic,
  diastolic,
  unit,
  status,
  timestamp
}: MetricCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-health-excellent border-health-excellent/20 bg-health-excellent/5';
      case 'normal': return 'text-health-normal border-health-normal/20 bg-health-normal/5';
      case 'warning': return 'text-health-warning border-health-warning/20 bg-health-warning/5';
      case 'critical': return 'text-health-critical border-health-critical/20 bg-health-critical/5';
      default: return 'text-muted-foreground border-border bg-card';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-health-excellent';
      case 'normal': return 'bg-health-normal';
      case 'warning': return 'bg-health-warning';
      case 'critical': return 'bg-health-critical';
      default: return 'bg-muted-foreground';
    }
  };

  const formatValue = () => {
    if (title === 'Blood Pressure' && systolic && diastolic) {
      return `${systolic}/${diastolic}`;
    }
    return value.toString();
  };

  const formatTimestamp = (date?: Date) => {
    if (!date) return '';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg border-2 hover-scale animate-fade-in",
      getStatusColor(status)
    )}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "p-2 rounded-lg",
              status === 'excellent' ? 'bg-health-excellent/10' :
              status === 'normal' ? 'bg-health-normal/10' :
              status === 'warning' ? 'bg-health-warning/10' :
              status === 'critical' ? 'bg-health-critical/10' :
              'bg-muted/10'
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-foreground">{title}</h3>
          </div>
          <div className={cn("h-3 w-3 rounded-full", getStatusDot(status))} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-foreground">
              {formatValue()}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              {unit}
            </span>
          </div>
          
          {timestamp && (
            <p className="text-sm text-muted-foreground">
              {formatTimestamp(timestamp)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
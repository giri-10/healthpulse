import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Award, Calendar } from "lucide-react";
import { HealthMetric } from "@/pages/Dashboard";

interface HealthGoal {
  id: string;
  type: HealthMetric['type'];
  target: number;
  current: number;
  title: string;
  deadline: Date;
  achieved: boolean;
}

interface HealthGoalsProps {
  metrics: HealthMetric[];
}

export const HealthGoals = ({ metrics }: HealthGoalsProps) => {
  const [goals] = useState<HealthGoal[]>([
    {
      id: '1',
      type: 'heart_rate',
      target: 70,
      current: 72,
      title: 'Resting Heart Rate',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      achieved: false
    },
    {
      id: '2',
      type: 'blood_sugar',
      target: 90,
      current: 95,
      title: 'Blood Sugar Control',
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      achieved: false
    },
    {
      id: '3',
      type: 'bmi',
      target: 22,
      current: 23.5,
      title: 'Healthy BMI',
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      achieved: false
    }
  ]);

  const getLatestValue = (type: HealthMetric['type']) => {
    const latest = metrics
      .filter(m => m.type === type)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
    return latest?.value || 0;
  };

  const calculateProgress = (goal: HealthGoal) => {
    const current = getLatestValue(goal.type);
    const progress = Math.min((current / goal.target) * 100, 100);
    return Math.max(0, goal.type === 'heart_rate' || goal.type === 'blood_sugar' ? 
      100 - Math.abs((current - goal.target) / goal.target) * 100 : progress);
  };

  const getDaysRemaining = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <CardTitle>Health Goals</CardTitle>
        </div>
        <CardDescription>Track your progress towards better health</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = calculateProgress(goal);
            const daysRemaining = getDaysRemaining(goal.deadline);
            const isOnTrack = progress >= 70;
            
            return (
              <div key={goal.id} className="space-y-3 p-4 rounded-lg bg-muted/30 border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{goal.title}</h4>
                    {progress >= 90 && (
                      <Badge variant="secondary" className="bg-health-excellent/10 text-health-excellent">
                        <Award className="h-3 w-3 mr-1" />
                        Excellent
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {daysRemaining} days left
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress 
                    value={progress} 
                    className="h-2"
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`h-4 w-4 ${isOnTrack ? 'text-health-normal' : 'text-health-warning'}`} />
                    <span className={isOnTrack ? 'text-health-normal' : 'text-health-warning'}>
                      {isOnTrack ? 'On track' : 'Needs attention'}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    Current: {getLatestValue(goal.type)} / Target: {goal.target}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
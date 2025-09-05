import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HealthMetric } from "@/pages/Dashboard";
import { useToast } from "@/hooks/use-toast";

interface LogMetricDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (metric: Omit<HealthMetric, 'id'>) => void;
}

export const LogMetricDialog = ({ open, onOpenChange, onSubmit }: LogMetricDialogProps) => {
  const [metricType, setMetricType] = useState<HealthMetric['type']>('blood_pressure');
  const [value, setValue] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const { toast } = useToast();

  const getStatus = (type: HealthMetric['type'], val: number, sys?: number, dia?: number): HealthMetric['status'] => {
    switch (type) {
      case 'blood_pressure':
        if (!sys || !dia) return 'normal';
        if (sys < 120 && dia < 80) return 'excellent';
        if (sys < 130 && dia < 85) return 'normal';
        if (sys < 140 && dia < 90) return 'warning';
        return 'critical';
      
      case 'blood_sugar':
        if (val < 70) return 'warning';
        if (val <= 99) return 'excellent';
        if (val <= 125) return 'normal';
        return 'critical';
      
      case 'heart_rate':
        if (val < 60 || val > 100) return 'warning';
        if (val >= 60 && val <= 80) return 'excellent';
        return 'normal';
      
      case 'bmi':
        if (val < 18.5) return 'warning';
        if (val <= 24.9) return 'excellent';
        if (val <= 29.9) return 'normal';
        return 'critical';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fix for blood pressure metrics
    if (metricType === 'blood_pressure') {
      const numSystolic = systolic ? parseFloat(systolic) : undefined;
      const numDiastolic = diastolic ? parseFloat(diastolic) : undefined;
      
      if (!numSystolic || !numDiastolic) {
        toast({
          title: "Invalid Input",
          description: "Please enter valid numbers for both systolic and diastolic pressure.",
          variant: "destructive"
        });
        return;
      }
      
      const status = getStatus(metricType, 0, numSystolic, numDiastolic);
      
      onSubmit({
        type: metricType,
        value: numSystolic, // Store systolic as the main value
        systolic: numSystolic,
        diastolic: numDiastolic,
        timestamp: new Date(),
        status
      });
    } else {
      // Handle other metric types
      const numValue = parseFloat(value);
      
      if (isNaN(numValue)) {
        toast({
          title: "Invalid Input",
          description: "Please enter a valid number.",
          variant: "destructive"
        });
        return;
      }
      
      const status = getStatus(metricType, numValue);
      
      onSubmit({
        type: metricType,
        value: numValue,
        timestamp: new Date(),
        status
      });
    }

    // Reset form
    setValue('');
    setSystolic('');
    setDiastolic('');
    onOpenChange(false);
    
    toast({
      title: "Metric Logged",
      description: `Your ${metricType.replace('_', ' ')} has been recorded.`,
    });
  };

  const getInputLabel = () => {
    switch (metricType) {
      case 'blood_pressure': return 'Blood Pressure';
      case 'blood_sugar': return 'Blood Sugar (mg/dL)';
      case 'heart_rate': return 'Heart Rate (bpm)';
      case 'bmi': return 'BMI';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log Health Metric</DialogTitle>
          <DialogDescription>
            Record your latest health measurement to track your progress.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metric-type">Metric Type</Label>
            <Select value={metricType} onValueChange={(value: HealthMetric['type']) => setMetricType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blood_pressure">Blood Pressure</SelectItem>
                <SelectItem value="blood_sugar">Blood Sugar</SelectItem>
                <SelectItem value="heart_rate">Heart Rate</SelectItem>
                <SelectItem value="bmi">BMI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {metricType === 'blood_pressure' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="systolic">Systolic</Label>
                <Input
                  id="systolic"
                  type="number"
                  placeholder="120"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diastolic">Diastolic</Label>
                <Input
                  id="diastolic"
                  type="number"
                  placeholder="80"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="value">{getInputLabel()}</Label>
              <Input
                id="value"
                type="number"
                step={metricType === 'bmi' ? '0.1' : '1'}
                placeholder={
                  metricType === 'blood_sugar' ? '95' :
                  metricType === 'heart_rate' ? '72' :
                  metricType === 'bmi' ? '23.5' : ''
                }
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-accent">
              Log Metric
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
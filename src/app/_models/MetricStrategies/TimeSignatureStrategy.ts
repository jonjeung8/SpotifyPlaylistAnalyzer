import { IMetricStrategy } from './IMetricStrategy';

export class TimeSignatureStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return "Average beats per bar";
  }
  ConvertToValue(metric: number): string {
    metric = parseFloat(metric.toFixed(2));
    return `${metric}`;
  }
  
}
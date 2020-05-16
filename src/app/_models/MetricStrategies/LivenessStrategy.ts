import { IMetricStrategy } from './IMetricStrategy';

export class LivenessStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return "Percent of tracks performed live";
  }
  ConvertToValue(metric: number): string {
    metric = parseFloat((metric * 100).toFixed(0));
    return `${metric}%`;
  }
  
}
import { IMetricStrategy } from './IMetricStrategy';

export class AcousticnessStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return "Acousticness rating";
  }
  ConvertToValue(metric: number): string {
    metric = parseFloat((metric * 10).toFixed(1));
    return `${metric}/10`;
  }
  
}
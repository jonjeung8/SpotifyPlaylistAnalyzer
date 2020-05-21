import { IMetricStrategy } from './IMetricStrategy';

export class DanceabilityStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return "Dancability rating";
  }
  ConvertToValue(metric: number): string {
    metric = parseFloat((metric * 10).toFixed(1));
    return `${metric}/10`;
  }
  
}
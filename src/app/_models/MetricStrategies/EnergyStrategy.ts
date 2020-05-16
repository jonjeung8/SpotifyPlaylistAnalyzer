import { IMetricStrategy } from './IMetricStrategy';

export class EnergyStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return "Percent energetic";
  }
  ConvertToValue(metric: number): string {
    metric = parseFloat((metric * 100).toFixed(0));
    return `${metric}%`;
  }
  
}
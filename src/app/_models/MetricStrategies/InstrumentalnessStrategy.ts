import { IMetricStrategy } from './IMetricStrategy';

export class InstrumentalnessStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return "Percent of tracks that are instrumental"
  }
  ConvertToValue(metric: number): string {
    metric = parseFloat((metric * 100).toFixed(0));
    return `${metric}%`;
  }
  
}
import { IMetricStrategy } from './IMetricStrategy';

export class TempoStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string 
  {
    return 'Average Song Tempo';
  }
  ConvertToValue(metric: number): string 
  {
    return `${metric.toFixed(0)} bpm`;
  }

  ConvertToBar(metric: number): string 
  {
    metric = Number((metric / 200 * 100).toFixed(0));
    if (metric > 100)
    {
      metric = 100;
    }
    return `${metric}%`;
  }
}

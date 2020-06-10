import { IMetricStrategy } from './IMetricStrategy';

export class TimeSignatureStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string 
  {
    return 'Average Beats per Bar';
  }
  ConvertToValue(metric: number): string 
  {
    metric = Number(metric.toFixed(2));
    return `${metric}`;
  }

  ConvertToBar(metric: number): string 
  {
    metric = Number((metric / 4 * 100).toFixed(2));
    return `${metric}%`;
  }

}

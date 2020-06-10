import { IMetricStrategy } from './IMetricStrategy';

export class AcousticnessStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string 
  {
    return 'Acousticness Rating';
  }

  ConvertToValue(metric: number): string 
  {
    metric = parseFloat((metric * 10).toFixed(1));
    return `${metric}/10`;
  }

  ConvertToBar(metric: number): string 
  {
    metric = parseFloat((metric * 100).toFixed(1));
    return `${metric}%`;
  }
}

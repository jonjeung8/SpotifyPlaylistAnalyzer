import { IMetricStrategy } from './IMetricStrategy';

export class ValenceStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string 
  {
    return 'Valence';
  }
  ConvertToValue(metric: number): string 
  {
    return metric > 0.5 ? 'These Songs Spark Joy' : 'These Songs Do Not Spark Joy';
  }

  ConvertToBar(metric: number): string 
  {
    metric = parseFloat((metric * 100).toFixed(1));
    return `${metric}%`;
  }
}

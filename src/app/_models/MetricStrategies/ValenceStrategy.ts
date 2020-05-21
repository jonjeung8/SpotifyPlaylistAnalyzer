import { IMetricStrategy } from './IMetricStrategy';

export class ValenceStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return "Valence";
  }
  ConvertToValue(metric: number): string {
    return metric > 0.5 ? "These songs spark joy" : "These songs do not spark joy";
  }
  
}
import { IMetricStrategy } from './IMetricStrategy';

export class ModeStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return "The majority of your songs are";
  }
  ConvertToValue(metric: number): string {
    return metric > 0.5 ? "Major key" : "Minor key";
  }
  
}
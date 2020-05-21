import { IMetricStrategy } from './IMetricStrategy';

export class SpeechinessStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return "On average, tracks in this playlist contain";
  }
  ConvertToValue(metric: number): string {
    var res = "";
    if(metric > 0.66)
    {
      res = "Spoken word";
    }
    else if(metric > 0.33)
    {
      res = "Rhythmic spoken word"
    }
    else
    {
      res = "Musical tracks";
    }
    return res;
  }
  
}
import { IMetricStrategy } from './IMetricStrategy';

export class SpeechinessStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string 
  {
    return 'On Average, Tracks in this Playlist Contain';
  }

  ConvertToValue(metric: number): string 
  {
    let res = '';
    if (metric > 0.66)
    {
      res = 'Spoken Word';
    }
    else if (metric > 0.33)
    {
      res = 'Rhythmic Spoken Word';
    }
    else
    {
      res = 'Musical Tracks';
    }
    return res;
  }

  ConvertToBar(metric: number): string 
  {
    metric = parseFloat((metric * 100).toFixed(1));
    metric = 100 - metric;
    return `${metric}%`;
  }
}

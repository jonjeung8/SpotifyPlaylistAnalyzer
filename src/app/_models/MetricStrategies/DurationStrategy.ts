import { IMetricStrategy } from './IMetricStrategy';

export class DurationStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string 
  {
    return 'Average Song Length';
  }
  ConvertToValue(metric: number): string 
  {
    // Convert number (ms) to mm:ss
    let seconds: number = metric / 1000;
    const minutes: number = Math.floor(seconds / 60);
    seconds = parseFloat((seconds % 60).toFixed(0));
    let res = `${minutes}:`;
    if (seconds < 10)
    {
      res += `0${seconds}`;
    }
    else
    {
      res += seconds;
    }
    return res;
  }

  ConvertToBar(metric: number): string 
  {
    metric = Number((metric / 600000 * 100).toFixed(0));
    if (metric > 100)
    {
      metric = 100;
    }
    return `${metric}%`;
  }
}

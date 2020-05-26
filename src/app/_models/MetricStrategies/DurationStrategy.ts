import { IMetricStrategy } from './IMetricStrategy';

export class DurationStrategy implements IMetricStrategy
{
  GetDisplayTitle(): string {
    return 'Average Song Length';
  }
  
  ConvertToValue(metric: number): string {
    // Convert number (ms) to mm:ss
    var seconds: number = metric / 1000;
    let minutes: number = Math.floor(seconds / 60);
    seconds = parseFloat((seconds % 60).toFixed(0));
   

    var res: string = `${minutes}:`;
    if(seconds < 10)
    {
      res += `0${seconds}`;
    }
    else
    {
      res += seconds;
    }
    return res;
  }
}
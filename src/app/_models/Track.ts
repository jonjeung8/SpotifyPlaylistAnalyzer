import { Album } from './album';
import { RawMetrics } from './RawMetrics';

export class Track
{
    album: Album;
    href: string;
    name: string;
    id: string; //Spotify track ID
    metrics: RawMetrics;
}
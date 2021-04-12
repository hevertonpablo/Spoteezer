import { ExternalUrls } from './externalurls.model';
import { Artist } from './artist.model';
import { Image } from './image.model';

export interface Album {
    albumType: string;
    artists: Artist[];
    availableMarkets: string[];
    externalUrls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: string;
    totalTracks: number;
    type: string;
    uri: string;
}
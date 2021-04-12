import { ExternalUrls } from './externalurls.model';
import { Followers } from './followers.model';
import { Image } from './image.model';
export interface Artist {



    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images?: Image[];
    name: string;
    popularity: number;
    score: string;
    type: string;
    uri?: string;
}


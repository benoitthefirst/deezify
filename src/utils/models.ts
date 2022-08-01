export type IPlayer = {
    id: number;
    title_short: string;
    duration: number;
    artist: IArtist;
    album: IAlbum;
}

export interface IArtist {
    id: number;
    name: string;
    link?: string;
    picture?: string;
    picture_big?: string;
    picture_xl?: string;
    tracklist: string;
    nb_album?: number;
    nb_fan?: number;
    type: string;
}


export interface IAlbum {
    id: number;
    title: string;
    cover: string;
    cover_big: string;
    tracklist?: string;
    release_date?: string;
}
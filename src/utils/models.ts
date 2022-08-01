export interface ITrack {
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
    position?: number;
    type: string;
}


export interface IAlbum {
    id: number;
    title: string;
    cover: string;
    cover_big: string;
    tracklist?: string;
    artist?: IArtist;
    release_date?: string;
}

export interface IChart {
    tracks: Array<ITrack>;
    /* albums?: Array<IAlbum>;
    artists?: Array<IArtist>;
    playlists?: Array<IPlaylist>; */
    //podcasts?: Array<IPodcast>;
}

export interface IPlaylist {
    id: number;
    title: string;
    picture_small: string;
    picture_big: string;
    nb_tracks?: number;
    tracklist?: string;
    creation_date?: string;
}

export interface IPodcast {
    id: number;
    title: string;
    picture_small: string;
    picture_big: string;
    fans?: number;
    description?: string;
}
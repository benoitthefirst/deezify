import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography
} from "@mui/material";
import client from "../services/client";
import SongCard from "../components/songCard";
import AlbumCard from "../components/albumCard";
import { ITrack,IAlbum,IArtist,IPlaylist,IPodcast} from "../utils/models";

const HomePage = () => {
  const [tracksData, setTacksData] = useState<Array<ITrack>>();
  const [albumsData, setAlbumsData] = useState<Array<IAlbum>>();
  const [artistsData, setArtistsData] = useState<Array<IArtist>>();
  const [playlistsData, setPlaylistsData] = useState<Array<IPlaylist>>();
  const [podcastsData, setPodcastsData] = useState<Array<IPodcast>>();
  
  const GetChart = () => {
    client.get(`chart`).then((response) => {
      setTacksData(response.data.tracks.data);
      setAlbumsData(response.data.albums.data);
      setArtistsData(response.data.artists.data);
      setPlaylistsData(response.data.playlists.data);
      setPodcastsData(response.data.podcasts.data);
    });
};

  useEffect(() => {
    GetChart();
  }, []);

  return (
    <Container fixed sx={{ pt: {xs: 5, sm: 10} }}>
      <Box sx={{ minHeight: "100vh", pb: 20 }}>
        <Grid item xs={12} sm={8} md={12} lg={12}></Grid>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          fontWeight={500}
          mb={2}
          mt={5}
        >
          Top Tracks
        </Typography>
        <Grid container spacing={2}>
          {tracksData &&
            tracksData.slice(0, 4).map((item: ITrack, index: any) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <SongCard
                  id={item.artist.id}
                  title={item.title_short}
                  duration={item.duration}
                  artist={item.artist.name}
                  album={item.album.title}
                  thumbnail={item.album.cover_big}
                />
              </Grid>
            ))}
        </Grid>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          fontWeight={500}
          mb={2}
          mt={5}
        >
          Top Albums
        </Typography>
        <Grid container spacing={2}>
          {albumsData &&
            albumsData.slice(0, 4).map((item: IAlbum, index: any) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <AlbumCard
                  id={item.id}
                  title={item.title}
                  artist={item.artist?.name}
                  artistId={item.artist?.id}
                  thumbnail={item.cover_big}
                />
              </Grid>
            ))}
        </Grid>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          fontWeight={500}
          mb={2}
          mt={5}
        >
          Top artists
        </Typography>
        <Grid container spacing={2}>
          {artistsData &&
            artistsData.slice(0, 4).map((item: IArtist, index: any) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <AlbumCard
                  id={item.id}
                  title={item.name}
                  rank={`${item.position}`}
                  thumbnail={item.picture_big}
                />
              </Grid>
            ))}
        </Grid>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          fontWeight={500}
          mb={2}
          mt={5}
        >
          Playlists
        </Typography>
        <Grid container spacing={2}>
          {playlistsData &&
            playlistsData.slice(0, 4).map((item: IPlaylist, index: any) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <AlbumCard
                  id={item.id}
                  title={item.title}
                  tracks={item.nb_tracks}
                  thumbnail={item.picture_big}
                />
              </Grid>
            ))}
        </Grid>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          fontWeight={500}
          mb={2}
          mt={5}
        >
          Podcasts
        </Typography>
        <Grid container spacing={2}>
          {podcastsData &&
            podcastsData.slice(0, 4).map((item: IPodcast, index: any) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <AlbumCard
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  thumbnail={item.picture_big}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;

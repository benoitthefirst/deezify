import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import client from "../services/client";
import SongCard from "../components/songCard";
import AlbumCard from "../components/albumCard";
import SkeletonCard from "../components/skeletonCard";
import { ITrack, IAlbum, IArtist, IPlaylist, IPodcast } from "../utils/models";

const HomePage = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [tracksData, setTacksData] = useState(new Array<ITrack>());
  const [albumsData, setAlbumsData] = useState(new Array<IAlbum>());
  const [artistsData, setArtistsData] = useState(new Array<IArtist>());
  const [playlistsData, setPlaylistsData] = useState(new Array<IPlaylist>());
  const [podcastsData, setPodcastsData] = useState(new Array<IPodcast>());

  const getChart = useCallback(async () => {
    try{
      setIsFetching(true);
      let res = await client.get("chart");
      setTacksData(res.data.tracks.data);
      setAlbumsData(res.data.albums.data);
      setArtistsData(res.data.artists.data);
      setPlaylistsData(res.data.playlists.data);
      setPodcastsData(res.data.podcasts.data);
      setIsFetching(false);
    }catch(err){  
      console.error(err);
    }
  }, [ ]);

  useEffect(() => {
    getChart();
  }, [getChart]);

  return (
    <Container fixed sx={{ pt: { xs: 5, sm: 10 } }}>
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
          {(isFetching ? Array.from(new Array(4)) : tracksData.slice(0, 4)).map(
            (item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                {item ? (
                  <SongCard
                    id={item.artist.id}
                    title={item.title_short}
                    duration={item.duration}
                    artist={item.artist.name}
                    album={item.album.title}
                    thumbnail={item.album.cover_big}
                  />
                ) : (
                  <SkeletonCard />
                )}
              </Grid>
            )
          )}
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
          {(isFetching ? Array.from(new Array(4)) : albumsData.slice(0, 4)).map(
            (item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                {item ? (
                  <AlbumCard
                    id={item.id}
                    title={item.title}
                    artist={item.artist?.name}
                    artistId={item.artist?.id}
                    thumbnail={item.cover_big}
                  />
                ) : (
                  <SkeletonCard />
                )}
              </Grid>
            )
          )}
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
          {(isFetching
            ? Array.from(new Array(4))
            : artistsData.slice(0, 4)
          ).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              {item ? (
                <AlbumCard
                  id={item.id}
                  title={item.title}
                  tracks={item.nb_tracks}
                  thumbnail={item.picture_big}
                />
              ) : (
                <SkeletonCard />
              )}
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
          {(isFetching
            ? Array.from(new Array(4))
            : playlistsData.slice(0, 4)
          ).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              {item ? (
                <AlbumCard
                  id={item.id}
                  title={item.title}
                  tracks={item.nb_tracks}
                  thumbnail={item.picture_big}
                />
              ) : (
                <SkeletonCard />
              )}
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
          {(isFetching
            ? Array.from(new Array(4))
            : podcastsData.slice(0, 4)
          ).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              {item ? (
                <AlbumCard
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  thumbnail={item.picture_big}
                />
              ) : (
                <SkeletonCard />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography
} from "@mui/material";
import client from "../services/client";
import TopTrackCard from "../components/topTrackCard";
import { ITrack, IArtist, IAlbum } from "../utils/models";
import jsonArtistData from "../data/artist.json";
import jsonData from "../data/eminem.json";
import jsonTopTracks from "../data/topTracks.json";
import jsonAlbums from "../data/albums.json";
import AlbumCard from "../components/albumCard";
import ArtistBanner from "../components/artistBanner";
import "../components/track.scss";

const ArtistPage = () => {
    const { artisId } = useParams();
    const [artistData, setArtistData] = useState<IArtist>();
    const [data, setData] = useState<Array<ITrack>>([]);
    const [topTracks, setTopTracks] = useState<Array<ITrack>>([]);
    const [albums, setAlbums] = useState<Array<IAlbum>>([]);

    const GetArtist = () => {
        client.get(`artist/${artisId}`).then((response) => {
            setArtistData(response.data);
        });
    };

    const GetTopTracks = () => {
        client.get(`artist/${artisId}/top?limit=5`).then((response) => {
            setTopTracks(response.data.data);
        });
    };

    const GetAlbums = () => {
        client.get(`artist/${artisId}/albums`).then((response) => {
            setAlbums(response.data.data);
        });
    };

    useEffect(() => {
        GetArtist();
        GetTopTracks();
        GetAlbums();
    }, [topTracks.length, albums.length]);

  return (
    <Container fixed sx={{pt: 10}}>
      <Box sx={{ minHeight: "100vh", pb: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={12} lg={8}>
            {artistData && (<ArtistBanner name={artistData.name} fans={artistData.nb_fan} thumbnail={artistData.picture_xl}/>)}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              fontWeight={500}
              mb={2}
            >
              Top Tracks
            </Typography>
            {topTracks &&
              topTracks.slice(0, 5).map((item: ITrack, index: number) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={12}>
                  <TopTrackCard
                    id={item.artist.id}
                    title={item.title_short}
                    duration={item.duration}
                    rank={index + 1}
                    thumbnail={item.album.cover_big}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          gutterBottom
          component="div"
          fontWeight={500}
          mb={2}
          mt={5}
        >
          Albums
        </Typography>
        <Grid container spacing={2}>
          {albums &&
            albums.slice(0, 4).map((item: IAlbum, index: any) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <AlbumCard
                  id={item.id}
                  title={item.title}
                  releaseDate={item.release_date}
                  thumbnail={item.cover_big}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ArtistPage;

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Typography, Skeleton } from "@mui/material";
import client from "../services/client";
import TopTrackCard from "../components/topTrackCard";
import { ITrack, IArtist, IAlbum } from "../utils/models";
import AlbumCard from "../components/albumCard";
import SkeletonCard from "../components/skeletonCard";
import ArtistBanner from "../components/artistBanner";

const ArtistPage = () => {
  const [isFetchingAlbums, setIsFetchingAlbums] = useState(true);
  const [isFetchingTracks, setIsFetchingTracks] = useState(true);
  const [isFetchingInfo, setIsFetchingInfo] = useState(true);
  const { id } = useParams();
  const [artistData, setArtistData] = useState<IArtist>();
  const [topTracks, setTopTracks] = useState(new Array<ITrack>());
  const [albums, setAlbums] = useState(new Array<IAlbum>());

  const getArtist = useCallback(async () => {
    try{
      setIsFetchingInfo(true);
      let res = await client.get(`artist/${id}`);
      setArtistData(res.data);
      setIsFetchingInfo(false);
    }catch(err){  
      console.error(err);
    }
  }, [ ]);

  const getTopTracks = useCallback(async () => {
    try{
      setIsFetchingTracks(true);
      let res = await client.get(`artist/${id}/top?limit=5`);
      setTopTracks(res.data.data);
      setIsFetchingTracks(false);
    }catch(err){  
      console.error(err);
    }
  }, [ ]);

  const getAlbums = useCallback(async () => {
    try{
      setIsFetchingAlbums(true);
      let res = await client.get(`artist/${id}/albums`);
      setAlbums(res.data.data);
      setIsFetchingAlbums(false);
    }catch(err){  
      console.error(err);
    }
  }, [ ]);

  useEffect(() => {
    getArtist();
    getTopTracks();
    getAlbums();
  }, [getArtist,getTopTracks,getAlbums]);

  return (
    <Container fixed sx={{ pt: 10 }}>
      <Box sx={{ minHeight: "100vh", pb: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={12} lg={8}>
            {isFetchingInfo ? (<Box my={1}>
                    <Skeleton animation="wave" variant="rectangular" height={350}/>
                  </Box>) : artistData && (
              <ArtistBanner
                name={artistData.name}
                fans={artistData.nb_fan}
                thumbnail={artistData.picture_xl}
              />
            )}
            
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
            {(isFetchingTracks
              ? Array.from(new Array(5))
              : topTracks.slice(0, 5)
            ).map((item, index) => (
              <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                {item ? (
                  <TopTrackCard
                    id={item.artist.id}
                    title={item.title_short}
                    duration={item.duration}
                    rank={index + 1}
                    thumbnail={item.album.cover_big}
                  />
                ) : (
                  <Box my={1}>
                    <Skeleton animation="wave" variant="rectangular" height={55}/>
                  </Box>
                )}
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
          Albums {albums.length > 0 && `(${albums.length})`}
        </Typography>
        <Grid container spacing={2}>
          {(isFetchingAlbums ? Array.from(new Array(8)) : albums).map(
            (item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                {item ? (
                  <AlbumCard
                    id={item.id}
                    title={item.title}
                    releaseDate={item.release_date}
                    thumbnail={item.cover_big}
                  />
                ) : (
                  <SkeletonCard />
                )}
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ArtistPage;

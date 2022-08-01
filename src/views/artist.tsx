import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Container,
  CardMedia,
  Grid,
  Stack,
  ListItemButton,
  List,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  createStyles,
  makeStyles,
  FormControl,
  InputAdornment,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
  Typography,
  Alert,
  AlertColor,
} from "@mui/material";
import client from "../services/client";
import TopTrackCard from "../components/topTrackCard";
import { IPlayer, IArtist, IAlbum } from "../utils/models";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import ClearIcon from "@mui/icons-material/Clear";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import jsonArtistData from "../data/artist.json";
import jsonData from "../data/eminem.json";
import jsonTopTracks from "../data/topTracks.json";
import jsonAlbums from "../data/albums.json";
import AlbumCard from "../components/albumCard";
import "../components/track.scss";

const ArtistPage = () => {
  const [artistData, setArtistData] = useState<IArtist>(jsonArtistData);
  const [data, setData] = useState<Array<IPlayer>>(jsonData.data);
  const [topTracks, setTopTracks] = useState<Array<IPlayer>>(jsonTopTracks.data);
  const [albums, setAlbums] = useState<Array<IAlbum>>(jsonAlbums.data);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("eminem");

  

  const GetAlbums = () => {

  }

  useEffect(() => {
    //getMusic();
    /* client.get('?_limit=10').then((response) => {
      setPosts(response.data);
      console.log(response.data);
   }); */
    //search(query);
    GetAlbums();
  }, [topTracks.length]);

  return (
    <Container fixed>
      <Box sx={{ minHeight: "100vh", pb: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={12} lg={8}>
            <div>

            </div>
            {/* <CardMedia
              component="img"
              sx={{ height: 530 }}
              image={artistData.picture_big}
              alt={artistData.name}
            /> */}
            <div >
              <div className="artist" style={{
                    backgroundImage: `url(${artistData.picture_xl})`
                }}>
                <div className="artist__header">
                  <div className="artist__info">
                    <div className="profile__img">
                      <img
                        src={artistData.picture_big}
                        alt={artistData.name}
                      />
                    </div>

                    <div className="artist__info__meta">
                      <div className="artist__info__type">Artist</div>

                      <div className="artist__info__name">{artistData.name}</div>

                      <div className="artist__info__actions">
                        <button className="button-dark">
                          <PlayArrowRounded/>
                          Play
                        </button>

                        <button className="button-light">Follow</button>
                      </div>
                    </div>
                  </div>

                  <div className="artist__listeners">
                    <div className="artist__listeners__count">{artistData.nb_fan}</div>

                    <div className="artist__listeners__label">
                      Fan Base
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={8} md={12} lg={4}>
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
              topTracks.slice(0, 5).map((item: IPlayer, index: number) => (
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

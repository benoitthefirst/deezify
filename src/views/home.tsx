import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Container,
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
import SongCard from "../components/songCard";
import AlbumCard from "../components/albumCard";
import { IChart,ITrack,IAlbum,IArtist,IPlaylist,IPodcast} from "../utils/models";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import jsonData from "../data/chart.json";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Home = () => {
  const [tracksData, setTacksData] = useState<Array<ITrack>>(jsonData.tracks.data);
  const [albumsData, setAlbumsData] = useState<Array<IAlbum>>(jsonData.albums.data);
  const [artistsData, setArtistsData] = useState<Array<IArtist>>(jsonData.artists.data);
  const [playlistsData, setPlaylistsData] = useState<Array<IPlaylist>>(jsonData.playlists.data);
  const [podcastsData, setPodcastsData] = useState<Array<IPodcast>>(jsonData.podcasts.data);
  
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
    //GetChart();
  }, []);

  return (
    <Container fixed sx={{ pt: 10 }}>
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

export default Home;

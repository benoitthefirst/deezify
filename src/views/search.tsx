import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
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
import { IPlayer } from "../utils/models";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import jsonData from "../data/eminem.json";

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

const SearchPage = () => {
  const { query } = useParams();
  const [data, setData] = useState<Array<IPlayer>>(jsonData.data);

  const search = () => {
    client.get("search?q=" + query).then((response) => {
      setData(response.data.data);
      console.log(response.data.data);
    });
  };

  useEffect(() => {
    search();
  }, [query]);

  return (
    <Container fixed>
      <Box sx={{ minHeight: "100vh", pb: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={12} lg={12}>
            <Grid container spacing={2}>
              {data &&
                data.map((item: IPlayer, index: any) => (
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
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SearchPage;

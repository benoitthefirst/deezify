import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
} from "@mui/material";
import client from "../services/client";
import SongCard from "../components/songCard";
import { ITrack } from "../utils/models";

const SearchPage = () => {
  const { query } = useParams();
  const [data, setData] = useState<Array<ITrack>>([]);

  const search = () => {
    client.get("search?q=" + query).then((response) => {
      setData(response.data.data);
    });
  };

  useEffect(() => {
    search();
  });

  return (
    <Container fixed sx={{pt: {xs: 5, sm: 10}}}>
      <Box sx={{ minHeight: "100vh", pb: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={12} lg={12}>
            <Grid container spacing={2}>
              {data &&
                data.map((item: ITrack, index: any) => (
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

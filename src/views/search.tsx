import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import client from "../services/client";
import SongCard from "../components/songCard";
import SkeletonCard from "../components/skeletonCard";
import { ITrack } from "../utils/models";

const SearchPage = () => {
  const [isFetching, setIsFetching] = useState(true);
  const { query } = useParams();
  const [data, setData] = useState(new Array<ITrack>());

  const search = () => {
    setIsFetching(true);
    client.get("search?q=" + query).then((response) => {
      setData(response.data.data);
      setIsFetching(false);
    });
  };

  useEffect(() => {
    search();
  });

  return (
    <Container fixed sx={{ pt: { xs: 5, sm: 10 } }}>
      <Box sx={{ minHeight: "100vh", pb: 20 }}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          fontWeight={500}
          mb={2}
          mt={5}
        >
          Search Result
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={12} lg={12}>
            <Grid container spacing={2}>
              {(isFetching ? Array.from(new Array(16)) : data).map(
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
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SearchPage;

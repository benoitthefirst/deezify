import React from 'react';
import { Box, Paper,Skeleton } from '@mui/material';

export default function skeletonCard() {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "secondary.main",
      }}
    >
        <Skeleton animation="wave" variant="rectangular" height={194} />

        <Box sx={{ pt: 0.5 }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" width="60%" />
        </Box>
    </Paper>
  )
}

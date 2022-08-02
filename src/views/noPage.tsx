import React from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";

export default function NoPage() {
  return (
    <Container fixed sx={{ pt: { xs: 5, sm: 10 } }}>
      <Box sx={{ minHeight: "100vh", pb: 20 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          component="div"
          fontWeight={500}
          mb={2}
          mt={5}
        >
          Not Found
        </Typography>
      </Box>
    </Container>
  );
}

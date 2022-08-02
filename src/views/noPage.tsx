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

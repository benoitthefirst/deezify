import {
  CardMedia,
  Grid,
  Box,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import {getYear } from "../utils";

export default function AlbumCard({
  id,
  title,
  artistId,
  artist,
  rank,
  tracks,
  description,
  releaseDate,
  thumbnail,
}: any) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "secondary.main",
      }}
    >
      <CardMedia component="img" height="194" image={thumbnail} alt={title} />

      <Box sx={{ p: 2 }}>
        <Typography
          variant="h5"
          noWrap={true}
          component="div"
          align="left"
          sx={{ fontWeight: 500 }}
        >
          {title}
        </Typography>
        <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Grid item xs={12}>
            {releaseDate?.length > 0 && getYear(releaseDate)}
            {artist?.length > 0 && (
              <Link href={`artist/${artistId}`} underline="none">
                <Typography variant="h6" gutterBottom component="div">
                  {artist}
                </Typography>
              </Link>
            )}
            {description?.length > 0 && (
              <Typography
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
                variant="body1"
                gutterBottom
                component="div"
              >
                {description}
              </Typography>
            )}
            {rank > 0 && `Rank: ${rank}`}
            {tracks > 0 && `Tracks: ${tracks}`}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

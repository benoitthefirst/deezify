import { CardMedia, Grid, Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatDuration } from "../utils";

export default function SongCard({
  id,
  title,
  duration,
  artist,
  album,
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
          <Grid item xs={10} sm={10}>
            <Link to={`/artist/${id}`} className="link">
              <Typography variant="h6" gutterBottom component="div">
                {artist}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={2} sm={2}>
            <Typography variant="h6" align="right" gutterBottom component="div">
              {formatDuration(duration)}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: { xs: "none", sm: "flex" } }}>
            <Typography
            variant="caption"
            noWrap={true}
            component="div"
            align="left"
            sx={{ fontWeight: 500 }}
          >
            {album}
          </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

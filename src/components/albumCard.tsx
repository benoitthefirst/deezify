import { CardMedia,IconButton, Grid,Box, Link, Paper, Stack, Typography } from '@mui/material';
import {formatDuration,getYear}from '../utils';

export default function AlbumCard({
    id,
    title,
    releaseDate,
    thumbnail
}: any) {
    
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", bgcolor: "secondary.main"}} >
        <CardMedia
            component="img"
            height="194"
            image={thumbnail}
            alt={title}/>

            <Box sx={{p:2}}>
                <Typography variant="h5" noWrap={true} component="div" align="left" sx={{fontWeight: 500}}>
                    {title}
                </Typography>
                <Grid container spacing={1} alignItems="center" sx={{mt:1}}>
                    <Grid item xs={12}>
                        {getYear(releaseDate)}
                    </Grid>
                </Grid>
            </Box>
    </Paper>
  )
}

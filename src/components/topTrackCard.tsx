import { CardMedia,IconButton, Grid,Box, Link, Paper, Stack, Typography } from '@mui/material';
import {formatDuration}from '../utils';

export default function TopTrackCard({
    id,
    rank,
    title,
    duration,
    artist,
    album,
    thumbnail
}: any) {
    
  return (
    <Paper sx={{ display: 'flex', my:1, flexDirection: 'column', justifyContent: "space-between", bgcolor: "transparent", borderBottomWidth: 1, borderColor: "text.primary"}} >
            <Box sx={{p:2}}>
                
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={10} sm={10}>
                        <Typography variant="h6" noWrap={true} component="div" align="left" sx={{fontSize: 16,fontWeight: 500}}>
                            {rank}. {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <Typography variant="h6" align="right" gutterBottom component="div">
                            {formatDuration(duration)}
                        </Typography>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Typography variant="caption" align="left" gutterBottom component="div">
                            {album}
                        </Typography>
                    </Grid> */}
                </Grid>
            </Box>
    </Paper>
  )
}

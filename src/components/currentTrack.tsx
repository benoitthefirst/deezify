import  React, {useState } from "react";
import { styled,useTheme } from "@mui/material/styles";
import { 
    Box, IconButton, 
    Toolbar, AppBar,Typography,
    LinearProgress,
    Slider,
    Stack
 } from "@mui/material";
 import {formatDuration}from '../utils';
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';

const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    /* background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)', */
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&:before': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      top: '-40%',
      right: '-50%',
      /* background:
        'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)', */
    },
    '&:after': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      bottom: '-50%',
      left: '-30%',
      /* background:
        'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)', */
      transform: 'rotate(30deg)',
    },
  });
  
  const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: "100%",
    maxWidth: '100%',
    display: 'flex',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    /* backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)', */
    backdropFilter: 'blur(40px)',
  }));
  
  const CoverImage = styled('div')({
    width: 50,
    height: 50,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
      width: '100%',
    },
  });
  
  const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });

export default function CurrentTrack() {
  const theme = useTheme();
  const [progress, setProgress] = useState(20);
  const duration = 290; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#fff';
  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  return (
    <AppBar position="fixed" color="secondary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
      <Box sx={{ width: '100%', overflow: 'hidden',p:1 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        >
            <Box sx={{display: 'flex', alignItems: 'center' }}>
                <CoverImage>
                    <img
                    alt="Eminem"
                    src="https://e-cdns-images.dzcdn.net/images/cover/ec3c8ed67427064c70f67e5815b74cef/56x56-000000-80-0-0.jpg"
                    />
                </CoverImage>
                <Box sx={{ ml: 1.5, minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                        Eminem
                    </Typography>
                    <Typography noWrap>
                    <b>Without Me</b>
                    </Typography>
                    <Typography noWrap letterSpacing={-0.25}>
                        The Eminem Show
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: -1,
                }}
                >
                <IconButton aria-label="previous song">
                    <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                </IconButton>
                <IconButton
                    aria-label={paused ? 'play' : 'pause'}
                    onClick={() => setPaused(!paused)}
                >
                    {paused ? (
                    <PlayArrowRounded
                        sx={{ fontSize: '3rem' }}
                        htmlColor={mainIconColor}
                    />
                    ) : (
                    <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                    )}
                </IconButton>
                <IconButton aria-label="next song">
                    <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                </IconButton>
            </Box>
            <Box sx={{width: '50%',}}>
                
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={1}
                    max={duration}
                    onChange={(_, value) => setPosition(value as number)}
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#fff' : 'ebeef2',
                        height: 4,
                        '& .MuiSlider-thumb': {
                        width: 8,
                        height: 8,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        '&:before': {
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0px 0px 0px 8px ${
                            theme.palette.mode === 'dark'
                                ? 'rgb(255 255 255 / 16%)'
                                : 'rgb(0 0 0 / 16%)'
                            }`,
                        },
                        '&.Mui-active': {
                            width: 20,
                            height: 20,
                        },
                        },
                        '& .MuiSlider-rail': {
                        opacity: 0.28,
                        },
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: -2,
                    }}
                    >
                    <TinyText>{formatDuration(position)}</TinyText>
                    <TinyText>-{formatDuration(duration - position)}</TinyText>
                </Box>
            </Box>
            <Stack spacing={2} direction="row" sx={{ width: '10%', mb: 1, px: 1 }} alignItems="center">
            <VolumeDownRounded htmlColor={lightIconColor} />
            <Slider
                aria-label="Volume"
                defaultValue={30}
                sx={{
                color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                '& .MuiSlider-track': {
                    border: 'none',
                },
                '& .MuiSlider-thumb': {
                    width: 24,
                    height: 24,
                    backgroundColor: '#fff',
                    '&:before': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                    boxShadow: 'none',
                    },
                },
                }}
            />
            <VolumeUpRounded htmlColor={lightIconColor} />
            </Stack>
        </Stack>
      <WallPaper />
    </Box>
        {/* <Box sx={{flexGrow: 1, display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Box sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
                Live From Space
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                Mac Miller
            </Typography>
            </Box>
          <Box sx={{flexGrow: 1, display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon color="info"/>
              ) : (
                <SkipPreviousIcon color="info"/>
              )}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} color="info"/>
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon  color="info"/>
              ) : (
                <SkipNextIcon  color="info"/>
              )}
            </IconButton>
          </Box>
          <Box sx={{flexGrow: 1, display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Typography component="div" variant="caption">0:01</Typography>
            <LinearProgress sx={{flexGrow: 1, display: "flex", alignItems: "center", pl: 1, pb: 1, mr:2, ml: 2 }} variant="determinate" value={progress} />
            <Typography component="div" variant="caption">3:07</Typography>
          </Box>
          <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <VolumeDown />
                <VolumeUp />
            </Stack>
            <Slider disabled defaultValue={30} aria-label="Disabled slider" />
            </Box>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
}

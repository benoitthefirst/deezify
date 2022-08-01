import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import client from '../services/client';
import SongCard from '../components/songCard';
import { IPlayer } from '../utils/models';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import  jsonData from '../data/eminem.json'; 


const Search = styled('div')(({theme}) => ({
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   '&:hover': {
     backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginLeft: 0,
   width: '100%',
   [theme.breakpoints.up('sm')]: {
     marginLeft: theme.spacing(1),
     width: 'auto',
   },
 }));
 
 const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
 }));
 
 const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
     padding: theme.spacing(1, 1, 1, 0),
     // vertical padding + font size from searchIcon
     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
     transition: theme.transitions.create('width'),
     width: '100%',
     [theme.breakpoints.up('sm')]: {
       width: '12ch',
       '&:focus': {
         width: '20ch',
       },
     },
   },
 }));
 
const Home = () => {
   const [data, setData] = useState<Array<IPlayer>>(jsonData.data);
   const [posts, setPosts] = useState([]);
   const [query, setQuery] = useState("eminem");

   const [showClearIcon, setShowClearIcon] = useState(false);

   const hangleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setShowClearIcon(event.target.value == "" ? false : true);
      setQuery(event.target.value);
   }

   const handleClear = (): void => {
      //TODO: Clear the search input
      setQuery("");
   }

   const search = (searchQuery: string) =>{
      client.get('search?q='+searchQuery).then((response) => {
         setData(response.data.data);
         console.log(response.data.data);
      });
   }

   useEffect(() => {
    //getMusic();
    /* client.get('?_limit=10').then((response) => {
      setPosts(response.data);
      console.log(response.data);
   }); */
    //search(query);
   }, [query.length]);

  return (
   <Container fixed>
      <Box sx={{ minHeight: '100vh', py:5 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                    marginBottom={2}>
                    <Typography variant="h4" gutterBottom component="div">
                        Deezify
                    </Typography>
                    <Search>
                        {/* <SearchIconWrapper>
                           <IconButton aria-label="search" onClick={() => search(query)}>
                              <SearchIcon/>
                           </IconButton>
                        </SearchIconWrapper>
                        <StyledInputBase
                           placeholder="Search…"
                           value={query}
                           inputProps={{ 'aria-label': 'search'}}
                           onChange={hangleChange}
                        />
                        {showClearIcon && <IconButton aria-label="clear search" onClick={handleClear}>
                                    <ClearIcon/>
                                 </IconButton>} */}
                        <TextField
                           size="small"
                           variant="outlined"
                           placeholder='search...'
                           value={query}
                           onChange={hangleChange}
                           InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <IconButton aria-label="search" onClick={() => search(query)}>
                                    <SearchIcon/>
                                 </IconButton>
                              </InputAdornment>
                           ),
                           endAdornment: (
                              <InputAdornment position="end">
                                 {showClearIcon && <IconButton aria-label="clear search" onClick={handleClear}>
                                    <ClearIcon/>
                                 </IconButton>}
                              </InputAdornment>
                           )
                        }}/>
                     </Search>
                </Stack>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={12} lg={12}>
                        <Grid container spacing={2}>
                            {data && 
                                data.map((item: IPlayer, index: any) => (
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
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

   </Container>
  )
}

export default Home;
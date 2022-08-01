import { Outlet, Link } from "react-router-dom";
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
  AppBar,
  Toolbar,
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
import { styled, alpha } from '@mui/material/styles';
import { IPlayer } from '../utils/models';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: 20,
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

const Layout = () => {
    const [data, setData] = useState<Array<IPlayer>>([]);
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
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary">
        <Toolbar variant="dense">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
            p={1}
          >
            <Typography variant="h4" gutterBottom component="div" fontWeight={700}>
              Deezify
            </Typography>
            <Search>
              <TextField
                size="small"
                variant="outlined"
                placeholder="search..."
                value={query}
                onChange={hangleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="search"
                        onClick={() => search(query)}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {showClearIcon && (
                        <IconButton
                          aria-label="clear search"
                          onClick={handleClear}
                        >
                          <ClearIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Search>
          </Stack>
          </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Layout;

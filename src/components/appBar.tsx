import React, { useEffect, useState } from "react";
import { useParams,useNavigate} from "react-router-dom";
import {
  Box,
  IconButton,
  Stack,
  AppBar,
  Toolbar,
  Link,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
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
  const { query } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  let navigate = useNavigate();
 
    const [showClearIcon, setShowClearIcon] = useState(false);
 
    const hangleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
       setShowClearIcon(event.target.value === "" ? false : true);
       setSearchQuery(event.target.value);
    }
 
    const handleClear = (): void => {
       //TODO: Clear the search input
       setSearchQuery("");
    }
 
    const search = () =>{
      navigate(`/search/${searchQuery}`);
    }

    useEffect(() => {
      setSearchQuery(query ?? "");
    }, [query]);
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
            <Link href="/" sx={{color: "white"}} underline="none">
              <Typography variant="h4" gutterBottom component="div" fontWeight={700}>
                Deezify
              </Typography>
            </Link>
            
            <Search>
              <TextField
                size="small"
                variant="outlined"
                placeholder="search..."
                value={searchQuery}
                onChange={hangleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="search"
                        onClick={() => search()}
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

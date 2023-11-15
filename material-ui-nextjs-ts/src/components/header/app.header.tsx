'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UploadIcon from '@mui/icons-material/Upload';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '60ch',
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
        [theme.breakpoints.up('md')]: {
            width: '40ch'
        },
    },
}));

export default function AppHeader() {
    const { data: session } = useSession()//session phía client
    console.log('>>check session from app header', session)
    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            //https://mui.com/material-ui/react-menu/#account-menu
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem sx={{
                "a": { textDecoration: 'none', color: 'inherit' }
            }}> <Link onClick={handleMenuClose} href={'/profile'}>
                    <IconButton size="large" color="inherit"
                    >
                        <PersonIcon />
                    </IconButton>
                    Profile</Link>
            </MenuItem>
            <MenuItem onClick={() => {
                signOut()
                handleMenuClose()
            }}>
                <IconButton size="large" color="inherit"
                >
                    <Logout />
                </IconButton>
                Logout
            </MenuItem>
        </Menu >
    );

    const mobileMenuId = 'account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            id={mobileMenuId}
            keepMounted
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleMenuClose} sx={{
                "a": { textDecoration: 'none', color: 'inherit' }
            }}><Link onClick={handleMenuClose} href={'/playlist'}>
                    <IconButton size="large" color="inherit"
                    >
                        <QueueMusicIcon />
                    </IconButton>
                    Playlist</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{
                "a": { textDecoration: 'none', color: 'inherit' }
            }}><Link onClick={handleMenuClose} href={'/like'}>
                    <IconButton size="large" color="inherit"
                    >
                        <FavoriteIcon />
                    </IconButton>
                    Likes</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{
                "a": { textDecoration: 'none', color: 'inherit' }
            }}><Link onClick={handleMenuClose} href={'/upload'}>
                    <IconButton size="large" color="inherit"
                    >
                        <UploadIcon />
                    </IconButton>
                    Upload</Link>
            </MenuItem>
            <Divider />
            <MenuItem sx={{
                "a": { textDecoration: 'none', color: 'inherit' }
            }}><Link onClick={handleMenuClose} href={'/profile'}>
                    <IconButton size="large" color="inherit"
                    >
                        <PersonIcon />
                    </IconButton>
                    Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <IconButton size="large" color="inherit"
                >
                    <Logout />
                </IconButton>
                Logout
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#333333' }}>
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, cursor: 'pointer', color: '#f50', '&:hover': { color: '#f70' }, "a": { color: 'unset', textDecoration: 'none' } }}
                        >
                            <Link href={'/'}>SoundCloud</Link>
                        </Typography>
                        <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="homepage"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={() => router.push('/')}
                                style={{ color: '#f50' }}
                            >
                                <HomeIcon />
                            </IconButton>
                        </Box>
                        <Search >
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{
                            "a": {
                                color: '#ccc', '&:hover': { color: '#fff' },
                                textDecoration: 'none',
                                cursor: 'pointer'
                            },
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            gap: '2rem'
                        }}>
                            {session ? <>
                                <Typography
                                    noWrap
                                    component="div"
                                >
                                    <Link href="/playlist">Playlists</Link>
                                </Typography>
                                <Typography
                                    noWrap
                                    component="div"
                                >
                                    <Link href="/like">Likes</Link>
                                </Typography>
                                <Typography
                                    noWrap
                                    component="div"
                                >
                                    <Link href="/track/upload">Upload</Link>
                                </Typography>
                                <IconButton
                                    onClick={handleProfileMenuOpen}
                                >
                                    <Avatar>H</Avatar>
                                </IconButton>
                            </> : <> <Typography
                                noWrap
                                component="div"
                            >
                                <Link href="/auth/signin">Sign In</Link>
                            </Typography></>}

                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}

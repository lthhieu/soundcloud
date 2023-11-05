'use client'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Container, Tooltip, Typography } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { useHasMounted } from '@/utils/customHook';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useState } from 'react'
const AppBottom = () => {
    const hasMounted = useHasMounted()
    const [like, setLike] = useState(false)
    const [follow, setFollow] = useState(false)
    const handleClickLikeButton = () => {
        setLike(!like)
    }
    const handleClickFollowButton = () => {
        setFollow(!follow)
    }
    const handleClickNextup = () => {
        alert('next up!')
    }
    if (!hasMounted) {
        return (<></>)
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: '#f2f2f2' }}>
                <Container>
                    <Toolbar sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{
                            width: '100%',
                            ".rhap_time": { color: '#f50' },
                            ".rhap_progress-filled": { backgroundColor: '#f50' },
                            ".rhap_progress-indicator": { background: '#f50' },
                            ".rhap_volume-indicator": { background: '#f50' },
                            ".rhap_button-clear": { color: '#333333' }
                        }}>
                            <AudioPlayer
                                layout='horizontal-reverse'
                                style={{
                                    backgroundColor: '#f2f2f2', boxShadow: 'none'
                                }}
                                autoPlay
                                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
                                onPlay={e => console.log("onPlay")}
                            // other props here
                            />
                        </Box>
                        {/* <Box sx={{ flexGrow: 1 }} /> */}
                        <Box >
                            <Typography sx={{ cursor: 'pointer', "&:hover": { color: '#333' }, fontWeight: '500' }} noWrap variant="subtitle1" color={'#999999'}>
                                Ly Tran Hoang Hieu
                            </Typography>
                            <Typography sx={{ cursor: 'pointer', "&:hover": { color: '#333' } }} noWrap variant="subtitle2" color={'#666666'}>
                                Ai chung tình được mãi
                            </Typography>
                        </Box>
                        <Tooltip title='Like'>
                            <FavoriteIcon onClick={() => { handleClickLikeButton() }} sx={{ cursor: 'pointer', color: like ? '#f50' : '#333333', "&:hover": { opacity: '0.9', transitionDuration: '0.2s' } }} />
                        </Tooltip>
                        <Tooltip title='Follow'>
                            {follow ? <BookmarkAddedIcon onClick={() => { handleClickFollowButton() }} sx={{ cursor: 'pointer', color: '#f50', "&:hover": { opacity: '0.9', transitionDuration: '0.2s' } }} />
                                : <BookmarkIcon onClick={() => { handleClickFollowButton() }} sx={{ cursor: 'pointer', color: '#333333', "&:hover": { opacity: '0.9', transitionDuration: '0.2s' } }} />}
                        </Tooltip>
                        <Tooltip title='Next up'>
                            <PlaylistPlayIcon onClick={() => { handleClickNextup() }} sx={{ cursor: 'pointer', color: '#333333', "&:hover": { opacity: '0.9', transitionDuration: '0.2s' } }} />
                        </Tooltip>

                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}
export default AppBottom
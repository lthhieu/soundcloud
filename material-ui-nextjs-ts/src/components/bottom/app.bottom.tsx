'use client'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { useHasMounted } from '@/utils/customHook';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useState, useRef, useEffect } from 'react'
import { useTrackContext } from '@/lib/context.provider';
import { useToast } from '@/utils/use-toast-mui';
const AppBottom = () => {
    const toast = useToast()
    const playerRef = useRef(null)
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext
    const hasMounted = useHasMounted()
    const [like, setLike] = useState(false)
    const [follow, setFollow] = useState(false)
    if (currentTrack?.isPlaying) {
        //@ts-ignore
        playerRef?.current?.audio?.current?.play()
    }
    else {
        //@ts-ignore
        playerRef?.current?.audio?.current?.pause()
    }
    const handleClickLikeButton = () => {
        setLike(!like)
    }
    const handleClickFollowButton = () => {
        setFollow(!follow)
    }
    const handleClickNextup = () => {
        toast.success('next up!')
    }

    if (!hasMounted) {
        return (<></>)
    }
    return (
        <>{currentTrack._id &&
            <Box sx={{
                flexGrow: 1, mt: '100px',
                // transition: 'transform .2s ease-out',
                // transform: currentTrack._id ? 'translateY(100%)' : 'translateY(0)',
            }}>
                <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: '#f2f2f2' }}>
                    <Container>
                        <Toolbar sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{
                                width: '100%',
                                ".rhap_time": { color: '#f50' },
                                ".rhap_progress-filled": { backgroundColor: '#f50' },
                                ".rhap_progress-indicator": { background: '#f50' },
                                ".rhap_volume-indicator": { background: '#f50' },
                                ".rhap_button-clear": { color: '#333333' },
                                ".rhap_main": { gap: '1rem' }
                            }}>
                                <AudioPlayer
                                    ref={playerRef}
                                    layout='horizontal-reverse'
                                    volume={0.5}
                                    autoPlay
                                    style={{
                                        backgroundColor: '#f2f2f2', boxShadow: 'none'
                                    }}
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                                    onPlay={() => {
                                        setCurrentTrack({ ...currentTrack, isPlaying: true })
                                    }}
                                    onPause={() => {
                                        setCurrentTrack({ ...currentTrack, isPlaying: false })
                                    }}
                                />
                            </Box>
                            <Box >
                                <Typography sx={{ cursor: 'pointer', "&:hover": { color: '#333' }, fontWeight: '500' }} noWrap variant="subtitle1" color={'#999999'}>
                                    {currentTrack.title}
                                </Typography>
                                <Typography sx={{ cursor: 'pointer', "&:hover": { color: '#333' } }} noWrap variant="subtitle2" color={'#666666'}>
                                    {currentTrack.description}
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
            </Box>}</>
    )
}
export default AppBottom
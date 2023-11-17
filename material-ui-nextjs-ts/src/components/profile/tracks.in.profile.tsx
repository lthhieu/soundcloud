'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTrackContext } from '@/lib/context.provider';
import PauseIcon from '@mui/icons-material/Pause';
import Link from 'next/link';

interface IProps {
    data: ITrackTop
}
const TracksInProfile = (props: IProps) => {
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext
    let { data } = props
    const theme = useTheme()
    const isPlaying = data._id === currentTrack._id && currentTrack.isPlaying;
    const onClickHandler = () => setCurrentTrack({ ...data, isPlaying: !isPlaying })
    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#f2f2f2' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Link style={{ textDecoration: 'none', color: 'unset' }} href={`/track/${data._id}?audio=${data.trackUrl}&id=${data._id}`}>
                        <Typography component="div" variant="h5">
                            {data.title}
                        </Typography>
                    </Link>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {data.description}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    {/* mặc định: context có id rỗng => isPlaying: false => PlayIcon (tất cả)
khi nhấn vào 1 track => cập nhật lại context + isPlaying:true => PauseIcon, id khác thì PauseIcon
khi nhấn cùng 1 track => cập nhật lại context + isPlaying:false => PlayIcon,  id khác thì PauseIcon
khi nhấn bài track khác: id khác nhau => isPlaying:true => PauseIcon
nếu 1 bài đang chạy nhấn bài khác thì: cập nhật context => isPlaying: true (bài sau) => PauseIcon
còn bài trước, do khác ID => isPlay:false */}
                    <IconButton aria-label="play/pause" onClick={onClickHandler}>
                        {isPlaying ? (
                            <PauseIcon sx={{ height: 38, width: 38 }} />
                        ) : (
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        )}
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 150, height: 150, objectFit: 'cover' }}
                image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${data.imgUrl}`}
                alt="image"
            />
        </Card>
    )
}

export default TracksInProfile

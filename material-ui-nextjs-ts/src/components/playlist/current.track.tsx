'use client'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from 'next/link';
import { convertStringToSlug } from "@/utils/api";
import Typography from "@mui/material/Typography"
import { useTrackContext } from '@/lib/context.provider';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
interface IProps {
    track: IExtendITrackTop
}
const CurrentTrack = (props: IProps) => {
    let { track } = props
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext
    const isPlaying = track._id === currentTrack._id && currentTrack.isPlaying;
    const onClickHandler = () => setCurrentTrack({ ...track, isPlaying: !isPlaying })
    return (<>
        <Link style={{ textDecoration: 'none', color: 'inherit' }} href={`/track/${convertStringToSlug(track.title)}-${track._id}.html?audio=${track.trackUrl}`}><Typography fontSize={16}>{track.title}</Typography></Link>
        <IconButton aria-label="play/pause" onClick={onClickHandler}>
            {isPlaying ? (
                <PauseIcon sx={{ height: 28, width: 28 }} />
            ) : (
                <PlayArrowIcon sx={{ height: 28, width: 28 }} />
            )}
        </IconButton>
    </>)
}
export default CurrentTrack
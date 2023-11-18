'use client'
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import FavoriteIcon from '@mui/icons-material/Favorite'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { sendRequest } from "@/utils/api"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
interface IProps {
    track: ITrackTop | null,
    likedTracks: ITrackLike[] | undefined
}
const LikeTrack = (props: IProps) => {
    let { track, likedTracks } = props
    const { data: session } = useSession()
    const router = useRouter()
    const handleClick = async () => {
        await sendRequest<IBackendResponse<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
            method: 'POST',
            body: {
                quantity: likedTracks?.some(item => item._id === track?._id) ? -1 : 1,
                track: track?._id
            }, headers: {
                'Authorization': `Bearer ${session?.access_token}`,
            }

        })
        router.refresh()
    }
    return (<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Chip sx={{ padding: '1rem 0.5rem' }} icon={<FavoriteIcon />} label="Like" variant="outlined" color={likedTracks?.some(item => item._id === track?._id) ? 'warning' : 'default'} onClick={handleClick} />
        <Box sx={{ display: 'flex', gap: 2, color: '#666666' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>{<PlayArrowIcon />} {track?.countPlay}</Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>{<FavoriteIcon />} {track?.countLike}</Typography>
        </Box>
    </Box>)
}
export default LikeTrack
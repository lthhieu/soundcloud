'use client'
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import FavoriteIcon from '@mui/icons-material/Favorite'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { sendRequest } from "@/utils/api"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useToast } from '@/utils/use-toast-mui';

interface IProps {
    track: ITrackTop | null,
}
const LikeTrack = (props: IProps) => {
    const toast = useToast()
    let { track } = props
    const { data: session } = useSession()
    const [likedTracks, setLikedTracks] = useState<null | ITrackLike[]>(null)
    const fetchData = async () => {
        if (session?.access_token) {
            const res = await sendRequest<IBackendResponse<IModelPaginate<ITrackLike>>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
                queryParams: {
                    current: 1,
                    pageSize: 100,
                    sort: '-createdAt'
                }, headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
            })
            if (res.data?.result) {
                setLikedTracks(res.data?.result)
            }
        }
    }
    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            toast.error('Please Sign In Again')
            return
        }
        fetchData()
    }, [session])
    const router = useRouter()
    const handleClick = async () => {
        const res = await sendRequest<IBackendResponse<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
            method: 'POST',
            body: {
                quantity: likedTracks?.some(item => item._id === track?._id) ? -1 : 1,
                track: track?._id
            }, headers: {
                'Authorization': `Bearer ${session?.access_token}`,
            }

        })
        if (!res.data) {
            toast.warning('Switch tab and try again or Re-sign In')
            return
        }
        await sendRequest<IBackendResponse<any>>({
            url: '/api/revalidate',
            method: 'POST',
            queryParams: {
                tag: 'track-by-id'
            }
        })
        fetchData()
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
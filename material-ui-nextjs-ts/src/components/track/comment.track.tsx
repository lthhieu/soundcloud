'use client'
import { useState } from 'react'
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import { useSession } from "next-auth/react"
import { fetchDefaultImages, sendRequest } from '@/utils/api'
import { useRouter } from 'next/navigation'
import WaveSurfer from 'wavesurfer.js'
import { useHasMounted } from '@/utils/customHook'
import Image from 'next/image'
import { useToast } from '@/utils/use-toast-mui';
import { handleCommentTrack } from '@/action'

dayjs.extend(relativeTime)
interface IProps {
    track: ITrackTop | null,
    arrComments: ITrackComment[] | null,
    wavesurfer: null | WaveSurfer
}
const CommentTrack = (props: IProps) => {
    const toast = useToast()

    let { arrComments, track, wavesurfer } = props
    const [yourComment, setYourComment] = useState('')
    const { data: session } = useSession()
    const router = useRouter()
    const hasMounted = useHasMounted()
    const handleSubmit = async () => {
        const moment = Math.round(wavesurfer?.getCurrentTime() ?? 0)
        const res = await handleCommentTrack(yourComment, track?._id, moment)
        if (!res.data) {
            toast.warning('Switch tab and try again or Re-sign In')
            return
        }
        if (res.data) {
            setYourComment('')
            router.refresh()
        }
    }
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }
    const handleJumpTrack = (number: number) => {
        if (wavesurfer) {
            const duration = Math.round(wavesurfer.getDuration())
            wavesurfer.seekTo(number / duration)
            wavesurfer.play()
        }
    }
    return (<>
        {session?.user &&
            <TextField onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }} value={yourComment} onChange={(e) => { setYourComment(e.target.value) }} fullWidth label="Comment" variant="standard" color="warning" />
        }
        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item md={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Image src={fetchDefaultImages(track?.uploader.type ?? 'SYSTEM')} alt='avatar comment' width={220} height={220} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                    <Typography>{track?.uploader?.email}</Typography>
                </Box>
            </Grid>
            <Grid item md={9}>
                {(arrComments !== null && arrComments.length > 0) && arrComments.map(item => {
                    return (<Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between', mb: '1rem' }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Image src={fetchDefaultImages(item.user.type)} width={40} height={40} style={{ objectFit: 'cover' }} alt='comment' />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: '0.8rem' }}>{item.user.email} at <Typography onClick={() => { handleJumpTrack(item.moment) }} sx={{ fontSize: '0.8rem', cursor: 'pointer' }} component={'span'}>{formatTime(item.moment)}</Typography></Typography>
                                <Typography sx={{ fontSize: '1rem' }}>{item.content}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '0.8rem' }}>{hasMounted && dayjs(item.createdAt).fromNow()}</Typography>
                        </Box>
                    </Box>)
                })}
            </Grid>
        </Grid>
    </>)
}
export default CommentTrack
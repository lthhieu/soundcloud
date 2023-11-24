'use client'
import { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useWavesurfer } from '@/utils/customHook'
import { WaveSurferOptions } from 'wavesurfer.js'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause'
import { useTrackContext } from '@/lib/context.provider'
import { fetchDefaultImages, sendRequest } from '@/utils/api'
import CommentTrack from './comment.track'
import LikeTrack from './like.track'
import Image from 'next/image'

interface IProps {
    track: ITrackTop | null,
    arrComments: ITrackComment[] | null,
}
const WaveTrack = (props: IProps) => {
    const firstViewRef = useRef(true)
    const { track, arrComments } = props
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext
    //div chứa waveform
    const ref = useRef<HTMLDivElement>(null)
    const timeRef = useRef<HTMLSpanElement>(null)
    const [durationState, setDurationState] = useState('0:00')
    const hoverDivRef = useRef<HTMLDivElement>(null)
    // lấy ra tên audio trên url
    const searchParams = useSearchParams()
    const audio = searchParams.get('audio')
    //state play/pause
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const router = useRouter()
    //dùng useMemo để ngăn vòng lặp vô hạn
    const memo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
        let gradient, progressGradient
        if (typeof window !== 'undefined') {
            //hiệu ứng gradient
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')!
            // Define the waveform gradient
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
            gradient.addColorStop(0, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
            gradient.addColorStop(1, '#B1B1B1') // Bottom color

            // Define the progress gradient
            progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
            progressGradient.addColorStop(0, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
            progressGradient.addColorStop(1, '#F6B094') // Bottom color
        }
        // tham số cấu hình waveform
        return {
            waveColor: gradient,
            progressColor: progressGradient,
            url: `/api?audio=${audio}`,
            barWidth: 3,
            height: 100
        }
    }, [])
    // tạo waveform
    const wavesurfer = useWavesurfer(ref, memo)

    // On play button click
    const onPlayClick = useCallback(() => {
        if (wavesurfer)
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
    }, [wavesurfer])
    // format thời gian
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }
    //khi tác động vào waveform thì chạy hàm này
    useEffect(() => {
        if (!wavesurfer) return
        setIsPlaying(false)
        // thời lượng audio và thơi lượng hiện tại
        const timeEl = timeRef.current!
        // const durationEl = durationRef.current!
        // sự kiện hover
        const hover = hoverDivRef.current!
        const waveform = ref.current!
        //@ts-ignore
        waveform.addEventListener('pointermove', (e) => {
            const waveformHeight = waveform.clientHeight;
            const topLimit = 0.7 * waveformHeight;
            if (e.offsetY <= topLimit) {
                hover.style.width = `${e.offsetX}px`
            } else {
                hover.style.width = '0px'
            }
        })
        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.on('decode', (duration) => (setDurationState(formatTime(duration)))),
            wavesurfer.on('timeupdate', (currentTime) => (timeEl.textContent = formatTime(currentTime)))
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])
    const calcLeft = (moment: number) => {
        const duration = wavesurfer?.getDuration() ?? 0
        const value = (moment / duration) * 100
        return `${value}%`
    }
    useEffect(() => {
        if (wavesurfer && currentTrack?.isPlaying) {
            wavesurfer.pause()
        }
    }, [currentTrack])
    useEffect(() => {
        if (track?._id && !currentTrack?._id) {
            setCurrentTrack({ ...track, isPlaying: false })
        }

    }, [track])
    const handleIncreaseView = async () => {
        if (firstViewRef.current) {
            await sendRequest<IBackendResponse<any>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/increase-view`,
                method: 'POST',
                body: {
                    trackId: track?._id
                }
            })
            router.refresh()
            firstViewRef.current = false
        }
    }
    return (<>
        <Box sx={{ display: 'flex', height: 400, background: 'linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)' }}>
            <Box sx={{ width: "75%", display: "flex", flexDirection: 'column', justifyContent: 'space-between', marginY: '2rem', marginLeft: '2rem' }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box onClick={() => {
                        onPlayClick()
                        handleIncreaseView()
                        if (track && wavesurfer) {
                            setCurrentTrack({ ...currentTrack, isPlaying: false })
                        }
                    }} sx={{ cursor: "pointer", background: '#f70', "&:hover": { background: '#f50' }, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', width: '3rem', height: '3rem' }}>
                        {isPlaying ? <PauseIcon sx={{ fontSize: 40, color: 'white' }} /> : <PlayArrowIcon sx={{ fontSize: 40, color: 'white' }} />}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ fontSize: '24px', color: '#fff', backgroundColor: 'rgba(0,0,0,.8)', padding: ' 4px 7px', width: 'fit-content' }}>{track?.title}</Box>
                        <Box sx={{ fontSize: '12px', color: '#fff', backgroundColor: 'rgba(0,0,0,.8)', padding: ' 4px 7px', width: 'fit-content' }}>{track?.description}</Box>
                    </Box>
                </Box>
                <Box sx={{ cursor: 'pointer', position: 'relative', "&:hover": { ".hover-waveform": { opacity: 0.7 } } }} ref={ref}>
                    <Box ref={timeRef} component={'span'} sx={{ color: "#f70", fontSize: 11, background: '#333333', px: 0.5, position: 'absolute', zIndex: 4, left: 0, top: '55%' }}>0:00</Box>
                    <Box component={'span'} sx={{ color: "#ccc", fontSize: 11, background: '#333333', px: 0.5, position: 'absolute', zIndex: 4, right: 0, top: '55%' }}>{durationState}</Box>
                    <Box ref={hoverDivRef} sx={{ position: 'absolute', zIndex: 3, opacity: 0, transition: 'opacity 0.2s ease', background: 'rgba(255,255,255,0.1)', height: '70%' }} className="hover-waveform"></Box>
                    <Box sx={{ position: 'absolute', bottom: 0, backdropFilter: 'brightness(0.5)', width: '100%', height: '30px' }}></Box>
                    <Box>
                        {(arrComments !== null && arrComments.length > 0) && arrComments.map(item => {
                            return (<Tooltip title={item.content} arrow key={item._id}>
                                <Image
                                    alt='avatar icon on track'
                                    //hover vào img không chạy hoverDivRef
                                    onPointerMove={(e) => {
                                        const hover = hoverDivRef.current!
                                        hover.style.width = '0px'
                                        //@ts-ignore
                                        e.target.style.borderRadius = '50%'
                                        //@ts-ignore
                                        e.target.style.zIndex = 5
                                        //@ts-ignore
                                        e.target.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)'
                                    }}
                                    onPointerLeave={(e) => {
                                        //@ts-ignore
                                        e.target.style.borderRadius = '0%'; // Đặt lại ảnh về dạng hình vuông khi hover ra khỏi
                                        //@ts-ignore
                                        e.target.style.zIndex = 4
                                        //@ts-ignore
                                        e.target.style.boxShadow = 'none'
                                    }}
                                    src={fetchDefaultImages(item.user.type)} width={20} height={20} style={{ position: 'absolute', bottom: 10, zIndex: 4, left: calcLeft(item.moment), transition: 'box-shadow 0.3s, border-radius 0.3s' }} />
                            </Tooltip>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: "25%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {track?.imgUrl ?
                    <Image alt='image-track' src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`} width={250} height={250} style={{ objectFit: 'cover' }} /> : <Box sx={{
                        background: "#ccc",
                        width: 250,
                        height: 250
                    }}></Box>}
            </Box>
        </Box>
        <Box sx={{ mt: '1rem' }}>
            <LikeTrack track={track} />
        </Box>
        <Box sx={{ mt: '1rem' }}>
            <CommentTrack arrComments={arrComments} track={track} wavesurfer={wavesurfer} />
        </Box>
    </>)
}
export default WaveTrack
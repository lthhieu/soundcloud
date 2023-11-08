'use client'
import { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWavesurfer } from '@/utils/customHook'
import { WaveSurferOptions } from 'wavesurfer.js'
import { Box, Tooltip } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
const WaveTrack = () => {
    //div chứa waveform
    const ref = useRef<HTMLDivElement>(null)
    const timeRef = useRef<HTMLSpanElement>(null)
    const durationRef = useRef<HTMLSpanElement>(null)
    const hoverDivRef = useRef<HTMLDivElement>(null)
    // lấy ra tên audio trên url
    const searchParams = useSearchParams()
    const audio = searchParams.get('audio')
    //state play/pause
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

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
        const durationEl = durationRef.current!
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
            wavesurfer.on('decode', (duration) => (durationEl.textContent = formatTime(duration))),
            wavesurfer.on('timeupdate', (currentTime) => (timeEl.textContent = formatTime(currentTime)))
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    const arrComments = [
        {
            id: 1,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 10,
            user: "username 1",
            content: "just a comment1"
        },
        {
            id: 2,
            avatar: "http://localhost:8000/images/workout1.png",
            moment: 11,
            user: "username 2",
            content: "just a comment3"
        },
        {
            id: 3,
            avatar: "http://localhost:8000/images/party1.png",
            moment: 90,
            user: "username 3",
            content: "just a comment3"
        },
    ]
    const calcLeft = (moment: number) => {
        const value = (moment / 199) * 100
        return `${value}%`
    }


    return (<>
        <Box sx={{ display: 'flex', height: 400, background: 'linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)' }}>
            <Box sx={{ width: "75%", display: "flex", flexDirection: 'column', justifyContent: 'space-between', marginY: '2rem', marginLeft: '2rem' }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box onClick={onPlayClick} sx={{ cursor: "pointer", background: '#f70', "&:hover": { background: '#f50' }, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', width: '3rem', height: '3rem' }}>
                        {isPlaying ? <PauseIcon sx={{ fontSize: 40, color: 'white' }} /> : <PlayArrowIcon sx={{ fontSize: 40, color: 'white' }} />}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ fontSize: '24px', color: '#fff', backgroundColor: 'rgba(0,0,0,.8)', padding: ' 4px 7px', width: 'fit-content' }}>Ai chung tình được mãi</Box>
                        <Box sx={{ fontSize: '12px', color: '#fff', backgroundColor: 'rgba(0,0,0,.8)', padding: ' 4px 7px', width: 'fit-content' }}>Lý Trần Hoàng Hiếu</Box>
                    </Box>
                </Box>
                <Box sx={{ cursor: 'pointer', position: 'relative', "&:hover": { ".hover-waveform": { opacity: 0.7 } } }} ref={ref}>
                    <Box ref={timeRef} component={'span'} sx={{ color: "#f70", fontSize: 11, background: '#333333', px: 0.5, position: 'absolute', zIndex: 4, left: 0, top: '55%' }}>0:00</Box>
                    <Box ref={durationRef} component={'span'} sx={{ color: "#ccc", fontSize: 11, background: '#333333', px: 0.5, position: 'absolute', zIndex: 4, right: 0, top: '55%' }}>0:00</Box>
                    <Box ref={hoverDivRef} sx={{ position: 'absolute', zIndex: 3, opacity: 0, transition: 'opacity 0.2s ease', background: 'rgba(255,255,255,0.1)', height: '70%' }} className="hover-waveform"></Box>
                    <Box sx={{ position: 'absolute', bottom: 0, backdropFilter: 'brightness(0.5)', width: '100%', height: '30px' }}></Box>
                    <Box>
                        {arrComments.map(item => {
                            return (<Tooltip title={item.content} arrow key={item.id}>
                                <img
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
                                    src={item.avatar} width={20} height={20} style={{ position: 'absolute', bottom: 10, zIndex: 4, left: calcLeft(item.moment), transition: 'box-shadow 0.3s, border-radius 0.3s' }} />
                            </Tooltip>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: "25%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{
                    background: "#ccc",
                    width: 250,
                    height: 250
                }}></Box>
            </Box>
        </Box>
    </>)
}
export default WaveTrack
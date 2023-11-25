'use client'
import { useEffect, useState } from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ColorButton, VisuallyHiddenInput } from './step1';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextField } from "@mui/material"
import MenuItem from '@mui/material/MenuItem';
import SaveIcon from '@mui/icons-material/Save';
import { useSession } from "next-auth/react"
import axios from 'axios';
import ImageViewer from 'react-simple-image-viewer';
import { sendRequest } from '@/utils/api';
import { useToast } from '@/utils/use-toast-mui';
import Image from 'next/image';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box bgcolor={'#cecece'} sx={{ width: '100%', mr: 1 }}>
                <CustomLinearProgress color='inherit' variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    '& .MuiLinearProgress-bar': {
        backgroundColor: '#f70'
    },

}));

interface IProps {
    uploadTrack: {
        fileName: string,
        percent: number,
        uploadedFileName: string
    },
    setValue: (v: number) => void
}
interface INewTrack {
    title: string,
    description: string,
    trackUrl: string,
    imgUrl: string,
    category: string
}
const Step2 = (props: IProps) => {
    let { uploadTrack, setValue } = props
    const { data: session } = useSession()//session phía client
    const defaultInfo = {
        title: '',
        description: '',
        trackUrl: '',
        imgUrl: '',
        category: 'CHILL'
    }
    const toast = useToast()
    const [previewImageUrl, setPreviewImageUrl] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [titleError, setTitleError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [titleMess, setTitleMess] = useState('')
    const [descriptionMess, setDescriptionMess] = useState('')
    const [info, setInfo] = useState<INewTrack>(defaultInfo)
    const categories = [
        {
            value: 'CHILL',
            label: 'Chill',
        },
        {
            value: 'WORKOUT',
            label: 'Workout',
        },
        {
            value: 'PARTY',
            label: 'Party',
        }
    ]
    const images = [
        previewImageUrl
    ]
    const handleUploadImage = async (image: File) => {
        const imgType = ["image/png", "image/gif", "image/jpeg"]
        if (imgType.includes(image.type)) {
            const formData = new FormData()
            formData.append('fileUpload', image)
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`, formData, {
                    headers: {
                        'target_type': 'images',
                        'Authorization': `Bearer ${session?.access_token}`
                    }
                })
                const objPreview = URL.createObjectURL(image)
                setPreviewImageUrl(objPreview)
                setInfo({ ...info, imgUrl: res.data.data.fileName })
            } catch (e) {
                //@ts-ignore
                toast.error(e.response.data.message)
            }
        } else {
            toast.error('Invalid image file format')
        }

    }
    const handleOnCLick = async () => {
        //reset
        setTitleError(false)
        setTitleMess('')
        setDescriptionError(false)
        setDescriptionMess('')
        //validate
        if (!info.title) {
            setTitleError(true)
            setTitleMess('Title is not be empty')
            return
        }
        if (!info.description) {
            setDescriptionError(true)
            setDescriptionMess('Description is not be empty')
            return
        }
        if (!info.imgUrl) {
            toast.error('Please upload an image')
            return
        }
        const newTrack = await sendRequest<IBackendResponse<ITrackTop[]>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.access_token}`, // notice the Bearer before your token
            },
            body: info,
        })
        if (newTrack.data) {
            setValue(0)
            toast.success('Create e new track successfully')
            await sendRequest<IBackendResponse<any>>({
                url: '/api/revalidate',
                method: 'POST',
                queryParams: {
                    tag: 'track-by-profile'
                }
            })
        } else {
            toast.error(newTrack.message)
        }
    }
    const handlePreviewImage = () => {
        setIsOpen(true)
    }
    const closeImageViewer = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        if (uploadTrack?.uploadedFileName) {
            setInfo({ ...info, trackUrl: uploadTrack.uploadedFileName })
        }
    }, [uploadTrack])

    return (<>
        <Typography>{uploadTrack.fileName}</Typography>
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={uploadTrack.percent} />
        </Box>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={5}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', mt: '3rem' }}>
                    <Box sx={{ width: '220px', height: '220px', bgcolor: '#ccc' }}>
                        <div style={{ cursor: 'pointer' }} onClick={() => { handlePreviewImage() }}>
                            {info.imgUrl &&
                                <Image alt='img-upload' width={220} height={220} style={{ objectFit: 'cover' }} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imgUrl}`} />}</div>
                    </Box>
                    <ColorButton
                        onChange={(e) => {
                            const event = e.target as HTMLInputElement
                            if (event.files) {
                                handleUploadImage(event.files[0])
                            }
                        }}
                        sx={{ width: '10rem', mt: 0.25 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type='file' accept="image/png, image/gif, image/jpeg" />
                    </ColorButton>
                </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={7}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: '3rem' }}>
                    {/* <TextField required error={isErrorUsername ? true : false} helperText={errorUsername} color="warning" onChange={(e) => { setUsername(e.target.value) }} fullWidth label="Email" variant="outlined" /> */}
                    <TextField helperText={titleMess} error={titleError ? true : false} value={info?.title} onChange={(e) => setInfo({ ...info, title: e.target.value })} required color="warning" fullWidth label="Title" variant="standard" />
                    <TextField helperText={descriptionMess} error={descriptionError ? true : false} value={info?.description} onChange={(e) => setInfo({ ...info, description: e.target.value })} required color="warning" fullWidth label="Description" variant="standard" />
                    <TextField
                        value={info?.category} onChange={(e) => setInfo({ ...info, category: e.target.value })}
                        color='warning'
                        select
                        label="Category"
                        defaultValue="CHILL"
                        helperText="Please select your category"
                        variant="standard"
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        onClick={() => handleOnCLick()}
                        sx={{ width: '7rem' }} component="label" variant="outlined" color='warning' startIcon={<SaveIcon />}>
                        Save
                    </Button>
                </Box>
            </Grid>
        </Grid>
        {isOpen && (
            <ImageViewer
                src={images}
                onClose={closeImageViewer}
            />
        )}
    </>)
}
export default Step2
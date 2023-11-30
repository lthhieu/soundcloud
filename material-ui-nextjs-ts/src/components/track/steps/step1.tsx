'use client'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import './theme.css'
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useSession } from "next-auth/react"
import axios from 'axios';
import { useToast } from '@/utils/use-toast-mui';
export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: '#f50',
    '&:hover': {
        backgroundColor: '#f70',
    },
}));

interface IProps {
    setValue: (v: number) => void,
    setUploadTrack: Dispatch<SetStateAction<{ fileName: string; percent: number; uploadedFileName: string }>>
    uploadTrack: {
        fileName: string,
        percent: number,
        uploadedFileName: string
    }
}
const Step1 = (props: IProps) => {
    let { setValue, setUploadTrack, uploadTrack } = props
    const { data: session } = useSession()//session phía client
    const toast = useToast()
    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        // Do something with the files
        if (acceptedFiles && acceptedFiles[0]) {
            setValue(1)
            const audio = acceptedFiles[0]
            const formData = new FormData()
            formData.append('fileUpload', audio)
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`, formData, {
                    headers: {
                        'target_type': 'tracks',
                        'Authorization': `Bearer ${session?.access_token}`,
                        // backend nhận được delay sẽ delay
                        // delay: 5000
                    },
                    onUploadProgress: progressEvent => {
                        let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total!)
                        setUploadTrack({
                            ...uploadTrack,
                            fileName: acceptedFiles[0].name,
                            percent: percentCompleted
                        })
                    }
                })
                setUploadTrack((prevState) => ({
                    ...prevState,
                    uploadedFileName: res.data.data.fileName
                }))
            } catch (e) {
                //@ts-ignore
                console.log(e.response.data.message)
                toast.error('Cannot upload a track. Please Sign In Again')
            }

            // const chills = await sendRequestFile<IBackendResponse<ITrackTop[]>>({
            //     url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`,
            //     method: 'POST',
            //     headers: {
            //         'target_type': 'tracks',
            //         'Authorization': `Bearer ${session?.access_token}`, // notice the Bearer before your token
            //     },
            //     body: formData,
            // })
        }
    }, [session])
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        onDrop,
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true,
        accept: {
            'audio/mpeg': ['.mp3', '.m4a'],
        },
        maxSize: 10000000, // 10.000.000 bytes
    });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <div className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag and drop your tracks & albums here</p>
                <ColorButton component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload file
                    <VisuallyHiddenInput type="button" onClick={open} accept='audio/mpeg, .mp3, .m4a' />
                </ColorButton>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </div>
    );
}
export default Step1
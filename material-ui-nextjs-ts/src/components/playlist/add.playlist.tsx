'use client'
import { useState } from 'react'
import Button from "@mui/material/Button/Button"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useToast } from '@/utils/use-toast-mui';
import { sendRequest } from '@/utils/api';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
const AddPlaylist = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [title, setTitle] = useState("")
    const [isPublic, setIsPublic] = useState(false);
    const toast = useToast()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublic(event.target.checked);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: any, reason: any) => {
        if (reason && reason == "backdropClick") {
            return
        }
        setTitle("")
        setIsPublic(false)
        setOpen(false)
    };
    const handleSubmit = async () => {
        if (!title) {
            toast.error('Title is not empty!')
            return
        }
        const res = await sendRequest<IBackendResponse<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/empty`,
            method: "POST",
            body: { title, isPublic },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            }
        })
        if (res.data) {
            toast.success('Created new playlist successfully!')
            handleClose("", "")
            setTitle("")
            setIsPublic(false)
            await sendRequest<IBackendResponse<any>>({
                url: '/api/revalidate',
                method: 'POST',
                queryParams: {
                    tag: 'playlist-by-user'
                }
            })
            router.refresh()
        } else {
            toast.error(res.message)
        }

    }
    return (<>
        <Button onClick={handleClickOpen} variant="outlined" color="warning" startIcon={<AddCircleOutlineIcon />}>Playlist</Button>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Add new empty playlist"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <TextField onChange={(e) => setTitle(e.target.value)} label="Title" variant="standard" color='warning' sx={{ width: '500px' }} />
                    <FormGroup>
                        <FormControlLabel sx={{ mt: 2 }} control={<Switch onChange={handleChange} color='warning' />} label={isPublic ? 'Public' : 'Private'} />
                    </FormGroup>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={() => { handleClose("", "") }}>
                    Cancel
                </Button>
                <Button onClick={() => handleSubmit()}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </>)
}
export default AddPlaylist
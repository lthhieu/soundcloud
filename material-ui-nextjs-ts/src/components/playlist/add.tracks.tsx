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
import { Theme } from '@mui/material/styles';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
interface IProps {
    playlist: IPlaylist<ITrackLike>[],
    track: ITrackTop[]
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const AddTracks = (props: IProps) => {
    let { playlist, track } = props
    const { data: session } = useSession()
    const router = useRouter()
    const [trackId, setTrackId] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const toast = useToast()
    const handleChange = (event: SelectChangeEvent<typeof trackId>) => {
        const {
            target: { value },
        } = event
        setTrackId(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
    }
    const [id, setId] = useState("")
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: any, reason: any) => {
        if (reason && reason == "backdropClick") {
            return
        }
        setId("")
        setTrackId([])
        setOpen(false)
    };
    const handleSubmit = async () => {
        if (!id) {
            toast.error('Please select playlist!')
            return
        }
        if (trackId.length === 0) {
            toast.error('Please select tracks!')
            return
        }
        const updatePlaylist = playlist.find(item => item._id === id)
        const extractedIds = trackId.map(item => {
            const parts = item.split('###');
            return parts[0];
        })
        const res = await sendRequest<IBackendResponse<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists`,
            method: "PATCH",
            body: {
                "id": updatePlaylist?._id,
                "title": updatePlaylist?.title,
                "isPublic": updatePlaylist?.isPublic,
                "tracks": extractedIds
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            }
        })
        if (res.data) {
            toast.success('Update playlist successfully!')
            handleClose("", "")
            await sendRequest<IBackendResponse<any>>({
                url: '/api/revalidate',
                method: 'POST',
                queryParams: {
                    tag: 'playlist-by-user'
                }
            })
            router.refresh()
        }
    }
    return (<>
        <Button onClick={handleClickOpen} variant="outlined" color="warning" startIcon={<AddCircleOutlineIcon />}>Tracks</Button>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Add tracks to playlist"}
            </DialogTitle>
            <DialogContent>
                <Box>
                    <TextField
                        value={id} onChange={(e) => setId(e.target.value)}
                        color='warning'
                        select
                        sx={{ width: '500px' }}
                        label="Select a playlist"
                        variant="standard"
                    >
                        {playlist?.length > 0 && playlist.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                                {option.title}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box>
                        <FormControl sx={{ mt: 2, width: 500 }}>
                            <InputLabel>Tracks</InputLabel>
                            <Select
                                multiple
                                value={trackId}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Tracks" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value.split('###')[1]} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {track.length > 0 && track.map((item) => (
                                    <MenuItem
                                        key={item._id}
                                        value={`${item._id}###${item.title}`}
                                        style={getStyles(item.title, trackId, theme)}
                                    >
                                        {item.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
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
export default AddTracks
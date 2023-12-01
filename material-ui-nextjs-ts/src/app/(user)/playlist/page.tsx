import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from '@mui/material/Divider'
import Playlist from '@/components/playlist/playlist';
import AddPlaylist from '@/components/playlist/add.playlist';
import AddTracks from '@/components/playlist/add.tracks';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { sendRequest } from "@/utils/api";
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Your playlist in SoundCloud',
    description: 'Discover the top streamed music and songs online on SoundCloud',
}
const PlaylistPage = async () => {
    const session = await getServerSession(authOptions)
    const res = await sendRequest<IBackendResponse<IModelPaginate<IPlaylist<IExtendITrackTop>>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/by-user`,
        method: "POST",
        queryParams: { current: 1, pageSize: 100, sort: '-createdAt' },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        nextOption: {
            next: { tags: ['playlist-by-user'] }
        }
    })
    const res1 = await sendRequest<IBackendResponse<IModelPaginate<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
        queryParams: { current: 1, pageSize: 100 },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        }
    })
    if (!res.data) {
        notFound()
    }
    return (
        <Container sx={{ width: '100%', pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography sx={{ color: '#999' }} variant="h6">Playlists</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <AddPlaylist />
                    <AddTracks playlist={res?.data?.result ?? []} track={res1?.data?.result ?? []} />
                </Box>
            </Box>
            <Divider />
            <Box>
                <Playlist playlist={res?.data?.result ?? []} />
            </Box>
        </Container>
    )
}
export default PlaylistPage
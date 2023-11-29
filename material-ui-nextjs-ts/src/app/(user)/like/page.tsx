import { Container } from '@mui/material'
import type { Metadata } from 'next'
import Typography from "@mui/material/Typography"
import Divider from '@mui/material/Divider'
import Like from '@/components/like/like'
import { sendRequest } from "@/utils/api"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Like page',
    description: 'Just a description',
}
const LikePage = async () => {
    const session = await getServerSession(authOptions)

    const res = await sendRequest<IBackendResponse<IModelPaginate<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
        method: "GET",
        queryParams: { current: 1, pageSize: 100 },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        // nextOption: {
        //     next: { tags: ['liked-by-user'] }
        // }
    })
    if (!res.data) {
        notFound()
    }
    return (<Container sx={{ width: '100%', pt: 2 }}>
        <Typography sx={{ color: '#999', p: 2 }} variant="h6">Tracks you've liked</Typography>
        <Divider />
        <Like likedTracks={res?.data?.result ?? []} />
    </Container>)
}
export default LikePage
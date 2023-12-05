'use server'

import { sendRequest } from "@/utils/api"
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/auth.options';
import { revalidateTag } from "next/cache";
export const handleLikeTrackAction = async (quantity: number, trackId: string | undefined) => {
    const session = await getServerSession(authOptions)
    const res = await sendRequest<IBackendResponse<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
        method: 'POST',
        body: {
            quantity,
            track: trackId
        }, headers: {
            'Authorization': `Bearer ${session?.access_token}`,
        }

    })
    revalidateTag('track-by-id')
    return res
}
import WaveTrack from '@/components/track/wave.track'
import { sendRequest } from '@/utils/api'
import Container from '@mui/material/Container'
import { convertStringToSlug } from '@/utils/api';
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params?.slug?.split("-")?.pop()?.replace(".html", "") ?? undefined

    // fetch data
    const tracks = await sendRequest<IBackendResponse<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${slug}`
    })

    return {
        title: tracks.data?.title,
        description: tracks.data?.description,
        openGraph: {
            title: tracks.data?.title,
            description: tracks.data?.description,
            type: 'website',
            images: [`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${tracks.data?.imgUrl}`]
        },
    }
}
// `${track.title.toLowerCase().split(' ').join('-')}-${track._id}.html`
export async function generateStaticParams() {
    return [
        { slug: "song-cho-het-doi-thanh-xuan-653f986a1460bc2897e2aef8.html" },
        { slug: "khi-con-mo-dan-phai-653f986a1460bc2897e2aef3.html" },
        { slug: "nu-hon-bisou-653f986a1460bc2897e2aef1.html" }
    ]
}
const DetailTrackPage = async ({ params }: { params: { slug: string } }) => {
    const slug = params?.slug?.split("-")?.pop()?.replace(".html", "") ?? undefined
    // const session = await getServerSession(authOptions)
    // const session = process.browser ? await getServerSession(authOptions) : null;

    const res = await sendRequest<IBackendResponse<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${slug}`

    })
    const res1 = await sendRequest<IBackendResponse<IModelPaginate<ITrackComment>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
        method: 'POST',
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: slug,
            sort: '-createdAt'
        }
    })

    if (!res.data) {
        notFound()
    }
    if (!res1.data) {
        notFound()
    }

    return (<Container>
        <WaveTrack track={res?.data ?? null} arrComments={res1.data?.result ?? []} />
    </Container>)
}
export default DetailTrackPage
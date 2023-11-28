import UploadTabs from "@/components/track/upload.tabs"
import Container from '@mui/material/Container'
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Upload your song in SoundCloud',
    description: 'Discover the top streamed music and songs online on SoundCloud',
}
const UploadPage = () => {
    return (<Container>
        <UploadTabs />
    </Container>)
}
export default UploadPage
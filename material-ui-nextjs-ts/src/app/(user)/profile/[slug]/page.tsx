import TracksInProfile from "@/components/profile/tracks.in.profile"
import { sendRequest } from "@/utils/api"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
const ProfilePage = async ({ params }: { params: { slug: string } }) => {
    const res = await sendRequest<IBackendResponse<IModelPaginate<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=10`,
        method: 'POST',
        body: {
            id: params.slug
        },
    })
    const data = res.data?.result ?? []
    return (
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={4}>
                {data.length > 0 &&
                    data.map((item: ITrackTop) => {
                        return (
                            <Grid item xs={12} md={6} key={item._id}>
                                <TracksInProfile data={item} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    )
}
export default ProfilePage
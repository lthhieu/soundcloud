import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box"
import { Grid } from "@mui/material";

export default function Loading() {
    const arrComments = [1, 2, 3]
    return (
        <Container>
            <Box sx={{ display: 'flex', height: 400 }}>
                <Box sx={{ width: "75%", display: "flex", flexDirection: 'column', justifyContent: 'space-between', marginY: '2rem', marginLeft: '2rem' }}>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Box sx={{ cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', width: '3rem', height: '3rem' }}>
                            <Skeleton animation="wave" variant="circular" width={50} height={50} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem', width: '24rem' }} />
                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width: '16rem' }} />
                        </Box>
                    </Box>
                    <Skeleton animation="wave" variant="rectangular" width={800} height={100} />
                </Box>
                <Box sx={{ width: "25%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Skeleton animation="wave" variant="rectangular" width={250} height={250} />
                </Box>
            </Box>
            <Box sx={{ mt: '1rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width: '6rem' }} />
                    <Box sx={{ display: 'flex', gap: 2, color: '#666666' }}>
                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width: '4rem' }} />
                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width: '4rem' }} />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: '1rem' }}>
                <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item md={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                            <Skeleton animation="wave" variant="circular" width={220} height={220} />
                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width: '8rem' }} />
                        </Box>
                    </Grid>
                    <Grid item md={9}>
                        {(arrComments !== null && arrComments.length > 0) && arrComments.map((item, index) => {
                            return (<Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: '1rem' }}>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.8rem', width: '8rem' }} />
                                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width: '8rem' }} />
                                    </Box>
                                </Box>
                                <Box>
                                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '0.8rem', width: '8rem' }} />
                                </Box>
                            </Box>)
                        })}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
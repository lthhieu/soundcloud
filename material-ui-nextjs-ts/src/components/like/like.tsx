'use client'
import Link from "next/link";
import { convertStringToSlug } from "@/utils/api";
import Typography from "@mui/material/Typography"
import Image from "next/image"
import Grid from '@mui/material/Grid'
interface IProps {
    likedTracks: ITrackTop[]
}
const Like = (props: IProps) => {
    let { likedTracks } = props
    return (<Grid container spacing={2} sx={{ height: "150px", width: "100%", p: 3 }}>
        {likedTracks.length > 0 ? <>
            {likedTracks.map((item: ITrackTop) => {
                return (<Grid item xs={12} md={3} key={item._id} >
                    <div style={{
                        position: "relative",
                        height: "150px",
                        width: "100%"
                    }}
                    >
                        <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`} alt="avatar" fill style={{ objectFit: 'cover' }} /></div>
                    <Typography sx={{ cursor: 'pointer', "&:hover": { color: '#333' }, fontWeight: '400' }} noWrap variant="subtitle1" color={'#999999'} mt={0.5}>
                        <Link style={{ textDecoration: 'none', color: 'unset' }} href={`/track/${convertStringToSlug(item.title)}-${item._id}.html?audio=${item.trackUrl}`}>{item.title}</Link>
                    </Typography>
                    <Typography sx={{ cursor: 'pointer', "&:hover": { color: '#333' } }} noWrap variant="subtitle2" color={'#666666'}>
                        {item.description}
                    </Typography>
                </Grid>)
            })}
        </> : <Typography sx={{ py: 1, px: 2 }} fontSize={14}>No data</Typography>}
    </Grid>)
}
export default Like
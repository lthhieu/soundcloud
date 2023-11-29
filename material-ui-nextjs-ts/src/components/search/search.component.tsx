'use client'
import { sendRequest } from "@/utils/api"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Divider from '@mui/material/Divider'
import Box from "@mui/material/Box"
import Image from "next/image"
import Link from "next/link"
import { convertStringToSlug } from "@/utils/api";

const SearchComponent = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    const [searchTrack, setSearchTrack] = useState<ITrackTop[]>([])
    const fetchData = async () => {
        const res = await sendRequest<IBackendResponse<IModelPaginate<ITrackTop>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/search`,
            method: "POST",
            body: {
                current: 1,
                pageSize: 10,
                title: query
            }
        })
        if (res?.data) {
            setSearchTrack(res?.data?.result)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        fetchData()
    }, [query])
    return (<Container sx={{ width: '100%', pt: 2 }}>
        <Typography sx={{ color: '#999', p: 2 }} variant="h6">Result for keywords: <Typography sx={{ fontWeight: 500, color: '#333' }} component={'span'}>{query}</Typography></Typography>
        <Divider />
        {searchTrack.length > 0 ? <>
            {searchTrack.map((item: ITrackTop) => {
                return (<Box key={item._id} sx={{ display: 'flex', gap: 2, alignItems: 'center', pt: 3, px: 2 }}>
                    <Image alt="image" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`} width={50} height={50} style={{ objectFit: 'cover', borderRadius: '5px' }} />
                    <Link style={{ textDecoration: 'none', color: 'unset' }} href={`/track/${convertStringToSlug(item.title)}-${item._id}.html?audio=${item.trackUrl}`}><Typography noWrap variant="subtitle1" color={'#333'} fontSize={16}>{item.title}</Typography></Link>
                </Box>)
            })}</> : <><Typography sx={{ py: 1, px: 2, }} noWrap variant="subtitle1" color={'#333'} fontSize={16}>No data</Typography></>}
    </Container>)
}
export default SearchComponent
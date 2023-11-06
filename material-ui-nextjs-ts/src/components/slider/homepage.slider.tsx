'use client'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Settings } from "react-slick";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Divider, Typography } from "@mui/material";
interface IProps {
    data: ITrackTop[],
    title: string
}
const SamplePrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <Button onClick={onClick} sx={{
            minWidth: '2rem', width: '2rem', height: '2rem', color: '#666', justifyContent: 'flex-start', border: '#ccc 1px solid',
            '&:hover': { color: '#f50', border: '#f70 1px solid', backgroundColor: '#fff' }, backgroundColor: '#fff',
            position: 'absolute', top: '40%', transform: 'translateY(-50%)', left: '-0.3rem', zIndex: 2
        }}><ArrowBackIosIcon /></Button>
    );
}
const SampleNextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <Button onClick={onClick} sx={{
            minWidth: '2rem', width: '2rem', height: '2rem', color: '#666', justifyContent: 'center', border: '#ccc 1px solid',
            '&:hover': { color: '#f50', border: '#f70 1px solid', backgroundColor: '#fff' }, backgroundColor: '#fff',
            position: 'absolute', top: '40%', transform: 'translateY(-50%)', right: '2rem'
        }}><ArrowForwardIosIcon /></Button>
    );
}
const HomepageSlider = (props: IProps) => {
    const { data, title } = props
    var settings: Settings = {
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 5,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (<Box
        sx={{
            margin: "0 50px",
            ".track": {
                padding: "0 10px",
                "img": {
                    height: 150,
                    width: 150
                }
            },
        }}>
        <h2> {title} </h2>

        <Slider {...settings}>
            {data.map((item) => {
                return (<div className="track" key={item._id}>
                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`} />
                    <Typography sx={{ cursor: 'pointer', "&:hover": { color: '#333' }, fontWeight: '400' }} noWrap variant="subtitle1" color={'#999999'} mt={0.5}>
                        {item.title}
                    </Typography>
                    <Typography sx={{ cursor: 'pointer', "&:hover": { color: '#333' } }} noWrap variant="subtitle2" color={'#666666'}>
                        {item.description}
                    </Typography>
                </div>)
            })}
        </Slider>
        <Divider sx={{ mt: 3 }} />
    </Box>)
}
export default HomepageSlider
'use client'
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Settings, CustomArrowProps } from "react-slick";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { convertStringToSlug } from "@/utils/api";
import Image from "next/image";
interface IProps {
    data: ITrackTop[],
    title: string
}
const SamplePrevArrow = (props: CustomArrowProps) => {
    const { onClick, currentSlide } = props;
    if (currentSlide === 0) {
        // Hide the prev arrow when the first slide is active
        return null;
    }
    return (
        <Button onClick={onClick} sx={{
            minWidth: '2rem', width: '2rem', height: '2rem', color: '#666', justifyContent: 'flex-start', border: '#ccc 1px solid',
            '&:hover': { color: '#f50', border: '#f70 1px solid', backgroundColor: '#fff' }, backgroundColor: '#fff',
            position: 'absolute', top: '40%', transform: 'translateY(-50%)', left: '-0.3rem', zIndex: 2
        }}><ArrowBackIosIcon /></Button>
    );
}
const SampleNextArrow = (props: CustomArrowProps) => {
    const { onClick, currentSlide, slideCount } = props
    // trừ 5, 5 là slideToShow
    if (currentSlide === slideCount! - 5) {
        // Hide the next arrow when the last slide is active
        return null;
    }
    return (
        <Button onClick={onClick} sx={{
            minWidth: '2rem', width: '2rem', height: '2rem', color: '#666', justifyContent: 'center', border: '#ccc 1px solid',
            '&:hover': { color: '#f50', border: '#f70 1px solid', backgroundColor: '#fff' }, backgroundColor: '#fff',
            position: 'absolute', top: '40%', transform: 'translateY(-50%)', right: '-0.5rem'
        }}><ArrowForwardIosIcon /></Button>
    );
}
const HomepageSlider = (props: IProps) => {
    const { data, title } = props
    const [currentSlide, setCurrentSlide] = useState(0);
    var settings: Settings = {
        beforeChange: (current: number, next: number) => {
            setCurrentSlide(next);
        },
        infinite: false,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
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
            },
        }}>
        <h2> {title} </h2>

        <Slider {...settings}>
            {data.map((item) => {
                return (<div className="track" key={item._id}>
                    <div style={{
                        position: "relative",
                        height: "150px",
                        width: "100%",
                    }}
                    >
                        <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`} alt="image" fill style={{ objectFit: 'cover' }} />
                    </div>
                    <Typography sx={{ cursor: 'pointer', "&:hover": { color: '#333' }, fontWeight: '400' }} noWrap variant="subtitle1" color={'#999999'} mt={0.5}>
                        <Link style={{ textDecoration: 'none', color: 'unset' }} href={`/track/${convertStringToSlug(item.title)}-${item._id}.html?audio=${item.trackUrl}`}>{item.title}</Link>
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
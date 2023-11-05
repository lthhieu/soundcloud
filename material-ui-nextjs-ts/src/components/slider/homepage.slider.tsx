'use client'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Settings } from "react-slick";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Divider } from "@mui/material";
const SamplePrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <Button onClick={onClick} sx={{
            minWidth: '2rem', width: '2rem', height: '2rem', color: '#666', justifyContent: 'flex-start', border: '#ccc 1px solid',
            '&:hover': { color: '#f50', border: '#f70 1px solid', backgroundColor: '#fff' }, backgroundColor: '#fff',
            position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '-0.5rem', zIndex: 2
        }}><ArrowBackIosIcon /></Button>
    );
}
const SampleNextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <Button onClick={onClick} sx={{
            minWidth: '2rem', width: '2rem', height: '2rem', color: '#666', justifyContent: 'center', border: '#ccc 1px solid',
            '&:hover': { color: '#f50', border: '#f70 1px solid', backgroundColor: '#fff' }, backgroundColor: '#fff',
            position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '-0.5rem'
        }}><ArrowForwardIosIcon /></Button>
    );
}
const HomepageSlider = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    var settings: Settings = {
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 680,
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
            "h3": {
                background: ' #5f9ea0',
                color: '#fff',
                fontSize: '36px',
                lineHeight: '100px',
                margin: '10px',
                padding: '2%',
                position: 'relative',
                textAlign: 'center',
            }
        }}>

        <h2> Multiple items </h2>
        <Slider {...settings}>
            {arr.map((item, index) => {
                return (<div key={index}>
                    <h3>{item}</h3>
                </div>)
            })}
        </Slider>
        <Divider sx={{ mt: 3 }} />
    </Box>)
}
export default HomepageSlider
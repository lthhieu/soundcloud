'use client'
import * as React from 'react';
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Divider } from '@mui/material';

import CurrentTrack from './current.track';
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
interface IProps {
    playlist: IPlaylist<IExtendITrackTop>[]
}
const Playlist = (props: IProps) => {

    let { playlist } = props
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    const handleChangePagi = (event: any, value: any) => {
        console.log('value', value)
    };
    return (
        <Box>
            {playlist.length > 0 && playlist.map(item => {
                return (<Accordion key={item._id} expanded={expanded === item.title} onChange={handleChange(item.title)}>
                    <AccordionSummary>
                        <Typography>{item.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {item.tracks.length === 0 ?
                            <Typography sx={{ py: 1, px: 2 }} fontSize={14}>
                                Empty playlist
                            </Typography> : <>
                                {item.tracks.map((value: IExtendITrackTop) => {
                                    return (<Box key={value._id}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }} >
                                            <CurrentTrack track={value} /></Box>
                                        <Divider />
                                    </Box>)
                                })}</>}
                    </AccordionDetails>
                </Accordion>)
            })
            }
        </Box>
    )
}
export default Playlist
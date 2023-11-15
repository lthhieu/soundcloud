'use client'
import { useState } from 'react'
import { Box, Tab, Tabs, styled } from '@mui/material';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
const CustomTabs = styled(Tabs)(({ theme }) => ({
    '& .MuiTabs-indicator': {
        backgroundColor: '#f50', // Màu sắc của indicator
    },
    '& .Mui-selected': {
        color: '#f70 !important', // Màu sắc của chữ trong tab dược
    }
}));
const UploadTabs = () => {
    const [value, setValue] = useState(0);
    const [uploadTrack, setUploadTrack] = useState({
        fileName: '',
        percent: 0,
        uploadedFileName: ''
    })
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', pt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <CustomTabs value={value} onChange={handleChange} textColor='secondary' >
                    <Tab label="Tracks" disabled={value !== 0} />
                    <Tab label="Information" disabled={value !== 1} />
                </CustomTabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Step1 setValue={setValue} uploadTrack={uploadTrack} setUploadTrack={setUploadTrack} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Step2 setValue={setValue} uploadTrack={uploadTrack} />
            </CustomTabPanel>
        </Box>
    );
}
export default UploadTabs
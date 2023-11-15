'use client'
import * as React from 'react';
import { Box, Container, TextField, Typography, Chip } from "@mui/material"
import { useState } from "react"
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Tooltip from '@mui/material/Tooltip';
import { signIn } from "next-auth/react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from "next/link";
import { useRouter } from 'next/navigation'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const AuthSignIn = () => {
    const router = useRouter()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false)
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false)

    const [errorUsername, setErrorUsername] = useState<string>("")
    const [errorPassword, setErrorPassword] = useState<string>("")

    const [alertErrorSignIn, setAlertErrorSignIn] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertErrorSignIn("")
        setOpen(false)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }
    const handleSignIn = async () => {
        setErrorPassword("")
        setErrorUsername("")
        setIsErrorPassword(false)
        setIsErrorUsername(false)

        if (!username) {
            setIsErrorUsername(true)
            setErrorUsername("Email is not empty!")
            return
        }
        if (!password) {
            setIsErrorPassword(true)
            setErrorPassword("Password is not empty!")
            return
        }
        const res = await signIn('credentials', {
            username, password, redirect: false
        })
        if (!res?.error) {
            router.push('/')
        } else {
            // alert(res.error)
            // setAlertErrorSignin(res.error)
            setAlertErrorSignIn("Email or password is not correct")
            setOpen(true)
        }
    }
    const handlePressEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSignIn()
        }
    }
    return (
        <Container>
            <Snackbar open={open} autoHideDuration={5000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>{alertErrorSignIn}</Alert>
            </Snackbar>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Grid item
                    xs={12}
                    sm={10}
                    md={8}
                    sx={{ display: 'flex', flexDirection: 'column', background: '#fff', p: 3, gap: 2, borderRadius: 2, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link href={'/'}><KeyboardBackspaceIcon sx={{ color: '#f70', fontSize: '2rem' }} /></Link>
                        <LockIcon sx={{ color: '#f70' }} />
                        <LockIcon sx={{ color: '#fff' }} />
                    </Box>
                    <Typography sx={{ color: '#f70', fontWeight: 500, fontSize: '1.2rem', width: '100%', display: 'flex', justifyContent: 'center' }}> SoundCloud</Typography>
                    <TextField required error={isErrorUsername ? true : false} helperText={errorUsername} color="warning" onChange={(e) => { setUsername(e.target.value) }} fullWidth label="Email" variant="outlined" />
                    <TextField required error={isErrorPassword ? true : false} helperText={errorPassword} color="warning" onChange={(e) => { setPassword(e.target.value) }} fullWidth label="Password" variant="outlined" type={showPassword ? 'text' : 'password'} onKeyDown={(e) => handlePressEnter(e)} InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }} />
                    <Button onClick={() => { handleSignIn() }} sx={{ background: '#f70', "&:hover": { background: '#f50' } }} fullWidth size="large" variant="contained">SIGN IN</Button>
                    <Divider sx={{ width: '100%' }}>
                        <Chip label="Or using" />
                    </Divider>
                    <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
                        <Tooltip arrow title="Login with Github"><GitHubIcon onClick={() => signIn("github")} sx={{ fontSize: '2.5rem', "&:hover": { cursor: 'pointer' } }} /></Tooltip>
                        <Tooltip arrow title="Login with Google"><GoogleIcon sx={{ fontSize: '2.5rem', "&:hover": { cursor: 'pointer' }, color: '#ea4335' }} /></Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </Container>)
}
export default AuthSignIn


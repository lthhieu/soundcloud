'use client'
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
const AuthSignIn = () => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false)
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false)

    const [errorUsername, setErrorUsername] = useState<string>("")
    const [errorPassword, setErrorPassword] = useState<string>("")

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }
    const handleSignIn = () => {
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
        console.log('>> username', username, ", password", password)
    }
    return (

        <Container>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Grid item
                    xs={12}
                    sm={10}
                    md={8}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', background: '#fff', p: 3, gap: 2, borderRadius: 2, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}>
                    <LockIcon sx={{ color: '#f70' }} />
                    <Typography sx={{ color: '#f70', fontWeight: 500, fontSize: '1.2rem' }}> SoundCloud</Typography>
                    <TextField required error={isErrorUsername ? true : false} helperText={errorUsername} color="warning" onChange={(e) => { setUsername(e.target.value) }} fullWidth label="Email" variant="outlined" />
                    <TextField required error={isErrorPassword ? true : false} helperText={errorPassword} color="warning" onChange={(e) => { setPassword(e.target.value) }} fullWidth label="Password" variant="outlined" type={showPassword ? 'text' : 'password'} InputProps={{
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
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <GitHubIcon sx={{ fontSize: '2.5rem', "&:hover": { cursor: 'pointer' } }} />
                        <GoogleIcon sx={{ fontSize: '2.5rem', "&:hover": { cursor: 'pointer' }, color: '#ea4335' }} />
                    </Box>
                    {/* <TextField required label='Mail' variant="standard" autoFocus />

                <TextField required label='Password' variant="standard" /> */}
                    {/* <TextField onChange={(e) => { setUsername(e.target.value) }} required autoFocus label="Username" variant="outlined" helperText={errorUsername} error={isErrorUsername} /> */}
                    {/* <TextField onChange={(e) => { setPassword(e.target.value) }} required label="Password" variant="outlined" helperText={errorPassword} error={isErrorPassword} type={showPassword ? "text" : "password"}
                    InputProps={{ endAdornment: <InputAdornment position="end"><IconButton></IconButton>{showPassword ? <Visibility /> : <VisibilityOff />}</InputAdornment> }}
                /> */}
                </Grid>
            </Grid>
        </Container>)
}
export default AuthSignIn
// 'use client'
// import { Avatar, Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
// import LockIcon from '@mui/icons-material/Lock';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import GoogleIcon from '@mui/icons-material/Google';
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import InputAdornment from '@mui/material/InputAdornment';
// import IconButton from '@mui/material/IconButton';

// import { useState } from "react";

// const AuthSignIn = (props: any) => {

//     const [showPassword, setShowPassword] = useState<boolean>(false);
//     const [username, setUsername] = useState<string>("");
//     const [password, setPassword] = useState<string>("");

//     const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
//     const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

//     const [errorUsername, setErrorUsername] = useState<string>("");
//     const [errorPassword, setErrorPassword] = useState<string>("");


//     const handleSubmit = () => {
//         setIsErrorUsername(false);
//         setIsErrorPassword(false);
//         setErrorUsername("");
//         setErrorPassword("");

//         if (!username) {
//             setIsErrorUsername(true);
//             setErrorUsername("Username is not empty.")
//             return;
//         }
//         if (!password) {
//             setIsErrorPassword(true);
//             setErrorPassword("Password is not empty.")
//             return;
//         }
//         console.log(">>> check username: ", username, ' pass: ', password)
//     }

//     return (
//         <Box
//             sx={{
//                 // backgroundImage: "linear-gradient(to bottom, #ff9aef, #fedac1, #d5e1cf, #b7e6d9)",
//                 // backgroundColor: "#b7e6d9",
//                 // backgroundRepeat: "no-repeat"
//             }}
//         >
//             <Grid container
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     height: "100vh"
//                 }}
//             >
//                 <Grid
//                     item
//                     xs={12}
//                     sm={8}
//                     md={5}
//                     lg={4}
//                     sx={{
//                         boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
//                     }}
//                 >
//                     <div style={{ margin: "20px" }}>
//                         <Box sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             flexDirection: "column",
//                             width: "100%"
//                         }}>

//                             <Avatar>
//                                 <LockIcon />
//                             </Avatar>

//                             <Typography component="h1">
//                                 Sign in
//                             </Typography>
//                         </Box>

//                         <TextField
//                             onChange={(event) => setUsername(event.target.value)}
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             label="Username"
//                             // name="username"
//                             autoFocus
//                             error={isErrorUsername}
//                             helperText={errorUsername}
//                         />
//                         <TextField
//                             onChange={(event) => setPassword(event.target.value)}
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type={showPassword ? "text" : "password"}
//                             error={isErrorPassword}
//                             helperText={errorPassword}

//                             InputProps={{
//                                 endAdornment: <InputAdornment position="end">
//                                     <IconButton onClick={() => setShowPassword(!showPassword)}>
//                                         {showPassword === false ? <VisibilityOff /> : <Visibility />}
//                                     </IconButton>
//                                 </InputAdornment>,
//                             }}
//                         />
//                         <Button
//                             sx={{
//                                 my: 3
//                             }}
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             onClick={handleSubmit}
//                         >
//                             Sign In
//                         </Button>
//                         <Divider>Or using</Divider>
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 gap: "25px",
//                                 mt: 3
//                             }}
//                         >
//                             <Avatar
//                                 sx={{
//                                     cursor: "pointer",
//                                     bgcolor: "orange"
//                                 }}
//                             >
//                                 <GitHubIcon titleAccess="Login with Github" />
//                             </Avatar>

//                             <Avatar
//                                 sx={{
//                                     cursor: "pointer",
//                                     bgcolor: "orange"
//                                 }}
//                             >
//                                 < GoogleIcon titleAccess="Login with Google" />
//                             </Avatar>
//                         </Box>
//                     </div>
//                 </Grid>
//             </Grid>

//         </Box>

//     )
// }

// export default AuthSignIn;


import React, {useState} from 'react'
import { Avatar, Button, Paper, Typography, Grid, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Input from './Input'

import useStyles from './styles'

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    const isSignUp = false;

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.from} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        {isSignUp && (
                            <>
                                <Input name='first name' label='First Name' handleChange={handleChange} autoFocus half={true} />
                                <Input name='last name' label='Last Name' handleChange={handleChange} autoFocur half={true} />
                            </>
                        )}
                        <Input name='email' label='Email' handleChange={handleChange} type='email' half={false}/>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'password' : 'text'} handleShowPassword={handleShowPassword} half={false} />
                        {isSignUp && <Input name='confirm password' label='Confirm Password' handleChange={handleChange} type='password' half={false}/>}
                    </Grid>
                    <Button variant='contained' fullWidth type='submit' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

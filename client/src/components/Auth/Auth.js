import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, Typography, Grid, Container } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import Icon from './icon';
import {signin, signup} from '../../actions/auth';

import useStyles from './styles'

const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setSignUp] = useState(false);
    const [formData, setFromData] = useState(initialFormState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const classes = useStyles();

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignUp){
            dispatch(signup(formData, navigate));
        }
        else{
            dispatch(signin(formData, navigate));
        }
    }

    const handleChange = (e) => {
        const targetInput = e.target;
        setFromData({...formData, [targetInput.name]: targetInput.value});
    }

    const switchMode = () => {
        setSignUp((prevIsSignUp) => !prevIsSignUp);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log('Google sing in failed. Try again later.')
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5' className={classes.formTitle}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.from} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        {isSignUp && (
                            <>
                                <Input name='firstName' value={formData.firstName} label='First Name' handleChange={handleChange} autoFocus half={true} />
                                <Input name='lastName' value={formData.lastName} label='Last Name' handleChange={handleChange} autoFocur half={true} />
                            </>
                        )}
                        <Input name='email' value={formData.email} label='Email' handleChange={handleChange} type='email' half={false} />
                        <Input name='password' value={formData.password} label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} half={false} />
                        {isSignUp && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' half={false} />}
                    </Grid>
                    <Button variant='contained' fullWidth type='submit' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='1030049439630-u99dhgfvooj1innda7bd6vs32sig8mdp.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                Sign In with Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container>
                        <Button fullWidth onClick={switchMode}>
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

import React, { useEffect, useState } from 'react'
import decode from 'jwt-decode';
import { AppBar, Avatar, Button, Typography, Toolbar } from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import memoriesLogo from '../../images/memories-Logo.png'
import memoriesText from '../../images/memories-Text.png'
import { useDispatch } from 'react-redux'
import useStyles from './styles'


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/auth');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        //JWT..
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img src={memoriesText} alt='icon' height='45px' />
                <img src={memoriesLogo} alt='icon' height='40px' className={classes.image} />
            </Link>

            <Toolbar className={classes.toolbar} >
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Link to='/auth'>
                        <Button variant='contained' color='primary'>Sign In</Button>
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar

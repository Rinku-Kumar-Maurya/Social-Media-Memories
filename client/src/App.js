import { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts'
import { useDispatch } from 'react-redux';
import memories from './images/memories.png';
import useStyles from './styles';

function App() {
    const [currId, setCurrId] = useState(null);
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currId, dispatch]);

    return (
        <Container maxWidth='lg'>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt='memories' height='30' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={8}>
                            <Posts setCurrId={setCurrId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currId={currId} setCurrId={setCurrId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;

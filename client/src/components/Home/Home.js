import React, {useEffect, useState} from 'react'
import { Container, Grid, Grow } from '@mui/material'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import { getPosts } from '../../actions/posts'
import { useDispatch } from 'react-redux';


const Home = () => {
    const [currId, setCurrId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Posts setCurrId={setCurrId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currId={currId} setCurrId={setCurrId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home

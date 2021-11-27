import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import Post from './Post/Post'

import useStyles from './styles';

function Posts({setCurrId}) {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log(posts);

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                            <Post post={post} setCurrId={setCurrId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts;

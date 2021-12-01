import React from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import Post from './Post/Post'

import useStyles from './styles';

function Posts({ setCurrId }) {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    if (!posts.length && !isLoading) return <Typography variant='h4' alignItems='center'>No posts available.</Typography>;

    return (
        isLoading ?
            (<Grid className={classes.circularProgress} >
                <CircularProgress />
            </Grid>) :
            (<Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                            <Post post={post} setCurrId={setCurrId} />
                        </Grid>
                    ))
                }
            </Grid>)
    )
}

export default Posts;

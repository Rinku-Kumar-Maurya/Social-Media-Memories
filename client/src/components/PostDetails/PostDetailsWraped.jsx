import React, { useEffect } from 'react';
import { Paper, CircularProgress, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import CommentSection from './CommentSection';
import { useParams, useNavigate } from 'react-router';
import { getPost, getPostsBySearch } from '../../actions/posts';

import useStyles from './styles';


const PostDetailsWraped = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();


    useEffect(() => {
        dispatch(getPost(id));
    }, [id])

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);

    if (!post) return null;

    const openPost = (_id) => navigate(`/posts/${_id}`);

    if (isLoading) {
        return <Paper elevation={5} className={classes.loadingPaper}>
            <CircularProgress size='7em' />
        </Paper>
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography className={classes.spacing} variant="h3" component="h2">{post.title}</Typography>
                    <Typography className={classes.spacing} gutterBottom variant="h6" color="textSecondary" component="h3">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography className={classes.spacing} gutterBottom variant="body1" component="p">{post.message}</Typography>
                    {/* <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography> */}
                    <Typography className={classes.spacing} variant="h6">Created by: {post.name}</Typography>
                    <Typography className={classes.spacing} variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection post={post} />
            {!!recommendedPosts.length && (
                <div>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography gutterBottom variant="h5" style={{marginLeft: '15px'}}>You might also like:</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message.substr(0, 200)}...</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile} width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default PostDetailsWraped;
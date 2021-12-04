import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deletePost, likePost, getPost } from '../../../actions/posts';

import useStyles from './styles';

const Post = ({ post, setCurrId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {
        // dispatch(getPost(post._id, navigate));
        navigate(`/posts/${post._id}`);
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
            </ButtonBase>
            <div className={classes.overlay2}>
                {(user?.result.googleId === post?.creator || user?.result._id === post?.creator) && (
                    <Button style={{ color: 'white', zIndex: '10' }} size='small' onClick={() => { setCurrId(post._id) }}>
                        <MoreHorizIcon fontSize='medium' />
                    </Button>
                )}
            </div>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p' gutterBottom>{post.message.substr(0, 70)}...</Typography>
                </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size='small' style={{ color: 'red' }} onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small' />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post;

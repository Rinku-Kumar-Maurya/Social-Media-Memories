import react, { useState, useRef } from 'react'
import { Typography, Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/posts'

import useStyles from './styles'

const CommentSection = ({ post }) => {
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef();
    const dispatch = useDispatch();

    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem('profile'));

    const handleComment = async () => {
        const newComments = await dispatch(commentPost(`${user.result.name}: ${comment}`, post._id));

        setComment('');
        setComments(newComments);

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div>
                    <Typography variant='h6' gutterBottom fullWidth>Comments</Typography>
                    <div className={classes.commentsInnerContainer}>
                        {comments.map((c, i) => (
                            <Typography variant='subtitle1' gutterBottom key={i}>
                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                            </Typography>
                        ))}
                        <div ref={commentsRef} />
                    </div>
                </div>
                {user?.result?.name && (
                    <div>
                        <Typography variant='h6' gutterBottom>Write a comment</Typography>
                        <TextField
                            fullWidth
                            rows={2}
                            variant='outlined'
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' onClick={handleComment}>
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection

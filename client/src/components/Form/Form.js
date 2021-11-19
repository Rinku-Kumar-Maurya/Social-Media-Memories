import React, { useState, useEffect } from 'react'
import { Typography, Button, TextField, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

function Form({currId, setCurrId}) {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    const post = useSelector((state) => currId ? state.posts.find((p) => p._id === currId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currId){
            dispatch(updatePost(currId, postData));
        }
        else{
            dispatch(createPost(postData));
        }

        clear();
    }

    const clear = () => {
        setCurrId(null);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    }

    return (
        <Paper className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Typography variant='h6'>Creating a Memory</Typography>
                <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <Button variant='outlined' color='primary' size='large'>
                        <FileBase
                            type='file'
                            multiple={false}
                            onDone={({ base64 }) => { setPostData({ ...postData, selectedFile: base64 }) }}
                        />
                    </Button>
                </div>
                <Button className={classes.buttonSubmit} color='primary' variant='contained' size='large' type='submit' fullWidth onClick={handleSubmit}>Submit</Button>
                {/* <Button color='secondary' variant='contained' size='small' onClick={clear}  fullWidth>Clear</Button> */}
            </form>
        </Paper>
    )
}

export default Form;
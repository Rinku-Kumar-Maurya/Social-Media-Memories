import React, { useEffect, useState } from 'react'
import { Container, Grid, Grow, Paper, AppBar, TextField, Button} from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import Paginate from '../Pagination'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import { getPosts } from '../../actions/posts'
import { useDispatch } from 'react-redux'

import useStyles from './styles'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currId, setCurrId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        dispatch(getPosts());
    }, [currId, dispatch]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            // Search Post
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} md={8}>
                        <Posts fullWidth setCurrId={setCurrId} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                fullWidth
                                onKeyPress={handleKeyPress}
                                val={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <TextField>
                                <ChipInput
                                    style={{ margin: '10px 0' }}
                                    label='Search Tags'
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    variant='outlined'
                                />
                            </TextField>
                        </AppBar>
                        <Form currId={currId} setCurrId={setCurrId} />
                        <Paper elevation={6}>
                            <Paginate />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home

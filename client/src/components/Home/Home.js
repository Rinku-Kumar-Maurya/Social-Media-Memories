import React, { useEffect, useState } from 'react'
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@mui/material'
import ChipInput from 'material-ui-chip-input'
import { useNavigate, useLocation } from 'react-router-dom'
import Paginate from '../Pagination'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import { getPosts, getPostsBySearch } from '../../actions/posts'
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
    const page = (query.get('page') || 1);
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const classes = useStyles();

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search: search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
        else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
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
                    <Grid item xs={12} md={4} lg={3.5}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                fullWidth
                                onKeyDown={handleKeyPress}
                                val={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                label='Search Tags'
                                value={tags}
                                onAdd={(chip) => handleAdd(chip)}
                                onDelete={(chip) => handleDelete(chip)}
                                variant='outlined'
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
                        </AppBar>
                        <Form currId={currId} setCurrId={setCurrId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={4} className={classes.pagination}>
                                <Paginate page={page} />
                            </Paper>
                        )}

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home

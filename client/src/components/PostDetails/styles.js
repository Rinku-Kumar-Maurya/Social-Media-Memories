import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '800px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '15px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    maxWidth: '600px',
    [theme.breakpoints.down('md')]: {
      alignSelf: 'center',
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  spacing: {
    margin: '10px 0',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px',
    width: '97%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  commentsInnerContainer: {
    height: '120px',
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      margin: '10px',
    },
  },
  commentForm: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      margin: '10px',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '15px',
    },
  }
}));

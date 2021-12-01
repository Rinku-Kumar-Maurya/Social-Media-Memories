import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '8px 0',
  },
  gridContainer: {
    ['@media (max-width:900px)']: {
      flexDirection: 'column-reverse',
    },
    padding: '25px'
  },
  searchButton: {
    background: '#1976d2',
    borderRadius: 4,
    padding: '5px'
  }
}));
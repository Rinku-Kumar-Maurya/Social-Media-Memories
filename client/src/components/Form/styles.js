import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: '8px',
    },
  },
  paper: {
    padding: '16px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    display: 'flex',
    justifyContent: 'center',
    width: '97%',
    margin: '10px',
  },
  buttonSubmit: {
    marginBottom: 10,
    padding: '60px',
  },
}));
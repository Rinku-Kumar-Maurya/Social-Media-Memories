import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  },
  root: {
    '& .MuiTextField-root': {
      margin: '10px',
    },
  },
  avatar: {
    margin: '8px',
    backgroundColor: 'purple'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '28px',
  },
  formTitle: {
    marginBottom: '10px',
  },
  submit: {
    padding: '10px',
    margin: '24px 0px 16px',
  },
  googleButton: {
    marginBottom: '16px',
    padding: '10px',
  },
}));
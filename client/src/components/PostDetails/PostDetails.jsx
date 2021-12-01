import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import PostDetailsWraped from './PostDetailsWraped';


const PostDetails = () => {
    var theme = createTheme();
    theme = responsiveFontSizes(theme);
    
    return (
        <ThemeProvider theme={theme}>
            <PostDetailsWraped />
        </ThemeProvider>
    )
}

export default PostDetails;
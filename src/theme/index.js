import { createTheme } from '@material-ui/core/styles';
const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffd2a9',
            main: '#ffa07a',
            dark: '#c9714d',
            contrastText: '#fff',
         },
        error: {
            light: '#FF5959',
            main: '#FF2400',
            dark: '#AD0000',
            contrastText: '#fff',
        },
    },

    typography: {
        h6:{
            fontWeight: 'bold',
            fontSize: 18,
            letterSpacing: '-0.05px'
        }
    }
      
});

export default theme;
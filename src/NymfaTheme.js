import { createMuiTheme } from '@material-ui/core/styles';


import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';



// All the following keys are optional.
// We try our best to provide a great default value.
const NymfaTheme = createMuiTheme({
  
  text: {
    primary: 'rgba(1, 0, 0, 0.54)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)'
  },
  typography: {
    useNextVariants: true,
    h1:{
      color: 'rgba(0, 0, 0, 0.54)'
    },  
    h2:{
      color: 'rgba(0, 0, 0, 0.54)'
    },
    h3:{
      color: 'rgba(0, 0, 0, 0.54)'
    },
    h4:{
      color: 'rgba(0, 0, 0, 0.54)'
    },
    h6:{
      color: 'rgba(0, 0, 0, 0.54)'
    },
    caption:{
      color: 'rgba(0, 0, 0, 0.54)'
    }
  },
  palette: {
    primary: teal,
    secondary: red,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export default NymfaTheme;
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
      main: '#2195f2',
      light: '#6ec5ff',
      dark: '#0068bf',
      contrastText: '#fffde7',
    },
    secondary: {
      main: '#aed581',
      light: '#e1ffb1',
      dark: '#7da453',
      contrastText: '#fffde7',
    },
      openTitle: '#455a64',
      protectedTitle: '#2195f2',
      type: 'light'
    }
  })

  export default theme
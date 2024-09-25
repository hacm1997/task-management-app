import { extendTheme } from '@mui/joy/styles'

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#2fa0db',
          100: '#9ecee7',
          200: '#2fa0db',
          300: '#2fa0db',
          400: '#2fa0db',
          500: '#2fa0db',
          600: '#2fa0db',
          700: '#2fa0db',
          800: '#2fa0db',
          900: '#2fa0db'
        },
      },
    },
  },
})

// Then, pass it to `<CssVarsProvider theme={theme}>`.

import React from 'react'
import { CssVarsProvider } from '@mui/joy'
import { theme } from './styles/theme'
import './styles/global.css'
import { AllRoutes } from './routes'

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <AllRoutes />
    </CssVarsProvider>
  )
}

export default App

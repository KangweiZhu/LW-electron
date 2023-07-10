import * as react from 'react'
import Button from '@mui/material/Button'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import Navbar from './Navbar'
import BackGroundImg from './static/images/images.jpg'
import "./Custom.css"

const darkTheme = createTheme(
  {
    palette: {
      mode: 'dark'
    }
  }
)

export default function App(){
  return (
      <div className='homepage-bk'>
        <CssBaseline />
        <Navbar></Navbar>
      </div>
  )
}

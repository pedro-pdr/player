import './styles/global.css'

import { Router } from './Router';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from "@/components/ThemeProvider"
import { ToggleThemeButton } from './components/ToggleThemeButton';

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='fixed right-5 top-5'><ToggleThemeButton /></div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}


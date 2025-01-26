import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createApp } from './App'

const App = createApp();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)

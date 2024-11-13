import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header.jsx'
import ContentShare from './context/ContentShare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

   
    <BrowserRouter>
    <ContentShare>
    <App />
    </ContentShare>
    </BrowserRouter>
    
  </StrictMode>,
)

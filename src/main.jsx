import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import Organizerpage from './Organizerpage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Organizerpage />
    </BrowserRouter>
    
  </StrictMode>,
)

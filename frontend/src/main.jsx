import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import UserContext from './contexts/UserContext.jsx'
import CaptainContext from './contexts/CaptianContext.jsx'
import SocketProvider  from './contexts/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CaptainContext>
        <UserContext>
        <SocketProvider> {/* Use `SocketProvider`, not `SocketContext` */}
            <App />
          </SocketProvider>
        </UserContext>
      </CaptainContext>
    </BrowserRouter>
  </StrictMode>,
)

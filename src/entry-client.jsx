/*
  LICENSE: MIT
  Created by: Lightnet
*/
import './style/globals.css'

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { AuthProvider } from './components/auth/AuthProvider'
import { NotifyProvider } from './components/notify/NotifyProvider'
import { ThemeProvider } from './components/theme/ThemeProvider'

ReactDOM.hydrate(
  <ThemeProvider>
    <BrowserRouter>
      <NotifyProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NotifyProvider>
    </BrowserRouter>
  </ThemeProvider>
  , document.getElementById('app'))
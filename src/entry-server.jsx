/*
  LICENSE: MIT
  Created by: Lightnet
*/

import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './App'
import { AuthProvider } from './components/auth/AuthProvider'
import { NotifyProvider } from './components/notify/NotifyProvider'
import { ThemeProvider } from './components/theme/ThemeProvider'

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <ThemeProvider>
        <NotifyProvider>              
          <AuthProvider>
            <App/>
          </AuthProvider>
        </NotifyProvider>
      </ThemeProvider>
    </StaticRouter>
  )
}
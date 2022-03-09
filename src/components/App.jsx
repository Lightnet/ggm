/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { AuthProvider } from './auth/AuthProvider.jsx';
import { RoutePage } from './RoutePage.jsx';
import { ThemeProvider } from './theme/ThemeProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import { NotifyProvider } from './notify/NotifyProvider.jsx';

export default function App() {

  return (<>
    <ThemeProvider>
      <NotifyProvider>
        <AuthProvider>
          <BrowserRouter>
            <RoutePage />
          </BrowserRouter>
        </AuthProvider>
      </NotifyProvider>
    </ThemeProvider>
  </>)
}
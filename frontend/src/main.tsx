import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider toastOptions={{ defaultOptions: { position: 'top-right' } }}>
        <App />
      </ChakraProvider>
    </ReduxProvider>
  </StrictMode>
)

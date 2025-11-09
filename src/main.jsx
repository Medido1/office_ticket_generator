import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {GlobalProvider} from "./context/GlobalContext.jsx";
import {UserProvider} from "./context/UserContext.jsx";
import { InterfaceProvider } from './context/InterfaceContext.jsx';
import App from './App.jsx'
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <UserProvider>
        <InterfaceProvider>
          <App />
        </InterfaceProvider>
      </UserProvider>
    </GlobalProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider, useSelector } from 'react-redux'
import App from './App.tsx'

import store from './state-management/store/store.ts'
import type { RootState } from './state-management/store/store';

export default function Render() {
  const user = useSelector((u: RootState) => u.users.user)
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App pass={Render}/>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'
import './styles/CrestLogo.css'
import './styles/LibraryHero.css'
import './styles/LoginModal.css'
import './styles/NavigationBar.css'
import './styles/SearchForm.css'
import './styles/SignupScreen.css'
import './styles/AboutUsScreen.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

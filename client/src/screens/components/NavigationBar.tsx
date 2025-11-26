import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../../firebase'
import CrestLogo from './CrestLogo'
import { useMenuLock } from '../functions/useMenuLock'

const CSS = `
.navigation-bar {
  padding: 1.25rem clamp(1.25rem, 5vw, 4rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background-color: rgba(22, 22, 30, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-family: var(--font-afacad);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.navigation-bar__actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navigation-bar__menu-toggle {
  display: none;
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.navigation-bar__menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background: #ffffff;
  position: relative;
}

.navigation-bar__menu-icon::before,
.navigation-bar__menu-icon::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: #ffffff;
  transition: transform 0.2s ease;
}

.navigation-bar__menu-icon::before {
  top: -8px;
}

.navigation-bar__menu-icon::after {
  top: 8px;
}

.navigation-bar__crest {
  width: clamp(48px, 8vw, 64px);
  height: clamp(48px, 8vw, 64px);
}

.navigation-bar__crest .crest-logo__image {
  width: 92%;
  height: 92%;
}

.navigation-bar__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 220px;
}

.navigation-bar__titles {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  font-family: var(--font-afacad);
  color: rgba(255, 255, 255, 0.75);
}

.navigation-bar__school {
  text-transform: uppercase;
  font-weight: 600;
  font-family: var(--font-afacad);
  color: #ffffff;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
}

.navigation-bar__tagline {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
}

.navigation-bar__links {
  display: flex;
  align-items: center;
  gap: 1.8rem;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
  font-size: 1.05rem;
}

.navigation-bar__link {
  position: relative;
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  font-family: var(--font-afacad);
  color: rgba(255, 255, 255, 0.85);
  transition: color 0.5s ease-in-out;
}

.navigation-bar__link a {
  text-decoration: none;
  color: inherit;
  transition: color 0.5s ease-in-out;
}

.navigation-bar__link--active {
  color: #ffffff;
  font-weight: 600;
}

.navigation-bar__indicator {
  position: absolute;
  left: 0;
  bottom: -0.6rem;
  width: 100%;
  height: 3px;
  background: #f3d654;
  border-radius: 999px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-in-out;
  opacity: 0;
}

.navigation-bar__link--active .navigation-bar__indicator {
  transform: scaleX(1);
  opacity: 1;
}

.navigation-bar__login {
  padding: 0.65rem 1.5rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #f3d654 0%, #f0c419 100%);
  color: #1f1d28;
  font-weight: 600;
  font-family: var(--font-afacad);
  white-space: nowrap;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  border: none;
  cursor: pointer;
}

.navigation-bar__login--icon {
  padding: 0 !important;
  font-size: 1.5rem !important;
  min-width: 44px;
  width: 44px;
  height: 44px;
  border-radius: 50% !important;
  letter-spacing: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.navigation-bar__login:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(243, 214, 84, 0.28);
}

.navigation-bar__login--desktop {
  display: block;
}

.navigation-bar__login--mobile {
  display: none;
}

@media (max-width: 1024px) {
  .navigation-bar__login {
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .navigation-bar {
    gap: 1rem;
    padding: 1rem 1.25rem;
  }

  .navigation-bar__brand {
    justify-content: center;
  }

  .navigation-bar__nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: min(300px, 90vw);
    height: 100vh;
    background: #ffffff;
    padding: 6rem 2rem 2rem;
    box-shadow: -8px 0 30px rgba(0, 0, 0, 0.2);
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 0.3s;
    z-index: 100;
    align-items: flex-start;
    gap: 1.5rem;
    visibility: hidden;
  }

  .navigation-bar__nav--open {
    transform: translateX(0);
    visibility: visible;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 0s;
  }

  .navigation-bar__links {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    gap: 1.5rem;
    font-size: 1rem;
  }

  .navigation-bar__link {
    font-size: 1rem;
    letter-spacing: 0.02em;
    color: #333;
    font-weight: 600;
    padding: 0;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .navigation-bar__link a {
    color: #333;
  }

  .navigation-bar__link--active {
    color: #1f1d28;
  }

  .navigation-bar__link--active a {
    color: #1f1d28;
  }

  .navigation-bar__indicator {
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 100%;
    height: 3px;
    background: #f3d654;
    border-radius: 999px;
  }

  .navigation-bar__menu-toggle {
    display: block;
    z-index: 101;
    position: relative;
    width: 48px;
    height: 48px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navigation-bar__menu-icon {
    background: #ffffff;
    transition: background 0.2s ease;
  }

  .navigation-bar__menu-toggle--active .navigation-bar__menu-icon {
    background: transparent;
  }

  .navigation-bar__menu-toggle--active .navigation-bar__menu-icon::before {
    top: 0;
    transform: rotate(45deg);
    background: #333;
  }

  .navigation-bar__menu-toggle--active .navigation-bar__menu-icon::after {
    top: 0;
    transform: rotate(-45deg);
    background: #333;
  }

  .navigation-bar__login--desktop {
    display: none;
  }

  .navigation-bar__login--mobile {
    display: block;
    width: fit-content;
    align-self: center;
    margin-top: 12rem;
    text-align: center;
    background: linear-gradient(135deg, #f3d654 0%, #f0c419 100%);
    color: #1f1d28;
    border: none;
    padding: 0.5rem 2rem;
    border-radius: 99px;
    font-size: 1.05rem;
    font-weight: 700;
    margin-left: 0;
    box-sizing: border-box;
  }

  .navigation-bar__login--mobile.navigation-bar__login--icon {
    padding: 0 !important;
    width: 44px;
    height: 44px;
    border-radius: 50% !important;
    font-size: 1.5rem !important;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    letter-spacing: 0;
    margin-top: 0;
    align-self: center;
  }
}
`

type NavigationBarProps = {
  onLoginClick: () => void
  ctaLabel?: string
  onNavigate: (page: string) => void
  currentPage?: string
}

const NavigationBar = ({ onLoginClick, ctaLabel = 'Log into your account', onNavigate, currentPage = 'home' }: NavigationBarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const styleId = 'navigation-bar-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  // Check if user is logged in using Firebase Auth state
  useEffect(() => {
    // Listen to Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // User is authenticated - show profile icon
        setIsLoggedIn(true)
        // Sync localStorage with auth state
        localStorage.setItem('userLoggedIn', 'true')
      } else {
        // User is not authenticated - show login button
        setIsLoggedIn(false)
        localStorage.removeItem('userLoggedIn')
        localStorage.removeItem('userLibraryCard')
      }
    })
    
    return () => {
      unsubscribe()
    }
  }, [])

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useMenuLock(isMenuOpen)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (page: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    onNavigate(page)
    setIsMenuOpen(false)
  }

  return (
    <header className="navigation-bar">
      <div className="navigation-bar__brand">
        <CrestLogo className="navigation-bar__crest" />
        <div className="navigation-bar__titles">
          <span className="navigation-bar__school">Assumption Iloilo</span>
          <span className="navigation-bar__tagline">18 General Luna St., Iloilo City 5000</span>
        </div>
      </div>
      <div className="navigation-bar__actions">
        <nav aria-label="Primary" className={`navigation-bar__nav ${isMenuOpen ? 'navigation-bar__nav--open' : ''}`}>
          <ul className="navigation-bar__links">
            <li className={`navigation-bar__link ${currentPage === 'home' ? 'navigation-bar__link--active' : ''}`}>
              <a href="#" onClick={handleNavClick('home')}>Home</a>
              <span className="navigation-bar__indicator"></span>
            </li>
            <li className={`navigation-bar__link ${currentPage === 'about' ? 'navigation-bar__link--active' : ''}`}>
              <a href="#" onClick={handleNavClick('about')}>About Us</a>
              <span className="navigation-bar__indicator"></span>
            </li>
            <li className={`navigation-bar__link ${currentPage === 'academics' ? 'navigation-bar__link--active' : ''}`}>
              <a href="#" onClick={handleNavClick('academics')}>Academics</a>
              <span className="navigation-bar__indicator"></span>
            </li>
            <li className={`navigation-bar__link ${currentPage === 'admissions' ? 'navigation-bar__link--active' : ''}`}>
              <a href="#" onClick={handleNavClick('admissions')}>Admissions</a>
              <span className="navigation-bar__indicator"></span>
            </li>
            <li className={`navigation-bar__link ${currentPage === 'news' ? 'navigation-bar__link--active' : ''}`}>
              <a href="#" onClick={handleNavClick('news')}>News & Events</a>
              <span className="navigation-bar__indicator"></span>
            </li>
            <li className={`navigation-bar__link ${currentPage === 'facilities' ? 'navigation-bar__link--active' : ''}`}>
              <a href="#" onClick={handleNavClick('facilities')}>School Facilities</a>
              <span className="navigation-bar__indicator"></span>
            </li>
            <li className={`navigation-bar__link ${currentPage === 'contact' ? 'navigation-bar__link--active' : ''}`}>
              <a href="#" onClick={handleNavClick('contact')}>Contact Us</a>
              <span className="navigation-bar__indicator"></span>
            </li>
          </ul>
          <button className={`navigation-bar__login navigation-bar__login--mobile ${isLoggedIn ? 'navigation-bar__login--icon' : ''}`} type="button" onClick={onLoginClick}>
            {isLoggedIn ? '👤' : ctaLabel}
          </button>
        </nav>
        <button className={`navigation-bar__login navigation-bar__login--desktop ${isLoggedIn ? 'navigation-bar__login--icon' : ''}`} type="button" onClick={onLoginClick}>
          {isLoggedIn ? '👤' : ctaLabel}
        </button>
        <button
          className={`navigation-bar__menu-toggle ${isMenuOpen ? 'navigation-bar__menu-toggle--active' : ''}`}
          type="button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span className="navigation-bar__menu-icon" aria-hidden="true"></span>
        </button>
      </div>
    </header>
  )
}

export default NavigationBar

import { useState } from 'react'
import CrestLogo from './CrestLogo'
import { useMenuLock } from '../functions/useMenuLock'

type NavigationBarProps = {
  onLoginClick: () => void
  ctaLabel?: string
  onNavigate: (page: string) => void
}

const NavigationBar = ({ onLoginClick, ctaLabel = 'Log into your account', onNavigate }: NavigationBarProps) => {
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
            <li className="navigation-bar__link">
              <a href="#" onClick={handleNavClick('home')}>Home</a>
            </li>
            <li className="navigation-bar__link">
              <a href="#" onClick={handleNavClick('about')}>About Us</a>
            </li>
            <li className="navigation-bar__link">
              <a href="#">Academics</a>
            </li>
            <li className="navigation-bar__link">
              <a href="#">Admissions</a>
            </li>
            <li className="navigation-bar__link">
              <a href="#">News & Events</a>
            </li>
            <li className="navigation-bar__link">
              <a href="#">School Facilities</a>
            </li>
            <li className="navigation-bar__link">
              <a href="#">Contact Us</a>
            </li>
          </ul>
          <button className="navigation-bar__login navigation-bar__login--mobile" type="button" onClick={onLoginClick}>
            {ctaLabel}
          </button>
        </nav>
        <button className="navigation-bar__login navigation-bar__login--desktop" type="button" onClick={onLoginClick}>
          {ctaLabel}
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

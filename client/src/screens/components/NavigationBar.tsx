import CrestLogo from './CrestLogo'

type NavigationBarProps = {
  onLoginClick: () => void
  ctaLabel?: string
}

const NavigationBar = ({ onLoginClick, ctaLabel = 'Log into your account' }: NavigationBarProps) => {
  return (
    <header className="navigation-bar">
      <div className="navigation-bar__brand">
        <CrestLogo className="navigation-bar__crest" />
        <div className="navigation-bar__titles">
          <span className="navigation-bar__school">Assumption Iloilo</span>
          <span className="navigation-bar__tagline">18 General Luna St., Iloilo City 5000</span>
        </div>
      </div>
      <nav aria-label="Primary">
        <ul className="navigation-bar__links">
          <li className="navigation-bar__link navigation-bar__link--active">
            <a href="#">Home</a>
            <span className="navigation-bar__indicator" aria-hidden="true" />
          </li>
          <li className="navigation-bar__link">
            <a href="#">About Us</a>
          </li>
          <li className="navigation-bar__link">
            <a href="#">Mission and Vision</a>
          </li>
          <li className="navigation-bar__link">
            <a href="#">Policies</a>
          </li>
          <li className="navigation-bar__link">
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </nav>
      <button className="navigation-bar__login" type="button" onClick={onLoginClick}>
        {ctaLabel}
      </button>
    </header>
  )
}

export default NavigationBar


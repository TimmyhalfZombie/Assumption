import CrestLogo from './CrestLogo'

const NavigationBar = () => {
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
      <a className="navigation-bar__login" href="#">
        Log into your account
      </a>
    </header>
  )
}

export default NavigationBar


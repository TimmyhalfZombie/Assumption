import { useState } from 'react'
import type { SignupFormValues } from '../functions/useSignupForm'
import { useMenuLock } from '../functions/useMenuLock'

type SignupScreenProps = {
  values: SignupFormValues
  isSubmitting: boolean
  isPasswordMismatch: boolean
  onChange: (field: keyof SignupFormValues, value: string) => void
  onSubmit: () => void
  onBackToLogin: () => void
}

const SignupScreen = ({
  values,
  isSubmitting,
  isPasswordMismatch,
  onChange,
  onSubmit,
  onBackToLogin,
}: SignupScreenProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useMenuLock(isMenuOpen)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="signup-page">
      <header className="signup-header">
        <div className="signup-header__brand">
          <img src="/assets/images/assumption-logo.png" alt="Assumption Iloilo crest" className="signup-header__logo" />
          <div className="signup-header__titles">
            <h1>Assumption Iloilo</h1>
            <p>18 General Luna St., Iloilo City 5000</p>
          </div>
        </div>
        <div className="signup-header__actions">
          <nav aria-label="Secondary" className={`signup-header__nav ${isMenuOpen ? 'signup-header__nav--open' : ''}`}>
            <a href="#" className="signup-header__link signup-header__link--active">
              Home
            </a>
            <a href="#" className="signup-header__link">
              About Us
            </a>
            <a href="#" className="signup-header__link">
              Mission and Vision
            </a>
            <a href="#" className="signup-header__link">
              Policies
            </a>
            <a href="#" className="signup-header__link">
              Contact Us
            </a>
            <button className="signup-header__login signup-header__login--mobile" type="button" onClick={onBackToLogin}>
              Log into your account
            </button>
          </nav>
          <button className="signup-header__login signup-header__login--desktop" type="button" onClick={onBackToLogin}>
            Log into your account
          </button>
          <button
            className={`signup-header__menu-toggle ${isMenuOpen ? 'signup-header__menu-toggle--active' : ''}`}
            type="button"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className="signup-header__menu-icon" aria-hidden="true"></span>
          </button>
        </div>
      </header>
      <main className="signup-screen__content">
        <form className="signup-form" onSubmit={handleSubmit}>
          <section className="signup-section signup-section--library">
            <header className="signup-section__header">
              <span className="signup-section__icon" aria-hidden="true">
                🏛️
              </span>
              <h2>Library Information</h2>
            </header>
            <div className="signup-section__grid signup-section__grid--two">
              <label>
                Library card number
                <input
                  type="text"
                  value={values.libraryCardNumber}
                  onChange={(event) => onChange('libraryCardNumber', event.target.value)}
                  required
                  maxLength={32}
                />
                <span className="signup-required">Required</span>
                <span className="signup-field__hint">Card number must be between 1 and 32 characters.</span>
              </label>
              <label>
                Home library
                <input type="text" value={values.homeLibrary} onChange={(event) => onChange('homeLibrary', event.target.value)} required />
                <span className="signup-required">Required</span>
              </label>
              <label>
                Category
                <select value={values.category} onChange={(event) => onChange('category', event.target.value)} required>
                  <option value="">Select</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                  <option value="guest">Guest</option>
                </select>
                <span className="signup-required">Required</span>
              </label>
            </div>
          </section>

          <section className="signup-section signup-section--personal">
            <header className="signup-section__header">
              <span className="signup-section__icon" aria-hidden="true">
                👤
              </span>
              <h2>Personal Information</h2>
            </header>
            <div className="signup-section__grid signup-section__grid--three">
              <label>
                Last name
                <input type="text" value={values.lastName} onChange={(event) => onChange('lastName', event.target.value)} required />
                <span className="signup-required">Required</span>
              </label>
              <label>
                First name
                <input type="text" value={values.firstName} onChange={(event) => onChange('firstName', event.target.value)} required />
                <span className="signup-required">Required</span>
              </label>
              <label>
                Middle name
                <input type="text" value={values.middleName} onChange={(event) => onChange('middleName', event.target.value)} />
              </label>
              <label>
                Date of birth
                <div className="signup-input-icon">
                  <input type="date" value={values.dob} onChange={(event) => onChange('dob', event.target.value)} required />
                </div>
              </label>
              <label>
                Gender
                <select value={values.gender} onChange={(event) => onChange('gender', event.target.value)} required>
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="prefer_not_say">Prefer not to say</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                Phone number
                <input type="tel" value={values.phone} onChange={(event) => onChange('phone', event.target.value)} required />
                <span className="signup-required">Required</span>
              </label>
              <label className="signup-section__grid--full">
                Email address
                <input type="email" value={values.email} onChange={(event) => onChange('email', event.target.value)} required />
                <span className="signup-required">Required</span>
              </label>
            </div>
          </section>

          <section className="signup-section signup-section--address">
            <header className="signup-section__header">
              <span className="signup-section__icon" aria-hidden="true">
                📍
              </span>
              <h2>Address</h2>
            </header>
            <div className="signup-section__grid signup-section__grid--two">
              <label>
                Address
                <input type="text" value={values.address} onChange={(event) => onChange('address', event.target.value)} required />
                <span className="signup-required">Required</span>
              </label>
              <label>
                City
                <input type="text" value={values.city} onChange={(event) => onChange('city', event.target.value)} required />
                <span className="signup-required">Required</span>
              </label>
              <label>
                Country
                <input type="text" value={values.country} onChange={(event) => onChange('country', event.target.value)} required />
                <span className="signup-required">Required</span>
              </label>
            </div>
          </section>

          <section className="signup-section signup-section--security">
            <header className="signup-section__header">
              <span className="signup-section__icon" aria-hidden="true">
                🔐
              </span>
              <h2>Password and Verification</h2>
            </header>
            <div className="signup-section__grid">
              <label>
                Password
                <input type="password" value={values.password} onChange={(event) => onChange('password', event.target.value)} required />
                <span className="signup-required">Required</span>
              </label>
              <label>
                Confirm password
                <input
                  type="password"
                  value={values.confirmPassword}
                  onChange={(event) => onChange('confirmPassword', event.target.value)}
                  required
                />
                {isPasswordMismatch ? (
                  <span className="signup-field__error" role="alert">
                    Passwords do not match.
                  </span>
                ) : (
                  <span className="signup-required">Required</span>
                )}
              </label>
              <label>
                Verification
                <input
                  type="text"
                  value={values.verificationCode}
                  onChange={(event) => onChange('verificationCode', event.target.value)}
                  required
                />
                <span className="signup-required">Required</span>
              </label>
            </div>
          </section>

          <div className="signup-actions">
            <button className="signup-actions__primary" type="submit" disabled={isSubmitting || isPasswordMismatch}>
              {isSubmitting ? 'Saving…' : 'Login'}
            </button>
          </div>
        </form>
      </main>
      <footer className="signup-page__footer">© {new Date().getFullYear()} Assumption Iloilo</footer>
    </div>
  )
}

export default SignupScreen


import { useEffect } from 'react'
import type { SignupFormValues } from '../functions/useSignupForm'
import NavigationBar from './NavigationBar'

const CSS = `
.signup-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.signup-screen__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3.5rem);
  gap: clamp(1.5rem, 4vw, 2.5rem);
  background: #ffffff;
  border-top: none;
}

.signup-form {
  width: min(780px, 100%);
  display: flex;
  flex-direction: column;
  gap: clamp(1.4rem, 2.6vw, 1.9rem);
}

.signup-section {
  border-radius: 18px;
  border: 1px solid rgba(24, 22, 35, 0.18);
  padding: clamp(1.1rem, 2.4vw, 1.5rem);
  background: rgba(255, 246, 244, 0.96);
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--font-afacad);
  color: #1f1d28;
  border-top: 4px solid #4da3ff;
}

.signup-section--library {
  border-top-color: #1f1d28;
}

.signup-section--personal {
  border-top-color: #4da3ff;
}

.signup-section--address {
  border-top-color: #c06fe1;
}

.signup-section--security {
  border-top-color: #f6de4f;
}

.signup-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.95rem;
  font-weight: 700;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(31, 29, 40, 0.18);
}

.signup-section__header h2 {
  margin: 0;
  font-size: inherit;
  text-align: right;
  flex: 1;
}

.signup-section__icon {
  font-size: 1.1rem;
  background: #1f1e2c;
  color: #f6de4f;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
}

.signup-section__grid {
  display: grid;
  gap: 1rem;
}

.signup-section__grid--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.signup-section__grid--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.signup-section__grid label {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.94rem;
}

.signup-section__grid input,
.signup-section__grid select {
  border: 1px solid rgba(24, 22, 35, 0.18);
  border-radius: 10px;
  padding: 0.75rem 0.95rem;
  background: rgba(255, 255, 255, 0.98);
  font-family: var(--font-afacad);
  font-size: 0.95rem;
  appearance: none;
}

.signup-section__grid select {
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%231f1e2c' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 0.9rem) center;
  cursor: pointer;
}

.signup-section__grid--full {
  grid-column: 1 / -1;
}

.signup-section__grid input:focus {
  outline: 2px solid rgba(243, 214, 84, 0.7);
}

.signup-required {
  font-size: 0.78rem;
  font-weight: 600;
  color: #d62828;
}

.signup-input-icon {
  position: relative;
}

.signup-input-icon::after {
  content: '📅';
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.signup-field__hint {
  font-size: 0.78rem;
  color: rgba(31, 30, 42, 0.6);
}

.signup-field__error {
  font-size: 0.78rem;
  color: #c83838;
}

.signup-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-afacad);
}

.signup-actions__primary {
  background: #181628;
  color: #f6de4f;
  font-weight: 700;
  width: min(280px, 100%);
  justify-content: center;
  border: none;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  border-radius: 999px;
  padding: 0.9rem 2.2rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  display: flex;
  align-items: center;
}

.signup-actions__secondary {
  display: none;
}

.signup-actions__primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(243, 214, 84, 0.35);
}

.signup-actions__primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.signup-actions__secondary {
  background: transparent;
  border: 1px solid rgba(24, 22, 35, 0.18);
  color: #1f1d28;
}

.signup-actions__secondary:hover {
  background: rgba(30, 29, 42, 0.2);
}

.signup-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.signup-page__footer {
  text-align: center;
  width: 100%;
  margin-top: auto;
  padding: 1.5rem 1rem;
  font-family: var(--font-afacad);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  color: #f6de4f;
  background: #181628;
  border-top: 4px solid #f6de4f;
  flex-shrink: 0;
}

/* Tablet styles (768px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .signup-container {
    padding: 2rem 2.5rem;
  }

  .signup-section__grid--three {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .signup-section__grid--two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .signup-actions {
    flex-direction: row;
    gap: 1rem;
  }

  .signup-actions__primary,
  .signup-actions__secondary {
    flex: 1;
  }
}

@media (max-width: 900px) {
  .signup-section__grid--three {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .signup-actions {
    flex-direction: column-reverse;
  }

  .signup-actions__primary,
  .signup-actions__secondary {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .signup-section__grid--two,
  .signup-section__grid--three {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .signup-form {
    gap: 1.4rem;
  }

  .signup-section {
    padding: 1rem;
  }
}
`

type SignupScreenProps = {
  values: SignupFormValues
  isSubmitting: boolean
  isPasswordMismatch: boolean
  onChange: (field: keyof SignupFormValues, value: string) => void
  onSubmit: () => void
  onBackToLogin: () => void
  onNavigate: (page: string) => void
}

const SignupScreen = ({
  values,
  isSubmitting,
  isPasswordMismatch,
  onChange,
  onSubmit,
  onBackToLogin,
  onNavigate,
}: SignupScreenProps) => {
  useEffect(() => {
    const styleId = 'signup-screen-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <div className="signup-page">
      <NavigationBar onLoginClick={onBackToLogin} onNavigate={onNavigate} currentPage="home" />
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
                Library card number / School ID
                <input
                  type="text"
                  value={values.libraryCardNumber}
                  onChange={(event) => onChange('libraryCardNumber', event.target.value)}
                  required
                  maxLength={32}
                  placeholder="202X-XXXX"
                />
                <span className="signup-required">Required</span>
                <span className="signup-field__hint">This will be used for login.</span>
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
              <h2>Password</h2>
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
            </div>
          </section>

          <div className="signup-actions">
            <button className="signup-actions__primary" type="submit" disabled={isSubmitting || isPasswordMismatch}>
              {isSubmitting ? 'Saving…' : 'Sign up'}
            </button>
          </div>
        </form>
      </main>
      <footer className="signup-page__footer">© {new Date().getFullYear()} Assumption Iloilo</footer>
    </div>
  )
}

export default SignupScreen
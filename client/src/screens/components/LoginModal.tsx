import { useEffect, useState } from 'react'

// --- Inline Icons for Password Toggle ---
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .87-.03 1.28-.09" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
)

type LoginModalProps = {
  isOpen: boolean
  account: string
  password: string
  isSubmitting: boolean
  onAccountChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onClose: () => void
  onSubmit: () => void
  onCreateAccount: () => void
}

const LoginModal = ({
  isOpen,
  account,
  password,
  isSubmitting,
  onAccountChange,
  onPasswordChange,
  onClose,
  onSubmit,
  onCreateAccount,
}: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const styleId = 'login-modal-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  // Reset password visibility when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowPassword(false)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <div 
      className="login-modal__overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="login-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          className="login-modal__close" 
          type="button" 
          onClick={onClose} 
          aria-label="Close login form"
        >
          ×
        </button>
        <h2 id="login-title" className="login-modal__title">
          Login your account
        </h2>
        <form className="login-modal__form" onSubmit={handleSubmit}>
          <label className="login-modal__label" htmlFor="login-account">
            Account
          </label>
          <input
            id="login-account"
            type="text"
            className="login-modal__input"
            value={account}
            onChange={(event) => onAccountChange(event.target.value)}
            placeholder="School ID / Library Card"
            autoComplete="username"
            required
          />

          <label className="login-modal__label" htmlFor="login-password">
            Password
          </label>
          <div className="login-modal__password-wrapper">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              className="login-modal__input login-modal__input--password"
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="login-modal__password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>

          <button className="login-modal__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button className="login-modal__create-account" type="button" onClick={onCreateAccount}>
          Create an account
        </button>
      </div>
    </div>
  )
}

const CSS = `
.login-modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(16, 16, 24, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
  padding: 1rem;
  opacity: 0;
  animation: fadeIn 0.25s ease forwards;
}

.login-modal {
  background: rgba(32, 32, 40, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2.5rem;
  width: min(420px, 100%);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  transform: translateY(20px) scale(0.98);
  opacity: 0;
  animation: modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  z-index: 20001;
  pointer-events: auto;
}

.login-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.75rem;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  line-height: 1;
  z-index: 20001;
  pointer-events: auto;
}

.login-modal__close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.login-modal__title {
  margin: 0 0 0.5rem;
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.75rem;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.02em;
}

.login-modal__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.login-modal__label {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: -0.5rem;
  margin-left: 0.25rem;
}

.login-modal__input {
  width: 100%;
  padding: 0.9rem 1.1rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.login-modal__input:focus {
  outline: 2px solid rgba(243, 214, 84, 0.65);
}

.login-modal__input::placeholder {
  font-family: var(--font-afacad);
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.04em;
}

.login-modal__password-wrapper {
  position: relative;
  width: 100%;
}

.login-modal__input--password {
  padding-right: 3rem;
}

.login-modal__password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;
  z-index: 1;
  pointer-events: auto;
}

.login-modal__password-toggle:hover {
  color: rgba(255, 255, 255, 0.9);
}

.login-modal__password-toggle:focus {
  outline: none;
  color: rgba(243, 214, 84, 0.8);
}

.login-modal__submit {
  margin-top: 0.5rem;
  border: none;
  border-radius: 999px;
  padding: 0.85rem 1.5rem;
  background: linear-gradient(135deg, #f6de4f 0%, #e1b622 100%);
  color: #1f1d28;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: var(--font-afacad);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  pointer-events: auto;
  z-index: 20002;
}

.login-modal__submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(243, 214, 84, 0.35);
}

.login-modal__submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.login-modal__create-account {
  align-self: flex-start;
  border: none;
  background: none;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  font-family: var(--font-afacad);
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
  pointer-events: auto;
  z-index: 20002;
}

.login-modal__create-account:hover {
  color: rgba(255, 255, 255, 1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalSlideIn {
  from {
    transform: translateY(20px) scale(0.98);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
`

export default LoginModal
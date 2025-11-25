import { useEffect } from 'react'

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
  useEffect(() => {
    const styleId = 'login-modal-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  if (!isOpen) {
    return null
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onClose()
  }

  return (
    <div 
      className="login-modal__overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="login-title"
      onClick={handleOverlayClick}
    >
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          className="login-modal__close" 
          type="button" 
          onClick={handleCloseClick} 
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
            placeholder="Account"
            autoComplete="username"
            required
          />

          <label className="login-modal__label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="login-modal__input"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
          />

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

export default LoginModal

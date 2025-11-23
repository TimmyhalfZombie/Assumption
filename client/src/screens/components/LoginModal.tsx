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
  if (!isOpen) {
    return null
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <div className="login-modal__overlay" role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div className="login-modal">
        <button className="login-modal__close" type="button" onClick={onClose} aria-label="Close login form">
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


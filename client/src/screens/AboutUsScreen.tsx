import NavigationBar from './components/NavigationBar'
import { useLoginModal } from './functions/useLoginModal'
import LoginModal from './components/LoginModal'
import { useState, useEffect } from 'react'

type AboutUsScreenProps = {
  onNavigate: (page: string) => void
}

const AboutUsScreen = ({ onNavigate }: AboutUsScreenProps) => {
  const {
    isLoginOpen,
    account,
    password,
    isSubmitting,
    openLogin,
    closeLogin,
    handleAccountChange,
    handlePasswordChange,
    handleLoginSubmit,
    openSignup // Used for create account in modal
  } = useLoginModal()

  // We might need to handle Signup navigation if "Create Account" is clicked in About Us -> Login Modal
  // But for now, simple login support is enough. 
  // If user clicks "Create Account", we probably want to go to Home -> Signup? 
  // Or simply show Signup modal. But SignupScreen is a full screen.
  // Let's keep it simple: LoginModal opens. If they click Create Account, maybe navigate to Home with Signup open? 
  // Or just handle basic About Us for now.

  const handleLoginClick = () => {
    openLogin()
  }

  return (
    <div className="about-us-screen">
      <NavigationBar onLoginClick={handleLoginClick} onNavigate={onNavigate} />
      <main className="about-us-content">
        <div className="about-us-hero">
          <div className="about-us-hero__overlay"></div>
          <h1 className="about-us-hero__title">ABOUT US</h1>
        </div>
        <section className="about-us-history">
          <div className="about-us-history__container">
            <h2 className="about-us-history__title">HISTORY OF ASSUMPTION ILOILO</h2>
            <div className="about-us-history__text">
              <p>18 General Luna</p>
              <p>Prieure de NOTRE DAME DU ST. SACRAMENT</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </section>
      </main>
      <LoginModal
        isOpen={isLoginOpen}
        account={account}
        password={password}
        isSubmitting={isSubmitting}
        onAccountChange={handleAccountChange}
        onPasswordChange={handlePasswordChange}
        onClose={closeLogin}
        onSubmit={handleLoginSubmit}
        onCreateAccount={() => {
            closeLogin()
            // If we had a way to open signup directly, we would. 
            // For now, maybe navigate home? Or pass a prop to trigger signup?
            // Let's just log for now or navigate home.
            onNavigate('home') 
        }}
      />
      <footer className="signup-page__footer">© {new Date().getFullYear()} Assumption Iloilo</footer>
    </div>
  )
}

export default AboutUsScreen


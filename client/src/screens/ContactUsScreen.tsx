import { useEffect, useState } from 'react'
import NavigationBar from './components/NavigationBar'
import SchoolMap from './components/SchoolMap'
import { useLoginModal } from './functions/useLoginModal'
import LoginModal from './components/LoginModal'

// --- INLINE ICONS (Fix for missing lucide-react) ---
const Phone = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const Mail = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
)

const MapPin = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)

const Printer = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect width="12" height="8" x="6" y="14"></rect>
  </svg>
)

const Send = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
)

// --- DATA CONTENT ---
const CONTACT_CONTENT = {
  address: {
    line1: "#18 General Luna St., Iloilo City",
    line2: "Philippines, 5000"
  },
  phone: [
    "Trunk line: (033) 337-3194",
    "Or: (033) 338-1816"
  ],
  fax: "(033) 338-1817",
  emails: [
    "admissions@assumptioniloilo.edu.ph",
    "admin@assumptioniloilo.edu.ph",
    "registrar@assumptioniloilo.edu.ph"
  ]
}

type ContactUsScreenProps = {
  onNavigate: (page: string) => void
  onProfileClick?: () => void
}

const ContactUsScreen = ({ onNavigate, onProfileClick }: ContactUsScreenProps) => {
  const [isMapFullscreen, setIsMapFullscreen] = useState(false)

  useEffect(() => {
    const styleId = 'contact-screen-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  useEffect(() => {
    if (isMapFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMapFullscreen])

  const {
    isLoginOpen,
    account,
    password,
    isSubmitting,
    openLogin,
    closeLogin,
    handleAccountChange,
    handlePasswordChange,
    handleLoginSubmit
  } = useLoginModal()

  return (
    <div className="contact-screen">
      <NavigationBar 
        onLoginClick={openLogin} 
        onProfileClick={onProfileClick}
        onNavigate={onNavigate} 
        currentPage="contact"
      />
      
      <header className="contact-hero">
        <div>
          <h1 className="contact-hero__title">Contact Us</h1>
        </div>
      </header>
      
      <main className="contact-container">
        
        {/* --- LEFT COLUMN: DETAILS & FORM --- */}
        <div className="contact-info-card">
          <h2 className="contact-section-title">Contact Details</h2>
          
          <div className="contact-details">
            {/* Address */}
            <div className="contact-item">
              <div className="contact-icon-box">
                <MapPin size={22} />
              </div>
              <div className="contact-text-group">
                <span className="contact-label">Our Location</span>
                <span className="contact-value">{CONTACT_CONTENT.address.line1}</span>
                <span className="contact-value">{CONTACT_CONTENT.address.line2}</span>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-item">
              <div className="contact-icon-box">
                <Phone size={22} />
              </div>
              <div className="contact-text-group">
                <span className="contact-label">Phone Numbers</span>
                {CONTACT_CONTENT.phone.map((line, idx) => (
                  <span key={idx} className="contact-value">{line}</span>
                ))}
              </div>
            </div>

            {/* Fax */}
            <div className="contact-item">
              <div className="contact-icon-box">
                <Printer size={22} />
              </div>
              <div className="contact-text-group">
                <span className="contact-label">Fax Number</span>
                <span className="contact-value">{CONTACT_CONTENT.fax}</span>
              </div>
            </div>

            {/* Email */}
            <div className="contact-item">
              <div className="contact-icon-box">
                <Mail size={22} />
              </div>
              <div className="contact-text-group">
                <span className="contact-label">Email Addresses</span>
                {CONTACT_CONTENT.emails.map((email, idx) => (
                  <a key={idx} href={`mailto:${email}`} className="contact-email-link contact-value">
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="contact-form-section">
            <h3 className="contact-label" style={{ marginBottom: '1.5rem' }}>Send us a message</h3>
            <form onSubmit={(e) => e.preventDefault()} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <input type="text" placeholder="Your Name" className="contact-input" required />
              <input type="email" placeholder="Your Email" className="contact-input" required />
              <textarea placeholder="How can we help you?" className="contact-textarea" required></textarea>
              <button className="contact-submit-btn">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>

        {/* --- RIGHT COLUMN: MAP SPACE --- */}
        <div className="map-wrapper">
          {/* This Component holds the actual map logic */}
          <div className="map-with-button">
            <SchoolMap />
            <button 
              className="map-fullscreen-btn"
              onClick={() => setIsMapFullscreen(true)}
              aria-label="View map in fullscreen"
              title="View map in fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            </button>
          </div>
        </div>

      </main>

      {/* Fullscreen Map Modal */}
      {isMapFullscreen && (
        <div 
          className="map-fullscreen-modal"
          onClick={() => setIsMapFullscreen(false)}
        >
          <button 
            className="map-fullscreen-modal__close"
            onClick={(e) => {
              e.stopPropagation()
              setIsMapFullscreen(false)
            }}
            aria-label="Close fullscreen"
          >
            ×
          </button>
          <div 
            className="map-fullscreen-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <SchoolMap />
          </div>
        </div>
      )}

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
           onNavigate('home') 
        }}
      />
      <footer className="signup-page__footer" style={{ marginTop: 'auto', padding: '1.5rem 1rem', textAlign: 'center', background: '#181628', color: '#f6de4f', borderTop: '4px solid #f6de4f', fontFamily: 'var(--font-afacad)' }}>
        © {new Date().getFullYear()} Assumption Iloilo
      </footer>
    </div>
  )
}

// --- CSS STYLES ---
const CSS = `
.contact-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #1f1d28;
}

.contact-hero {
  background-color: #1f1d28;
  background-image: url('/assets/images/Assumption-iloilo-school-campus.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #ffffff;
  padding: 0;
  text-align: center;
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.contact-hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 29, 42, 0.6); /* Dark overlay - same as About Us */
  z-index: 1;
}

.contact-hero::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: #f3d654;
}

.contact-hero__title {
  position: relative;
  color: #ffffff;
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: clamp(3rem, 8vw, 5rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: center;
  z-index: 2;
  margin: 0;
}

.contact-hero__subtitle {
  position: relative;
  color: #f3d654;
  font-family: var(--font-afacad);
  font-size: clamp(1rem, 2vw, 1.2rem);
  z-index: 2;
  margin: 0;
  margin-top: 0.5rem;
}

.contact-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem clamp(1.25rem, 5vw, 4rem);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* Tablet styles (768px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .contact-content {
    padding: 2rem 2.5rem;
  }

  .contact-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .map-wrapper {
    width: 100%;
    height: 450px;
    margin-top: 2rem;
  }

  .contact-info-section {
    padding: 1.5rem;
  }

  .contact-info-item {
    padding: 1rem;
  }
}

@media (min-width: 1024px) {
  .contact-container {
    grid-template-columns: 1fr 1.2fr; /* Info Left, Map Right */
    align-items: stretch; /* This ensures both columns are equal height */
    gap: 1.5rem;
  }
}

/* --- INFO CARD (Left Column) --- */
.contact-info-card {
  background: #f8f9fa;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  /* Ensure it fills the grid cell */
  height: 100%;
  display: flex;
  flex-direction: column;
}

.contact-section-title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.5rem;
  color: #1f1d28;
  margin-bottom: 2rem;
  text-transform: uppercase;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 1rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-item {
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
}

.contact-icon-box {
  background: #1f1d28;
  color: #f3d654;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.contact-text-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.contact-label {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.1rem;
  color: #1f1d28;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-value {
  font-family: var(--font-afacad);
  font-size: 1.05rem;
  color: #4a4a5a;
  line-height: 1.5;
}

.contact-email-link {
  color: #1f1d28;
  text-decoration: none;
  border-bottom: 1px dotted #1f1d28;
  transition: all 0.2s;
}

.contact-email-link:hover {
  color: #d4ac0d;
  border-bottom-color: #d4ac0d;
}

/* --- FORM SECTION --- */
.contact-form-section {
  margin-top: 3rem;
  padding-top: 2.5rem;
  padding-left: -8rem;
  margin-left: -2rem;
  border-top: 2px dashed #e0e0e0;
  /* Makes the form expand to fill any remaining space */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.contact-input, .contact-textarea {
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  font-family: var(--font-afacad);
  background: #fff;
  transition: border-color 0.2s;
}

.contact-input:focus, .contact-textarea:focus {
  outline: none;
  border-color: #f3d654;
  box-shadow: 0 0 0 3px rgba(243, 214, 84, 0.2);
}

.contact-textarea {
  min-height: 140px;
  resize: vertical;
  /* Let textarea grow if there's extra space */
  flex-grow: 1;
}

.contact-submit-btn {
  background: #1f1d28;
  color: #f3d654;
  border: none;
  padding: 1rem 2rem;
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
  margin-top: auto; /* Pushes button to the bottom */
}

.contact-submit-btn:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* --- MAP CONTAINER (Right Column) --- */
.map-wrapper {
  width: 90%;
  max-width: 100%;
  height: 400px;
  margin: 2rem 0 0 0;
  position: relative;
}

@media (min-width: 768px) {
  .map-wrapper {
    width: 100%;
    height: 450px;
    margin-top: 3rem;
  }
}

@media (min-width: 1024px) {
  .map-wrapper {
    height: 500px;
    margin-top: 0;
    align-self: start;
    padding-top: 4rem;
  }
}

.map-with-button {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Fullscreen Button */
.map-fullscreen-btn {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 999;
  background: rgba(31, 29, 40, 0.9);
  color: #f3d654;
  border: 2px solid #f3d654;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.map-fullscreen-btn:hover {
  background: #1f1d28;
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.map-fullscreen-btn svg {
  width: 18px;
  height: 18px;
}

/* Fullscreen Map Modal */
.map-fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.map-fullscreen-modal__close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(31, 29, 40, 0.9);
  color: #f3d654;
  border: 2px solid #f3d654;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.map-fullscreen-modal__close:hover {
  background: #1f1d28;
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.map-fullscreen-modal__content {
  width: 100%;
  height: 100%;
  max-width: 95vw;
  max-height: 95vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.map-fullscreen-modal__content .school-map-wrapper {
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  border: none;
  border-radius: 0;
}
`

export default ContactUsScreen
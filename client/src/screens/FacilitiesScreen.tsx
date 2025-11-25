import { useEffect, useState } from 'react'
import NavigationBar from './components/NavigationBar'
import { useLoginModal } from './functions/useLoginModal'
import LoginModal from './components/LoginModal'

// --- 1. DATA CONTENT ---
const FACILITIES_CONTENT = {
  hero: {
    title: "School Facilities",
    subtitle: "Creating an environment conducive to holistic learning and growth."
  },
  video: {
    title: "Virtual Campus Tour",
    description: "Experience Assumption Iloilo from wherever you are. Watch our campus tour to see our state-of-the-art facilities designed for your child's development.",
    youtubeId: "_ehPQG710UI"
  },
  categories: [
    {
      title: "Buildings and Interiors",
      items: [
        { name: "Main Building", desc: "The main administrative and academic building of the school.", image: "/assets/images/Buildings/School Facilities/main.png" },
        { name: "School Chapel", desc: "The spiritual heart of the campus for prayer and reflection.", image: "/assets/images/Buildings/School Facilities/chapel.png" },
        { name: "Covered Swimming Pool", desc: "A modern swimming facility for physical education and recreation.", image: "/assets/images/Buildings/School Facilities/pool.png" },
        { name: "St. Martin's Court / Grade School Building", desc: "A spacious building housing grade school classrooms and facilities.", image: "/assets/images/Buildings/School Facilities/st-martins-court.png" },
        { name: "Centennial Sports Complex", desc: "A state-of-the-art sports facility for various athletic activities.", image: "/assets/images/Buildings/School Facilities/sports-complex.png" },
        { name: "Covered Basketball Court", desc: "Full-sized court for basketball, volleyball, and sports activities.", image: "/assets/images/Buildings/School Facilities/covered-court.png" },
        { name: "Clinic", desc: "A well-equipped health center for student medical needs.", image: "/assets/images/Buildings/School Facilities/clinic.png" },
        { name: "Research Center", desc: "A dedicated space for research and academic projects.", image: "/assets/images/Buildings/School Facilities/research-center.png" },
        { name: "Main Library", desc: "A vast resource center fostering research and love for reading.", image: "/assets/images/Buildings/School Facilities/library.png" },
        { name: "Grade School Library", desc: "A specialized library designed for younger learners.", image: "/assets/images/Buildings/School Facilities/grade-school-library-1024x667.png" },
        { name: "Main Refectory", desc: "The main dining hall for students and staff.", image: "/assets/images/Buildings/School Facilities/main-refectory.png" },
        { name: "St. Anne's Hall", desc: "A multi-purpose venue for large gatherings and school events.", image: "/assets/images/Buildings/School Facilities/st-annes-hall-1024x513.png" },
        { name: "Chapel", desc: "A beautiful chapel for spiritual activities and reflection.", image: "/assets/images/Buildings/School Facilities/chapel-1-1024x521.png" },
        { name: "Guidance and Testing Center", desc: "A dedicated center for student counseling and assessment.", image: "/assets/images/Buildings/School Facilities/guidance-and-testing-center-1-1024x567.png" }
      ]
    },
    {
      title: "Laboratories",
      items: [
        { name: "Preschool & Primary Grades Computer Laboratory", desc: "A computer lab designed for young learners to develop digital literacy skills.", image: "/assets/images/Buildings/Laboratories/Preschhol-Comp-Lab.png" },
        { name: "Intermediate Grades Computer Laboratory", desc: "Modern computer facilities for intermediate grade students to enhance their technology skills.", image: "/assets/images/Buildings/Laboratories/intermediate-grade.png" },
        { name: "High School Computer Laboratory", desc: "Advanced computer laboratory equipped with the latest technology for high school students.", image: "/assets/images/Buildings/Laboratories/HS-Comp-Lab-1024x576.png" },
        { name: "Physics Laboratory", desc: "A well-equipped physics lab for hands-on experiments and scientific exploration.", image: "/assets/images/Buildings/Laboratories/physics-lab.png" },
        { name: "Chemistry Laboratory", desc: "A fully-equipped chemistry laboratory with modern safety features and equipment.", image: "/assets/images/Buildings/Laboratories/chem-lab.png" },
        { name: "Biology Laboratory", desc: "A comprehensive biology lab with specimens and equipment for biological studies.", image: "/assets/images/Buildings/Laboratories/biology-ab-1024x572.png" },
        { name: "Robotics Lab", desc: "A specialized space for innovation and engineering projects in robotics.", image: "/assets/images/Buildings/Laboratories/robotics-lab-1024x517.png" },
        { name: "Science Activity Room", desc: "A versatile space for various science activities and experiments.", image: "/assets/images/Buildings/Laboratories/science-activity-room-1024x575.png" }
      ]
    },
    {
      title: "Outdoor Areas",
      items: [
        { name: "Basketball Court", desc: "Full-sized court for basketball and sports activities.", image: "/assets/images/Buildings/Outdoor/basketball-court.png" },
        { name: "Volleyball Court", desc: "A dedicated court for volleyball games and activities.", image: "/assets/images/Buildings/Outdoor/volleyball-court.png" },
        { name: "Open Court", desc: "A versatile open space for various outdoor activities and events.", image: "/assets/images/Buildings/Outdoor/open-court.png" },
        { name: "Football Area", desc: "Expansive green field for football and outdoor games.", image: "/assets/images/Buildings/Outdoor/football-area.png" },
        { name: "Baseball Field", desc: "A dedicated field for baseball games and practice.", image: "/assets/images/Buildings/Outdoor/baseball.png" },
        { name: "Playground", desc: "Safe and fun play area for our preschool and primary learners.", image: "/assets/images/Buildings/Outdoor/playground.png" },
        { name: "Playground Area", desc: "Additional playground space for recreational activities.", image: "/assets/images/Buildings/Outdoor/playground-2.png" },
        { name: "Garden of the School Song", desc: "A peaceful garden area dedicated to the school song, ideal for quiet reflection.", image: "/assets/images/Buildings/Outdoor/garden-of-the-school-song.png" },
        { name: "Fish Pond", desc: "A serene fish pond area for relaxation and environmental education.", image: "/assets/images/Buildings/Outdoor/fish-pond.png" }
      ]
    }
  ]
};


type FacilitiesScreenProps = {
  onNavigate: (page: string) => void
}

// --- 3. MAIN COMPONENT ---
const FacilitiesScreen = ({ onNavigate }: FacilitiesScreenProps) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  useEffect(() => {
    const styleId = 'facilities-screen-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  useEffect(() => {
    if (fullscreenImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [fullscreenImage])

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

  // Close fullscreen modal when login modal opens
  useEffect(() => {
    if (isLoginOpen && fullscreenImage) {
      setFullscreenImage(null)
    }
  }, [isLoginOpen, fullscreenImage])

  const content = FACILITIES_CONTENT

  return (
    <div className="facilities-screen">
      <NavigationBar 
        onLoginClick={() => {
          setFullscreenImage(null) // Close fullscreen modal when opening login
          openLogin()
        }} 
        onNavigate={onNavigate} 
        currentPage="facilities" 
      />
      
      <header className="facilities-hero">
        <div className="facilities-hero__overlay"></div>
        <h1 className="facilities-hero__title">{content.hero.title}</h1>
        <p className="facilities-hero__subtitle">{content.hero.subtitle}</p>
      </header>
      
      <main className="facilities-container">
        
        {/* Video Section */}
        <section className="facilities-video-section">
          <div className="facilities-video-text">
            <h2 className="facilities-video-title">{content.video.title}</h2>
            <p className="facilities-video-desc">{content.video.description}</p>
          </div>
          <div className="facilities-video-wrapper">
            <iframe 
              className="facilities-video-iframe"
              src={`https://www.youtube.com/embed/${content.video.youtubeId}`}
              title="Assumption Iloilo Facilities Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Facilities Categories */}
        {content.categories.map((category, idx) => (
          <section key={idx} className="facilities-category">
            <div className="facilities-category-header">
              <h2 className="facilities-category-title">{category.title}</h2>
              <div className="facilities-category-line"></div>
            </div>
            
            <div className="facilities-grid">
              {category.items.map((item, itemIdx) => (
                <div key={itemIdx} className="facility-card">
                  {'image' in item && item.image && (
                    <div className="facility-card__image-wrapper">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="facility-card__image"
                        onClick={() => setFullscreenImage(item.image)}
                      />
                    </div>
                  )}
                  <div className="facility-card__content">
                    <h3 className="facility-card__name">{item.name}</h3>
                    <p className="facility-card__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

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
           onNavigate('signup')
        }}
      />
      <footer className="signup-page__footer" style={{ marginTop: 'auto', padding: '1.5rem 1rem', textAlign: 'center', background: '#181628', color: '#f6de4f', borderTop: '4px solid #f6de4f', fontFamily: 'var(--font-afacad)' }}>
        © {new Date().getFullYear()} Assumption Iloilo
      </footer>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div className="facilities-fullscreen-modal" onClick={() => setFullscreenImage(null)}>
          <button 
            className="facilities-fullscreen-close"
            onClick={(e) => {
              e.stopPropagation()
              setFullscreenImage(null)
            }}
            aria-label="Close fullscreen"
          >
            ×
          </button>
          <img 
            src={fullscreenImage} 
            alt="Fullscreen view"
            className="facilities-fullscreen-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default FacilitiesScreen

// --- 2. CSS STYLES ---
const CSS = `
.facilities-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #1f1d28;
}

.facilities-hero {
  position: relative;
  width: 100%;
  height: 400px;
  background-image: url('/assets/images/Assumption-iloilo-school-campus.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.facilities-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 29, 42, 0.6); /* Dark overlay */
}

.facilities-hero__title {
  position: relative;
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: clamp(3rem, 8vw, 5rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  color: #ffffff;
  z-index: 1;
}

.facilities-hero__subtitle {
  position: relative;
  font-family: var(--font-afacad);
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: #f3d654;
  max-width: 800px;
  margin: 0 auto;
  z-index: 1;
}

.facilities-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem clamp(1.25rem, 5vw, 4rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

/* Video Section */
.facilities-video-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.facilities-video-wrapper {
  width: 100%;
  max-width: 1000px;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  border: 4px solid #f3d654;
}

.facilities-video-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.facilities-video-text {
  text-align: center;
  max-width: 800px;
}

.facilities-video-title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 2rem;
  color: #1f1d28;
  margin-bottom: 1rem;
}

.facilities-video-desc {
  font-family: var(--font-afacad);
  font-size: 1.15rem;
  color: #4a4a5a;
  line-height: 1.6;
}

/* Categories Section */
.facilities-category {
  scroll-margin-top: 100px;
}

.facilities-category-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.facilities-category-title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: #1f1d28;
  text-transform: uppercase;
  white-space: nowrap;
}

.facilities-category-line {
  height: 2px;
  background: #e0e0e0;
  flex-grow: 1;
}

.facilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.facility-card {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.facility-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.facility-card__image-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.facility-card__image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.facility-card__image:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.facility-card__content {
  padding: 1.5rem;
}

.facility-card__name {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.35rem;
  color: #1f1d28;
  margin-bottom: 0.75rem;
}

.facility-card__desc {
  font-family: var(--font-afacad);
  font-size: 1rem;
  color: #4a4a5a;
  line-height: 1.6;
}

/* Fullscreen Image Modal */
.facilities-fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  cursor: pointer;
}

.facilities-fullscreen-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: 700;
  color: #1f1d28;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10001;
  line-height: 1;
  padding: 0;
}

.facilities-fullscreen-close:hover {
  background: #ffffff;
  transform: scale(1.1);
}

.facilities-fullscreen-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  cursor: default;
}

@media (max-width: 768px) {
  .facilities-hero {
    height: 300px;
  }

  .facilities-category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .facilities-category-line {
    width: 100%;
  }

  .facilities-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .facility-card__image {
    height: 200px;
  }

  .facilities-fullscreen-close {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }

  .facilities-fullscreen-image {
    max-width: 95%;
    max-height: 95%;
  }
}
`
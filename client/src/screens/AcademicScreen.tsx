import { useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import { useLoginModal } from './functions/useLoginModal'
import LoginModal from './components/LoginModal'

// --- 1. DATA CONTENT ---
const PROJECTS_CONTENT = {
  hero: {
    title: "Academics",
  },
  curriculum: {
    title: "Assumption Iloilo Curriculum",
    description: "The Assumption Iloilo school curriculum is basically drawn from the K to 12 Curriculum prescribed by the Department of Education with additional features designed to contribute to the attainment of the School’s vision, mission, and objectives. The Gospel values of Faith, Love, Truth, Justice and Peace permeate the curricular and co-curricular programs. Several features were adopted in order to give the curriculum robust content to meet the needs of learners as they are prepared for higher education and career readiness.",
    subDescription: "Special programs are included in the listing of contents to emphasize their importance in enriching the formation of the learners. These institutional programs include the Play Festival, Kapehan, Integration Week, Intramurals, and Educational Exposures among others."
  },

  levels: [
    {
      title: "Primary Grades",
      image: "/assets/images/Academics/primary.jpg"
    },
    {
      title: "Intermediate Grades",
      image: "/assets/images/Academics/intermediate.jpg"
    },
    {
      title: "Junior High School",
      image: "/assets/images/Academics/jhs.jpg"
    },
    {
      title: "Senior High School",
      image: "/assets/images/Academics/shs.jpg"
    }
  ]
};

type ProjectsScreenProps = {
  onNavigate: (page: string) => void
}

// --- 3. MAIN COMPONENT ---
const ProjectsScreen = ({ onNavigate }: ProjectsScreenProps) => {
  useEffect(() => {
    const styleId = 'projects-screen-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

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

  const content = PROJECTS_CONTENT

  return (
    <div className="projects-screen">
      <NavigationBar 
        onLoginClick={openLogin} 
        onNavigate={onNavigate} 
        currentPage="academics" 
      />
      
      <header className="projects-hero">
        <div className="projects-hero__overlay"></div>
        <h1 className="projects-hero__title">{content.hero.title}</h1>
      </header>
      
      <main className="projects-container">
        
        {/* Curriculum Intro */}
        <section className="projects-curriculum">
          <h2 className="projects-section-title">{content.curriculum.title}</h2>
          <p className="projects-text">{content.curriculum.description}</p>
          <p className="projects-text">{content.curriculum.subDescription}</p>
        </section>

        {/* Educational Levels */}
        <section className="projects-levels">
          <ul className="levels-grid">
            {content.levels.map((level, idx) => (
              <li key={idx} className="level-card">
                <img src={level.image} alt={level.title} className="level-card__image" />
                <h3 className="level-card__title">{level.title}</h3>
              </li>
            ))}
          </ul>
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
           onNavigate('home') 
        }}
      />
      <footer className="signup-page__footer" style={{ marginTop: 'auto', padding: '1.5rem 1rem', textAlign: 'center', background: '#181628', color: '#f6de4f', borderTop: '4px solid #f6de4f', fontFamily: 'var(--font-afacad)' }}>
        © {new Date().getFullYear()} Assumption Iloilo
      </footer>
    </div>
  )
}

export default ProjectsScreen   

const CSS = `
.projects-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #1f1d28;
}

.projects-hero {
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

.projects-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 29, 42, 0.6); /* Dark overlay */
}

.projects-hero__title {
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

.projects-hero__subtitle {
  position: relative;
  font-family: var(--font-afacad);
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: #f3d654;
  max-width: 800px;
  margin: 0 auto;
  z-index: 1;
}

.projects-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem clamp(1.25rem, 5vw, 4rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

/* Curriculum Section */
.projects-curriculum {
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
}

.projects-section-title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #1f1d28;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  display: inline-block;
  position: relative;
}

.projects-section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: #f3d654;
  margin: 0.5rem auto 0;
}

.projects-text {
  font-family: var(--font-afacad);
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4a4a5a;
  margin-bottom: 1.5rem;
}

/* Programs Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  border-left: 5px solid #1f1d28;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  border-left-color: #f3d654;
}

.project-card__title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.5rem;
  color: #1f1d28;
  margin-bottom: 1rem;
}

.project-card__desc {
  font-family: var(--font-afacad);
  font-size: 1.1rem;
  color: #4a4a5a;
  line-height: 1.7;
}

/* Levels Section */
.projects-levels {
  background-color: #ffffff;
  padding: 0;
  border-radius: 0;
  text-align: left;
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.level-card {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.level-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.level-card__image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

.level-card__title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(31, 29, 40, 0.95), rgba(31, 29, 40, 0.7), transparent);
  color: #ffffff;
  padding: 2rem 1.5rem 1.5rem;
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0;
}

@media (min-width: 1024px) {
  .projects-section-title {
    font-size: 2.5rem;
  }

  .projects-text,
  .project-card__desc {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .projects-hero {
    height: 300px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .levels-grid {
    grid-template-columns: 1fr;
  }

  .level-card__image {
    height: 300px;
  }

  .level-card__title {
    font-size: 1.25rem;
    padding: 1.5rem 1rem 1rem;
  }
}
`
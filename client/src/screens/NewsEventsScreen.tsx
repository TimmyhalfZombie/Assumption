import { useEffect, useState } from 'react'
import NavigationBar from './components/NavigationBar'
import { useLoginModal } from './functions/useLoginModal'
import LoginModal from './components/LoginModal'

// --- ICONS (Inline to avoid missing dependency) ---
const Calendar = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const User = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const ArrowLeft = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
)

const Clock = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
)

// --- 1. DATA CONTENT ---
const NEWS_CONTENT = [
  {
    id: 1,
    title: "Assumption Iloilo Launches Collective Website for Transformateur and Mariale",
    date: "June 7, 2024",
    author: "Assumption Iloilo",
    image: "/assets/images/News/AC-Publications.png",
    excerpt: "Assumption Iloilo proudly announces the launch of its collective website, housing the archives of...",
    fullContent: `
      <p>Assumption Iloilo proudly announces the launch of its collective website, housing the archives of <em>Transformateur</em> and <em>Mariale</em>. This digital initiative aims to preserve the rich literary and journalistic history of the institution.</p>
      <p>The new platform provides students, alumni, and the community easy access to past and present publications, fostering a deeper appreciation for the school's culture of writing and expression.</p>
      <p>Visit the website to explore decades of stories, features, and creative works by Assumption Iloilo students.</p>
    `
  },
  {
    id: 2,
    title: "Assumption Iloilo Celebrates Gabriel M. Enriquez's Success in Hua Siong Mathletics Competition",
    date: "February 5, 2024",
    author: "Assumption Iloilo",
    image: "/assets/images/News/gabriel.jpg",
    excerpt: "On February 3, 2024, the Irene Ang Jun Teng Uygongco Auditorium at Hua Siong College of Iloilo...",
    fullContent: `
      <p>On February 3, 2024, the Irene Ang Jun Teng Uygongco Auditorium at Hua Siong College of Iloilo became the stage for a display of mathematical prowess.</p>
      <p>Assumption Iloilo celebrates Gabriel M. Enriquez's remarkable success in the Hua Siong Mathletics Competition. Competing against top students from various schools, Gabriel demonstrated exceptional analytical skills and problem-solving abilities.</p>
      <p>The school community is incredibly proud of this achievement, which highlights the strength of Assumption Iloilo's academic programs.</p>
    `
  },
  {
    id: 3,
    title: "AYIMUN 2024 Recap",
    date: "February 1, 2024",
    author: "Assumption Iloilo",
    image: "/assets/images/News/Ayimuni.jpg",
    excerpt: "Thrilled to share the incredible journey of our Assumption Iloilo delegates at the Asian Youth...",
    fullContent: `
      <p>We are thrilled to share the incredible journey of our Assumption Iloilo delegates at the Asian Youth International Model United Nations (AYIMUN) 2024.</p>
      <p>Our students engaged in diplomatic debates, drafted resolutions, and collaborated with youth leaders from across Asia. This experience not only honed their public speaking and negotiation skills but also broadened their understanding of global issues.</p>
      <p>Congratulations to our delegates for representing the school and the country with grace and intelligence.</p>
    `
  },
  {
    id: 4,
    title: "Family Day 2023",
    date: "January 10, 2024",
    author: "Assumption Iloilo",
    image: "/assets/images/News/Assumption-Family-Day.png",
    excerpt: "Relive the captivating moments of our unforgettable Family Day, which took place on December 17...",
    fullContent: `
      <p>Relive the captivating moments of our unforgettable Family Day, which took place on December 17. The campus was filled with laughter, games, and the warmth of family bonds.</p>
      <p>From exciting field demonstrations to shared meals, the event strengthened the connection between the home and the school. It was a day to celebrate the spirit of community that defines Assumption Iloilo.</p>
      <p>Thank you to all the families who participated and made this event a resounding success.</p>
    `
  },
  {
    id: 5,
    title: "Admissions for SY 2024-2025 are now open!",
    date: "January 9, 2024",
    author: "Assumption Iloilo",
    image: "/assets/images/News/Assumption.png",
    excerpt: "For inquiries, reach out to us via phone at 337-3194 or 338-1816, or drop us an email at...",
    fullContent: `
      <p>Assumption Iloilo is now accepting applications for School Year 2024-2025! We invite parents and guardians to join our growing family.</p>
      <p>For inquiries, reach out to us via phone at 337-3194 or 338-1816, or drop us an email at admissions@assumptioniloilo.edu.ph. You may also visit the Admissions Office for more details on requirements and procedures.</p>
      <p>Secure your child's future with a holistic education that prioritizes character and academic excellence.</p>
    `
  },
  {
    id: 6,
    title: "Andrea Hope Uy Receives 2023 Youth Excellence in Science Award for International STEM Achievements",
    date: "November 24, 2023",
    author: "Assumption Iloilo",
    image: "/assets/images/News/Andrea-Hope-Uy.jpg",
    excerpt: "Andrea Hope Uy Wins 2023 Youth Excellence in Science (YES) Award for Global STEM Success Assumption...",
    fullContent: `
      <p>Andrea Hope Uy has been awarded the 2023 Youth Excellence in Science (YES) Award by the Department of Science and Technology (DOST). This prestigious award recognizes her outstanding achievements in international STEM competitions.</p>
      <p>Andrea's dedication to science and mathematics has brought pride to Assumption Iloilo. Her success serves as an inspiration to her peers to pursue excellence in the field of STEM.</p>
      <p>Congratulations, Andrea, on this well-deserved recognition!</p>
    `
  },
  {
    id: 7,
    title: "Assumption Iloilo's Community Clinic 2023: A Day of Compassion and Care",
    date: "November 19, 2023",
    author: "Assumption Iloilo",
    image: "/assets/images/News/Assumption.png",
    excerpt: "Assumption Iloilo's Community Clinic 2023: A Day of Compassion and Care In the spirit of...",
    fullContent: `
      <p>In the spirit of service and social responsibility, Assumption Iloilo held its annual Community Clinic 2023. The event provided free medical and dental services to our partner communities.</p>
      <p>Doctors, dentists, and volunteers from the alumni and parent community came together to offer check-ups, medicines, and health advice. It was a day filled with compassion and care, embodying the school's mission to serve the marginalized.</p>
      <p>We extend our heartfelt gratitude to everyone who volunteered and donated to make this event possible.</p>
    `
  },
  {
    id: 8,
    title: "Strengthening Bonds: A Cultural Exchange Journey with Assumption Iloilo and Assumption Kokusai",
    date: "November 15, 2023",
    author: "Assumption Iloilo",
    image: "/assets/images/News/strengthening-bonds.jpg",
    excerpt: "Between August 19 and September 2, 2023, Assumption Iloilo warmly hosted a group of Japanese learners from Assumption Kokusai...",
    fullContent: `
      <p>Between August 19 and September 2, 2023, Assumption Iloilo warmly hosted a group of Japanese learners from Assumption Kokusai, Osaka, Japan, as part of the Assumption Learners Exchange Program. The program, aimed at nurturing the Assumption Spirit in both school communities, welcomed the visitors, including Miss Cecile Adrias, a former English Teacher at Assumption Iloilo and now an English teacher at Assumption Kokusai, along with Miss Naomi Tanzawa, the school's principal.</p>
      
      <p>During their two-week sojourn in Iloilo, the Japanese learners actively participated in various classes and immersed themselves in the local culture. They explored heritage sites, were hosted by local families, and experienced the richness of Filipino culture in a familial setting. A memorable evening with the sisters featured a delightful tea ceremony, celebrating Sr. Fe's birthday and further enhancing their cultural experience.</p>
      
      <p>Despite challenging weather conditions, the learners ventured to Assumption Passi and Assumption Barrio Obrero, expanding their exploration. The pinnacle of their stay culminated in a special program during the Filipino Week Celebration. Alongside Miss Naomi Tanzawa, the Japanese learners learned and performed a traditional Filipino dance on their last day, leaving a lasting impression on the audience with their remarkable performance.</p>
      
      <p>This cultural exchange program was a deeply enriching experience, fostering stronger bonds and contributing to the shared family Spirit that defines the Assumption community.</p>
    `
  },
  {
    id: 9,
    title: "Navigating the Future: Mr. Louie Cervantes Explores the Impact of Artificial Intelligence on Education",
    date: "November 13, 2023",
    author: "Assumption Iloilo",
    image: "/assets/images/News/navigating-future.jpg",
    excerpt: "Mr. Louie Cervantes delves into the transformative role of AI in modern classrooms and how Assumption Iloilo is adapting...",
    fullContent: `
      <p>In a thought-provoking seminar held at the St. Anne's Hall, Mr. Louie Cervantes addressed the faculty and student body regarding the rapidly evolving landscape of Artificial Intelligence (AI) and its profound implications for education.</p>

      <p>"AI is not a replacement for teachers, but a powerful tool to augment human potential," Cervantes emphasized during his keynote address. He explored how tools like ChatGPT and personalized learning algorithms can help tailor educational experiences to individual student needs, ensuring that no learner is left behind.</p>

      <p>The session included a live demonstration of AI-driven research tools and a Q&A segment where students raised valid concerns about academic integrity. Mr. Cervantes reassured the community that Assumption Iloilo is drafting comprehensive guidelines to ensure ethical use of technology, focusing on critical thinking rather than rote output.</p>

      <p>The event concluded with a workshop for teachers on integrating AI assistants into lesson planning, marking a significant step towards a future-ready curriculum for Assumption Iloilo.</p>
    `
  },
  {
    id: 10,
    title: "Zen Jollie Heler as Girl Mayor and Jianni Martina Provido as Girl City Agriculturist",
    date: "October 25, 2023",
    author: "Assumption Iloilo",
    image: "/assets/images/News/zen jollie.jpg",
    excerpt: "Assumption Iloilo student leaders take on key roles in the city government as part of the Rotary Club's Boys and Girls Week...",
    fullContent: `
      <p>Assumption Iloilo proudly announces the selection of Zen Jollie Heler as Girl Mayor and Jianni Martina Provido as Girl City Agriculturist for this year's Rotary Club Boys and Girls Week. This annual event allows high-achieving students to experience public service firsthand by assuming the roles of city officials for a week.</p>

      <p>Zen Jollie Heler, known for her leadership in the Student Council, took her oath at City Hall and spent the week shadowing the City Mayor. She participated in city council sessions, visited barangay projects, and even signed ceremonial executive orders. "It was an eye-opening experience to see the weight of responsibility that comes with leading a city," Heler remarked.</p>

      <p>Meanwhile, Jianni Martina Provido immersed herself in the City Agriculture Office. She visited urban gardens and learned about the city's food security initiatives. Her proposal for a school-based vertical garden project was well-received by the department heads.</p>

      <p>The Assumption Iloilo community celebrates these young leaders who exemplify the school's core value of social responsibility and excellence in service.</p>
    `
  },
  {
    id: 11,
    title: "Assumption Iloilo Rings in World Teachers' Day with Fun and Festivity",
    date: "October 6, 2023",
    author: "Assumption Iloilo",
    image: "/assets/images/News/assumption-iloilo-teachers-day.jpg",
    excerpt: "A day filled with gratitude, performances, and surprises as the student body honors the hardworking faculty...",
    fullContent: `
      <p>The campus was abuzz with excitement as Assumption Iloilo celebrated World Teachers' Day. The student council organized a surprise morning assembly where teachers were welcomed with leis and personalized notes of appreciation from their students.</p>

      <p>The highlight of the day was the "Teachers' Got Talent" segment, where the faculty showcased their hidden talents in singing, dancing, and even comedy, much to the delight of the cheering students. It was a rare moment for the learners to see their mentors in a relaxed and joyous atmosphere.</p>

      <p>A special luncheon was held at the gymnasium, sponsored by the Parents-Teachers Association (PTA). "Our teachers are the heart of this institution. Today is a small way to say thank you for their big sacrifices," said the PTA President.</p>
    `
  },
  {
    id: 12,
    title: "Assumption Iloilo Literacy Week 2023: A Celebration of Reading, Learning, and Fun!",
    date: "September 25, 2023",
    author: "Assumption Iloilo",
    image: "/assets/images/News/assumption-iloilo-literacy-week.jpg",
    excerpt: "Literacy Week is a yearly tradition that encourages students to discover the joy of reading...",
    fullContent: `
      <p>Assumption Iloilo Literacy Week 2023 was a resounding success! The week-long celebration featured book fairs, storytelling sessions, and literary costume parades.</p>
      <p>Students from all levels participated in various activities designed to foster a love for reading and writing. The event highlighted the importance of literacy in shaping critical thinkers and creative minds.</p>
      <p>We thank the English Department and the library staff for organizing such an engaging and educational week.</p>
    `
  },
  {
    id: 13,
    title: "Assumption Iloilo School Faculty and Staff Embrace Thai Riches in Cultural Exposure Trip to Bangkok",
    date: "July 15, 2023",
    author: "Assumption Iloilo",
    image: "/assets/images/News/assumption-iloilo-goes-to-bankgkok.jpg",
    excerpt: "Assumption Iloilo School Faculty and Staff Embrace Thai Riches in Cultural Exposure Trip to Bangkok...",
    fullContent: `
      <p>From July 2-6, 2023, the Assumption Iloilo faculty and staff embarked on a Cultural Exposure Trip to Bangkok, Thailand. The trip provided an opportunity for the team to immerse themselves in Thai culture, history, and education.</p>
      <p>Highlights of the trip included visits to historical temples, interactions with local educators, and a taste of authentic Thai cuisine. This experience enriched the faculty's global perspective, which they bring back to their classrooms in Iloilo.</p>
      <p>The trip also served as a bonding activity, strengthening the camaraderie among the school's staff.</p>
    `
  }
];

// --- 2. CSS STYLES ---
const CSS = `
.news-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #1f1d28;
}

.news-hero {
  position: relative;
  width: 100%;
  height: 400px;
  background-image: url('/assets/images/Assumption-iloilo-school-campus.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.news-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 29, 42, 0.6); /* Dark overlay */
}

.news-hero__title {
  position: relative;
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: clamp(3rem, 8vw, 5rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  color: #ffffff;
  z-index: 1;
}

.news-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem clamp(1.25rem, 5vw, 4rem);
  width: 100%;
}

/* --- LIST VIEW --- */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.news-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
}

.news-card__image-wrapper {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.news-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-card:hover .news-card__image {
  transform: scale(1.05);
}

.news-card__content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-card__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1rem;
  font-family: var(--font-afacad);
}

.news-card__meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.news-card__title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.25rem;
  color: #1f1d28;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.news-card__excerpt {
  font-family: var(--font-afacad);
  font-size: 1rem;
  color: #4a4a5a;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.news-card__btn {
  align-self: flex-start;
  color: #1f1d28;
  font-weight: 600;
  font-family: var(--font-afacad);
  text-decoration: none;
  border-bottom: 2px solid #f3d654;
  padding-bottom: 2px;
  transition: all 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-bottom: 2px solid #f3d654;
}

.news-card__btn:hover {
  color: #f3d654;
  border-bottom-color: #1f1d28;
}

/* --- DETAIL VIEW --- */
.news-detail {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.news-detail__header {
  margin-bottom: 2rem;
}

.news-detail__back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  font-family: var(--font-afacad);
  font-weight: 600;
  margin-bottom: 2rem;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1rem;
}

.news-detail__back-btn:hover {
  color: #1f1d28;
}

.news-detail__title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3rem);
  color: #1f1d28;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.news-detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  color: #666;
  font-family: var(--font-afacad);
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.news-detail__image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.news-detail__body {
  font-family: var(--font-afacad);
  font-size: 1.15rem;
  line-height: 1.8;
  color: #2e2d36;
  max-width: 800px;
  margin: 0 auto;
}

.news-detail__body p {
  margin-bottom: 1.5rem;
}

/* Tablet styles (768px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .news-content {
    padding: 2rem 2.5rem;
  }

  .news-hero {
    height: 400px;
  }

  .news-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .news-card {
    padding: 1.5rem;
  }

  .news-card__title {
    font-size: 1.3rem;
  }

  .news-card__excerpt {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .news-hero {
    height: 300px;
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .news-card__image-wrapper {
    height: 180px;
  }
}
`

type NewsEventsScreenProps = {
  onNavigate: (page: string) => void
  onProfileClick?: () => void
}

// --- 3. MAIN COMPONENT ---
const NewsEventsScreen = ({ onNavigate, onProfileClick }: NewsEventsScreenProps) => {
  // Use a local state to handle the "Read More" navigation
  // If null, show list. If set, show detail.
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null)

  useEffect(() => {
    const styleId = 'news-screen-styles'
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

  // Find the selected article object
  const selectedArticle = NEWS_CONTENT.find(item => item.id === selectedArticleId)

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedArticleId])

  return (
    <div className="news-screen">
      <NavigationBar 
        onLoginClick={openLogin} 
        onProfileClick={onProfileClick}
        onNavigate={(page) => {
          // If navigating away, reset selection
          setSelectedArticleId(null)
          onNavigate(page)
        }} 
        currentPage="news" 
      />
      
      {!selectedArticle && (
        <header className="news-hero">
          <div className="news-hero__overlay"></div>
          <h1 className="news-hero__title">News & Events</h1>
        </header>
      )}
      
      <main className="news-container">
        
        {/* CONDITIONAL RENDERING: List vs Detail */}
        {!selectedArticle ? (
          // --- LIST VIEW ---
          <div className="news-grid">
            {NEWS_CONTENT.map((item) => (
              <article key={item.id} className="news-card">
                <div className="news-card__image-wrapper">
                  <img src={item.image} alt={item.title} className="news-card__image" />
                </div>
                <div className="news-card__content">
                  <div className="news-card__meta">
                    <span className="news-card__meta-item"><Calendar size={14} /> {item.date}</span>
                  </div>
                  <h2 className="news-card__title">{item.title}</h2>
                  <p className="news-card__excerpt">{item.excerpt}</p>
                  <button 
                    className="news-card__btn" 
                    onClick={() => setSelectedArticleId(item.id)}
                  >
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          // --- DETAIL VIEW ---
          <article className="news-detail">
            <div className="news-detail__header">
              <button 
                className="news-detail__back-btn"
                onClick={() => setSelectedArticleId(null)}
              >
                <ArrowLeft size={18} /> Back to News
              </button>
              <h1 className="news-detail__title">{selectedArticle.title}</h1>
              <div className="news-detail__meta">
                <span className="news-card__meta-item"><Calendar size={18} /> {selectedArticle.date}</span>
                <span className="news-card__meta-item"><User size={18} /> {selectedArticle.author}</span>
                <span className="news-card__meta-item"><Clock size={18} /> 5 min read</span>
              </div>
            </div>

            <img src={selectedArticle.image} alt={selectedArticle.title} className="news-detail__image" />

            <div 
              className="news-detail__body" 
              dangerouslySetInnerHTML={{ __html: selectedArticle.fullContent }} 
            />
          </article>
        )}

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
    </div>
  )
}

export default NewsEventsScreen
import { useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import { useLoginModal } from './functions/useLoginModal'
import LoginModal from './components/LoginModal'

type AboutUsScreenProps = {
  onNavigate: (page: string) => void
}

const AboutUsScreen = ({ onNavigate }: AboutUsScreenProps) => {
  useEffect(() => {
    const styleId = 'about-us-screen-styles'
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

  const handleLoginClick = () => {
    openLogin()
  }

  return (
    <div className="about-us-screen">
      <NavigationBar onLoginClick={handleLoginClick} onNavigate={onNavigate} currentPage="about" />
      <main className="about-us-content">
        <div className="about-us-hero">
          <div className="about-us-hero__overlay"></div>
          <h1 className="about-us-hero__title">ABOUT US</h1>
        </div>
        <section className="about-us-history">
          <div className="about-us-history__container">
            <h2 className="about-us-history__title">HISTORY OF ASSUMPTION ILOILO</h2>
            <div className="about-us-history__intro">
              <p className="about-us-history__address">18 General Luna</p>
              <p className="about-us-history__subtitle">Prieure de NOTRE DAME DU ST. SACRAMENT</p>
              <p className="about-us-history__motto">Word: <em>Ubi caritas et amor Deus ibi est.</em></p>
            </div>

            <div className="about-us-foundation">
              <h3 className="about-us-foundation__title">FOUNDATION</h3>
              
              <div className="about-us-foundation__content">
                <div className="about-us-foundation__image-wrapper">
                  <img 
                    src="/assets/images/About Us/Saint-Marie-Eugenie.png" 
                    alt="Saint Marie Eugenie" 
                    className="about-us-foundation__image"
                  />
                </div>
                
                <div className="about-us-foundation__text">
                  <p><strong>Date founded: 1910</strong></p>
                  <p>
                    First Sisters: Mother M. Teresita (called Mother M. Teresa in Iloilo), Srs. M. Rafaela, M. Silvina, M. Leandra, Angela M., Bernardine, M. Matea, M. Eberard, Antonia Ma., M. Servula and M. d' Assise. With Mother Helene Marguerite who was returning to Manila after the Chapter, the party set sail from Barcelona on Nov. 12th 1910 on board Spanish liner "Fernando Po." They arrived in Iloilo on Dec. 16th at 6 a.m. They were met by Sr. Caroline M. and Rosario Araneta.
                  </p>
                  <p>
                    The school had already been functioning since July 15th, thanks to Sr. Caroline M., Sr. M. Benedict and Sr. M. Alfred and three Manila Old Girls, Rosario Araneta and Manuela and Trinidad Gay. The first pupil inscribed was Maria Arroyo y Lacson, aged 4, daughter of Jesus Lacson also an Old Girl.
                  </p>
                  <p><strong>Purpose of the Foundation: The needs answered</strong></p>
                  <p>
                    The school was to be the counterpart of Assumption Manila. There was, at the time in Iloilo City, only one girls' school run by the Daughters of Charity of St. Vincent de Paul, Jaro. In fact, even then, Msgr. Denys Dougherty was hoping for an Assumption school in Bacolod.
                  </p>
                  <p>
                    The first demand for Iloilo was made by Msgr. Jeremiah Harty, Archbishop of Manila, acting as administrator for the Jaro diocese, whose bishop, Msgr. Rooker had died in April 1909. This petition was heartily endorsed by the future Bishop of Jaro, Msgr. Denys Dougherty, Later Cardinal Archbishop of Philadelphia. Mother M. Celestine, Superior General, also received the same official demand and approved it on principle. A few months after, she cabled Mother Helene Marguerite instructing her to rent a suitable house. Whereupon Msgr. Dougherty sent her a check for P4,500 to cover traveling expenses for eight Sisters and promised as many pupils as the Sisters could accept. The house rented belonged to the Viaplana family and was located on Gen. Hughes St. It is now occupied by Colegio del Sagrado Corazon de Jesus of the Daughters of Charity.
                  </p>
                  <p>
                    In May, the sisters started work to adapt the house to the needs of a school. In June Sr. Caroline M. arrived and became acting directress, with her were Srs. N. Alfred and M. Benedict. To help in initial arrangements, the Bishop gave them his secretary, Fr. James McCloskey who became his future successor. The parents were delighted. On the very day of their arrival, the first boarder, Magdalena Kapeler arrived with them. Her mother has spent part of the summer in Iloilo to prepare for her daughter's school outfit. Unfortunately Magdalena remained only a few months; she had to return home due to ill health. In Sept. 1911, she and her mother died in a shipwreck. Formal classes began on July 15th with 20 pupils. They numbered 40 before the end of the year.
                  </p>
                  <p>
                    The great joy of that first feast of the Assumption in 1911 was that from then on, the Lord would remain in the tabernacle. "The Sisters," so comment the annals, "had not much time to spend in the chapel, but the thought that the Master was there gave courage to shoulder the work." Before the month ended, the children were invited to an "Episcopal merienda." The Bishop sent two carriages to bring his guests to Jaro. The expedition ended with a delightful "paseo." The children could not say enough of the kindness of the Bishop.
                  </p>
                </div>
              </div>
              <div className="about-us-foundation__full-image">
                <img 
                  src="/assets/images/About Us/old-sisters-assumption-iloilo.png" 
                  alt="The Sisters at the first feast of the Assumption in 1911" 
                  className="about-us-foundation__wide-image"
                />
              </div>
            </div>

            <div className="about-us-school-history">
              <h3 className="about-us-school-history__title">HISTORY OF THE SCHOOL</h3>
              <div className="about-us-school-history__content">
                <p><strong>Date the school opened:</strong></p>
                <p>July 15th 1910</p>
                
                <p><strong>Nature of the school then:</strong></p>
                <p>A boarding school for the children of the upper middle class of Iloilo and Negros, a traditional "pensionnat" that answered the needs of this social milieu.</p>
                
                <p><strong>First educators:</strong></p>
                <ul className="about-us-school-history__list">
                  <li>Mother M. Teresita – Superior</li>
                  <li>Sr. M. Rafaela – Bursar</li>
                  <li>Sr. M. Ethelberga – Directress (formerly in Manila)</li>
                  <li>Sr. M. Berdardine & Sr. Angela M. – Class Advisers</li>
                  <li>Sr. Teresa de L'Enfant Jesus</li>
                  <li>Sr. Antonia M. – for Piano and Lessons</li>
                  <li>Sr. Francois d' Assise – for lessons and charades</li>
                  <li>Sr. M. Macaria – 2nd infirmarian</li>
                </ul>

                <p><strong>Original plans for the school:</strong></p>
                <p>Complete Elementary and Secondary courses as prescribed by the Bureau of Private Schools with emphases on character formation according to Assumption tradition. Government approval and recognition was received on Feb. 27th 1912.</p>

                <p><strong>Methods Used:</strong></p>
                <p>Traditional methods in Assumption schools; with English as the official language as specifically requested by the parents; Spanish was continued; both Spanish and English Languages were used in all literary programs. Art lessons, drawing, painting in all media then used were taught by very gifted professors; music and instruments were taught by a graduate of the Conservatory of Madrid.</p>

                <p><strong>Facilities:</strong></p>
                <p>On Jan 23rd 1912 the deed of sale for purchase of a piece of land on the present Gen. Luna St. then called Calle Carlos costing P30,000.00 was signed. The amount was donated by Msgr. Dougherty. This is where the present school stands. The chapel was a wooden structure on short posts. It was not until the 1920's that a semi-permanent chapel was built by Mother M. Amanda, then superior of the house. The present cement structure was undertaken in two installments. The additional buildings were added according to needs. St. Anne's Hall was built by Mother Anne Elizabeth, the Superior then.</p>

                <h4 className="about-us-school-history__subtitle">OBSERVABLE PROGRESS THROUGH THE YEARS:</h4>
                <p>By 1965 the school population was around 650 under the care of 23 lay teachers and 12 Religious faculty members.</p>
                <p>During the first years of school's existence, the Faculty was mostly composed of Sisters. The general curriculum required by the Bureau of Private Schools and a few other lessons necessary for the cultural and vocational needs of the students were offered to the girls who came from different parts of Panay and the neighboring islands of Negros and Mindanao.</p>
                <p>The war years of 1941-1944 saw the suspension of formal classroom instruction. The pre-war program was resumed in 1945. Since then Assumption Iloilo continued to grow in its population and its academic and social services to the different communities from which it drew its students.</p>
                <p>At Mother Rosa Maria's suggestion, the College Department was begun in 1948-49, starting with a one-year Secretarial Course, to which were gradually added Liberal Arts, Bachelor of Science in Education and Bachelor of Science in Commerce. Alongside these academic degrees, the College was authorized by the Diocese to give a Catechist's Diploma to students who had taught Catechism either in Sunday School or in the public schools. The Marie Eugenie Society organized house-to-house visitation to the poor. With the opening of Bo. Obrero, the visitation to houses of the poor were replaced by an afternoon weekly spent with the slum children of the barrio.</p>
                <p>Desirious of further academic competence which would enable its graduates to meet more efficiently the demands of a technologically-geared world, the High School department began working for accreditation under PAASCU standards in 1970. After a period of intensive efforts to come up to PAASCU requirements, the HS Department was granted temporary accreditation in 1972 and permanent membership in 1975. The college department reached its highest enrolment in 1969-70 when the number of students rose to almost 200. At this time however, greater awareness of the needs of our developing country and the calls of evangelization of the poor, together with the very evident proliferation of Catholic women's colleges in the city, seemed to indicate that the college was no longer answering the apostolic need. Its phasing-out was, therefore, decided upon by the Provincial Council and approved by the General Council.</p>
              </div>
              <div className="about-us-foundation__full-image">
                <img 
                  src="/assets/images/About Us/assumption-sisters-present.jpg" 
                  alt="Assumption Sisters" 
                  className="about-us-foundation__wide-image"
                />
                <p className="about-us-image-caption">Present community of Assumption Iloilo</p>
              </div>
            </div>

            <div className="about-us-vmo">
              <div className="about-us-vmo__column">
                <h3 className="about-us-vmo__title">VISION</h3>
                {/* Image here if available */}
                <p>A Christ-centered educational community growing in the knowledge and love of Jesus Christ in His Church, journeying as Assumption Together participating in the mission of Transformative Education for the integral development of persons and communities.</p>
              </div>
              <div className="about-us-vmo__column">
                <h3 className="about-us-vmo__title">MISSION</h3>
                <p>Inspired by St. Marie Eugenie of Jesus, we commit ourselves to the mission of Transformative education by fostering growth in faith and spirituality, academic excellence for service and social transformation.</p>
              </div>
              <div className="about-us-vmo__column">
                <h3 className="about-us-vmo__title">OBJECTIVES</h3>
                <p>To foster sensitivity to God's call in the world and facilitate a joyful witness to faith in Jesus Christ expressed in individual and communal choices for God and Country:</p>
                <ul>
                  <li>to recognize and affirm the uniqueness and gifts of each person, creating an empowered learning community; and,</li>
                  <li>to nurture a culture of excellence for service that compels the lay and Religious to become a life-giving force that would bring about justice, peace, care of creation and social equality.</li>
                </ul>
              </div>
            </div>
            
            <div className="about-us-values">
               <div className="about-us-values__section">
                 <h3 className="about-us-values__title">Core Values</h3>
                 <ul className="about-us-values__list">
                   <li>Awareness</li>
                   <li>Commitment</li>
                   <li>Kindness</li>
                   <li>Simplicity</li>
                   <li>Humility</li>
                   <li>Integrity</li>
                   <li>Oneness</li>
                   <li>Nature</li>
                 </ul>
               </div>
               <div className="about-us-values__section">
                 <h3 className="about-us-values__title">Gospel Values</h3>
                 <ul className="about-us-values__list">
                   <li>Faith</li>
                   <li>Love</li>
                   <li>Truth</li>
                   <li>Justice</li>
                   <li>Peace</li>
                 </ul>
               </div>
            </div>

            <div className="about-us-video">
              <div className="about-us-video__wrapper">
                <iframe
                  className="about-us-video__iframe"
                  src="https://www.youtube.com/embed/jl3Kyi2KOQA"
                  title="South East Asia Province 2014"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="about-us-video__content">
                <h3 className="about-us-video__heading">We are the Religious of the Assumption.</h3>
                <p className="about-us-video__text">
                  We are inspired by a vision of Jesus Christ and the Kingdom of God, He came on earth to inaugurate.
                </p>
                <p className="about-us-video__text">
                  With our many friends and partners, we strive to make Jesus Christ known and loved.
                </p>
                <h3 className="about-us-video__heading about-us-video__heading--medium">We are women of faith living together in communities.</h3>
                <ul className="about-us-video__list">
                  <li><strong>Passionate about God.</strong></li>
                  <li><strong>Passionate about People.</strong></li>
                </ul>
                <h3 className="about-us-video__heading">We are educators by vocation.</h3>
              </div>
            </div>

            <div className="about-us-foundation__full-image">
              <img 
                src="/assets/images/About Us/assumption-sisters.jpg" 
                alt="Assumption Sisters" 
                className="about-us-foundation__wide-image"
              />
            </div>

            <div className="about-us-mission">
              <p className="about-us-mission__text">
                We are called to work for the transformation of society in the light of the Gospel.
              </p>
              <ul className="about-us-mission__list">
                <li>To discover the good in each person and to help them develop it.</li>
                <li>To forge strong characters</li>
                <li>To give young people roots and wings.</li>
              </ul>
              <p className="about-us-mission__text">
                Convinced that each of us has a mission on earth, we want to help people discover the meaning of their lives and how they can be of service in our world.
              </p>
              <p className="about-us-mission__text">
                We are an international congregation of 1,300+ Assumption Sisters of over 40 nationalities, in 18 Provinces and Regions responding to the challenges and calls of society in 35 countries around the world.
              </p>
              <p className="about-us-mission__link">
                <a href="#" className="about-us-mission__link-text">Click here to read more about the Religious of the Assumption – Asia Pacific</a>
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
            onNavigate('home') 
        }}
      />
      <footer className="signup-page__footer">© {new Date().getFullYear()} Assumption Iloilo</footer>
    </div>
  )
}

export default AboutUsScreen

const CSS = `
.about-us-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.about-us-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.about-us-hero {
  position: relative;
  width: 100%;
  height: 400px;
  background-image: url('/assets/images/Assumption-iloilo-school-campus.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-us-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 29, 42, 0.6); /* Dark overlay */
}

.about-us-hero__title {
  position: relative;
  color: #ffffff;
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: clamp(3rem, 8vw, 5rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: center;
  z-index: 1;
  margin: 0;
}

.about-us-history {
  /* Reduced side padding to occupy more space as requested */
  padding: clamp(3rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem);
  background: #ffffff;
  display: flex;
  justify-content: center;
}

.about-us-history__container {
  width: 100%;
  /* Increased max-width to fill more space */
  max-width: 1600px; 
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-us-history__title {
  font-family: var(--font-afacad);
  font-weight: 700;
  /* Increased font size for desktop */
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #1f1d28; /* Using theme dark color */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 1rem;
  position: relative;
  display: inline-block;
}

.about-us-history__title::after {
  content: '';
  display: block;
  width: 80px;
  height: 5px;
  background: #f3d654;
  margin-top: 0.75rem;
}

.about-us-history__intro {
  margin-bottom: 2rem;
  font-family: var(--font-afacad);
  color: #4a4a5a;
}

.about-us-history__address,
.about-us-history__subtitle {
  font-size: 1.1rem;
  margin: 0.25rem 0;
}

.about-us-history__motto {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  font-style: italic;
}

/* Foundation Section */
.about-us-foundation__title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.5rem;
  color: #1f1d28;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}

.about-us-foundation__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-us-foundation__image-wrapper {
  width: 100%;
  max-width: 400px; /* Limit image width */
  flex-shrink: 0;
}

.about-us-foundation__image {
  width: 100%;
  height: auto;
  border: 4px solid #f3d654; /* Adding a border consistent with theme */
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.about-us-foundation__text {
  font-family: var(--font-afacad);
  font-size: 1.1rem; /* Slightly bigger text */
  line-height: 1.7;
  color: #2e2d36;
  flex: 1;
  text-align: justify; /* Make text justified for better reading flow */
}

.about-us-foundation__text p {
  margin-bottom: 1.2rem;
}

.about-us-foundation__full-image {
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.about-us-foundation__wide-image {
  width: 100%;
  max-width: 1000px; /* Limit width of bottom image */
  height: auto;
  border-radius: 4px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.about-us-image-caption {
  margin-top: 0.75rem;
  font-family: var(--font-afacad);
  font-size: 1rem;
  color: #4a4a5a;
  text-align: center;
}

/* School History Section */
.about-us-school-history {
  margin-top: 3rem;
  border-top: 1px solid rgba(0,0,0,0.1);
  padding-top: 3rem;
}

.about-us-school-history__title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.5rem;
  color: #1f1d28;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}

.about-us-school-history__subtitle {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.25rem;
  color: #1f1d28;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 2rem 0 1rem;
}

.about-us-school-history__content {
  font-family: var(--font-afacad);
  font-size: 1.1rem;
  line-height: 1.7;
  color: #2e2d36;
  text-align: justify;
}

.about-us-school-history__content p {
  margin-bottom: 1rem;
}

.about-us-school-history__list {
  list-style-type: disc;
  padding-left: 2rem;
  margin-bottom: 1.5rem;
}

.about-us-school-history__list li {
  margin-bottom: 0.5rem;
}

/* Vision Mission Objectives Section */
.about-us-vmo {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(0,0,0,0.1);
}

.about-us-vmo__column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Or center if you prefer */
  gap: 1rem;
}

.about-us-vmo__title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.5rem;
  color: #1f1d28;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: 100%;
  text-align: center;
}

.about-us-vmo__column p, 
.about-us-vmo__column ul {
  font-family: var(--font-afacad);
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a4a5a;
  text-align: justify;
}

.about-us-vmo__column ul {
  padding-left: 1.5rem;
  list-style-type: disc;
}

/* Values Section */
.about-us-values {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 4rem;
  padding-bottom: 2rem;
}

.about-us-values__title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.5rem;
  color: #1f1d28; /* Or blue if per screenshot */
  text-transform: capitalize; /* Or uppercase per screenshot style */
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  text-align: center;
}

.about-us-values__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-afacad);
  font-size: 1.1rem;
  color: #4a4a5a;
}

/* Video Section */
.about-us-video {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.about-us-video__wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
  padding-bottom: 40%; /* Slightly reduced height */
  height: 0;
  overflow: hidden;
}

.about-us-video__iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 4px;
}

.about-us-video__content {
  width: 100%;
  max-width: 800px;
  text-align: center;
  font-family: var(--font-afacad);
  color: #4a4a5a;
}

.about-us-video__heading {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.75rem;
  color: #1f1d28;
  margin: 2rem 0 1rem;
  text-align: center;
}

.about-us-video__heading--medium {
  font-size: 1.35rem;
}

.about-us-video__text {
  font-family: var(--font-afacad);
  font-size: 1.25rem;
  line-height: 1.7;
  color: #4a4a5a;
  margin-bottom: 1rem;
  text-align: center;
}

.about-us-video__list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-afacad);
  font-size: 1.25rem;
  color: #4a4a5a;
}

.about-us-video__list li {
  text-align: center;
}

.about-us-video__list li strong {
  font-size: 1.35rem;
  font-weight: 700;
}

/* Mission Section */
.about-us-mission {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.about-us-mission__text {
  font-family: var(--font-afacad);
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4a4a5a;
  margin-bottom: 1.5rem;
  text-align: center;
}

.about-us-mission__list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-afacad);
  font-size: 1.1rem;
  color: #4a4a5a;
}

.about-us-mission__list li {
  text-align: center;
}

.about-us-mission__list li::before {
  content: "• ";
  margin-right: 0.5rem;
}

.about-us-mission__link {
  margin-top: 1.5rem;
  text-align: center;
}

.about-us-mission__link-text {
  font-family: var(--font-afacad);
  font-size: 1.1rem;
  color: #1f1d28;
  text-decoration: underline;
  font-weight: 600;
}

.about-us-mission__link-text:hover {
  color: #f3d654;
}

/* Desktop Styles */
@media (min-width: 1024px) {
  .about-us-foundation__content {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }

  .about-us-history__title {
    font-size: 2.5rem;
  }

  .about-us-foundation__text,
  .about-us-school-history__content,
  .about-us-vmo__column p,
  .about-us-vmo__column ul,
  .about-us-values__list,
  .about-us-mission__text,
  .about-us-mission__list,
  .about-us-mission__link-text {
    font-size: 1.2rem; /* Bigger font on desktop */
  }
  
  .about-us-history__intro p {
    font-size: 1.2rem;
  }

  .about-us-vmo {
    flex-direction: row;
    align-items: flex-start;
  }
  
  .about-us-values {
    flex-direction: row;
    justify-content: space-around; /* Space them out nicely */
  }
  
  .about-us-values__section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .about-us-video__content {
    max-width: 900px;
  }

  .about-us-video__heading {
    font-size: 2rem;
  }

  .about-us-video__heading--medium {
    font-size: 1.5rem;
  }

  .about-us-video__text,
  .about-us-video__list {
    font-size: 1.35rem;
  }

  .about-us-video__list li strong {
    font-size: 1.5rem;
  }
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

@media (max-width: 768px) {
  .about-us-hero {
    height: 300px;
  }
  
  .about-us-foundation__image-wrapper {
    max-width: 100%;
  }
}
`
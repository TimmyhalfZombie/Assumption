import { useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import { useLoginModal } from './functions/useLoginModal'
import LoginModal from './components/LoginModal'

// --- 1. DATA CONTENT (Merged here) ---
const ADMISSIONS_CONTENT = {
  applicationPeriod: "November 24 – May 30, 2026",
  eligibility: {
    age: [
      { level: "Kinder 1", desc: "Applicants must be at least 4 years old by August 2025." },
      { level: "Kinder 2", desc: "Applicants must be at least 5 years old by August 2025." },
      { level: "Grade 1", desc: "Applicants must be at least 6 years old by August 2025 and must be presently enrolled in a DepEd-accredited preschool (Kinder level or its equivalent) with an LRN." }
    ],
    grade: [
      "Has an average grade of 80 and above in all subjects",
      "Has Satisfactory Character grades",
      "Completed and passed the level prior to the level being applied"
    ]
  },
  requirements: {
    preschool: [
      "Two (2) Recent Passport Size Photo with white background",
      "One (1) Clear Copy of the NSO/PSA Authenticated Birth Certificate",
      "One (1) Clear Copy of the Baptismal Certificate",
      "Screenshot of Payment Confirmation or Photo of the Deposit Slip for the Admission Processing Fee"
    ],
    gradeSchool: [
      "Two (2) Recent Passport Size Photo with white background",
      "Certified True Copy of the Current School Year's Report Card (available grades of SY 2024-2025)",
      "Certificate of Good Moral Character (for Grades 4-6 & 7-11 applicants only)",
      "One (1) Clear Copy of the NSO/PSA Authenticated Birth Certificate",
      "One (1) Clear Copy of the Baptismal Certificate",
      "Recommendation Form (for Grades 4-6 & 7-11 applicants only and to be accomplished by the Class Adviser/Guidance Counselor)",
      "Screenshot of Payment Confirmation or Photo of the Deposit Slip for the Admission Processing Fee",
      "ESC Certificate from previous school (Grade 8- Grade 11)"
    ]
  },
  procedure: [
    { description: "Accomplish the requirements." },
    { 
      description: "Pay the non-refundable/non-transferable PhP250.00 Admission Processing Fee.",
      details: [
        "Payment may be made online via internet banking by using your bank's mobile app or website to transfer funds to the school's bank accounts and over-the-counter deposits with the following details:",
        "Account Name: Assumption Iloilo, Inc.",
        "Account Numbers:",
        "BPI CA # 1315-3400-27",
        "BDO SA # 000830161333",
        "UNION BANK CA # 002770006533",
        "Remarks: Learner's Name / Purpose of Payment (Admission Processing Fee)",
        "An official receipt shall be issued after confirmation of payment. The official receipt may be claimed from the school's Finance Office on schedule. Payment may be made also at the school's Finance Office from 8:00 am – 3:30 pm Monday to Friday."
      ]
    },
    { 
      description: "Fill out and submit the Application Form with complete documentary requirements.",
      details: [
        "Online Admission Application Form click here",
        "Make sure you already have the documentary requirements in soft copy (JPEG, PNG, or PDF file format). Kindly upload clear scanned copies of the documents.",
        "Onsite Admission Application Form click here",
        "Kindly bring clear hard copies of the documents from 8:00 am – 3:30 pm Monday to Friday to the school's Admissions/Registrar's Office."
      ]
    },
    { description: "Wait for the notification on the schedule of your onsite Admission Interview and Examination via email 3 to 5 business days after submission of complete documents." },
    { description: "Wait to be notified of the admission application result via email 3 to 5 business days after the interview and examination." }
  ],
  reminders: [
    "Ensure completeness of requirements. Incomplete applications will not be processed.",
    "Any false information and/or fraudulent document, either submitted online or in physical form, will automatically nullify the application and permanently disbar the applicant from pursuing any level of study at Assumption Iloilo.",
    "All submitted documents in compliance with the admission requirements shall become the property of Assumption Iloilo and NOT to be returned to the applicant.",
    "For any inquiries and concerns, feel free to email admissions@assumptioniloilo.edu.ph or visit the Admissions/Registrar's Office."
  ],
  enrollmentSteps: [
    {
      step: 1,
      title: "Proceed to the Registrar’s Office",
      desc: "For New Learners – submit your original Official Transcript of Record (F 137) or your original Report Card (F 138)."
    },
    {
      step: 2,
      title: "Secure and accomplish the following:",
      items: [
        "Registration Form",
        "Enrollment Contract",
        "Health Record",
        "Data Privacy Consent Form",
        "Summer Reinforcement Certificate (For learners who undergo summer reinforcement activity)"
      ],
      note: "Parents and learners are encouraged to read and review the Enrollment Contract"
    },
    {
      step: 3,
      title: "Proceed to the Finance Office and present the Registration Form for payment."
    },
    {
      step: 4,
      title: "Present the receipt of payment and have the Registration Form stamped with “Officially Enrolled” at the Registrar’s Office."
    }
  ]
};

type AdmissionsScreenProps = {
  onNavigate: (page: string) => void
}

// --- 3. MAIN COMPONENT ---
const AdmissionsScreen = ({ onNavigate }: AdmissionsScreenProps) => {
  useEffect(() => {
    const styleId = 'admissions-screen-styles'
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

  const content = ADMISSIONS_CONTENT

  return (
    <div className="admissions-screen">
      <NavigationBar 
        onLoginClick={openLogin} 
        onNavigate={onNavigate} 
        currentPage="admissions" 
      />
      <main className="admissions-content">
        <div className="admissions-hero">
          <div className="admissions-hero__overlay"></div>
          <h1 className="admissions-hero__title">ADMISSIONS</h1>
        </div>
      
      <div className="admissions-container">

        <div className="admissions-grid">
          
          {/* LEFT COLUMN: Admission Application */}
          <div className="admissions-left-col">
            <h2 className="admissions-main-title">
              Admission Application for SY 2025-2026
            </h2>

            {/* I. APPLICATION PERIOD */}
            <div className="admissions-section-header">I. APPLICATION PERIOD</div>
            <div className="admissions-info-box">
              {content.applicationPeriod}
            </div>

            {/* II. ELIGIBILITY */}
            <div className="admissions-section-header">II. ELIGIBILITY</div>
            
            <div className="admissions-sub-header">A. Age Requirement</div>
            <ul className="admissions-list">
              {content.eligibility.age.map((item, idx) => (
                <li key={idx}><strong>{item.level}</strong>: {item.desc}</li>
              ))}
            </ul>

            <div className="admissions-sub-header">B. Grade Requirement</div>
            <ul className="admissions-list">
              {content.eligibility.grade.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>

            <div className="admissions-sub-header">C. Documentary Requirements</div>
            
            <div className="admissions-req-group">
              <span className="admissions-req-title">For Preschool Applicants</span>
              <ul className="admissions-list">
                {content.requirements.preschool.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </div>

            <div className="admissions-req-group">
              <span className="admissions-req-title">For Grade School (Grades 1-6) & High School (Grades 7-11) Applicants</span>
              <ul className="admissions-list">
                {content.requirements.gradeSchool.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
              <p style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.9rem', color: '#666' }}>
                * Kindly bring the duly accomplished Recommendation Form during your scheduled Admission Interview and Exam. To download the form, click here.
              </p>
            </div>

            {/* III. PROCEDURE */}
            <div className="admissions-section-header">III. APPLICATION PROCEDURE</div>
            <div>
              {content.procedure.map((step, idx) => (
                <div key={idx} className="admissions-procedure-step">
                  <strong>STEP {idx + 1}:</strong> {step.description}
                  {step.details && (
                    <ul style={{ marginTop: '0.75rem', marginLeft: '1.5rem', listStyle: 'disc', fontSize: '1.1rem', lineHeight: '1.7', color: '#4a4a5a' }}>
                      {step.details.map((detail, dIdx) => (
                        <li key={dIdx} style={{ marginBottom: '0.5rem' }}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* IV. IMPORTANT REMINDERS */}
            <div className="admissions-section-header">IV. IMPORTANT REMINDERS</div>
            <ul className="admissions-list">
              {content.reminders.map((reminder, idx) => (
                <li key={idx}>{reminder}</li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN: Enrollment Procedure */}
          <div className="enrollment-panel">
            <h2 className="enrollment-title">
              Enrolment Procedure for SY 2025-2026
            </h2>

            {content.enrollmentSteps.map((item, idx) => (
              <div key={idx} className="enrollment-step">
                <div className="enrollment-number">{item.step}.</div>
                <div className="enrollment-content">
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</div>
                  {item.desc && <div style={{ fontStyle: 'italic', color: '#555', fontSize: '0.95rem' }}>{item.desc}</div>}
                  
                  {item.items && (
                    <ul className="enrollment-sublist">
                      {item.items.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <span>{String.fromCharCode(97 + sIdx)}.</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {item.note && <span className="enrollment-note">– {item.note}</span>}
                </div>
              </div>
            ))}
          </div>

        </div>
        </div>
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

export default AdmissionsScreen

// --- 2. CSS STYLES ---
const CSS = `
.admissions-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #1f1d28;
}

.admissions-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.admissions-hero {
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

.admissions-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 29, 42, 0.6); /* Dark overlay */
}

.admissions-hero__title {
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

.admissions-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem clamp(1.25rem, 5vw, 4rem);
  width: 100%;
}

.admissions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

@media (min-width: 1024px) {
  .admissions-grid {
    grid-template-columns: 1.2fr 1fr; /* Left column slightly wider */
  }
}

/* --- LEFT COLUMN STYLES --- */
.admissions-section-header {
  font-family: var(--font-afacad);
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f1d28;
  text-transform: uppercase;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
}

.admissions-info-box {
  background: #f8f9fa;
  border-left: 4px solid #1f1d28;
  padding: 1.25rem;
  font-family: var(--font-afacad);
  font-size: 1.1rem;
  color: #4a4a5a;
  margin-bottom: 2rem;
}

.admissions-main-title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #1f1d28;
  margin-bottom: 1.5rem;
}

.admissions-sub-header {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: 1.25rem;
  color: #1f1d28;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.admissions-list {
  list-style-type: disc;
  padding-left: 1.5rem;
  font-family: var(--font-afacad);
  color: #4a4a5a;
  font-size: 1.1rem;
  line-height: 1.7;
}

.admissions-list li {
  margin-bottom: 0.5rem;
}

.admissions-req-group {
  margin-bottom: 1.5rem;
}

.admissions-req-title {
  font-style: italic;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

.admissions-procedure-step {
  margin-bottom: 1rem;
  font-family: var(--font-afacad);
  font-size: 1.1rem;
  color: #4a4a5a;
  line-height: 1.7;
}

.admissions-procedure-step strong {
  color: #1f1d28;
  font-weight: 700;
  margin-right: 0.5rem;
}

.admissions-links {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admissions-btn {
  background: transparent;
  border: 2px solid #1f1d28;
  color: #1f1d28;
  padding: 0.8rem 1.5rem;
  font-family: var(--font-afacad);
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
}

.admissions-btn:hover {
  background: #1f1d28;
  color: #f3d654;
}

/* --- RIGHT COLUMN STYLES (Enrollment) --- */
.enrollment-panel {
  background: #f4f4f5;
  padding: 2.5rem;
  border-radius: 4px;
  height: fit-content;
}

.enrollment-title {
  font-family: var(--font-afacad);
  font-weight: 700;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #1f1d28;
  margin-bottom: 2rem;
  line-height: 1.3;
}

.enrollment-step {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-family: var(--font-afacad);
}

.enrollment-number {
  font-weight: 700;
  font-size: 1.2rem;
  color: #1f1d28;
  min-width: 1.5rem;
}

.enrollment-content {
  font-size: 1.1rem;
  color: #2e2d36;
  line-height: 1.7;
}

.enrollment-sublist {
  list-style: none;
  padding: 0;
  margin-top: 0.75rem;
}

.enrollment-sublist li {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
  font-size: 1.1rem;
  color: #4a4a5a;
}

.enrollment-note {
  font-style: italic;
  font-size: 0.95rem;
  color: #666;
  margin-top: 1rem;
  display: block;
}

@media (min-width: 1024px) {
  .admissions-list,
  .admissions-procedure-step,
  .admissions-info-box,
  .enrollment-content,
  .enrollment-sublist li {
    font-size: 1.2rem;
  }

  .admissions-main-title {
    font-size: 2.5rem;
  }

  .enrollment-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .admissions-hero {
    height: 300px;
  }
}
`

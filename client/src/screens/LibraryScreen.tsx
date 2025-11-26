import { useState, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import LibraryHero from './components/LibraryHero'
import SearchForm from './components/SearchForm' // Original UI
import CompactSearchForm from './components/CompactSearchForm' // Results UI
import CrestLogo from './components/CrestLogo'
import LoginModal from './components/LoginModal'
import SignupScreen from './components/SignupScreen'
import { useLibrarySearch } from './functions/useLibrarySearch'
import { useLoginModal } from './functions/useLoginModal'
import { useSignupForm } from './functions/useSignupForm'

// --- INLINE ICONS ---
const Star = ({ size = 24, fill = "none", stroke = "currentColor" }: { size?: number, fill?: string, stroke?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

const ShoppingCart = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1"></circle>
    <circle cx="19" cy="21" r="1"></circle>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
  </svg>
)

const Bookmark = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
  </svg>
)

// --- RESULTS INTERFACE CSS ---
const RESULTS_CSS = `
.results-hero-compact {
  background-color: #1f1d28;
  padding: 2rem 1rem 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 4px solid #f3d654;
}

.compact-branding {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.compact-titles h1 {
  color: white;
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  text-transform: uppercase;
}

.compact-titles p {
  color: rgba(255,255,255,0.7);
  margin: 0;
  font-size: 0.9rem;
}

.library-content-results {
  max-width: 100%;
  width: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2rem;
  align-items: start;
  background: #ffffff;
  padding: 2rem;
  border-radius: 0;
  min-height: calc(100vh - 200px);
}

.sidebar {
  background: #e6e6e6;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-top: 2rem;
}

.sidebar-header {
  padding: 1rem;
  font-weight: 700;
  font-size: 0.9rem;
  color: #1f1d28;
  text-align: center;
  border-bottom: 1px solid #dcdcdc;
}

.sidebar-body {
  background: #ffffff;
  padding: 1.5rem 1.2rem;
}

.filter-group {
  margin-bottom: 1.8rem;
}

.filter-title {
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
  color: #000;
}

.filter-item {
  display: block;
  font-size: 0.85rem;
  color: #4a4ae0;
  text-decoration: underline;
  margin-bottom: 0.35rem;
  cursor: pointer;
}

.filter-item.more {
  color: #444;
  text-decoration: none;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.results-area {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.results-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.results-count {
  font-weight: 700;
  font-size: 0.95rem;
  color: #222;
}

.results-toolbar {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.toolbar-btn {
  background: #e0e0e0;
  border: none;
  padding: 0.3rem 0.8rem;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 2px;
  color: #333;
}

.toolbar-select {
  padding: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 2px;
  margin-left: auto;
}

.book-card {
  background: #e6e6e6;
  padding: 1.5rem;
  border-radius: 3px;
  display: flex;
  gap: 1.5rem;
  position: relative;
}

.book-check {
  padding-top: 0.3rem;
}

.book-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.book-title-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.2rem;
}

.book-index {
  font-weight: 800;
  color: #000;
}

.book-title {
  font-weight: 700;
  font-size: 1.05rem;
  color: #3a3a9e;
  text-decoration: none;
  line-height: 1.3;
}

.highlight-text {
  background-color: #ffeb3b;
  padding: 0 2px;
}

.book-meta {
  font-size: 0.9rem;
  color: #333;
}

.book-availability {
  font-size: 0.9rem;
  margin-top: 0.3rem;
  font-weight: 600;
}

.avail-label {
  color: #000;
}

.avail-val {
  color: #c62828;
}

.book-rating {
  display: flex;
  gap: 2px;
  margin: 0.5rem 0;
}

.book-actions {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.8rem;
}

.action-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #222;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.book-cover-img {
  width: 90px;
  height: 130px;
  object-fit: cover;
  box-shadow: 3px 3px 8px rgba(0,0,0,0.2);
  border: 1px solid #fff;
}

@media (max-width: 900px) {
  .library-content-results {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display: none;
  }
}
`

type LibraryScreenProps = {
  onNavigate: (page: string) => void
}

const LibraryScreen = ({ onNavigate }: LibraryScreenProps) => {
  // Inject Results CSS (Home CSS is likely global or in components)
  useEffect(() => {
    if (!document.getElementById('library-results-css')) {
      const style = document.createElement('style')
      style.id = 'library-results-css'
      style.textContent = RESULTS_CSS
      document.head.appendChild(style)
    }
  }, [])

  const {
    catalogOptions,
    libraryOptions,
    selectedCatalog,
    setSelectedCatalog,
    searchTerm,
    setSearchTerm,
    selectedLibrary,
    setSelectedLibrary,
    handleSubmit,
    // API Data & State
    books,
    loading,
    hasSearched,
    searchBooks
  } = useLibrarySearch()

  const {
    isLoginOpen,
    isSignupOpen,
    account,
    password,
    isSubmitting,
    openLogin,
    closeLogin,
    openSignup,
    closeSignup,
    handleAccountChange,
    handlePasswordChange,
    handleLoginSubmit,
  } = useLoginModal()

  const {
    values: signupValues,
    isSubmitting: signupSubmitting,
    isPasswordMismatch,
    updateValue,
    submitForm: submitSignup,
    resetForm,
  } = useSignupForm()

  const handleSignupClose = () => {
    closeSignup()
    resetForm()
  }

  const handleSignupSubmit = async () => {
    await submitSignup()
    handleSignupClose()
    openLogin()
  }

  useEffect(() => {
    if (isLoginOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoginOpen])

  useEffect(() => {
    const checkAndOpenSignup = () => {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('signup') === 'true') {
        openSignup()
        urlParams.delete('signup')
        const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '') + window.location.hash
        window.history.replaceState({}, '', newUrl)
      }
    }
    checkAndOpenSignup()
    const handleHashChange = () => {
      checkAndOpenSignup()
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [openSignup])

  const handleSignupNavigate = (page: string) => {
    if (page === 'home') {
      closeSignup()
      resetForm()
    }
    onNavigate(page)
  }

  // Helper to highlight text in results
  const Highlight = ({ text }: { text: string }) => {
    if (!searchTerm) return <span>{text}</span>
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === searchTerm.toLowerCase() ? <span key={i} className="highlight-text">{part}</span> : part
        )}
      </span>
    )
  }

  return (
    <>
      {isSignupOpen ? (
        <SignupScreen
          values={signupValues}
          isSubmitting={signupSubmitting}
          isPasswordMismatch={isPasswordMismatch}
          onChange={updateValue}
          onSubmit={handleSignupSubmit}
          onBackToLogin={() => openLogin()}
          onNavigate={handleSignupNavigate}
        />
      ) : (
        <div className="library-screen">
          <NavigationBar onLoginClick={() => openLogin()} onNavigate={onNavigate} currentPage="home" />
          
          {/* --- MAIN INTERFACE SWITCH --- */}
          {!hasSearched ? (
            // --- HOME INTERFACE (Original) ---
            <main className="library-screen__content">
              <LibraryHero />
              <section className="library-screen__search">
                <SearchForm
                  catalogOptions={catalogOptions}
                  libraryOptions={libraryOptions}
                  selectedCatalog={selectedCatalog}
                  onCatalogChange={setSelectedCatalog}
                  searchTerm={searchTerm}
                  onSearchTermChange={setSearchTerm}
                  selectedLibrary={selectedLibrary}
                  onLibraryChange={setSelectedLibrary}
                  onSubmit={handleSubmit}
                />
                <div className="library-screen__meta-links">
                  <a href="#">Advanced search</a>
                  <span aria-hidden="true">|</span>
                  <a href="#">Authority search</a>
                  <span aria-hidden="true">|</span>
                  <a href="#">Tag Cloud</a>
                  <span aria-hidden="true">|</span>
                  <a href="#">Libraries</a>
                </div>
              </section>
              <section className="library-screen__acquisitions">
                <h2>New Acquisitions</h2>
                <p>Featured titles will appear here.</p>
              </section>
            </main>
          ) : (
            // --- RESULTS INTERFACE (New) ---
            <>
              <div className="results-hero-compact">
                <div className="compact-branding">
                  <CrestLogo size={70} />
                  <div className="compact-titles">
                    <h1>Assumption Iloilo</h1>
                    <p>18 General Luna St., Iloilo City 5000</p>
                  </div>
                </div>
                {/* Use Compact Form for follow-up searches */}
                <CompactSearchForm 
                  initialQuery={searchTerm}
                  onSearch={searchBooks}
                />
              </div>

              <div className="library-content-results">
                <aside className="sidebar">
                  <div className="sidebar-header">Refine your search</div>
                  <div className="sidebar-body">
                    <div className="filter-group">
                      <div className="filter-title">Availability</div>
                      <span className="filter-item">Limit to records with available items</span>
                    </div>
                    <div className="filter-group">
                      <div className="filter-title">Authors</div>
                      <span className="filter-item">Rowling, J.K.</span>
                      <span className="filter-item">Colbert, David</span>
                      <span className="filter-item">Thorne, Jack</span>
                      <span className="filter-item more">Show more</span>
                    </div>
                    <div className="filter-group">
                      <div className="filter-title">Holding libraries</div>
                      <span className="filter-item">Grade School Library</span>
                      <span className="filter-item">High School Library</span>
                    </div>
                    <div className="filter-group">
                      <div className="filter-title">Location</div>
                      <span className="filter-item">Circulation</span>
                      <span className="filter-item">Fiction</span>
                      <span className="filter-item">Reference</span>
                    </div>
                  </div>
                </aside>

                <div className="results-area">
                  <div className="results-header">
                    <div className="results-count">
                      Your search returned {books.length} results
                    </div>
                    <div className="results-toolbar">
                      <span style={{fontWeight:'700', fontSize:'0.9rem'}}>⚡ Unhighlight</span>
                      <div style={{ flexGrow: 1 }}></div>
                      <button className="toolbar-btn">Select all</button>
                      <button className="toolbar-btn">Clear all</button>
                      <select className="toolbar-select">
                        <option>Relevance</option>
                      </select>
                    </div>
                  </div>

                  {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading catalog...</div>
                  ) : (
                    books.map((book, index) => (
                      <div key={book.id} className="book-card">
                        <div className="book-check">
                          <input type="checkbox" />
                        </div>
                        <div className="book-info">
                          <div className="book-title-row">
                            <span className="book-index">{index + 1}.</span>
                            <a href="#" className="book-title">
                              <Highlight text={book.title} />
                            </a>
                          </div>
                          <div className="book-meta">
                            <strong>by</strong> {book.authors.join(', ')}
                          </div>
                          <div className="book-meta">
                            <strong>Publisher:</strong> {book.publisher}; {book.publishedDate}
                          </div>
                          <div className="book-availability">
                            <span className="avail-label">Availability: </span>
                            <span className="avail-val">Items available for loan: {book.availability}</span>
                          </div>
                          <div className="book-rating">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} size={14} fill={i <= book.rating ? "#aaa" : "#ddd"} stroke="none" />
                            ))}
                          </div>
                          <div className="book-actions">
                            <button className="action-link">
                              <Bookmark size={16} /> Place hold
                            </button>
                            <button className="action-link">
                              <ShoppingCart size={16} /> Add to cart
                            </button>
                          </div>
                        </div>
                        <img src={book.thumbnail} alt={book.title} className="book-cover-img" />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
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
        onCreateAccount={openSignup}
      />
    </>
  )
}

export default LibraryScreen
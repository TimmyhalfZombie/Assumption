import { useState, useEffect, useRef } from 'react'
import { auth } from '../firebase'
import NavigationBar from './components/NavigationBar'
import LibraryHero from './components/LibraryHero'
import SearchForm from './components/SearchForm' // Original UI
import LibraryResultsScreen from './LibraryResultsScreen'
import LoginModal from './components/LoginModal'
import UserProfileModal from './components/UserProfileModal'
import SignupScreen from './components/SignupScreen'
import { useLibrarySearch } from './functions/useLibrarySearch'
import type { Book } from './functions/useLibrarySearch'
import { useLoginModal } from './functions/useLoginModal'
import { useSignupForm } from './functions/useSignupForm'

interface OpenLibraryBook {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
  cover_i?: number
  isbn?: string[]
}



type LibraryScreenProps = {
  onNavigate: (page: string) => void
  onBookSelect?: (book: Book, searchQuery: string, searchBooks: Book[]) => void
  initialSearchQuery?: string
  initialSearchBooks?: Book[]
}

const LibraryScreen = ({ onNavigate, onBookSelect, initialSearchQuery = '', initialSearchBooks = [] }: LibraryScreenProps) => {
  // Inject New Acquisitions CSS
  useEffect(() => {
    if (!document.getElementById('acquisitions-slideshow-css')) {
      const style = document.createElement('style')
      style.id = 'acquisitions-slideshow-css'
      style.textContent = ACQUISITIONS_CSS
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
    handleSubmit: originalHandleSubmit,
    // API Data & State
    books,
    loading,
    hasSearched,
    searchBooks: originalSearchBooks,
    restoreSearch
  } = useLibrarySearch()

  // Wrapper to check authentication before searching
  const checkAuthAndSearch = () => {
    if (!auth.currentUser) {
      alert('Please log in to search for books.')
      openLogin()
      return false
    }
    return true
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (checkAuthAndSearch()) {
      originalHandleSubmit(event)
    }
  }

  const searchBooks = (query: string) => {
    if (checkAuthAndSearch()) {
      originalSearchBooks(query)
    }
  }

  // Restore search results when returning from book detail
  useEffect(() => {
    if (initialSearchQuery && initialSearchBooks.length > 0) {
      restoreSearch(initialSearchQuery, initialSearchBooks)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearchQuery, initialSearchBooks])

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

  // New Acquisitions state
  const [newAcquisitions, setNewAcquisitions] = useState<OpenLibraryBook[]>([])
  const [isLoadingAcquisitions, setIsLoadingAcquisitions] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideIntervalRef = useRef<number | null>(null)

  // Profile Modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

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

  // Fetch newest books from OpenLibrary
  useEffect(() => {
    const fetchNewAcquisitions = async () => {
      if (searchTerm) {
        setIsLoadingAcquisitions(false)
        setNewAcquisitions([])
        return
      }

      setIsLoadingAcquisitions(true)
      try {
        // Use a simpler query - search for popular books
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
        
        const response = await fetch(
          `https://openlibrary.org/search.json?q=subject:fiction&limit=100&fields=key,title,author_name,first_publish_year,cover_i,isbn`,
          { signal: controller.signal }
        )
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.docs && data.docs.length > 0) {
          // Filter to get books with covers, sort by year (newest first), and limit to 7
          const allBooksWithCovers = data.docs
            .filter((book: OpenLibraryBook) => book.cover_i && book.title)
            .sort((a: OpenLibraryBook, b: OpenLibraryBook) => 
              (b.first_publish_year || 0) - (a.first_publish_year || 0)
            )
            .slice(0, 7)
          
          setNewAcquisitions(allBooksWithCovers)
          setIsLoadingAcquisitions(false)
        } else {
          setNewAcquisitions([])
          setIsLoadingAcquisitions(false)
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.error('Request timeout')
        } else {
          console.error('Error fetching new acquisitions:', error)
        }
        setNewAcquisitions([])
        setIsLoadingAcquisitions(false)
      }
    }

    fetchNewAcquisitions()
  }, [searchTerm])

  // Auto-rotate slideshow
  useEffect(() => {
    if (newAcquisitions.length > 0 && !searchTerm) {
      slideIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % newAcquisitions.length)
      }, 4000) // Change slide every 4 seconds
    }

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current)
      }
    }
  }, [newAcquisitions.length, searchTerm])

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newAcquisitions.length)
    // Reset the auto-rotate timer when manually navigating
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current)
    }
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newAcquisitions.length)
    }, 4000)
  }

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newAcquisitions.length) % newAcquisitions.length)
    // Reset the auto-rotate timer when manually navigating
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current)
    }
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newAcquisitions.length)
    }, 4000)
  }

  const handleSignupNavigate = (page: string) => {
    if (page === 'home') {
      closeSignup()
      resetForm()
    }
    onNavigate(page)
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
          <NavigationBar 
            onLoginClick={() => openLogin()} 
            onProfileClick={() => setIsProfileModalOpen(true)}
            onNavigate={onNavigate} 
            currentPage="home" 
          />
          
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
                {isLoadingAcquisitions ? (
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Loading new acquisitions...</p>
                ) : newAcquisitions.length > 0 ? (
                  <div className="acquisitions-slideshow">
                    <div className="acquisitions-slideshow__container">
                      <button 
                        className="acquisitions-arrow acquisitions-arrow--left"
                        onClick={goToPreviousSlide}
                        aria-label="Previous book"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m15 18-6-6 6-6"></path>
                        </svg>
                      </button>
                      {newAcquisitions.map((book, index) => (
                        <div
                          key={book.key}
                          className={`acquisitions-slide ${index === currentSlide ? 'active' : ''}`}
                        >
                          <div className="acquisitions-book">
                            {book.cover_i ? (
                              <img
                                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                alt={book.title}
                                className="acquisitions-book__cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/assets/images/assumption-logo.png'
                                }}
                              />
                            ) : (
                              <div className="acquisitions-book__cover-placeholder">
                                <span>No Cover</span>
                              </div>
                            )}
                            <div className="acquisitions-book__info">
                              <h3 className="acquisitions-book__title">{book.title}</h3>
                              {book.author_name && book.author_name.length > 0 && (
                                <p className="acquisitions-book__author">by {book.author_name[0]}</p>
                              )}
                              {book.first_publish_year && (
                                <p className="acquisitions-book__year">{book.first_publish_year}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <button 
                        className="acquisitions-arrow acquisitions-arrow--right"
                        onClick={goToNextSlide}
                        aria-label="Next book"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No new acquisitions available at this time.</p>
                )}
              </section>
            </main>
          ) : (
            <LibraryResultsScreen
              books={books}
              loading={loading}
              searchTerm={searchTerm}
              onSearch={searchBooks}
              onBookSelect={onBookSelect}
            />
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
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  )
}

// --- NEW ACQUISITIONS SLIDESHOW CSS ---
const ACQUISITIONS_CSS = `
.acquisitions-slideshow {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 2rem 0;
}

.acquisitions-slideshow__container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
}

.acquisitions-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(31, 29, 40, 0.9);
  color: #f3d654;
  border: 2px solid #f3d654;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s, box-shadow 0.3s;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  -webkit-tap-highlight-color: transparent;
  outline: none;
  -webkit-touch-callout: none;
  user-select: none;
}

.acquisitions-arrow--left {
  left: 1rem;
}

.acquisitions-arrow--right {
  right: 1rem;
}

.acquisitions-arrow:hover {
  background: #1f1d28;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.acquisitions-arrow:active {
  transform: translateY(-50%);
}

.acquisitions-arrow svg {
  width: 24px;
  height: 24px;
}

.acquisitions-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.acquisitions-slide.active {
  opacity: 1;
  z-index: 1;
}

.acquisitions-book {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  max-width: 800px;
  width: 90%;
}

.acquisitions-book__cover {
  width: 150px;
  height: 220px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
}

.acquisitions-book__cover-placeholder {
  width: 150px;
  height: 220px;
  background: #1f1d28;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f3d654;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.acquisitions-book__info {
  flex: 1;
  color: #ffffff;
}

.acquisitions-book__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #ffffff;
  line-height: 1.2;
}

.acquisitions-book__author {
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin: 0.5rem 0;
  color: #f3d654;
  font-weight: 600;
}

.acquisitions-book__year {
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
  color: rgba(255, 255, 255, 0.7);
}

.acquisitions-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.acquisitions-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #f3d654;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.acquisitions-indicator:hover {
  background: rgba(243, 214, 84, 0.5);
}

.acquisitions-indicator.active {
  background: #f3d654;
}

@media (max-width: 768px) {
  .acquisitions-book {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .acquisitions-book__cover,
  .acquisitions-book__cover-placeholder {
    width: 120px;
    height: 180px;
  }
  
  .acquisitions-slideshow__container {
    height: auto;
    min-height: 400px;
  }
}
`

export default LibraryScreen

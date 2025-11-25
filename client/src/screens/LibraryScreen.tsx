import { useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import LibraryHero from './components/LibraryHero'
import SearchForm from './components/SearchForm'
import LoginModal from './components/LoginModal'
import SignupScreen from './components/SignupScreen'
import { useLibrarySearch } from './functions/useLibrarySearch'
import { useLoginModal } from './functions/useLoginModal'
import { useSignupForm } from './functions/useSignupForm'

type LibraryScreenProps = {
  onNavigate: (page: string) => void
}

const LibraryScreen = ({ onNavigate }: LibraryScreenProps) => {
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
    const createdAccount = signupValues.email
    await submitSignup()
    handleSignupClose()
    if (createdAccount) {
      handleAccountChange(createdAccount)
    }
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

  // Check URL for signup parameter and auto-open signup
  useEffect(() => {
    const checkAndOpenSignup = () => {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('signup') === 'true') {
        openSignup()
        // Remove the parameter from URL
        urlParams.delete('signup')
        const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '') + window.location.hash
        window.history.replaceState({}, '', newUrl)
      }
    }

    // Check immediately
    checkAndOpenSignup()

    // Also check on hash changes (when navigating to home)
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

import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from './firebase'

import LibraryScreen from './screens/LibraryScreen'
import AboutUsScreen from './screens/AboutUsScreen'
import AdmissionScreen from './screens/AdmissionScreen'
import AcademicScreen from './screens/AcademicScreen'
import FacilitiesScreen from './screens/FacilitiesScreen'
import NewsEventsScreen from './screens/NewsEventsScreen'
import ContactUsScreen from './screens/ContactUsScreen'
import SignupScreen from './screens/components/SignupScreen'
import { useSignupForm } from './screens/functions/useSignupForm'
import { useLoginModal } from './screens/functions/useLoginModal'

const App = () => {
  // Get initial route from URL hash, default to 'home'
  const getRouteFromHash = () => {
    const hash = window.location.hash.slice(1) // Remove the # symbol
    const validRoutes = ['home', 'about', 'admissions', 'academics', 'facilities', 'news', 'contact', 'signup']
    return validRoutes.includes(hash) ? hash : 'home'
  }

  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash)

  // --- SECURITY LISTENER (Added) ---
  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      // Clean up the previous database listener if the user logs out or switches
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (currentUser) {
        // If a user is logged in, watch their specific Document in the 'users' collection
        const userRef = doc(db, "users", currentUser.uid);
        
        unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          // Security Check: If the document disappears (deleted by admin), force logout.
          if (!docSnap.exists()) {
            signOut(auth).then(() => {
              alert("Your account has been removed. Please sign up again.");
              window.location.hash = 'home';
            }).catch((err) => console.error("Logout error", err));
          }
        });
      }
    });

    // Cleanup listeners when the App component unmounts
    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  // Set initial hash if none exists
  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = 'home'
    }
  }, [])

  // Update route when hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getRouteFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Navigation function that updates both state and URL
  const handleNavigate = (route: string) => {
    setCurrentRoute(route)
    window.location.hash = route
  }

  if (currentRoute === 'about') {
    return <AboutUsScreen onNavigate={handleNavigate} />
  }

  if (currentRoute === 'admissions') {
    return <AdmissionScreen onNavigate={handleNavigate} />
  }

  if (currentRoute === 'academics') {
    return <AcademicScreen onNavigate={handleNavigate} />
  }

  if (currentRoute === 'facilities') {
    return <FacilitiesScreen onNavigate={handleNavigate} />
  }

  if (currentRoute === 'news') {
    return <NewsEventsScreen onNavigate={handleNavigate} />
  }

  if (currentRoute === 'contact') {
    return <ContactUsScreen onNavigate={handleNavigate} />
  }

  if (currentRoute === 'signup') {
    return <SignupPageWrapper onNavigate={handleNavigate} />
  }

  return <LibraryScreen onNavigate={handleNavigate} />
}

// Wrapper component for SignupPage that handles all the form logic
const SignupPageWrapper = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const {
    values: signupValues,
    isSubmitting: signupSubmitting,
    isPasswordMismatch,
    updateValue,
    submitForm: submitSignup,
    resetForm,
  } = useSignupForm()
  
  const {
    openLogin,
  } = useLoginModal()

  const handleSignupSubmit = async () => {
    try {
      await submitSignup()
      // Show success message
      alert("Account created successfully!")
      // Navigate to home after successful signup
      onNavigate('home')
    } catch (error) {
      // Error is already handled in submitSignup with alert
      console.error('Signup error:', error)
    }
  }

  const handleSignupNavigate = (page: string) => {
    if (page === 'home') {
      resetForm()
    }
    onNavigate(page)
  }

  return (
    <SignupScreen
      values={signupValues}
      isSubmitting={signupSubmitting}
      isPasswordMismatch={isPasswordMismatch}
      onChange={updateValue}
      onSubmit={handleSignupSubmit}
      onBackToLogin={() => {
        resetForm()
        onNavigate('home')
        setTimeout(() => {
          openLogin()
        }, 100)
      }}
      onNavigate={handleSignupNavigate}
    />
  )
}

export default App
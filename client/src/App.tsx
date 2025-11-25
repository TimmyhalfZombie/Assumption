import { useState, useEffect } from 'react'
import LibraryScreen from './screens/LibraryScreen'
import AboutUsScreen from './screens/AboutUsScreen'
import AdmissionScreen from './screens/AdmissionScreen'
import AcademicScreen from './screens/AcademicScreen'
import FacilitiesScreen from './screens/FacilitiesScreen'
import NewsEventsScreen from './screens/NewsEventsScreen'

const App = () => {
  // Get initial route from URL hash, default to 'home'
  const getRouteFromHash = () => {
    const hash = window.location.hash.slice(1) // Remove the # symbol
    const validRoutes = ['home', 'about', 'admissions', 'academics', 'facilities', 'news']
    return validRoutes.includes(hash) ? hash : 'home'
  }

  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash)

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

  return <LibraryScreen onNavigate={handleNavigate} />
}

export default App
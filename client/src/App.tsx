import { useState } from 'react'
import LibraryScreen from './screens/LibraryScreen'
import AboutUsScreen from './screens/AboutUsScreen'
import AdmissionScreen from './screens/AdmissionScreen'
import AcademicScreen from './screens/AcademicScreen'
import FacilitiesScreen from './screens/FacilitiesScreen'

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('home')

  if (currentRoute === 'about') {
    return <AboutUsScreen onNavigate={setCurrentRoute} />
  }

  if (currentRoute === 'admissions') {
    return <AdmissionScreen onNavigate={setCurrentRoute} />
  }

  if (currentRoute === 'academics') {
    return <AcademicScreen onNavigate={setCurrentRoute} />
  }

  if (currentRoute === 'facilities') {
    return <FacilitiesScreen onNavigate={setCurrentRoute} />
  }

  return <LibraryScreen onNavigate={setCurrentRoute} />
}

export default App
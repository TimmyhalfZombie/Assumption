import { useState } from 'react'
import LibraryScreen from './screens/LibraryScreen'
import AboutUsScreen from './screens/AboutUsScreen'

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('home')

  if (currentRoute === 'about') {
    return <AboutUsScreen onNavigate={setCurrentRoute} />
  }

  return <LibraryScreen onNavigate={setCurrentRoute} />
}

export default App

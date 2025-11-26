import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

// This suffix makes the ID look like an email to Firebase
const EMAIL_SUFFIX = "@assumption-library.app"

export const useLoginModal = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false) // New State
  
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const openLogin = () => {
    setIsLoginOpen(true)
    setIsProfileOpen(false)
    setAccount('')
    setPassword('')
  }

  const closeLogin = () => {
    setIsLoginOpen(false)
    setAccount('')
    setPassword('')
    setIsSubmitting(false)
  }

  const openSignup = () => {
    setIsLoginOpen(false)
    setIsSignupOpen(true)
  }

  const closeSignup = () => {
    setIsSignupOpen(false)
    setIsSubmitting(false)
  }

  // New Functions
  const openProfile = () => {
    setIsProfileOpen(true)
    setIsLoginOpen(false)
  }

  const closeProfile = () => {
    setIsProfileOpen(false)
  }

  const handleAccountChange = (value: string) => setAccount(value)

  const handlePasswordChange = (value: string) => setPassword(value)

  const handleLoginSubmit = async () => {
    if (isSubmitting || !account || !password) {
      return
    }

    try {
      setIsSubmitting(true)
      const fakeEmail = `${account}${EMAIL_SUFFIX}`
      await signInWithEmailAndPassword(auth, fakeEmail, password)
      console.log("Login successful!")
      closeLogin()
    } catch (error: any) {
      console.error("Login failed:", error)
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        alert("Invalid School ID or Password.")
      } else {
        alert("Login failed. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isLoginOpen,
    isSignupOpen,
    isProfileOpen, // Export
    account,
    password,
    isSubmitting,
    openLogin,
    closeLogin,
    openSignup,
    closeSignup,
    openProfile, // Export
    closeProfile, // Export
    handleAccountChange,
    handlePasswordChange,
    handleLoginSubmit,
  }
}
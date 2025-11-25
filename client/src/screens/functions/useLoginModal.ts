import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

// This suffix makes the ID look like an email to Firebase
const EMAIL_SUFFIX = "@assumption-library.app"

export const useLoginModal = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const openLogin = (prefillAccount = '') => {
    setIsLoginOpen(true)
    if (prefillAccount) setAccount(prefillAccount)
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

  const handleAccountChange = (value: string) => setAccount(value)

  const handlePasswordChange = (value: string) => setPassword(value)

  const handleLoginSubmit = async () => {
    if (isSubmitting || !account || !password) {
      return
    }

    try {
      setIsSubmitting(true)
      
      // 1. Transform School ID to Email format
      const fakeEmail = `${account}${EMAIL_SUFFIX}`

      // 2. Attempt login with Firebase
      await signInWithEmailAndPassword(auth, fakeEmail, password)
      
      // Store user login state in localStorage (UI only for now)
      localStorage.setItem('userLoggedIn', 'true')
      localStorage.setItem('userLibraryCard', account)
      
      console.log("Login successful!")
      closeLogin()
      // You might want to redirect or show a success toast here
      
    } catch (error: any) {
      console.error("Login failed:", error)
      // Simple error handling
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
  }
}
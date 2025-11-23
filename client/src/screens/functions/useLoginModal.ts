import { useState } from 'react'

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
    if (isSubmitting) {
      return
    }

    try {
      setIsSubmitting(true)
      // Placeholder login
      await new Promise((resolve) => setTimeout(resolve, 600))
    } finally {
      closeLogin()
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


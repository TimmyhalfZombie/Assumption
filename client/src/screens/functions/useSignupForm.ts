import { useMemo, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

// Must match the suffix in useLoginModal.ts
const EMAIL_SUFFIX = "@assumption-library.app"

export type SignupFormValues = {
  lastName: string
  firstName: string
  middleName: string
  dob: string
  gender: string
  phone: string
  email: string
  libraryCardNumber: string
  homeLibrary: string
  category: string
  address: string
  city: string
  country: string
  password: string
  confirmPassword: string
  verificationCode: string
}

const initialValues: SignupFormValues = {
  lastName: '',
  firstName: '',
  middleName: '',
  dob: '',
  gender: '',
  phone: '',
  email: '',
  libraryCardNumber: '',
  homeLibrary: '',
  category: '',
  address: '',
  city: '',
  country: '',
  password: '',
  confirmPassword: '',
  verificationCode: '',
}

export const useSignupForm = () => {
  const [values, setValues] = useState<SignupFormValues>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isPasswordMismatch = useMemo(
    () => values.password.length > 0 && values.confirmPassword.length > 0 && values.password !== values.confirmPassword,
    [values.password, values.confirmPassword],
  )

  const updateValue = (field: keyof SignupFormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetForm = () => {
    setValues(initialValues)
    setIsSubmitting(false)
  }

  const submitForm = async (): Promise<void> => {
    if (isSubmitting || isPasswordMismatch) {
      return Promise.reject(new Error('Form is already submitting or passwords do not match'))
    }

    try {
      setIsSubmitting(true)

      // 1. Create the Auth User (for Login)
      const fakeEmail = `${values.libraryCardNumber}${EMAIL_SUFFIX}`
      const userCredential = await createUserWithEmailAndPassword(auth, fakeEmail, values.password)
      const user = userCredential.user

      // 2. Prepare user data (remove passwords before saving to DB)
      const userData = {
        ...values,
        // We use the libraryCardNumber as the unique ID in Auth, but store everything else here
        createdAt: new Date().toISOString(),
        role: 'user', // Default role
      }
      
      // Remove sensitive fields from the DB object
      // @ts-ignore
      delete userData.password
      // @ts-ignore
      delete userData.confirmPassword

      // 3. Save ALL details to Firestore under the 'users' collection
      // We use the UID from Auth to link them perfectly
      await setDoc(doc(db, "users", user.uid), userData)

      // Reset form after successful submission
      resetForm()
      
      // Store user login state in localStorage (UI only for now)
      localStorage.setItem('userLoggedIn', 'true')
      localStorage.setItem('userLibraryCard', values.libraryCardNumber)
      
    } catch (error: any) {
      console.error("Signup Error:", error)
      setIsSubmitting(false) // Reset submitting state on error
      if (error.code === 'auth/email-already-in-use') {
        alert("This Library Card Number is already registered.")
      } else {
        alert("Error creating account: " + error.message)
      }
      throw error // Re-throw to allow caller to handle
    }
  }

  return {
    values,
    isSubmitting,
    isPasswordMismatch,
    updateValue,
    resetForm,
    submitForm,
  }
}
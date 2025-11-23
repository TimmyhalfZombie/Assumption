import { useMemo, useState } from 'react'

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

  const submitForm = async () => {
    if (isSubmitting || isPasswordMismatch) {
      return
    }

    try {
      setIsSubmitting(true)
      // Placeholder for real API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } finally {
      resetForm()
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


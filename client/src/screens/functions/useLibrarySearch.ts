import { useState } from 'react'
import type { FormEvent } from 'react'

const catalogOptions = [
  { value: 'libraryCatalog', label: 'Library Catalog' },
  { value: 'ebooks', label: 'eBooks' },
  { value: 'journals', label: 'Journals & Periodicals' },
]

const libraryOptions = [
  { value: 'all', label: 'All Libraries' },
  { value: 'highSchool', label: 'High School Library' },
  { value: 'elementary', label: 'Elementary Library' },
  { value: 'preschool', label: 'Preschool Library' },
]

export const useLibrarySearch = () => {
  const [selectedCatalog, setSelectedCatalog] = useState<string>(catalogOptions[0].value)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedLibrary, setSelectedLibrary] = useState<string>(libraryOptions[0].value)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Placeholder for integration with backend search.
    console.info('Search submitted', {
      catalog: selectedCatalog,
      query: searchTerm,
      library: selectedLibrary,
    })
  }

  return {
    catalogOptions,
    libraryOptions,
    selectedCatalog,
    setSelectedCatalog,
    searchTerm,
    setSearchTerm,
    selectedLibrary,
    setSelectedLibrary,
    handleSubmit,
  }
}


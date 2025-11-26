import { useState } from 'react'
import type { FormEvent } from 'react'

// Define Book type for results
export type Book = {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  thumbnail: string;
  callNumber: string;
  availability: string;
  rating: number;
}

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
  // --- Form State (Your Original State) ---
  const [selectedCatalog, setSelectedCatalog] = useState<string>(catalogOptions[0].value)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedLibrary, setSelectedLibrary] = useState<string>(libraryOptions[0].value)

  // --- Search Logic State (New) ---
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  
  // Function to restore search state (for going back from book detail)
  const restoreSearch = (query: string, previousBooks: Book[]) => {
    if (query && previousBooks.length > 0) {
      setSearchTerm(query)
      setBooks(previousBooks)
      setHasSearched(true)
    }
  }

  // --- API Search Function ---
  const searchBooks = async (query: string) => {
    if (!query.trim()) return

    setLoading(true)
    setHasSearched(true) // This triggers the screen switch

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`
      )
      const data = await response.json()

      const formattedBooks: Book[] = data.docs.map((item: any) => {
        const randomCallNum = `${Math.floor(Math.random() * 900)}.${Math.floor(Math.random() * 99)} ${item.first_publish_year || '2011'}`
        return {
          id: item.key,
          title: item.title,
          authors: item.author_name || ['Unknown Author'],
          publisher: item.publisher ? item.publisher[0] : 'Penguin Group',
          publishedDate: item.first_publish_year?.toString() || '2011',
          thumbnail: item.cover_i
            ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
            : '/assets/images/assumption-logo.png',
          callNumber: randomCallNum,
          availability: `High School Library [Call number: ${randomCallNum}] (1)`,
          rating: 3
        }
      })

      setBooks(formattedBooks)
    } catch (error) {
      console.error("Error searching books:", error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    searchBooks(searchTerm)
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
    // Export new state/functions for the screen to use
    books,
    loading,
    hasSearched,
    searchBooks,
    restoreSearch
  }
}
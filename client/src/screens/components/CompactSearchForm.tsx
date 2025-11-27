import { useState } from 'react'
import type { FormEvent } from 'react'

type CompactSearchFormProps = {
  initialQuery: string
  onSearch: (query: string) => void
}

const CSS = `
.compact-search-container {
  display: flex;
  width: 100%;
  max-width: 950px;
  gap: 8px;
}

.compact-dropdown {
  padding: 0 2.5rem 0 1.2rem;
  height: 48px;
  border: 2px solid #1f1d28;
  border-radius: 3px;
  background: white;
  color: #1f1d28;
  font-family: var(--font-afacad);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%231f1d28' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 0.75rem) center;
  background-size: 12px 8px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.compact-dropdown:hover {
  border-color: #f3d654;
  box-shadow: 0 0 0 2px rgba(243, 214, 84, 0.2);
}

.compact-dropdown:focus {
  border-color: #f3d654;
  box-shadow: 0 0 0 3px rgba(243, 214, 84, 0.3);
  outline: none;
}

.compact-input {
  flex-grow: 1;
  height: 48px;
  padding: 0 1.2rem;
  border: 2px solid #1f1d28;
  border-radius: 3px;
  font-family: var(--font-afacad);
  font-size: 1rem;
  color: #333;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.compact-input:focus {
  border-color: #f3d654;
  box-shadow: 0 0 0 3px rgba(243, 214, 84, 0.3);
  outline: none;
}

.compact-btn {
  height: 48px;
  padding: 0 2rem;
  background: #f3d654;
  color: #1a1829;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 3px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-afacad);
  letter-spacing: 0.05em;
  transition: background 0.2s;
}

.compact-btn:hover {
  background: #1a1829;
  color: #ffffffff;
}

/* Tablet styles (768px - 1024px) */
@media (min-width: 769px) and (max-width: 1024px) {
  .compact-search-container {
    gap: 0.75rem;
  }

  .compact-dropdown {
    flex: 0 0 180px;
  }

  .compact-input {
    flex: 1;
    min-width: 200px;
  }

  .compact-btn {
    flex: 0 0 auto;
    padding: 0 1.5rem;
  }
}

@media (max-width: 768px) {
  .compact-search-container {
    flex-direction: column;
    gap: 0.5rem;
  }

  .compact-dropdown,
  .compact-input,
  .compact-btn {
    width: 100%;
    height: 44px;
  }

  .compact-dropdown {
    padding: 0 2.5rem 0 1rem;
  }
}
`

const CompactSearchForm = ({ initialQuery, onSearch }: CompactSearchFormProps) => {
  const [query, setQuery] = useState(initialQuery)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form className="compact-search-container" onSubmit={handleSubmit}>
      <style>{CSS}</style>
      
      <select className="compact-dropdown">
        <option>Library Catalog</option>
        <option>ISBN</option>
        <option>Title</option>
        <option>Author</option>
      </select>

      <input
        type="text"
        className="compact-input"
        placeholder="Type title, author or keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select className="compact-dropdown" style={{ minWidth: '140px' }}>
        <option>All Libraries</option>
        <option>Grade School</option>
        <option>High School</option>
      </select>

      <button type="submit" className="compact-btn">
        GO
      </button>
    </form>
  )
}

export default CompactSearchForm
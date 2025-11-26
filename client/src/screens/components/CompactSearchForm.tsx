import { useState, FormEvent } from 'react'

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
  padding: 0 1.2rem;
  height: 48px;
  border: none;
  border-radius: 3px;
  background: white;
  color: #555;
  font-family: var(--font-afacad);
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
}

.compact-input {
  flex-grow: 1;
  height: 48px;
  padding: 0 1.2rem;
  border: none;
  border-radius: 3px;
  font-family: var(--font-afacad);
  font-size: 1rem;
  color: #333;
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

@media (max-width: 768px) {
  .compact-search-container {
    flex-direction: column;
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
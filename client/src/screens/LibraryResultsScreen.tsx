import { useEffect } from 'react'
import CompactSearchForm from './components/CompactSearchForm'
import CrestLogo from './components/CrestLogo'
import type { Book } from './functions/useLibrarySearch'

type LibraryResultsScreenProps = {
  books: Book[]
  loading: boolean
  searchTerm: string
  onSearch: (query: string) => void
  onBookSelect?: (book: Book, searchQuery: string, searchBooks: Book[]) => void
}

// --- INLINE ICONS ---
const Star = ({ size = 24, fill = "none", stroke = "currentColor" }: { size?: number, fill?: string, stroke?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

const ShoppingCart = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1"></circle>
    <circle cx="19" cy="21" r="1"></circle>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
  </svg>
)

const Bookmark = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
  </svg>
)

// --- RESULTS INTERFACE CSS ---
const RESULTS_CSS = `
.results-hero-compact {
  background-color: #1f1d28;
  padding: 2rem 1rem 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 4px solid #f3d654;
}

.compact-branding {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.compact-titles h1 {
  color: white;
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  text-transform: uppercase;
}

.compact-titles p {
  color: rgba(255,255,255,0.7);
  margin: 0;
  font-size: 0.9rem;
}

.library-content-results {
  max-width: 100%;
  width: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2rem;
  align-items: start;
  background: #ffffff;
  padding: 1rem;
  border-radius: 0;
  min-height: calc(100vh - 200px);
}

@media (max-width: 768px) {
  .library-content-results {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem 0.75rem;
    min-height: auto;
  }
  
  .sidebar {
    margin-top: 0;
    width: 100%;
  }
}

.sidebar {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 4px;
  height: fit-content;
}

.sidebar-header {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #222;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.filter-item {
  display: block;
  color: #3a3a9e;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  margin-bottom: 0.35rem;
}

.filter-item.more {
  color: #444;
  text-decoration: none;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.results-area {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.results-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.results-count {
  font-weight: 700;
  font-size: 0.95rem;
  color: #222;
}

.results-toolbar {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.toolbar-btn {
  background: #e0e0e0;
  border: none;
  padding: 0.3rem 0.8rem;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 2px;
  color: #333;
}

.toolbar-select {
  padding: 0.3rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-size: 0.8rem;
  background: white;
  cursor: pointer;
}

.book-card {
  background: #e6e6e6;
  padding: 1.5rem;
  border-radius: 3px;
  display: flex;
  gap: 1.5rem;
  position: relative;
}

.book-check {
  padding-top: 0.3rem;
}

.book-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.book-title-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.2rem;
}

.book-index {
  font-weight: 800;
  color: #000;
}

.book-title {
  font-weight: 700;
  font-size: 1.05rem;
  color: #3a3a9e;
  text-decoration: none;
  line-height: 1.3;
}

.highlight-text {
  background-color: #ffeb3b;
  padding: 0 2px;
}

.book-meta {
  font-size: 0.9rem;
  color: #333;
}

.book-availability {
  font-size: 0.9rem;
  margin-top: 0.3rem;
  font-weight: 600;
}

.avail-label {
  color: #000;
}

.avail-val {
  color: #c62828;
}

.book-rating {
  display: flex;
  gap: 2px;
  margin: 0.5rem 0;
}

.book-actions {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.8rem;
}

.action-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #222;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.book-cover-img {
  width: 90px;
  height: 130px;
  object-fit: cover;
  box-shadow: 3px 3px 8px rgba(0,0,0,0.2);
  border: 1px solid #fff;
}

@media (max-width: 900px) {
  .library-content-results {
    grid-template-columns: 1fr;
    padding: 0.75rem;
  }
  
  .book-card {
    padding: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .book-cover-img {
    width: 80px;
    height: 120px;
  }
  
  .results-toolbar {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .toolbar-btn {
    padding: 0.25rem 0.6rem;
  }
  
  .toolbar-select {
    width: 100%;
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
`

const LibraryResultsScreen = ({ books, loading, searchTerm, onSearch, onBookSelect }: LibraryResultsScreenProps) => {
  useEffect(() => {
    if (!document.getElementById('library-results-css')) {
      const style = document.createElement('style')
      style.id = 'library-results-css'
      style.textContent = RESULTS_CSS
      document.head.appendChild(style)
    }
  }, [])

  // Helper to highlight text in results (disabled - no highlighting)
  const Highlight = ({ text }: { text: string }) => {
    return <>{text}</>
  }

  return (
    <>
      <div className="results-hero-compact">
        <div className="compact-branding">
          <CrestLogo size={70} />
          <div className="compact-titles">
            <h1>Assumption Iloilo</h1>
            <p>18 General Luna St., Iloilo City 5000</p>
          </div>
        </div>
        <CompactSearchForm 
          initialQuery={searchTerm}
          onSearch={onSearch}
        />
      </div>

      <div className="library-content-results">
        <aside className="sidebar">
          <div className="sidebar-header">Refine your search</div>
          <div className="sidebar-body">
            <div className="filter-group">
              <div className="filter-title">Availability</div>
              <span className="filter-item">Limit to records with available items</span>
            </div>
            <div className="filter-group">
              <div className="filter-title">Authors</div>
              <span className="filter-item">Rowling, J.K.</span>
              <span className="filter-item">Colbert, David</span>
              <span className="filter-item">Thorne, Jack</span>
              <span className="filter-item more">Show more</span>
            </div>
            <div className="filter-group">
              <div className="filter-title">Holding libraries</div>
              <span className="filter-item">Grade School Library</span>
              <span className="filter-item">High School Library</span>
            </div>
            <div className="filter-group">
              <div className="filter-title">Location</div>
              <span className="filter-item">Circulation</span>
              <span className="filter-item">Fiction</span>
              <span className="filter-item">Reference</span>
            </div>
          </div>
        </aside>

        <div className="results-area">
          <div className="results-header">
            <div className="results-count">
              Your search returned {books.length} results
            </div>
            <div className="results-toolbar">
              <span style={{fontWeight:'700', fontSize:'0.9rem', color:'#000'}}>⚡ Unhighlight</span>
              <div style={{ flexGrow: 1 }}></div>
              <button className="toolbar-btn">Select all</button>
              <button className="toolbar-btn">Clear all</button>
              <select className="toolbar-select">
                <option>Relevance</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading catalog...</div>
          ) : (
            books.map((book, index) => (
              <div key={book.id} className="book-card">
                <div className="book-check">
                  <input type="checkbox" />
                </div>
                <div className="book-info">
                  <div className="book-title-row">
                    <span className="book-index">{index + 1}.</span>
                    <a 
                      href="#"
                      className="book-title"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (onBookSelect) {
                          onBookSelect(book, searchTerm || '', books)
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <Highlight text={book.title} />
                    </a>
                  </div>
                  <div className="book-meta">
                    <strong>by</strong> {book.authors.join(', ')}
                  </div>
                  <div className="book-meta">
                    <strong>Publisher:</strong> {book.publisher}; {book.publishedDate}
                  </div>
                  <div className="book-availability">
                    <span className="avail-label">Availability: </span>
                    <span className="avail-val">Items available for loan: {book.availability}</span>
                  </div>
                  <div className="book-rating">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={14} fill={i <= book.rating ? "#aaa" : "#ddd"} stroke="none" />
                    ))}
                  </div>
                  <div className="book-actions">
                    <button className="action-link">
                      <Bookmark size={16} /> Place hold
                    </button>
                    <button className="action-link">
                      <ShoppingCart size={16} /> Add to cart
                    </button>
                  </div>
                </div>
                <img src={book.thumbnail} alt={book.title} className="book-cover-img" />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default LibraryResultsScreen


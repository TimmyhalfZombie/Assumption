import { useState, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import CompactSearchForm from './components/CompactSearchForm'
import CrestLogo from './components/CrestLogo'
import LoginModal from './components/LoginModal'
import { useLoginModal } from './functions/useLoginModal'
import type { Book } from './functions/useLibrarySearch'

// --- INLINE ICONS (Zero External Dependencies to fix White Screen) ---
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

const Printer = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect width="12" height="8" x="6" y="14"></rect>
  </svg>
)

const HighlighterIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l-6 6v3h3l6-6"></path>
    <path d="M22 12l-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L12 4"></path>
  </svg>
)

const Download = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
)

const SearchIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
)

const ChevronDown = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

const BookIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
)

// Safe Regex Escaping to prevent crashes
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

// Highlight search terms in text
const Highlight = ({ text, query }: { text: string, query?: string }) => {
  if (!query || !text) return <>{text}</>
  
  try {
    const escapedQuery = escapeRegExp(query);
    const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'))
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="highlight-text">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    )
  } catch (e) {
    // Fallback if regex fails for any reason
    return <>{text}</>
  }
}

const CSS = `
.book-detail-screen {
  min-height: 100vh;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
}

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
  cursor: pointer;
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

.detail-container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  flex: 1;
}

.view-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #ddd;
}

.view-tab {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  color: #666;
  transition: all 0.2s;
}

.view-tab:hover {
  color: #333;
}

.view-tab.active {
  color: #1a1829;
  border-bottom-color: #f3d654;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.book-cover-section {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.book-cover-large {
  width: 150px;
  height: 220px;
  object-fit: cover;
  box-shadow: 4px 4px 12px rgba(0,0,0,0.3);
  border: 2px solid #ddd;
}

.book-info-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.book-title-large {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1829;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

.highlight-text {
  background-color: #ffeb3b;
  padding: 0 2px;
}

.book-author {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.book-author-name {
  color: #7b1fa2;
  font-weight: 600;
}

.book-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #555;
}

.detail-row {
  display: flex;
  gap: 0.5rem;
}

.detail-label {
  font-weight: 600;
  color: #333;
  min-width: 100px;
}

.detail-value {
  color: #555;
}

.book-subjects {
  margin-top: 0.5rem;
}

.book-rating-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.star-icon {
  width: 18px;
  height: 18px;
  color: #ddd;
}

.star-icon.filled {
  color: #ffc107;
}

.rating-text {
  font-size: 0.9rem;
  color: #666;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  transition: all 0.2s;
  text-align: left;
}

.action-btn:hover {
  background: #f5f5f5;
  border-color: #bbb;
}

.action-btn-icon {
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dropdown-arrow {
  margin-left: auto;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.holdings-section {
  margin-top: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.holdings-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #ddd;
}

.holdings-tab {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
}

.holdings-tab.active {
  color: #1a1829;
  border-bottom-color: #f3d654;
}

.holdings-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.holdings-table th {
  background: #f5f5f5;
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #ddd;
}

.holdings-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  color: #555;
}

.holdings-table tr:hover {
  background: #f9f9f9;
}

.status-available {
  color: #c62828;
  font-weight: 600;
}

.browse-link {
  color: #3a3a9e;
  text-decoration: none;
  font-weight: 500;
}

.browse-link:hover {
  text-decoration: underline;
}

.total-holds {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.footer {
  margin-top: auto;
  padding: 1.5rem;
  text-align: center;
  background: #181628;
  color: #f6de4f;
  border-top: 4px solid #f6de4f;
  font-size: 0.85rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .book-cover-section {
    justify-content: center;
  }
  
  .action-buttons {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .action-btn {
    flex: 1;
    min-width: 120px;
  }
  
  .holdings-table {
    font-size: 0.8rem;
  }
  
  .holdings-table th,
  .holdings-table td {
    padding: 0.5rem;
  }
}
`

type BookDetailScreenProps = {
  book: Book
  onNavigate: (route: string) => void
  onBack: () => void
  onSearch: (query: string) => void
  searchQuery?: string
}

const BookDetailScreen = ({ book, onNavigate, onBack, onSearch, searchQuery = '' }: BookDetailScreenProps) => {
  console.log('BookDetailScreen rendering with book:', book)
  
  const [activeView, setActiveView] = useState<'normal' | 'marc' | 'isbd'>('normal')
  const [activeHoldingsTab, setActiveHoldingsTab] = useState<'holdings' | 'article' | 'notes'>('holdings')

  useEffect(() => {
    if (!document.getElementById('book-detail-css')) {
      const style = document.createElement('style')
      style.id = 'book-detail-css'
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  const {
    isLoginOpen,
    account,
    password,
    isSubmitting,
    openLogin,
    closeLogin,
    handleAccountChange,
    handlePasswordChange,
    handleLoginSubmit
  } = useLoginModal()

  // Early return if no book - with visible content
  if (!book) {
    console.error('BookDetailScreen: No book provided!')
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#000', background: '#f2f2f2', minHeight: '100vh', width: '100%' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No Book Data</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>No book data available.</p>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', marginTop: '1rem', cursor: 'pointer', fontSize: '1rem', background: '#1a1829', color: '#fff', border: 'none', borderRadius: '4px' }}>Go back</button>
      </div>
    )
  }

  // Safe access to book properties with defaults
  const bookTitle = book.title || 'Unknown Title'
  const bookAuthors = book.authors && Array.isArray(book.authors) ? book.authors : ['Unknown Author']
  const bookPublisher = book.publisher || 'Unknown Publisher'
  const bookPublishedDate = book.publishedDate || '2011'
  const bookThumbnail = book.thumbnail || '/assets/images/assumption-logo.png'
  const bookCallNumber = book.callNumber || '823.914 2011'
  
  // Extract ISBN from call number or generate mock
  const isbn = bookCallNumber.split(' ')[0]?.replace(/\./g, '') || '141314818'
  
  // Mock data for additional details
  const mockData = {
    isbn: isbn,
    ddc: bookCallNumber,
    subjects: "Fantasy fiction, English | Potter, Harry (Fictitious character) | Mythology | Wizards in literature",
    dimensions: "220 pages; 20 x 13 cm",
    location: "Grade School Library",
    collection: "Circulation",
    barcode: `GS${Math.floor(Math.random() * 9000) + 1000}`,
    status: "Available"
  }

  const handlePlacehold = () => {
    alert('Placehold functionality - This would reserve the book for you.')
  }

  const handlePrint = () => {
    window.print()
  }

  const handleAddToCart = () => {
    alert('Add to cart functionality - This would add the book to your cart.')
  }

  const handleUnhighlight = () => {
    alert('Unhighlight functionality - This would remove highlights from the search terms.')
  }

  console.log('BookDetailScreen: About to render main JSX')
  
  return (
    <div className="book-detail-screen" style={{ minHeight: '100vh', background: '#f2f2f2', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <NavigationBar onLoginClick={openLogin} onNavigate={onNavigate} currentPage="home" />

      {/* Header with Search */}
      <div className="results-hero-compact">
        <div className="compact-branding" onClick={onBack}>
          <CrestLogo size={70} />
          <div className="compact-titles">
            <h1>Assumption Iloilo</h1>
            <p>18 General Luna St., Iloilo City 5000</p>
          </div>
        </div>
        <CompactSearchForm initialQuery={searchQuery} onSearch={onSearch} />
      </div>

      <main className="detail-container">
        {/* View Tabs */}
        <div className="view-tabs">
          <button 
            className={`view-tab ${activeView === 'normal' ? 'active' : ''}`}
            onClick={() => setActiveView('normal')}
          >
            Normal View
          </button>
          <button 
            className={`view-tab ${activeView === 'marc' ? 'active' : ''}`}
            onClick={() => setActiveView('marc')}
          >
            MARC view
          </button>
          <button 
            className={`view-tab ${activeView === 'isbd' ? 'active' : ''}`}
            onClick={() => setActiveView('isbd')}
          >
            ISBD view
          </button>
        </div>

        {/* Main Content */}
        <div className="detail-content">
          {/* Book Info Section */}
          <div className="book-info-section">
            <h1 className="book-title-large">
              <Highlight text={bookTitle} query={searchQuery} />
            </h1>
            
            <div className="book-author">
              By: <span className="book-author-name">
                <Highlight text={bookAuthors.join(', ')} query={searchQuery} />
              </span>
            </div>

            <div className="book-details">
              <div className="detail-row">
                <span className="detail-label">Publisher:</span>
                <span className="detail-value">{bookPublisher}; {bookPublishedDate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{mockData.dimensions}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">ISBN:</span>
                <span className="detail-value">{mockData.isbn}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Subject(s):</span>
                <span className="detail-value">{mockData.subjects}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">DDC Classification:</span>
                <span className="detail-value">{mockData.ddc}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Tags from this library:</span>
                <span className="detail-value">No tags from this library for this title.</span>
              </div>
            </div>

            <div className="book-rating-section">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="star-icon">
                    <Star 
                      size={18} 
                      fill={star <= Math.floor(book.rating || 0) ? "#ffc107" : "none"}
                      stroke={star <= Math.floor(book.rating || 0) ? "#ffc107" : "#ddd"}
                    />
                  </span>
                ))}
              </div>
              <span className="rating-text">average rating: {book.rating?.toFixed(1) || '0.0'} (0 votes)</span>
            </div>
          </div>

          {/* Right Sidebar - Cover and Actions */}
          <div>
            <div className="book-cover-section">
              <img 
                src={bookThumbnail} 
                alt={bookTitle}
                className="book-cover-large"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/assumption-logo.png'
                }}
              />
            </div>

            <div className="action-buttons">
              <button className="action-btn" onClick={handlePlacehold}>
                <span className="action-btn-icon"><Bookmark size={18} /></span>
                Placehold
              </button>
              <button className="action-btn" onClick={handlePrint}>
                <span className="action-btn-icon"><Printer size={18} /></span>
                Print
              </button>
              <button className="action-btn" onClick={handleAddToCart}>
                <span className="action-btn-icon"><ShoppingCart size={18} /></span>
                Add to cart
              </button>
              <button className="action-btn" onClick={handleUnhighlight}>
                <span className="action-btn-icon"><HighlighterIcon size={18} /></span>
                Unhighlight
              </button>
              <button className="action-btn" onClick={() => alert('Save record functionality')}>
                <span className="action-btn-icon"><Download size={18} /></span>
                Save record
                <span className="dropdown-arrow"><ChevronDown size={16} /></span>
              </button>
              <button className="action-btn" onClick={() => alert('More searches functionality')}>
                <span className="action-btn-icon"><SearchIcon size={18} /></span>
                More searches
                <span className="dropdown-arrow"><ChevronDown size={16} /></span>
              </button>
            </div>
          </div>
        </div>

        {/* Holdings Section */}
        <div className="holdings-section">
          <div className="holdings-tabs">
            <button 
              className={`holdings-tab ${activeHoldingsTab === 'holdings' ? 'active' : ''}`}
              onClick={() => setActiveHoldingsTab('holdings')}
            >
              Holdings (1)
            </button>
            <button 
              className={`holdings-tab ${activeHoldingsTab === 'article' ? 'active' : ''}`}
              onClick={() => setActiveHoldingsTab('article')}
            >
              Article
            </button>
            <button 
              className={`holdings-tab ${activeHoldingsTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveHoldingsTab('notes')}
            >
              Title notes
            </button>
          </div>

          {activeHoldingsTab === 'holdings' && (
            <>
              <table className="holdings-table">
                <thead>
                  <tr>
                    <th>Item type</th>
                    <th>Current location</th>
                    <th>Home library</th>
                    <th>Collection</th>
                    <th>Call number</th>
                    <th>Status</th>
                    <th>Date due</th>
                    <th>Barcode</th>
                    <th>Item holds</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span style={{ verticalAlign: 'middle', marginRight: '0.5rem', display: 'inline-flex', alignItems: 'center' }}>
                        <BookIcon size={18} />
                      </span>
                      Book
                    </td>
                    <td>{mockData.location}</td>
                    <td>{mockData.location}</td>
                    <td>{mockData.collection}</td>
                    <td>
                      <a href="#" className="browse-link">{mockData.ddc}</a> (Browse shelf)
                    </td>
                    <td className="status-available">{mockData.status}</td>
                    <td></td>
                    <td>{mockData.barcode}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className="total-holds">Total holds: 0</div>
            </>
          )}

          {activeHoldingsTab === 'article' && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              No articles available for this title.
            </div>
          )}

          {activeHoldingsTab === 'notes' && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              No title notes available for this title.
            </div>
          )}
        </div>
      </main>

      <LoginModal
        isOpen={isLoginOpen}
        account={account}
        password={password}
        isSubmitting={isSubmitting}
        onAccountChange={handleAccountChange}
        onPasswordChange={handlePasswordChange}
        onClose={closeLogin}
        onSubmit={handleLoginSubmit}
        onCreateAccount={() => { closeLogin(); onNavigate('signup'); }}
      />

      <footer className="footer">
        © {new Date().getFullYear()} Assumption Iloilo
      </footer>
    </div>
  )
}

export default BookDetailScreen
import { useState, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import CompactSearchForm from './components/CompactSearchForm'
import CrestLogo from './components/CrestLogo'
import LoginModal from './components/LoginModal'
import { useLoginModal } from './functions/useLoginModal'
import { Book } from './functions/useLibrarySearch'
import { 
  Star, ShoppingCart, Bookmark, Printer, XCircle, 
  Save, Search, BookOpen, ArrowLeft 
} from 'lucide-react'

// --- INLINE ICONS (If lucide fails) ---
// ... (reusing the pattern from other files if needed, but using lucide imports for cleanliness here since we established it works with inline replacements if environment fails. I will stick to the inline pattern to be safe as per previous errors).

const IconPlaceholder = ({ className }: { className?: string }) => <span className={className}>🔹</span>

// --- CSS STYLES ---
const CSS = `
.book-detail-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  font-family: var(--font-afacad);
}

/* --- HERO SECTION (Same as Results) --- */
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

/* --- MAIN CONTENT --- */
.detail-container {
  max-width: 1300px;
  width: 95%;
  margin: 2rem auto 4rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  padding: 2rem;
  border-top: 5px solid #e0e0e0;
}

/* --- TOP TABS --- */
.view-tabs {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #ccc;
  margin-bottom: 2rem;
}

.view-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #eee;
  border: 1px solid #ccc;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: #555;
  cursor: pointer;
}

.view-tab.active {
  background: white;
  color: #1f1d28;
  position: relative;
  top: 1px;
  border-bottom: 1px solid white;
}

/* --- BOOK INFO GRID --- */
.book-info-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin-bottom: 3rem;
}

.book-main-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1f1d28;
  line-height: 1.3;
}

.highlight {
  background-color: #ffeb3b;
  padding: 0 4px;
}

.info-row {
  display: flex;
  gap: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.info-label {
  font-weight: 800;
  color: #1f1d28;
  min-width: 140px;
}

.info-value {
  color: #333;
}

.info-link {
  color: #5656a5;
  text-decoration: none;
  font-weight: 600;
}

.info-link:hover {
  text-decoration: underline;
}

.detail-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

/* --- RIGHT SIDEBAR ACTIONS --- */
.actions-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.book-cover-large {
  width: 120px;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
  border: 1px solid #fff;
  align-self: flex-end;
  margin-bottom: 1rem;
  transform: rotate(3deg);
}

.action-box {
  background: #e0e0e0;
  padding: 1.5rem;
  border-radius: 4px;
}

.action-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #4a4ae0;
  cursor: pointer;
  transition: color 0.2s;
}

.action-item:hover {
  color: #1f1d28;
}

.action-icon {
  width: 16px;
  color: #555;
}

/* --- HOLDINGS SECTION --- */
.holdings-section {
  margin-top: 2rem;
}

.holdings-tabs {
  display: flex;
  gap: 0.5rem;
}

.holding-tab {
  padding: 0.8rem 2rem;
  background: #e0e0e0;
  border: 1px solid #ccc;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  color: #555;
}

.holding-tab.active {
  background: white;
  color: #1f1d28;
  border-top: 3px solid #1f1d28;
}

.holdings-table-container {
  border: 1px solid #ccc;
  background: #e6e6e6; /* Match the gray background from image */
  padding: 1rem;
  overflow-x: auto;
}

.holdings-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.holdings-table th {
  background: #d4b73e; /* Gold-ish header from image */
  color: #1f1d28;
  padding: 0.8rem;
  text-align: center;
  font-weight: 700;
  border: 1px solid #999;
}

.holdings-table td {
  padding: 1rem;
  text-align: center;
  border: 1px solid #999;
  vertical-align: middle;
}

.item-type-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
}

.status-available {
  color: #d32f2f; /* Red as requested/shown in image */
  font-weight: 600;
}

@media (max-width: 900px) {
  .book-info-grid {
    grid-template-columns: 1fr;
  }
  .book-cover-large {
    align-self: center;
  }
}
`

type BookDetailScreenProps = {
  book: Book
  onNavigate: (page: string) => void
  onBack: () => void
  onSearch: (query: string) => void
}

const BookDetailScreen = ({ book, onNavigate, onBack, onSearch }: BookDetailScreenProps) => {
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

  // Mock data to fill in the blanks since API might not provide everything
  const mockData = {
    isbn: "141314818",
    ddc: "823.914 2011",
    subjects: "Fantasy fiction, English | Potter, Harry (Fictitious character) | Mythology | Wizards in literature",
    dimensions: "220 pages; 20 x 13 cm"
  }

  return (
    <div className="book-detail-screen">
      <NavigationBar onLoginClick={openLogin} onNavigate={onNavigate} currentPage="home" />

      {/* Header with Search */}
      <div className="results-hero-compact">
        <div className="compact-branding" style={{cursor:'pointer'}} onClick={onBack}>
          <CrestLogo size={70} />
          <div className="compact-titles">
            <h1>Assumption Iloilo</h1>
            <p>18 General Luna St., Iloilo City 5000</p>
          </div>
        </div>
        <CompactSearchForm initialQuery="" onSearch={onSearch} />
      </div>

      <main className="detail-container">
        {/* View Tabs */}
        <div className="view-tabs">
          <div className="view-tab active">
            <span style={{ fontSize: '1.2rem' }}>📄</span> Normal View
          </div>
          <div className="view-tab">
            <span style={{ fontSize: '1.2rem' }}>📝</span> MARC view
          </div>
          <div className="view-tab">
            <span style={{ fontSize: '1.2rem' }}>📋</span> ISBD view
          </div>
        </div>

        <div className="book-info-grid">
          {/* Left: Book Details */}
          <div className="book-main-info">
            <h1 className="detail-title">
              The magical worlds of <span className="highlight">Harry Potter</span> : a treasury of myths, legends and fascinating facts / David Colbert
            </h1>

            <div className="info-row">
              <span className="info-label">By:</span>
              <a href="#" className="info-link">{book.authors.join(', ')}</a>
            </div>

            <div className="info-row">
              <span className="info-label">Publisher:</span>
              <span className="info-value">{book.publisher}; {book.publishedDate}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Description:</span>
              <span className="info-value">{mockData.dimensions}</span>
            </div>

            <div className="info-row">
              <span className="info-label">ISBN:</span>
              <span className="info-value">{mockData.isbn}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Subject(s):</span>
              <span className="info-value">{mockData.subjects}</span>
            </div>

            <div className="info-row">
              <span className="info-label">DDC Classification:</span>
              <span className="info-value">{mockData.ddc}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Tags from this library:</span>
              <span className="info-value">No tags from this library for this title.</span>
            </div>

            <div className="detail-rating">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={18} fill={i <= 3 ? "#aaa" : "#ddd"} stroke="none" />
              ))}
              <span>average rating: 0.0 (0 votes)</span>
            </div>
          </div>

          {/* Right: Cover & Actions */}
          <div className="actions-sidebar">
            <img src={book.thumbnail} alt="Cover" className="book-cover-large" />
            
            <div className="action-box">
              <div className="action-list">
                <div className="action-item"><Bookmark size={16} /> Placehold</div>
                <div className="action-item"><Printer size={16} /> Print</div>
                <div className="action-item"><ShoppingCart size={16} /> Add to cart</div>
                <div className="action-item"><XCircle size={16} /> Unhighlight</div>
                <div className="action-item"><Save size={16} /> Save record ▼</div>
                <div className="action-item"><Search size={16} /> More searches ▼</div>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="holdings-section">
          <div className="holdings-tabs">
            <div className="holding-tab active">Holdings (1)</div>
            <div className="holding-tab">Article</div>
            <div className="holding-tab">Title notes</div>
          </div>

          <div className="holdings-table-container">
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
                    <div className="item-type-icon">
                      <BookOpen size={24} />
                      <span>Book</span>
                    </div>
                  </td>
                  <td>Grade School Library</td>
                  <td>Grade School Library</td>
                  <td>Circulation</td>
                  <td>
                    {book.callNumber}<br />
                    (Browse shelf)
                  </td>
                  <td className="status-available">Available</td>
                  <td></td>
                  <td>GS{Math.floor(Math.random() * 10000)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '1rem 0', fontSize: '0.9rem' }}>Total holds: 0</div>
          </div>
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

      <footer style={{ marginTop: 'auto', padding: '1.5rem', textAlign: 'center', background: '#181628', color: '#f6de4f', borderTop: '4px solid #f6de4f', fontSize: '0.85rem', fontWeight: '600' }}>
        © {new Date().getFullYear()} Assumption Iloilo
      </footer>
    </div>
  )
}

export default BookDetailScreen
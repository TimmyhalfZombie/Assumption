import { useState, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import CompactSearchForm from './components/CompactSearchForm'
import CrestLogo from './components/CrestLogo'
import LoginModal from './components/LoginModal'
import { useLoginModal } from './functions/useLoginModal'
import type { Book } from './functions/useLibrarySearch'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase' // Import Firebase

// --- INLINE ICONS (Zero External Dependencies) ---
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

const Download = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
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

const ArrowLeft = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
)

// Safe Regex Escaping
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
    return <>{text}</>
  }
}

const CSS = `
/* GLOBAL RESET & FONT */
.book-detail-screen {
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  font-family: var(--font-afacad), sans-serif;
  color: #000000;
}

/* --- HERO SECTION --- */
.results-hero-compact {
  background-color: #1f1d28;
  padding: 2rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 4px solid #f3d654;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  position: relative;
}

/* Back Button */
.back-button {
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-afacad);
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.back-button:hover {
  background: rgba(255,255,255,0.2);
  transform: translateX(-3px);
}

.compact-branding {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.compact-branding:hover {
  opacity: 0.9;
}

.compact-titles h1 {
  color: white;
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.compact-titles p {
  color: rgba(255,255,255,0.9);
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
}

/* --- MAIN CONTAINER --- */
.detail-container {
  max-width: 1300px;
  width: 95%;
  margin: 2.5rem auto 4rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  padding: 3rem;
  /* border-top removed as requested */
}

/* --- VIEW TABS --- */
.view-tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 2.5rem;
  border-bottom: 2px solid #000;
}

.view-tab {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  transition: all 0.2s ease;
  border-bottom: 4px solid transparent;
  font-family: var(--font-afacad);
  border-radius: 4px 4px 0 0;
  opacity: 0.6;
}

.view-tab:hover {
  background: #f3f4f6;
  opacity: 1;
}

.view-tab.active {
  opacity: 1;
  border-bottom-color: #1f1d28;
  background: #f9fafb;
}

/* --- CONTENT GRID --- */
.detail-content {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 4rem;
  margin-bottom: 3rem;
}

/* --- BOOK INFO --- */
.book-info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.book-title-large {
  font-size: 2.2rem;
  font-weight: 900;
  color: #000000;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.highlight-text {
  background-color: #fde047;
  padding: 0 2px;
  border-radius: 2px;
  color: #000;
}

.book-author {
  font-size: 1.25rem;
  color: #000000;
  font-weight: 600;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.book-author-name {
  color: #000000;
  font-weight: 800;
  text-decoration: underline;
}

.book-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1rem;
  color: #000000;
}

.detail-row {
  display: flex;
  gap: 1rem;
  line-height: 1.6;
  align-items: baseline;
}

.detail-label {
  font-weight: 800;
  color: #000000;
  min-width: 180px;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.detail-value {
  color: #000000;
  font-weight: 500;
}

.book-rating-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 6px;
  width: fit-content;
  border: 1px solid #e5e7eb;
}

.rating-stars {
  display: flex;
  gap: 4px;
}

.rating-text {
  font-size: 0.9rem;
  color: #000000;
  font-weight: 600;
}

/* --- MARC & ISBD VIEWS --- */
.marc-table {
  width: 100%;
  border-collapse: collapse;
  font-family: monospace;
  font-size: 0.95rem;
  background: #fff;
  border: 1px solid #000;
  color: #000000;
}

.marc-table td {
  padding: 0.6rem;
  border-bottom: 1px solid #ccc;
  vertical-align: top;
}

.marc-tag {
  font-weight: 900;
  color: #000000;
  width: 60px;
}

.marc-ind {
  color: #000000;
  width: 40px;
  text-align: center;
  font-weight: 600;
}

.marc-content {
  color: #000000;
  font-weight: 500;
}

.subfield-code {
  color: #000000;
  font-weight: 900;
}

.isbd-container {
  background: #fff;
  padding: 2rem;
  border: 1px solid #000;
  font-family: var(--font-afacad), serif;
  font-size: 1.15rem;
  line-height: 1.8;
  color: #000000;
}

/* --- RIGHT SIDEBAR --- */
.actions-sidebar {
  background: #f3f4f6;
  padding: 2rem;
  border-radius: 12px;
  height: fit-content;
  border: 1px solid #e5e7eb;
}

.book-cover-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.book-cover-large {
  width: 160px;
  height: 240px;
  object-fit: cover;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2), 0 4px 10px -3px rgba(0,0,0,0.1);
  border-radius: 6px;
  transform: rotate(2deg);
  transition: transform 0.3s ease;
  border: 4px solid white;
}

.book-cover-large:hover {
  transform: rotate(0deg) scale(1.02);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  background: white;
  border: 1px solid #000;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 700;
  color: #000000;
  transition: all 0.2s;
  text-align: left;
  font-family: var(--font-afacad);
}

.action-btn:hover {
  background: #1f1d28;
  color: #f3d654;
  border-color: #1f1d28;
}

.action-btn:hover .action-btn-icon {
  color: #f3d654;
}

.action-btn-icon {
  width: 20px;
  height: 20px;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-arrow {
  margin-left: auto;
}

/* --- HOLDINGS SECTION --- */
.holdings-section {
  margin-top: 4rem;
}

.holdings-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0; 
}

.holdings-tab {
  padding: 1rem 2rem;
  background: #e5e7eb;
  border: 1px solid #999;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  font-size: 1rem;
  font-weight: 700;
  color: #000000;
  cursor: pointer;
  font-family: var(--font-afacad);
  transition: background 0.2s;
}

.holdings-tab:hover {
  background: #d1d5db;
}

.holdings-tab.active {
  background: #1f1d28;
  color: #f3d654;
  border-color: #1f1d28;
  position: relative;
  top: 1px; 
}

.holdings-table-wrapper, .article-content-wrapper, .notes-content-wrapper {
  background: white;
  padding: 1.5rem;
  border-radius: 0 8px 8px 8px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  color: #000000;
  border-top: 1px solid #999;
  border-right: 1px solid #999;
  border-bottom: 1px solid #999;
  border-left: none;
}

.holdings-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  font-family: var(--font-afacad);
}

.holdings-table th {
  background: #dcd23d; 
  padding: 1rem;
  text-align: center;
  font-weight: 800;
  color: #000000;
  border: 1px solid #000;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.holdings-table td {
  padding: 1rem;
  border: 1px solid #000;
  color: #000000;
  text-align: center;
  vertical-align: middle;
  font-weight: 500;
}

.status-available {
  color: #c62828; /* Red */
  font-weight: 800;
}

.browse-link {
  color: #000000;
  text-decoration: underline;
  font-weight: 700;
}

/* --- ARTICLE MODAL STYLES --- */
.article-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30000;
  padding: 1rem;
  backdrop-filter: blur(5px);
}

.article-modal {
  background: white;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  border: 1px solid #000;
}

.close-article {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
  line-height: 1;
}

.article-text {
  margin-top: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #000;
}

/* --- CONTENT CARD --- */
.content-card {
  border: 1px solid #000;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: #f9fafb;
}

.content-title {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.content-meta {
  font-size: 0.9rem;
  font-style: italic;
  margin-bottom: 1rem;
}

/* --- MOBILE --- */
@media (max-width: 900px) {
  .detail-container {
    padding: 1rem;
    margin: 0.5rem auto;
    width: 100%;
    border-radius: 0;
  }

  .detail-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .actions-sidebar {
    order: -1;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .view-tabs {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .view-tab {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
  
  .holdings-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    font-size: 0.85rem;
  }

  .holdings-table th,
  .holdings-table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }

  .holdings-tabs {
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .holdings-tab {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .holdings-table-wrapper, 
  .article-content-wrapper, 
  .notes-content-wrapper {
    padding: 1rem;
    border-radius: 0 4px 4px 4px;
  }

  .back-button {
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 0.75rem;
    align-self: flex-start;
    width: fit-content;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
  
  .results-hero-compact {
    align-items: flex-start;
    padding: 0.75rem;
  }

  .book-title-large {
    font-size: 1.5rem;
    line-height: 1.3;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .book-author {
    font-size: 1rem;
    padding-bottom: 1rem;
  }

  .book-details {
    font-size: 0.9rem;
    gap: 0.75rem;
  }

  .detail-row {
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
  }

  .detail-label {
    min-width: auto;
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
  }

  .detail-value {
    font-size: 0.9rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    width: 100%;
  }

  .book-info-section {
    gap: 1rem;
  }

  .book-cover-section {
    width: 100%;
  }

  .book-cover-large {
    max-width: 200px;
    width: 100%;
    margin: 0 auto;
  }

  .marc-table {
    font-size: 0.8rem;
  }

  .marc-table td {
    padding: 0.4rem;
  }

  .isbd-container {
    font-size: 1rem;
    line-height: 1.6;
  }

  .content-card {
    padding: 1rem;
  }

  .content-title {
    font-size: 1rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .content-meta {
    font-size: 0.85rem;
  }

  .content-body {
    font-size: 0.9rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}

@media (max-width: 640px) {
  .detail-container {
    padding: 0.75rem;
    margin: 0;
    border-radius: 0;
  }

  .book-title-large {
    font-size: 1.25rem;
  }

  .book-author {
    font-size: 0.9rem;
  }

  .book-details {
    font-size: 0.85rem;
  }

  .detail-label {
    font-size: 0.8rem;
  }

  .detail-value {
    font-size: 0.85rem;
  }

  .holdings-table {
    font-size: 0.75rem;
  }

  .holdings-table th,
  .holdings-table td {
    padding: 0.5rem 0.25rem;
    font-size: 0.7rem;
  }

  .holdings-tab {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }

  .holdings-table-wrapper, 
  .article-content-wrapper, 
  .notes-content-wrapper {
    padding: 0.75rem;
  }

  .view-tab {
    font-size: 0.85rem;
    padding: 0.4rem 0.75rem;
  }

  .action-btn {
    font-size: 0.85rem;
    padding: 0.75rem;
  }

  .marc-table {
    font-size: 0.7rem;
  }

  .isbd-container {
    font-size: 0.9rem;
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

interface WorkDetails {
  description?: string | { value: string };
  subjects?: string[];
}

interface Article {
  id: string;
  title: string;
  publication: string;
  date: string;
  content: string;
}

const BookDetailScreen = ({ book, onNavigate, onBack, onSearch, searchQuery = '' }: BookDetailScreenProps) => {
  const [activeView, setActiveView] = useState<'normal' | 'marc' | 'isbd'>('normal')
  const [activeHoldingsTab, setActiveHoldingsTab] = useState<'holdings' | 'article' | 'notes'>('holdings')
  
  const [workDetails, setWorkDetails] = useState<WorkDetails | null>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [dbArticles] = useState<Article[]>([])
  
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  useEffect(() => {
    if (!document.getElementById('book-detail-css')) {
      const style = document.createElement('style')
      style.id = 'book-detail-css'
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  // --- FETCH OPEN LIBRARY DETAILS ---
  useEffect(() => {
    const fetchWorkDetails = async () => {
      if (!book || !book.id) return;
      setLoadingDetails(true);
      try {
        const response = await fetch(`https://openlibrary.org${book.id}.json`);
        const data = await response.json();
        setWorkDetails(data);
      } catch (error) {
        console.error("Error fetching work details:", error);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchWorkDetails();
  }, [book]);

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

  // Helper: Check if user is logged in
  const checkLogin = () => {
    if (!auth.currentUser) {
      alert("Please login to perform this action.");
      openLogin();
      return false;
    }
    return true;
  }

  // --- FIREBASE ACTIONS ---
  const saveActionToFirebase = async (collectionName: string, actionData: any) => {
    if (!checkLogin()) return;
    
    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, collectionName), {
        userId: user.uid,
        userEmail: user.email, // or School ID if stored differently
        bookId: book.id,
        bookTitle: book.title,
        bookAuthors: book.authors,
        timestamp: serverTimestamp(),
        ...actionData
      });
      alert(`Successfully saved to ${collectionName}!`);
    } catch (error) {
      console.error(`Error saving to ${collectionName}:`, error);
      alert("Failed to save action. Please try again.");
    }
  }

  if (!book) {
    return null
  }

  const bookTitle = book.title || 'Unknown Title'
  const bookAuthors = book.authors && Array.isArray(book.authors) ? book.authors : ['Unknown Author']
  const bookPublisher = book.publisher || 'Unknown Publisher'
  const bookPublishedDate = book.publishedDate || '2011'
  const bookThumbnail = book.thumbnail || '/assets/images/assumption-logo.png'
  const bookCallNumber = book.callNumber || '823.914 2011'
  const isbn = bookCallNumber.split(' ')[0]?.replace(/\./g, '') || '141314818'
  
  let descriptionText = "No description available."
  if (workDetails?.description) {
    descriptionText = typeof workDetails.description === 'string' 
      ? workDetails.description 
      : workDetails.description.value;
  }

  const mockData = {
    isbn: isbn,
    ddc: bookCallNumber,
    subjects: workDetails?.subjects ? workDetails.subjects.slice(0, 5).join(" | ") : "Fiction, Literature",
    dimensions: "220 pages; 20 x 13 cm",
    location: "Grade School Library",
    collection: "Circulation",
    barcode: `GS${Math.floor(Math.random() * 9000) + 1000}`,
    status: "Available"
  }

  const renderViewContent = () => {
    switch (activeView) {
      case 'marc':
        return (
          <div className="book-info-section">
            <h1 className="book-title-large">MARC Record View</h1>
            <div style={{overflowX: 'auto'}}>
              <table className="marc-table">
                <tbody>
                  <tr>
                    <td className="marc-tag">LDR</td>
                    <td className="marc-ind"></td>
                    <td className="marc-content">01234nam a2200321 i 4500</td>
                  </tr>
                  <tr>
                    <td className="marc-tag">008</td>
                    <td className="marc-ind"></td>
                    <td className="marc-content">210526s{bookPublishedDate}    nyu    j      000 1 eng d</td>
                  </tr>
                  <tr>
                    <td className="marc-tag">020</td>
                    <td className="marc-ind">##</td>
                    <td className="marc-content"><span className="subfield-code">$a</span> {mockData.isbn}</td>
                  </tr>
                  <tr>
                    <td className="marc-tag">082</td>
                    <td className="marc-ind">00</td>
                    <td className="marc-content"><span className="subfield-code">$a</span> {mockData.ddc} <span className="subfield-code">$2</span> 23</td>
                  </tr>
                  <tr>
                    <td className="marc-tag">100</td>
                    <td className="marc-ind">1#</td>
                    <td className="marc-content"><span className="subfield-code">$a</span> {bookAuthors[0]}</td>
                  </tr>
                  <tr>
                    <td className="marc-tag">245</td>
                    <td className="marc-ind">14</td>
                    <td className="marc-content">
                      <span className="subfield-code">$a</span> {bookTitle} :
                      <span className="subfield-code">$b</span> {descriptionText.substring(0, 50)}... /
                      <span className="subfield-code">$c</span> {bookAuthors.join(', ')}.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'isbd':
        return (
          <div className="book-info-section">
            <h1 className="book-title-large">ISBD View</h1>
            <div className="isbd-container">
              <p>
                <strong>{bookTitle}</strong> : {descriptionText.substring(0, 50)}... / {bookAuthors.join(', ')}. — London : {bookPublisher}, {bookPublishedDate}.
              </p>
              <p>{mockData.dimensions}.</p>
              <p>ISBN {mockData.isbn}</p>
              <p>1. {mockData.subjects.split('|')[0].trim()}. I. {bookAuthors[0]}.</p>
              <p>{mockData.ddc}</p>
            </div>
          </div>
        );

      case 'normal':
      default:
        return (
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
                <span className="detail-label">Publisher</span>
                <span className="detail-value">{bookPublisher}, {bookPublishedDate}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Description</span>
                <span className="detail-value">{mockData.dimensions}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">ISBN</span>
                <span className="detail-value">{mockData.isbn}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Subject(s)</span>
                <span className="detail-value">{mockData.subjects}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">DDC Classification</span>
                <span className="detail-value">{mockData.ddc}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Tags</span>
                <span className="detail-value">No tags from this library for this title.</span>
              </div>
            </div>

            <div className="book-rating-section">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="star-icon">
                    <Star 
                      size={20} 
                      fill={star <= Math.floor(book.rating || 0) ? "#f59e0b" : "none"}
                      stroke={star <= Math.floor(book.rating || 0) ? "#f59e0b" : "#d1d5db"}
                    />
                  </span>
                ))}
              </div>
              <span className="rating-text">Average rating: {book.rating?.toFixed(1) || '0.0'} (0 votes)</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="book-detail-screen">
      <NavigationBar onLoginClick={openLogin} onNavigate={onNavigate} currentPage="home" />

      <div className="results-hero-compact">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={18} /> Back to Results
        </button>
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
            MARC View
          </button>
          <button 
            className={`view-tab ${activeView === 'isbd' ? 'active' : ''}`}
            onClick={() => setActiveView('isbd')}
          >
            ISBD View
          </button>
        </div>

        <div className="detail-content">
          {renderViewContent()}

          <div className="actions-sidebar">
            {activeView === 'normal' && (
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
            )}

            <div className="action-buttons">
              <button 
                className="action-btn" 
                onClick={() => saveActionToFirebase('holds', { status: 'pending' })}
              >
                <span className="action-btn-icon"><Bookmark size={18} /></span>
                Place Hold
              </button>
              
              <button 
                className="action-btn" 
                onClick={() => {
                  window.print();
                  saveActionToFirebase('print_logs', { type: 'detail_view' });
                }}
              >
                <span className="action-btn-icon"><Printer size={18} /></span>
                Print
              </button>
              
              <button 
                className="action-btn" 
                onClick={() => saveActionToFirebase('cart', { quantity: 1 })}
              >
                <span className="action-btn-icon"><ShoppingCart size={18} /></span>
                Add to Cart
              </button>
              
              <button 
                className="action-btn" 
                onClick={() => saveActionToFirebase('saved_books', { savedAt: new Date().toISOString() })}
              >
                <span className="action-btn-icon"><Download size={18} /></span>
                Save Record
                <span className="dropdown-arrow"><ChevronDown size={14} /></span>
              </button>
            </div>
          </div>
        </div>

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
              Title Notes
            </button>
          </div>

          <div className="holdings-table-wrapper">
            {activeHoldingsTab === 'holdings' && (
              <>
                <table className="holdings-table">
                  <thead>
                    <tr>
                      <th>Item Type</th>
                      <th>Current Location</th>
                      <th>Collection</th>
                      <th>Call Number</th>
                      <th>Status</th>
                      <th>Barcode</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div style={{display:'flex', flexDirection:'column', gap:'4px', alignItems:'center'}}>
                           <span style={{color: '#000'}}><BookIcon size={20} /></span>
                           <span style={{fontWeight: 800}}>Book</span>
                        </div>
                      </td>
                      <td>{mockData.location}</td>
                      <td>{mockData.collection}</td>
                      <td>
                        <a href="#" className="browse-link">{mockData.ddc}</a>
                        <span style={{fontSize: '0.85rem', display:'block', marginTop:'4px'}}>(Browse shelf)</span>
                      </td>
                      <td><span className="status-available">{mockData.status}</span></td>
                      <td style={{fontFamily: 'monospace', fontSize: '1rem', fontWeight: 'bold'}}>{mockData.barcode}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="total-holds">Total holds: 0</div>
              </>
            )}

            {activeHoldingsTab === 'article' && (
              <div className="article-content-wrapper">
                 {dbArticles.length > 0 ? (
                   dbArticles.map(article => (
                     <div key={article.id} className="content-card">
                        <h3 className="content-title">{article.title}</h3>
                        <div className="content-meta">{article.publication}, {article.date}</div>
                        <div className="content-body">
                          {article.content.substring(0, 150)}...
                        </div>
                        <button 
                          onClick={() => setSelectedArticle(article)} 
                          style={{marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 700, background:'#1f1d28', color:'#fff', border:'none', borderRadius:'4px'}}
                        >
                          Read Full Article
                        </button>
                     </div>
                   ))
                 ) : (
                   <div style={{ padding: '2rem', textAlign: 'center', color: '#000', fontStyle: 'italic' }}>
                     <p>No related academic articles found in the database for this specific title.</p>
                     <p style={{fontSize:'0.9rem', marginTop:'0.5rem'}}>(Note: The free Open Library API does not provide full-text journal articles. This tab would typically require a subscription service or manual entry.)</p>
                   </div>
                 )}
              </div>
            )}

            {activeHoldingsTab === 'notes' && (
              <div className="notes-content-wrapper">
                {loadingDetails ? (
                  <p>Loading notes...</p>
                ) : (
                  <div className="content-card">
                     <div className="detail-row">
                        <span className="detail-label">Description / Summary:</span>
                        <span className="detail-value" style={{lineHeight: '1.6'}}>
                          {descriptionText}
                        </span>
                     </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ARTICLE MODAL */}
      {selectedArticle && (
        <div className="article-modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="article-modal" onClick={e => e.stopPropagation()}>
            <button className="close-article" onClick={() => setSelectedArticle(null)}>×</button>
            <h2 className="book-title-large" style={{marginTop: 0, marginBottom: '1rem'}}>{selectedArticle.title}</h2>
            <div className="content-meta">Published in: {selectedArticle.publication}, {selectedArticle.date}</div>
            <hr style={{margin: '1.5rem 0', border: '0', borderTop: '1px solid #ccc'}} />
            <div className="article-text">
              {selectedArticle.content}
            </div>
          </div>
        </div>
      )}

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

    </div>
  )
}

export default BookDetailScreen
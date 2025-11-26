import { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

// --- ICONS ---
const UserIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const ChevronDown = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

const Trash2 = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
)

// --- TYPES ---
type SavedItem = {
  id: string
  bookTitle: string
  bookAuthors: string[]
  status?: string // For holds
}

type UserProfileModalProps = {
  isOpen: boolean
  onClose: () => void
}

// --- CSS ---
const CSS = `
.profile-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 20000;
  display: flex;
  justify-content: flex-end; /* Slide from right */
}

.profile-modal {
  background: #ffffff;
  width: 100%;
  max-width: 400px;
  height: 100%;
  box-shadow: -5px 0 25px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes slideOutRight {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}

.profile-modal.closing {
  animation: slideOutRight 0.3s ease-in forwards;
}

.profile-modal-overlay.closing {
  animation: fadeOut 0.3s ease-in forwards;
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.profile-header {
  padding: 2rem;
  background: #1f1d28;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-avatar {
  width: 60px;
  height: 60px;
  background: #f3d654;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1f1d28;
}

.profile-info h2 {
  margin: 0;
  font-size: 1.2rem;
  font-family: var(--font-afacad);
}

.profile-info p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.7;
}

.profile-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Accordion Styles */
.accordion-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.accordion-header {
  padding: 1rem;
  background: #f8f9fa;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-family: var(--font-afacad);
  color: #1f1d28;
  transition: background 0.2s;
}

.accordion-header:hover {
  background: #eee;
}

.chevron-rotated {
  transform: rotate(180deg);
  transition: transform 0.3s;
}

.chevron-normal {
  transform: rotate(0deg);
  transition: transform 0.3s;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background: white;
}

.accordion-content.open {
  max-height: 500px; /* Arbitrary large height */
  overflow-y: auto;
  border-top: 1px solid #e0e0e0;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.list-item:last-child {
  border-bottom: none;
}

.item-details {
  flex: 1;
}

.item-title {
  font-weight: 600;
  display: block;
  color: #333;
}

.item-author {
  font-size: 0.8rem;
  color: #666;
}

.item-status {
  font-size: 0.75rem;
  font-weight: 700;
  color: #d97706;
  background: #fef3c7;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 4px;
  display: inline-block;
}

.delete-btn {
  background: none;
  border: none;
  color: #d32f2f;
  cursor: pointer;
  padding: 0.4rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 1;
}

.profile-footer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
}

.logout-btn {
  width: 100%;
  padding: 1rem;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-afacad);
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #b71c1c;
}

.close-modal-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  z-index: 10;
  -webkit-tap-highlight-color: transparent;
}

@media (max-width: 768px) {
  .profile-modal {
    max-width: 100%;
    width: 100%;
  }

  .profile-header {
    padding: 1.5rem 1rem;
    gap: 0.75rem;
  }

  .profile-avatar {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
  }

  .profile-info h2 {
    font-size: 1.1rem;
  }

  .profile-info p {
    font-size: 0.85rem;
  }

  .close-modal-btn {
    width: 40px;
    height: 40px;
    top: 0.75rem;
    right: 0.75rem;
    font-size: 1.5rem;
    background: rgba(255,255,255,0.2);
  }

  .profile-content {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .accordion-header {
    padding: 0.875rem;
    font-size: 0.95rem;
    min-height: 44px; /* Better touch target */
    -webkit-tap-highlight-color: transparent;
  }

  .list-item {
    padding: 0.75rem;
    font-size: 0.85rem;
    min-height: 44px; /* Better touch target */
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .item-title {
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .item-author {
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }

  .delete-btn {
    padding: 0.5rem;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }

  .profile-footer {
    padding: 1rem;
  }

  .logout-btn {
    padding: 1rem;
    font-size: 1rem;
    min-height: 48px; /* Better touch target */
    -webkit-tap-highlight-color: transparent;
  }

  .accordion-content.open {
    max-height: 400px; /* Reduced for mobile */
  }
}

@media (max-width: 480px) {
  .profile-header {
    padding: 1.25rem 0.875rem;
  }

  .profile-avatar {
    width: 45px;
    height: 45px;
  }

  .profile-info h2 {
    font-size: 1rem;
  }

  .profile-info p {
    font-size: 0.8rem;
  }

  .profile-content {
    padding: 0.5rem;
  }

  .accordion-header {
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  .list-item {
    padding: 0.625rem;
    font-size: 0.8rem;
  }

  .item-title {
    font-size: 0.85rem;
  }

  .item-author {
    font-size: 0.7rem;
  }
}
`

const UserProfileModal = ({ isOpen, onClose }: UserProfileModalProps) => {
  const [activeTab, setActiveTab] = useState<'cart' | 'holds' | null>(null)
  const [cartItems, setCartItems] = useState<SavedItem[]>([])
  const [holdItems, setHoldItems] = useState<SavedItem[]>([]) // New State
  const [userEmail, setUserEmail] = useState('')
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (!document.getElementById('profile-modal-css')) {
      const style = document.createElement('style')
      style.id = 'profile-modal-css'
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  // Fetch Data from Firebase
  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    const displayId = user.email?.split('@')[0] || 'User'
    setUserEmail(displayId)

    // 1. Listen to Cart
    const cartQuery = query(collection(db, 'cart'), where('userId', '==', user.uid))
    const unsubscribeCart = onSnapshot(cartQuery, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SavedItem))
      setCartItems(items)
    })

    // 2. Listen to Holds
    const holdsQuery = query(collection(db, 'holds'), where('userId', '==', user.uid))
    const unsubscribeHolds = onSnapshot(holdsQuery, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SavedItem))
      setHoldItems(items)
    })

    return () => {
      unsubscribeCart()
      unsubscribeHolds()
    }
  }, [isOpen])

  const handleDelete = async (collectionName: string, docId: string) => {
    if (confirm('Remove this item?')) {
      await deleteDoc(doc(db, collectionName, docId))
    }
  }

  // Reset closing state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300) // Match animation duration
  }

  const handleLogout = async () => {
    await signOut(auth)
    handleClose()
  }

  const toggleAccordion = (tab: 'cart' | 'holds') => {
    setActiveTab(activeTab === tab ? null : tab)
  }

  if (!isOpen && !isClosing) return null

  return (
    <div className={`profile-modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
      <div className={`profile-modal ${isClosing ? 'closing' : ''}`} onClick={e => e.stopPropagation()}>
        
        <div className="profile-header">
          <button className="close-modal-btn" onClick={handleClose}>×</button>
          <div className="profile-avatar">
            <UserIcon size={32} />
          </div>
          <div className="profile-info">
            <h2>Student Profile</h2>
            <p>ID: {userEmail}</p>
          </div>
        </div>

        <div className="profile-content">
          
          {/* Holds Section */}
          <div className="accordion-item">
            <div className="accordion-header" onClick={() => toggleAccordion('holds')}>
              <span>My Holds ({holdItems.length})</span>
              <ChevronDown className={activeTab === 'holds' ? 'chevron-rotated' : 'chevron-normal'} />
            </div>
            <div className={`accordion-content ${activeTab === 'holds' ? 'open' : ''}`}>
              <ul className="item-list">
                {holdItems.length === 0 ? (
                  <li className="list-item" style={{color:'#999', fontStyle:'italic'}}>No active holds.</li>
                ) : (
                  holdItems.map(item => (
                    <li key={item.id} className="list-item">
                      <div className="item-details">
                        <span className="item-title">{item.bookTitle}</span>
                        <span className="item-author">{item.bookAuthors?.join(', ')}</span>
                        <span className="item-status">{item.status || 'Pending'}</span>
                      </div>
                      <button className="delete-btn" onClick={() => handleDelete('holds', item.id)}>
                        <Trash2 />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          {/* Cart Section */}
          <div className="accordion-item">
            <div className="accordion-header" onClick={() => toggleAccordion('cart')}>
              <span>My Cart ({cartItems.length})</span>
              <ChevronDown className={activeTab === 'cart' ? 'chevron-rotated' : 'chevron-normal'} />
            </div>
            <div className={`accordion-content ${activeTab === 'cart' ? 'open' : ''}`}>
              <ul className="item-list">
                {cartItems.length === 0 ? (
                  <li className="list-item" style={{color:'#999', fontStyle:'italic'}}>Your cart is empty.</li>
                ) : (
                  cartItems.map(item => (
                    <li key={item.id} className="list-item">
                      <div className="item-details">
                        <span className="item-title">{item.bookTitle}</span>
                        <span className="item-author">{item.bookAuthors?.join(', ')}</span>
                      </div>
                      <button className="delete-btn" onClick={() => handleDelete('cart', item.id)}>
                        <Trash2 />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

        </div>

        <div className="profile-footer">
          <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
        </div>

      </div>
    </div>
  )
}

export default UserProfileModal
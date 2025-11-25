import { useEffect } from 'react'
import CrestLogo from './CrestLogo'

const CSS = `
.library-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  color: #ffffff;
}

.library-hero__logo {
  width: clamp(140px, 22vw, 180px);
  height: clamp(140px, 22vw, 180px);
  background: transparent;
}

.library-hero__logo .crest-logo__image {
  width: 100%;
  height: 100%;
}

.library-hero__title {
  display: block;
  font-family: var(--font-candal);
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-weight: 700;
}

.library-hero__callout {
  margin: 1rem 0 0.25rem;
  font-family: var(--font-candal);
  font-size: clamp(3rem, 12vw, 4.5rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.65em;
}

.library-hero__description {
  max-width: 720px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 1rem;
  letter-spacing: 0.03em;
  font-family: var(--font-afacad);
}

@media (max-width: 640px) {
  .library-hero__title {
    font-size: 1.1rem;
    letter-spacing: 0.15em;
  }

  .library-hero__callout {
    font-size: 2rem;
    letter-spacing: 0.25em;
    margin-top: 0.5rem;
  }
}
`

const LibraryHero = () => {
  useEffect(() => {
    const styleId = 'library-hero-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  return (
    <section className="library-hero">
      <CrestLogo className="library-hero__logo" />
      <div className="library-hero__heading">
        <h1>
          <span className="library-hero__title">Assumption Iloilo</span>
        </h1>
        <p className="library-hero__callout">Library</p>
      </div>
    </section>
  )
}

export default LibraryHero

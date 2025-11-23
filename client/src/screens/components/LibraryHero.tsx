import CrestLogo from './CrestLogo'

const LibraryHero = () => {
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


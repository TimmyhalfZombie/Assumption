import NavigationBar from './components/NavigationBar'
import LibraryHero from './components/LibraryHero'
import SearchForm from './components/SearchForm'
import { useLibrarySearch } from './functions/useLibrarySearch'

const LibraryScreen = () => {
  const {
    catalogOptions,
    libraryOptions,
    selectedCatalog,
    setSelectedCatalog,
    searchTerm,
    setSearchTerm,
    selectedLibrary,
    setSelectedLibrary,
    handleSubmit,
  } = useLibrarySearch()

  return (
    <div className="library-screen">
      <NavigationBar />
      <main className="library-screen__content">
        <LibraryHero />
        <section className="library-screen__search">
          <SearchForm
            catalogOptions={catalogOptions}
            libraryOptions={libraryOptions}
            selectedCatalog={selectedCatalog}
            onCatalogChange={setSelectedCatalog}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            selectedLibrary={selectedLibrary}
            onLibraryChange={setSelectedLibrary}
            onSubmit={handleSubmit}
          />
          <div className="library-screen__meta-links">
            <a href="#">Advanced search</a>
            <span aria-hidden="true">|</span>
            <a href="#">Authority search</a>
            <span aria-hidden="true">|</span>
            <a href="#">Tag Cloud</a>
            <span aria-hidden="true">|</span>
            <a href="#">Libraries</a>
          </div>
        </section>
        <section className="library-screen__acquisitions">
          <h2>New Acquisitions</h2>
          <p>Featured titles will appear here.</p>
        </section>
      </main>
    </div>
  )
}

export default LibraryScreen


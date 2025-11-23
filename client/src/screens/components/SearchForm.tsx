import type { FormEvent } from 'react'

type Option = {
  value: string
  label: string
}

type SearchFormProps = {
  catalogOptions: Option[]
  libraryOptions: Option[]
  selectedCatalog: string
  onCatalogChange: (value: string) => void
  searchTerm: string
  onSearchTermChange: (value: string) => void
  selectedLibrary: string
  onLibraryChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

const SearchForm = ({
  catalogOptions,
  libraryOptions,
  selectedCatalog,
  onCatalogChange,
  searchTerm,
  onSearchTermChange,
  selectedLibrary,
  onLibraryChange,
  onSubmit,
}: SearchFormProps) => {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-form__fieldset">
        <div className="search-form__control search-form__control--catalog">
          <label className="visually-hidden" htmlFor="catalog-select">
            Select catalog
          </label>
          <select
            id="catalog-select"
            className="search-form__select search-form__select--catalog"
            value={selectedCatalog}
            onChange={(event) => onCatalogChange(event.target.value)}
          >
            {catalogOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="search-form__control search-form__control--query">
          <label className="visually-hidden" htmlFor="search-term">
            Search term
          </label>
          <input
            id="search-term"
            type="search"
            className="search-form__input"
            placeholder="Search for library materials"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
          />
        </div>

        <div className="search-form__library-group">
          <label className="visually-hidden" htmlFor="library-select">
            Select library
          </label>
          <select
            id="library-select"
            className="search-form__select search-form__select--library"
            value={selectedLibrary}
            onChange={(event) => onLibraryChange(event.target.value)}
          >
            {libraryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button type="submit" className="search-form__submit">
            Go
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchForm


const SearchBar = ({ onChange, value }) => {
  return (
    <div>
      find countries <input onChange={onChange} value={value} name="search" />
    </div>
  )
}

export default SearchBar

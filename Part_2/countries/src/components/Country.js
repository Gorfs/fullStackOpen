const country = ({ country, details }) => {
  if (details === false) {
    return <div>{country.name.common}</div>
  } else {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="flag of {country.name.common}" />
      </div>
    )
  }
}
export default country

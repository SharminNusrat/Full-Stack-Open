import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)
  }

  const filteredCountries = countries.filter(country => {
    if (searchValue) {
      return country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    }
  })

  console.log(filteredCountries)

  return (
    <div>
      <div>find countries <input value={searchValue} onChange={handleSearchValueChange} /></div>
      {filteredCountries.length > 10 ? (
        <p>Too many countries, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        filteredCountries.map(country =>
          <p key={country.name.common}>{country.name.common}</p>
        )
      ) : filteredCountries.length === 1 ? (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>Capital {filteredCountries[0].capital}</p>
          <p>Area {filteredCountries[0].area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(filteredCountries[0].languages).map((language) =>
              <li key={language}>{language}</li>
            )}
          </ul>
          <img src={filteredCountries[0].flags.png} />
        </div>
      ) : null}
    </div>
  )
}

export default App
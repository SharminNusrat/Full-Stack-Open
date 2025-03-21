import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if(filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0])
    }
  }, [selectedCountry])

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  const filteredCountries = countries.filter(country => {
    if (searchValue) {
      return country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    }
  })

  console.log(filteredCountries)
  console.log(selectedCountry)

  return (
    <div>
      <div>find countries <input value={searchValue} onChange={handleSearchValueChange} /></div>

      {filteredCountries.length > 10 ? (
        <p>Too many countries, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        filteredCountries.map(country =>
          <p key={country.name.common}>{country.name.common} <button onClick={() => handleShowCountry(country)}>show</button></p> 
        )
      ) : null}  

      {selectedCountry ? (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p>Capital {selectedCountry.capital}</p>
          <p>Area {selectedCountry.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(selectedCountry.languages).map((language) =>
              <li key={language}>{language}</li>
            )}
          </ul>
          <img src={selectedCountry.flags.png} />
        </div>
      ) : null}
    </div>
  )
}

export default App
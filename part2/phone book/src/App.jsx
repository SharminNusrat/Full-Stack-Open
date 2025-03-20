import { useEffect, useState } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchValue, setNewSearchValue] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data.filter(person =>
          person.name.toLowerCase().includes(newSearchValue.toLowerCase())
        ))
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        const updatedPersons = persons.concat(response.data)
        setPersons(updatedPersons)
        setFilteredPersons(updatedPersons.filter(person =>
          person.name.toLowerCase().includes(newSearchValue.toLowerCase())
        ))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchValueChange = (event) => {
    setNewSearchValue(event.target.value)
    const newFilteredPersons = persons.filter(person => {
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredPersons(newFilteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text="filter shown with" value={newSearchValue} onChange={handleSearchValueChange} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewPerson={addNewPerson}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
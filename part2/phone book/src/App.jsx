import { useEffect, useState } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import personService from "./services/persons"
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchValue, setNewSearchValue] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons.filter(person =>
          person.name.toLowerCase().includes(newSearchValue.toLowerCase())
        ))
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        }

        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            const updatedPersons = persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson)
            setPersons(updatedPersons)
            setFilteredPersons(updatedPersons.filter(person =>
              person.name.toLowerCase().includes(newSearchValue.toLowerCase())
            ))
            setMessage(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 7000);
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Information of ${updatedPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 7000);
          })  
        return
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        const updatedPersons = persons.concat(returnedPerson)
        setPersons(updatedPersons)
        setFilteredPersons(updatedPersons.filter(person =>
          person.name.toLowerCase().includes(newSearchValue.toLowerCase())
        ))
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 7000);
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 7000);
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteObject(id)
        .then(returnedPerson => {
          const updatedPersons = persons.filter(person => person.id !== returnedPerson.id)
          setPersons(updatedPersons)
          setFilteredPersons(updatedPersons.filter(person =>
            person.name.toLowerCase().includes(newSearchValue.toLowerCase())
          ))
          setMessage(`Removed ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 7000);
        })
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 7000);
        }) 
        return
    }
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
      <Notification message={message} errorMessage={errorMessage} />
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
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
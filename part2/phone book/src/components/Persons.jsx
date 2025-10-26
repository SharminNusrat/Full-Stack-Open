import Person from "./Person"

const Persons = ({filteredPersons, deletePerson}) => {
    return filteredPersons.map(person => 
        <Person key={person.id} person={person} deletePerson={deletePerson}/>
    )
}

export default Persons